'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import {
    CheckCircle,
    XCircle,
    AlertCircle,
    Info,
    X,
} from 'lucide-react'

// Toast types
export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
    id: string
    type: ToastType
    message: string
    duration?: number
}

interface ToastContextType {
    toasts: Toast[]
    addToast: (toast: Omit<Toast, 'id'>) => void
    removeToast: (id: string) => void
    success: (message: string, duration?: number) => void
    error: (message: string, duration?: number) => void
    warning: (message: string, duration?: number) => void
    info: (message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

// Default duration in ms
const DEFAULT_DURATION = 5000

// Generate unique ID
function generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Icon mapping
const iconMap: Record<ToastType, ReactNode> = {
    success: <CheckCircle size={20} className="text-green-600" />,
    error: <XCircle size={20} className="text-red-600" />,
    warning: <AlertCircle size={20} className="text-yellow-600" />,
    info: <Info size={20} className="text-blue-600" />,
}

// Background color mapping
const bgMap: Record<ToastType, string> = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200',
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
        const id = generateId()
        const duration = toast.duration ?? DEFAULT_DURATION

        setToasts((prev) => [...prev, { ...toast, id }])

        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id))
            }, duration)
        }
    }, [])

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    const success = useCallback(
        (message: string, duration?: number) => addToast({ type: 'success', message, duration }),
        [addToast]
    )

    const error = useCallback(
        (message: string, duration?: number) => addToast({ type: 'error', message, duration }),
        [addToast]
    )

    const warning = useCallback(
        (message: string, duration?: number) => addToast({ type: 'warning', message, duration }),
        [addToast]
    )

    const info = useCallback(
        (message: string, duration?: number) => addToast({ type: 'info', message, duration }),
        [addToast]
    )

    return (
        <ToastContext.Provider
            value={{
                toasts,
                addToast,
                removeToast,
                success,
                error,
                warning,
                info,
            }}
        >
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    )
}
