'use client'
import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function AuthCard() {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

    return (
        <div className="max-w-[1100px] w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-2xl border border-outline-variant overflow-hidden min-h-[600px]">

            {/* Lado Izquierdo: Diseño Visual */}
            <div className="hidden md:flex flex-col justify-between p-12 relative bg-primary-container text-white">
                <div className="absolute inset-0 opacity-30">
                    <img alt="Library" className="w-full h-full object-cover grayscale" src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000" />
                </div>
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-4">Planet Books</h1>
                    <p className="text-lg text-white/90">Especialistas en certificaciones de inglés: IELTS, TOEFL y Cambridge.</p>
                </div>
                <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary bg-white rounded-full p-0.5">check</span>
                        <span className="font-medium italic">Learning paths for every level.</span>
                    </div>
                </div>
            </div>

            {/* Lado Derecho: Formularios */}
            <div className="p-8 md:p-14 flex flex-col justify-center">
                <div className="flex gap-10 border-b border-outline-variant mb-10">
                    {['login', 'register'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`pb-4 text-xl font-bold capitalize transition-all ${activeTab === tab ? 'border-b-4 border-primary text-on-surface' : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="min-h-[350px] flex flex-col justify-center">
                    {activeTab === 'login' ? <LoginForm /> : <RegisterForm onSwitch={() => setActiveTab('login')} />}
                </div>
            </div>
        </div>
    )
}