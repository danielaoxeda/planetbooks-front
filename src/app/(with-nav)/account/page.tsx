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


}
}
