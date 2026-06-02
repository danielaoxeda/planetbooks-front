'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    BadgeCheck,
    BookOpen,
    LogOut,
    ShieldCheck,
    Sparkles,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { authService } from '@/services/authService'

type AccountUser = {
    name: string
    email: string
    role: 'ADMIN' | 'USER'
}

type ViewMode = 'profile' | 'password'

function AccountProfileForm({
                                currentUser,
                                updateUser,
                                onLogout,
                            }: {
    currentUser: AccountUser
    updateUser: (userData: AccountUser) => void
    onLogout: () => void
}) {
    const [viewMode, setViewMode] = useState<ViewMode>('profile')
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(() => currentUser.name || currentUser.email.split('@')[0])
    const [email, setEmail] = useState(() => currentUser.email)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [statusMessage, setStatusMessage] = useState<string | null>(null)
    const [isSaving, setIsSaving] = useState(false)

    const displayName = name.trim() || currentUser.name || currentUser.email.split('@')[0]
    const initials = displayName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('') || displayName.slice(0, 2).toUpperCase()
    const roleLabel = currentUser.role === 'ADMIN' ? 'Administrator access' : 'Learner access'

    const resetProfileFields = () => {
        setName(currentUser.name || currentUser.email.split('@')[0])
        setEmail(currentUser.email)
        setIsEditing(false)
    }

    const resetPasswordFields = () => {
        setNewPassword('')
        setConfirmPassword('')
    }

    const handleCancel = () => {
        if (viewMode === 'password') {
            setViewMode('profile')
            resetPasswordFields()
            resetProfileFields()
            setStatusMessage(null)
            return
        }

        resetProfileFields()
        setStatusMessage('Changes discarded.')
    }

    const handleTogglePassword = () => {
        setViewMode('password')
        setIsEditing(false)
        resetProfileFields()
        resetPasswordFields()
        setStatusMessage('Password form enabled.')
    }

    const handleSave = async () => {
        setIsSaving(true)

        try {
            if (viewMode === 'password') {
                if (!newPassword.trim() || !confirmPassword.trim()) {
                    setStatusMessage('Please complete all password fields.')
                    return
                }

                if (newPassword !== confirmPassword) {
                    setStatusMessage('The new passwords do not match.')
                    return
                }

                const updatedUser = await authService.changePassword(currentUser.email, {
                    newPassword: newPassword.trim(),
                })

                updateUser(updatedUser)
                setStatusMessage('Password updated successfully.')
                setViewMode('profile')
                setIsEditing(false)
                resetPasswordFields()
                return
            }

            if (!isEditing) {
                setIsEditing(true)
                setStatusMessage('Fields unlocked for editing.')
                return
            }

            const updatedUser = await authService.updateProfile(currentUser.email, {
                name: name.trim() || currentUser.name,
                email: email.trim(),
            })

            updateUser(updatedUser)
            setStatusMessage('Profile updated successfully.')
            setIsEditing(false)
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unable to update profile.'
            setStatusMessage(message)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <section className="relative w-full overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(0,107,17,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(0,136,24,0.12),transparent_28%),linear-gradient(180deg,#f5fcee_0%,#edf5e4_55%,#f8fafc_100%)]">
            <div className="absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(0,107,17,0.14),transparent)]" />

            <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
                <div className="overflow-hidden rounded-[28px] border border-white/60 bg-[#006b11] shadow-[0_20px_80px_rgba(0,107,17,0.22)]">
                    <div className="grid min-h-60 gap-8 p-6 text-white md:grid-cols-[auto_1fr] md:items-end md:p-8 lg:p-10">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/25 bg-white/10 text-3xl font-bold tracking-tight text-white shadow-2xl backdrop-blur">
                                    {initials}
                                </div>
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
                    <aside className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6 lg:sticky lg:top-24">
                        <div className="rounded-2xl bg-surface-container-low px-4 py-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Session</p>
                            <p className="mt-1 text-sm text-on-surface-variant">Manage your access from here.</p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setViewMode('profile')}
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
                            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-error/20 bg-error/5 px-4 py-3 text-sm font-semibold text-error transition-colors hover:bg-error/10"
                        >
                            <LogOut size={16} />
                            Sign out
                        </button>
                    </aside>

                    <div className="grid gap-6">
                        <section
                            id="personal-info"
                            className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                                        {viewMode === 'password' ? 'Password' : 'Personal Info'}
                                    </p>
                                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-on-surface">
                                        {viewMode === 'password' ? 'Change your password' : 'Edit your profile'}
                                    </h2>
                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant">
                                        {viewMode === 'password'
                                            ? 'Enter the new password twice to confirm the change.'
                                            : 'Update the basic information associated with your account.'}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">
                                    Account status: <span className="font-semibold text-primary">Active</span>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4">
                                {viewMode === 'password' ? (
                                    <>
                                        <label className="grid gap-2">
                                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-on-surface-variant">New password</span>
                                            <input
                                                type="password"
                                                value={newPassword}
                                                onChange={(event) => setNewPassword(event.target.value)}
                                                className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary"
                                            />
                                        </label>

                                        <label className="grid gap-2">
                                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-on-surface-variant">Confirm new password</span>
                                            <input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(event) => setConfirmPassword(event.target.value)}
                                                className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary"
                                            />
                                        </label>
                                    </>
                                ) : (
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <label className="grid gap-2">
                                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-on-surface-variant">Name</span>
                                            <input
                                                type="text"
                                                value={name}
                                                disabled={!isEditing}
                                                onChange={(event) => setName(event.target.value)}
                                                className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary disabled:cursor-not-allowed disabled:bg-surface-container-low disabled:text-on-surface-variant"
                                            />
                                        </label>

                                        <label className="grid gap-2">
                                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-on-surface-variant">Email</span>
                                            <input
                                                type="email"
                                                value={email}
                                                disabled={!isEditing}
                                                onChange={(event) => setEmail(event.target.value)}
                                                className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary disabled:cursor-not-allowed disabled:bg-surface-container-low disabled:text-on-surface-variant"
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
                                            {viewMode === 'password' ? 'Update Password' : isEditing ? 'Update Profile' : 'Edit Profile'}
                                        </button>
                                    </div>
                                </div>

                                {statusMessage ? (
                                    <p className="text-sm font-medium text-on-surface-variant">{statusMessage}</p>
                                ) : null}
                            </div>
                        </section>

                        <section id="security" className="grid gap-6 lg:grid-cols-2">
                            <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <ShieldCheck size={18} />
                                    </span>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Account Security</p>
                                        <h3 className="text-xl font-bold text-on-surface">Secure account</h3>
                                    </div>
                                </div>

                                <div className="mt-5 rounded-2xl bg-surface-container-low p-5">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                                            <BadgeCheck size={18} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-on-surface">Account settings</p>
                                            <p className="mt-1 text-sm leading-6 text-on-surface-variant">
                                                Review and update your personal details whenever needed.
                                            </p>
                                        </div>
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
                                        <p className="mt-2 text-lg font-semibold">Premium Learner</p>
                                    </div>
                                    <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-inset ring-white/15">
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/70">Status</p>
                                        <p className="mt-2 text-lg font-semibold">Active</p>
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