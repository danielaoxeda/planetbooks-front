'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface User {
    id: number
    name: string
    email: string
    role: 'ADMIN' | 'USER'
    enabled: boolean
}

interface AuthContextType {
    user: User | null
    token: string | null
    isReady: boolean

    login: (userData: User, token: string) => void
    updateUser: (userData: User) => void
    logout: () => void
}

interface Session {
    user: User
    token: string
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isReady, setIsReady] = useState(false)

    // Load session from localStorage only on client side
    useEffect(() => {
        try {
            const savedSession = localStorage.getItem("pb_session")
            if (savedSession) {
                const session = JSON.parse(savedSession) as Session
                setUser(session.user)
                setToken(session.token)
            }
        } catch (error) {
            console.error("Failed to load session from localStorage:", error)
        } finally {
            setIsReady(true)
        }
    }, [])

    const login = (userData: User, jwt: string) => {

        setUser(userData)
        setToken(jwt)

        localStorage.setItem(
            "pb_session",
            JSON.stringify({
                user: userData,
                token: jwt
            })
        )
    }

    const updateUser = (userData: User) => {

        setUser(userData)

        if (token) {

            localStorage.setItem(
                "pb_session",
                JSON.stringify({
                    user: userData,
                    token
                })
            )

        }

    }

    const logout = () => {

        setUser(null)
        setToken(null)

        localStorage.removeItem("pb_session")

        window.location.href = "/login"

    }

    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                isReady,
                login,
                updateUser,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    )

}

export const useAuth = () => {

    const context = useContext(AuthContext)

    if (!context)
        throw new Error("useAuth must be used within AuthProvider")

    return context

}