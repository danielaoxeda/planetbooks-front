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
    Eye,
    EyeOff,
    Globe,
    Keyboard,
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
import { useFormValidation, createValidationRules } from '@/hooks/useFormValidation'
import { User as UserType } from '@/types/user'

type ViewMode = 'profile' | 'password' | 'notifications' | 'privacy'

// Profile form data type
interface ProfileFormData {
    name: string
    email: string
    phone: string
    bio: string
}

// Password form data type
interface PasswordFormData {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

// Notification preferences
interface NotificationPreferences {
    emailNotifications: boolean
    orderUpdates: boolean
    promotions: boolean
    newsletter: boolean
}

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

function AccountProfileForm({
                                currentUser,
                                updateUser,
                                onLogout,
                            }: {
    currentUser: UserType
    updateUser: (userData: UserType) => void
    onLogout: () => void
}) {
    const router = useRouter()
    const toast = useToast()
    const [viewMode, setViewMode] = useState<ViewMode>('profile')
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

    // Profile save handler
    const handleSaveProfile = async () => {
        if (!profileForm.validateAll()) {
            toast.error('Please fix the errors before saving')
            return
        }

        setIsSaving(true)
        try {
            const updatedUser = await authService.updateProfile(currentUser.id, {
                name: profileForm.values.name.trim(),
                email: profileForm.values.email.trim(),
            })
            updateUser(updatedUser)
            toast.success('Profile updated successfully!')
            profileForm.reset({
                ...profileForm.values,
                name: updatedUser.name,
                email: updatedUser.email,
            })
        } catch (error: unknown) {
            console.error('Error updating profile:', error)
            let message = 'Unable to update profile. Please try again.'
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { message?: string } } }
                if (axiosError.response?.data?.message) {
                    message = axiosError.response.data.message
                } else if (axiosError.response?.status === 401) {
                    message = 'Your session may have expired. Please log in again.'
                }
            }
            toast.error(message)
        } finally {
            setIsSaving(false)
        }
    }

    // Password save handler
    const handleSavePassword = async () => {
        if (!passwordForm.validateAll()) {
            toast.error('Please fix the errors before saving')
            return
        }

        setIsSaving(true)
        try {
            await authService.changePassword(currentUser.id, {
                currentPassword: passwordForm.values.currentPassword,
                newPassword: passwordForm.values.newPassword,
                confirmPassword: passwordForm.values.confirmPassword,
            })
            toast.success('Password changed successfully!')
            passwordForm.reset({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            })
            setViewMode('profile')
        } catch (error: unknown) {
            console.error('Error changing password:', error)
            toast.error('Unable to change password. Please check your current password.')
        } finally {
            setIsSaving(false)
        }
    }

    // Notification save handler
    const handleSaveNotifications = async () => {
        setIsSaving(true)
        // Simulate API call - in real app, call a settings API
        await new Promise((resolve) => setTimeout(resolve, 500))
        toast.success('Notification preferences saved!')
        setIsSaving(false)
    }

    // Privacy save handler
    const handleSavePrivacy = async () => {
        setIsSaving(true)
        // Simulate API call - in real app, call a settings API
        await new Promise((resolve) => setTimeout(resolve, 500))
        toast.success('Privacy settings saved!')
        setIsSaving(false)
    }

    const navItems = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'password', label: 'Password', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy', icon: ShieldCheck },
    ] as const

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

                        <nav className="mt-4 space-y-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setViewMode(item.id)}
                                    className={`w-full inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                                        viewMode === item.id
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'border border-outline-variant/70 bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                                    }`}
                                >
                                    <item.icon size={18} />
                                    {item.label}
                                </button>
                            ))}
                        </nav>

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

                                <div className="grid gap-6 md:grid-cols-2">
                                    <FormInput label="Full Name" error={profileForm.errors.name}>
                                        <input
                                            type="text"
                                            {...profileForm.getFieldProps('name')}
                                            className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary disabled:bg-surface-container-low disabled:text-on-surface-variant disabled:cursor-not-allowed"
                                        />
                                    </FormInput>

                                    <FormInput label="Email Address" error={profileForm.errors.email}>
                                        <input
                                            type="email"
                                            {...profileForm.getFieldProps('email')}
                                            className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary"
                                        />
                                    </FormInput>

                                    <FormInput label="Phone Number" hint="Optional" error={profileForm.errors.phone}>
                                        <input
                                            type="tel"
                                            {...profileForm.getFieldProps('phone')}
                                            placeholder="+1 (555) 000-0000"
                                            className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary"
                                        />
                                    </FormInput>

                                    <FormInput label="Bio" hint="Optional" error={profileForm.errors.bio}>
                                        <textarea
                                            {...profileForm.getFieldProps('bio')}
                                            placeholder="Tell us about yourself..."
                                            rows={3}
                                            className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary resize-none"
                                        />
                                    </FormInput>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleSaveProfile}
                                        disabled={isSaving}
                                        className="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </section>
                        )}

                        {/* Password Section */}
                        {viewMode === 'password' && (
                            <section className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
                                <div className="mb-6">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Security</p>
                                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-on-surface">Change Password</h2>
                                    <p className="mt-2 text-sm text-on-surface-variant">
                                        Ensure your account stays secure by using a strong password.
                                    </p>
                                </div>

                                <div className="grid gap-6 max-w-lg">
                                    <FormInput label="Current Password" error={passwordForm.errors.currentPassword}>
                                        <div className="relative">
                                            <input
                                                type={showCurrentPassword ? 'text' : 'password'}
                                                {...passwordForm.getFieldProps('currentPassword')}
                                                placeholder="Enter current password"
                                                className="w-full rounded-2xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 pr-10 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary"
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
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                                            >
                                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </FormInput>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleSavePassword}
                                        disabled={isSaving}
                                        className="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {isSaving ? 'Updating...' : 'Update Password'}
                                    </button>
                                </div>
                            </section>
                        )}

                        {/* Notifications Section */}
                        {viewMode === 'notifications' && (
                            <section className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
                                <div className="mb-6">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Preferences</p>
                                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-on-surface">Notifications</h2>
                                    <p className="mt-2 text-sm text-on-surface-variant">
                                        Choose what notifications you want to receive.
                                    </p>
                                </div>

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

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleSavePrivacy}
                                        disabled={isSaving}
                                        className="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {isSaving ? 'Saving...' : 'Save Settings'}
                                    </button>
                                </div>
                            </section>
                        )}

                        {/* Account Status Card */}
                        <section className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <BadgeCheck size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-on-surface">Account Status: Active</h3>
                                    <p className="text-sm text-on-surface-variant">
                                        Member since {currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    )
}