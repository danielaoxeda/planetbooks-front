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