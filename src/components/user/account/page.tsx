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

    return ()
}

export default function AccountPage() {

}