'use client'
import { createContext, useContext, useState, useEffect } from 'react'

interface User {
    name: string
    email: string
    role: 'ADMIN' | 'USER'
}

interface AuthContextType {
    user: User | null
    login: (userData: User) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const savedUser = localStorage.getItem('pb_session')
        Promise.resolve().then(() => {
            if (savedUser) setUser(JSON.parse(savedUser))
        })
    }, [])

    const login = (userData: User) => {
        setUser(userData)
        localStorage.setItem('pb_session', JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('pb_session')
        window.location.href = '/login'
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}