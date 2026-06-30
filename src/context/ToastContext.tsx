'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import {
    CheckCircle,
    XCircle,
    AlertCircle,
    Info,
    X,
} from 'lucide-react'

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

const DEFAULT_DURATION = 5000

function generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

const iconMap: Record<ToastType, ReactNode> = {
    success: <CheckCircle size={20} className="text-green-600" />,
    error: <XCircle size={20} className="text-red-600" />,
    warning: <AlertCircle size={20} className="text-yellow-600" />,
    info: <Info size={20} className="text-blue-600" />,
}

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

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}

function ToastContainer({
    toasts,
    removeToast,
}: {
    toasts: Toast[]
    removeToast: (id: string) => void
}) {
    if (toasts.length === 0) return null

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
            ))}
        </div>
    )
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
    return (
        <div
            className={`
                flex items-start gap-3 p-4 rounded-2xl border shadow-lg backdrop-blur-sm
                animate-in slide-in-from-right-full fade-in duration-300
                ${bgMap[toast.type]}
            `}
            role="alert"
        >
            <div className="flex-shrink-0 mt-0.5">{iconMap[toast.type]}</div>
            <p className="flex-1 text-sm font-medium text-gray-900">{toast.message}</p>
            <button
                onClick={onRemove}
                className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
                aria-label="Dismiss"
            >
                <X size={16} className="text-gray-500" />
            </button>
        </div>
    )
}
