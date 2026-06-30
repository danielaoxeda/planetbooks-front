'use client'

import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
    AlertCircle,
    BadgeCheck,
    Bell,
    BookOpen,
    CheckCircle,
    LogOut,
    ShieldCheck,
    Sparkles,
    Lock,
    LogOut,
    Mail,
    User,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { authService } from '@/services/authService'
import { User } from '@/types/user'

// Privacy settings
interface PrivacySettings {
    showProfile: boolean
    showOrders: boolean
    allowAnalytics: boolean
}

function FormInput({
                       label,
                       error,
                       children,
                       hint,
                   }: {
    label: string
    error?: string
    children: React.ReactNode
    hint?: string
}) {
    return (
        <div className="grid gap-2">
            <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
                    {label}
                </label>
                {hint && <span className="text-xs text-on-surface-variant/60">{hint}</span>}
            </div>
            {children}
            {error && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {error}
                </p>
            )}
        </div>
    )
}

type StatusType = 'success' | 'error' | 'info' | null

interface StatusMessage {
    text: string
    type: StatusType
}

function AccountProfileForm({
                                currentUser,
                                updateUser,
                                onLogout,
                            }: {
    currentUser: User
    updateUser: (userData: User) => void
    onLogout: () => void
}) {
    const router = useRouter()
    const toast = useToast()
    const [viewMode, setViewMode] = useState<ViewMode>('profile')
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(() => currentUser.name || currentUser.email.split('@')[0])
    const [email, setEmail] = useState(() => currentUser.email)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [status, setStatus] = useState<StatusMessage>(null)
    const [isSaving, setIsSaving] = useState(false)

    // Password visibility toggles
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Notification preferences state
    const [notifications, setNotifications] = useState<NotificationPreferences>({
        emailNotifications: true,
        orderUpdates: true,
        promotions: false,
        newsletter: true,
    })

    // Privacy settings state
    const [privacy, setPrivacy] = useState<PrivacySettings>({
        showProfile: true,
        showOrders: false,
        allowAnalytics: true,
    })

    const validation = createValidationRules()

    // Profile form validation
    const profileForm = useFormValidation<ProfileFormData>(
        {
            name: currentUser.name || currentUser.email.split('@')[0],
            email: currentUser.email,
            phone: '',
            bio: '',
        },
        {
            name: [
                validation.required('Name is required'),
                validation.minLength(2, 'Name must be at least 2 characters'),
            ],
            email: [
                validation.required('Email is required'),
                validation.email('Please enter a valid email'),
            ],
            phone: [],
            bio: [],
        }
    )

    // Password form validation
    const passwordForm = useFormValidation<PasswordFormData>(
        {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        {
            currentPassword: [validation.required('Current password is required')],
            newPassword: [
                validation.required('New password is required'),
                validation.passwordMinLength(6, 'Password must be at least 6 characters'),
            ],
            confirmPassword: [
                validation.required('Please confirm your password'),
                validation.match(
                    passwordForm.values.newPassword,
                    'Passwords do not match'
                ),
            ],
        }
    )

    const displayName =
        profileForm.values.name.trim() ||
        currentUser.name ||
        currentUser.email.split('@')[0]
    const initials = displayName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('') || displayName.slice(0, 2).toUpperCase()
    const roleLabel = currentUser.role === 'ADMIN' ? 'Administrator' : 'Learner'

    const resetProfileFields = useCallback(() => {
        setName(currentUser.name || currentUser.email.split('@')[0])
        setEmail(currentUser.email)
        setIsEditing(false)
    }, [currentUser])

    const resetPasswordFields = useCallback(() => {
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
    }, [])

    const clearStatus = useCallback(() => {
        setStatus(null)
    }, [])

    const handleCancel = () => {
        if (viewMode === 'password') {
            setViewMode('profile')
            resetPasswordFields()
            resetProfileFields()
            clearStatus()
            return
        }

        resetProfileFields()
        setStatus({ text: 'Changes discarded.', type: 'info' })
    }

    const handleTogglePassword = () => {
        setViewMode('password')
        setIsEditing(false)
        resetProfileFields()
        resetPasswordFields()
        setStatus({ text: 'Password form enabled.', type: 'info' })
    }

    const handleSave = async () => {
        setIsSaving(true)
        clearStatus()

        try {
            if (viewMode === 'password') {
                // Password validation
                if (!currentPassword.trim()) {
                    setStatus({ text: 'Please enter your current password.', type: 'error' })
                    setIsSaving(false)
                    return
                }

                if (!newPassword.trim()) {
                    setStatus({ text: 'Please enter a new password.', type: 'error' })
                    setIsSaving(false)
                    return
                }

                if (newPassword.length < 6) {
                    setStatus({ text: 'New password must be at least 6 characters.', type: 'error' })
                    setIsSaving(false)
                    return
                }

                if (newPassword !== confirmPassword) {
                    setStatus({ text: 'The new passwords do not match.', type: 'error' })
                    setIsSaving(false)
                    return
                }

                await authService.changePassword(currentUser.id, {
                    currentPassword: currentPassword.trim(),
                    newPassword: newPassword.trim(),
                    confirmPassword: confirmPassword.trim(),
                })

                setStatus({ text: 'Password updated successfully!', type: 'success' })
                setViewMode('profile')
                setIsEditing(false)
                resetPasswordFields()
                return
            }
            toast.error(message)
        } finally {
            setIsSaving(false)
        }
    }

            if (!isEditing) {
                setIsEditing(true)
                setStatus({ text: 'Fields unlocked for editing.', type: 'info' })
                return
            }

            // Profile validation
            if (!name.trim()) {
                setStatus({ text: 'Name cannot be empty.', type: 'error' })
                setIsSaving(false)
                return
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email.trim())) {
                setStatus({ text: 'Please enter a valid email address.', type: 'error' })
                setIsSaving(false)
                return
            }

            const updatedUser = await authService.updateProfile(currentUser.id, {
                name: name.trim(),
                email: email.trim(),
            })

            updateUser(updatedUser)
            setStatus({ text: 'Profile updated successfully!', type: 'success' })
            setIsEditing(false)
        } catch (error: unknown) {
            console.error('Error saving profile:', error)
            let errorMessage = 'Unable to update profile. Please try again.'

            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { message?: string } } }
                if (axiosError.response?.data?.message) {
                    errorMessage = axiosError.response.data.message
                } else if (axiosError.response?.status === 401) {
                    errorMessage = 'Your session may have expired. Please log in again.'
                } else if (axiosError.response?.status === 400) {
                    errorMessage = 'Invalid data. Please check your input.'
                }
            }

            setStatus({ text: errorMessage, type: 'error' })
        } finally {
            setIsSaving(false)
        }
    }

    const getStatusIcon = () => {
        if (!status) return null
        if (status.type === 'success') return <CheckCircle size={16} className="text-green-600" />
        if (status.type === 'error') return <AlertCircle size={16} className="text-red-600" />
        return <AlertCircle size={16} className="text-blue-600" />
    }

    const getStatusClass = () => {
        if (!status) return ''
        if (status.type === 'success') return 'bg-green-50 border-green-200 text-green-800'
        if (status.type === 'error') return 'bg-red-50 border-red-200 text-red-800'
        return 'bg-blue-50 border-blue-200 text-blue-800'
    }

    return (
        <section className="relative w-full overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(0,107,17,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(0,136,24,0.12),transparent_28%),linear-gradient(180deg,#f5fcee_0%,#edf5e4_55%,#f8fafc_100%)]">
            <div className="absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(0,107,17,0.14),transparent)]" />

            <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
                {/* Header Card */}
                <div className="overflow-hidden rounded-[28px] border border-white/60 bg-[#006b11] shadow-[0_20px_80px_rgba(0,107,17,0.22)]">
                    <div className="grid min-h-60 gap-8 p-6 text-white md:grid-cols-[auto_1fr] md:items-end md:p-8 lg:p-10">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/25 bg-white/10 text-3xl font-bold tracking-tight text-white shadow-2xl backdrop-blur">
                                    {initials}
                                </div>
                                <button
                                    className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary shadow-lg hover:bg-gray-100 transition-colors"
                                    title="Change avatar"
                                >
                                    <User size={14} />
                                </button>
                            </div>

                            <div className="max-w-xl space-y-2">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">Account overview</p>
                                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{displayName}</h1>
                                <p className="text-sm text-white/85 sm:text-base">{currentUser.email}</p>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white ring-1 ring-inset ring-white/15">
                                        <Sparkles size={14} />
                                        {roleLabel}
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                                        <ShieldCheck size={14} />
                                        Secure access
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-3 md:w-72 md:justify-self-end">
                            <Link
                                href="/catalog"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm transition-transform hover:-translate-y-0.5"
                            >
                                <BookOpen size={16} />
                                Explore catalog
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:items-start">
                    {/* Sidebar Navigation */}
                    <aside className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6 lg:sticky lg:top-24">
                        <div className="rounded-2xl bg-surface-container-low px-4 py-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Settings</p>
                            <p className="mt-1 text-sm text-on-surface-variant">Manage your account.</p>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setViewMode('profile')
                                resetPasswordFields()
                                clearStatus()
                            }}
                            className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${viewMode === 'profile'
                                ? 'bg-primary text-white shadow-sm'
                                : 'border border-outline-variant/70 bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                            }`}
                        >
                            Profile
                        </button>

                        <button
                            type="button"
                            onClick={handleTogglePassword}
                            className={`mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${viewMode === 'password'
                                ? 'bg-primary text-white shadow-sm'
                                : 'border border-primary text-primary hover:bg-primary/5'
                            }`}
                        >
                            Change password
                        </button>

                        <button
                            type="button"
                            onClick={onLogout}
                            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-error/20 bg-error/5 px-4 py-3 text-sm font-semibold text-error transition-colors hover:bg-error/10"
                        >
                            <LogOut size={16} />
                            Sign out
                        </button>
                    </aside>

                    {/* Content Area */}
                    <div className="grid gap-6">
                        {/* Profile Section */}
                        {viewMode === 'profile' && (
                            <section className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
                                <div className="mb-6">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Personal Information</p>
                                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-on-surface">Edit your profile</h2>
                                    <p className="mt-2 text-sm text-on-surface-variant">
                                        Update your personal information and how others see you.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">
                                    Account status: <span className="font-semibold text-primary">{currentUser.enabled ? 'Active' : 'Inactive'}</span>
                                </div>

                            <div className="mt-6 grid gap-4">
                                {viewMode === 'password' ? (
                                    <>
                                        <label className="grid gap-2">
                                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-on-surface-variant">Current password</span>
                                            <input
                                                type="password"
                                                value={currentPassword}
                                                onChange={(event) => setCurrentPassword(event.target.value)}
                                                placeholder="Enter your current password"
                                                className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary"
                                            />
                                        </label>

                                        <label className="grid gap-2">
                                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-on-surface-variant">New password</span>
                                            <input
                                                type="password"
                                                value={newPassword}
                                                onChange={(event) => setNewPassword(event.target.value)}
                                                placeholder="Enter new password (min. 6 characters)"
                                                className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary"
                                            />
                                        </label>

                                <div className="grid gap-6 max-w-lg">
                                    <FormInput label="Current Password" error={passwordForm.errors.currentPassword}>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(event) => setConfirmPassword(event.target.value)}
                                                placeholder="Confirm your new password"
                                                className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                                            >
                                                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </FormInput>

                                    <FormInput
                                        label="New Password"
                                        hint="At least 6 characters"
                                        error={passwordForm.errors.newPassword}
                                    >
                                        <div className="relative">
                                            <input
                                                type={showNewPassword ? 'text' : 'password'}
                                                {...passwordForm.getFieldProps('newPassword')}
                                                placeholder="Enter new password"
                                                className="w-full rounded-2xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 pr-10 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                                            >
                                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </FormInput>

                                    <FormInput label="Confirm New Password" error={passwordForm.errors.confirmPassword}>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                {...passwordForm.getFieldProps('confirmPassword')}
                                                placeholder="Confirm new password"
                                                className="w-full rounded-2xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 pr-10 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary"
                                            />
                                        </label>
                                    </div>
                                )}

                                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-end">
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="rounded-2xl px-5 py-3 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-low"
                                        >
                                            Cancel changes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                                        >
                                            {isSaving ? 'Saving...' : viewMode === 'password' ? 'Update Password' : isEditing ? 'Save Changes' : 'Edit Profile'}
                                        </button>
                                    </div>
                                </div>

                                {status ? (
                                    <div className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium ${getStatusClass()}`}>
                                        {getStatusIcon()}
                                        {status.text}
                                    </div>
                                ) : null}
                            </div>
                        </section>

                                <div className="space-y-4">
                                    <ToggleOption
                                        title="Email Notifications"
                                        description="Receive notifications via email"
                                        checked={notifications.emailNotifications}
                                        onChange={(checked) =>
                                            setNotifications((prev) => ({ ...prev, emailNotifications: checked }))
                                        }
                                    />
                                    <ToggleOption
                                        title="Order Updates"
                                        description="Get updates about your orders and shipments"
                                        checked={notifications.orderUpdates}
                                        onChange={(checked) =>
                                            setNotifications((prev) => ({ ...prev, orderUpdates: checked }))
                                        }
                                    />
                                    <ToggleOption
                                        title="Promotions & Offers"
                                        description="Receive promotional emails about deals and offers"
                                        checked={notifications.promotions}
                                        onChange={(checked) =>
                                            setNotifications((prev) => ({ ...prev, promotions: checked }))
                                        }
                                    />
                                    <ToggleOption
                                        title="Newsletter"
                                        description="Weekly digest and new book announcements"
                                        checked={notifications.newsletter}
                                        onChange={(checked) =>
                                            setNotifications((prev) => ({ ...prev, newsletter: checked }))
                                        }
                                    />
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleSaveNotifications}
                                        disabled={isSaving}
                                        className="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {isSaving ? 'Saving...' : 'Save Preferences'}
                                    </button>
                                </div>
                            </section>
                        )}

                        {/* Privacy Section */}
                        {viewMode === 'privacy' && (
                            <section className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
                                <div className="mb-6">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Security</p>
                                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-on-surface">Privacy Settings</h2>
                                    <p className="mt-2 text-sm text-on-surface-variant">
                                        Control who can see your information.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <ToggleOption
                                        title="Public Profile"
                                        description="Allow others to see your profile information"
                                        checked={privacy.showProfile}
                                        onChange={(checked) =>
                                            setPrivacy((prev) => ({ ...prev, showProfile: checked }))
                                        }
                                    />
                                    <ToggleOption
                                        title="Order History"
                                        description="Allow others to see your order history"
                                        checked={privacy.showOrders}
                                        onChange={(checked) =>
                                            setPrivacy((prev) => ({ ...prev, showOrders: checked }))
                                        }
                                    />
                                    <ToggleOption
                                        title="Analytics"
                                        description="Help us improve by sharing usage data"
                                        checked={privacy.allowAnalytics}
                                        onChange={(checked) =>
                                            setPrivacy((prev) => ({ ...prev, allowAnalytics: checked }))
                                        }
                                    />
                                </div>

                                <div className="mt-8 rounded-2xl bg-surface-container-low p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <ShieldCheck size={18} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-on-surface">Your Data is Protected</h3>
                                            <p className="mt-1 text-sm text-on-surface-variant">
                                                We take your privacy seriously. Your personal data is encrypted and
                                                never shared with third parties without your consent.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            <div id="membership" className="rounded-[28px] border border-white/70 bg-[#006b11] p-6 text-white shadow-[0_12px_40px_rgba(15,23,42,0.12)] sm:p-8">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">Membership</p>
                                <h3 className="mt-2 text-2xl font-bold tracking-tight">Your access plan</h3>
                                <p className="mt-3 max-w-md text-sm leading-6 text-white/85">
                                    Review your current plan details and account status here.
                                </p>

                                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-inset ring-white/15">
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/70">Plan</p>
                                        <p className="mt-2 text-lg font-semibold">{currentUser.role === 'ADMIN' ? 'Administrator' : 'Learner'}</p>
                                    </div>
                                    <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-inset ring-white/15">
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/70">Status</p>
                                        <p className="mt-2 text-lg font-semibold">{currentUser.enabled ? 'Active' : 'Inactive'}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    )
}

// Toggle Option Component
function ToggleOption({
                          title,
                          description,
                          checked,
                          onChange,
                      }: {
    title: string
    description: string
    checked: boolean
    onChange: (checked: boolean) => void
}) {
    return (
        <div className="flex items-center justify-between rounded-2xl border border-outline-variant/60 bg-surface-container-low p-4">
            <div className="flex-1">
                <h4 className="font-semibold text-on-surface">{title}</h4>
                <p className="text-sm text-on-surface-variant">{description}</p>
            </div>
            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={`relative ml-4 inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    checked ? 'bg-primary' : 'bg-gray-300'
                }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                        checked ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
            </button>
        </div>
    )
}

export default function AccountPage() {
    const router = useRouter()
    const { user, isReady, updateUser, logout } = useAuth()

    useEffect(() => {
        if (isReady && !user) {
            router.replace('/login')
        }
    }, [isReady, router, user])

    if (!isReady || !user) {
        return (
            <section className="min-h-[calc(100vh-64px)] w-full bg-[radial-gradient(circle_at_top,rgba(0,107,17,0.12),transparent_34%),linear-gradient(180deg,#f5fcee_0%,#edf5e4_100%)]">
                <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 rounded-2xl border border-outline-variant/70 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
                        <div className="h-4 w-4 animate-pulse rounded-full bg-primary" />
                        <p className="text-sm font-medium text-on-surface-variant">Loading account details...</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <AccountProfileForm
            key={user.email}
            currentUser={user}
            updateUser={updateUser}
            onLogout={logout}
        />
    )
}
