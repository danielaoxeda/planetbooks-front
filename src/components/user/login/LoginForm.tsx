'use client'
import { useState } from 'react'
import { authService } from '@/services/authService'
import { useAuth } from '@/context/AuthContext'

export default function LoginForm() {
    const { login } = useAuth()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        setLoading(true)

        const formData = new FormData(e.currentTarget)

        const credentials = {

            email: String(formData.get("email")),
            password: String(formData.get("password"))

        }

        try {

            const response = await authService.login(credentials)

            login(response.user, response.token)

            if (response.user.role === "ADMIN") {

                window.location.href = "/admin"

            } else {

                window.location.href = "/account"

            }

        } catch (err: unknown) {

            const message = err instanceof Error ? err.message : String(err)
            alert(message)

        } finally {

            setLoading(false)

        }

    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 animate-in fade-in duration-500">
            <div className="space-y-1">
                <h2 className="text-3xl font-bold text-on-surface">Welcome back.</h2>
                <p className="text-on-surface-variant">Access your specialized library.</p>
            </div>
            <div className="flex flex-col gap-5">
                <input name="email" type="email" required placeholder="Email Address"
                       className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 py-3 transition-all" />
                <input name="password" type="password" required placeholder="Password"
                       className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 py-3 transition-all" />
            </div>
            <button disabled={loading} className="w-full bg-primary text-on-primary font-bold py-4 rounded-lg mt-4 hover:brightness-110 disabled:opacity-50 transition-all">
                {loading ? 'Authenticating...' : 'Sign In'}
            </button>
        </form>
    )
}