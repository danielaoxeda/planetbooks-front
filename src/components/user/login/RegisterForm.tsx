'use client'
import { useState } from 'react'
import { authService } from '@/services/authService'

export default function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const data = {
            name: String(formData.get('name') ?? ''),
            email: String(formData.get('email') ?? ''),
            password: String(formData.get('password') ?? ''),
        }

        try {
            await authService.register(data)
            alert("Registration successful! Welcome to Planet Books.")
            onSwitch()
        } catch (err: any) {
            alert(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-in fade-in duration-500">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold text-on-surface">Join us.</h2>
                <p className="text-on-surface-variant text-sm">Create an account to manage and track your purchases.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                {/* CAMPO NOMBRE COMPLETO */}
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-primary">Full Name</label>
                    <input name="name" type="text" required placeholder="John Doe"
                           className="w-full bg-transparent border-b border-outline-variant focus:border-primary outline-none py-1 px-[10px] transition-all" />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-primary">Email</label>
                    <input name="email" type="email" required placeholder="name@example.com"
                           className="w-full bg-transparent border-b border-outline-variant focus:border-primary outline-none py-1 px-[10px] transition-all" />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-primary">Password</label>
                    <input name="password" type="password" required placeholder="••••••••"
                           className="w-full bg-transparent border-b border-outline-variant focus:border-primary outline-none py-1 px-[10px] transition-all" />
                </div>
            </div>

            <button disabled={loading} className="w-full bg-primary text-on-primary font-bold py-3 rounded-lg mt-4 hover:brightness-110 transition-all">
                {loading ? 'Creating Account...' : 'Register Now'}
            </button>
        </form>
    )
}