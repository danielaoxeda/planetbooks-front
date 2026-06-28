'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/context/CartContext"

interface NavItem {
    name: string
    href: string
}

const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Catalog", href: "/catalog" },
]

function isActivePath(pathname: string, href: string) {
    if (href === "/") {
        return pathname === "/"
    }
    return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Navbar() {
    const pathname = usePathname() ?? "/"
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { user, isReady } = useAuth()
    const { cartCount } = useCart()
    const mounted = typeof window !== 'undefined'

    // Don't render until client is hydrated and auth is ready
    if (!mounted || !isReady) {
        return (
            <header className="sticky top-0 z-50 border-b border-outline-variant/80 bg-surface/95 backdrop-blur supports-backdrop-filter:bg-surface/80">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/"
                        className="text-lg font-semibold tracking-tight text-on-surface transition-colors flex items-center gap-2"
                        aria-label="Planet Books home"
                    >
                        <Image src="/logo.png" alt="Planet Books logo" width={40} height={40} className="h-10" style={{width: "auto"}} />
                        <div>
                            Planet
                            <span className="text-primary">Books</span>
                        </div>
                    </Link>
                    <div />
                </div>
            </header>
        )
    }

    return (
        <header key={pathname}
                className="sticky top-0 z-50 border-b border-outline-variant/80 bg-surface/95 backdrop-blur supports-backdrop-filter:bg-surface/80">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* LOGO */}
                <Link
                    href="/public"
                    className="text-lg font-semibold tracking-tight text-on-surface transition-colors flex items-center gap-2"
                    aria-label="Planet Books home"
                >
                    <Image src="/logo.png" alt="Planet Books logo" width={40} height={40} className="h-10" style={{width: "auto"}} />
                    <div>
                        Planet
                        <span className="text-primary">Books</span>
                    </div>
                </Link>

                {/* NAVEGACIÓN DESKTOP */}
                <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
                    {navItems.map((item) => {
                        const active = isActivePath(pathname, item.href)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? "page" : undefined}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${active
                                    ? "bg-primary text-on-primary"
                                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                                }`}
                            >
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                {/* ÁREA DE USUARIO (Desktop) */}
                <div className="hidden items-center gap-3 md:flex">
                    <Link
                        href="/cart"
                        className="relative inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container-low px-4 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
                        aria-label={`Open cart with ${cartCount} items`}
                    >
                        <ShoppingCart size={16} />
                        <span>Cart</span>
                        {cartCount > 0 ? (
                            <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[11px] font-bold leading-none text-on-primary">
                                {cartCount}
                            </span>
                        ) : null}
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-4 bg-surface-container-low pl-4 pr-1 py-1 rounded-full border border-outline-variant">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-bold uppercase text-primary leading-none">Welcome</span>
                                <span className="text-sm font-semibold text-on-surface">
                                    {user.name || user.email.split('@')[0]}
                                </span>
                            </div>
                            <Link
                                href="/account"
                                aria-current={isActivePath(pathname, "/account") ? "page" : undefined}
                                className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${isActivePath(pathname, "/account")
                                    ? "bg-primary text-on-primary"
                                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
                                }`}
                            >
                                Profile
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/login"
                                className="rounded-full px-4 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
                            >
                                Login
                            </Link>
                            <Link
                                href="/login"
                                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-all hover:bg-primary-container active:scale-[0.98]"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                {/* BOTÓN MÓVIL */}
                <button
                    type="button"
                    className="inline-flex items-center rounded-full border border-outline-variant p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low md:hidden"
                    onClick={() => setMobileMenuOpen((value) => !value)}
                >
                    <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
                    <span className="flex flex-col gap-1.5">
                        <span className={`block h-0.5 w-5 rounded bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block h-0.5 w-5 rounded bg-current ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block h-0.5 w-5 rounded bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </span>
                </button>
            </div>

            {/* MENÚ MÓVIL */}
            {mobileMenuOpen ? (
                <div id="mobile-navigation" className="border-t border-outline-variant bg-surface-container-lowest px-4 py-4 shadow-sm md:hidden animate-in slide-in-from-top duration-300">
                    <nav className="flex flex-col gap-2">
                        {user && (
                            <div className="px-4 py-2 mb-2 border-b border-outline-variant">
                                <p className="text-[10px] font-bold uppercase text-primary">Signed in as</p>
                                <p className="font-bold text-on-surface">{user.name}</p>
                            </div>
                        )}

                        {user ? (
                            <Link
                                href="/account"
                                onClick={() => setMobileMenuOpen(false)}
                                aria-current={isActivePath(pathname, "/account") ? "page" : undefined}
                                className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActivePath(pathname, "/account")
                                    ? "bg-primary text-on-primary"
                                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                                }`}
                            >
                                Profile
                            </Link>
                        ) : null}

                        {navItems.map((item) => {
                            const active = isActivePath(pathname, item.href)
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${active
                                        ? "bg-primary text-on-primary"
                                        : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            )
                        })}

                        <Link
                            href="/cart"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between rounded-xl border border-outline-variant bg-surface-container px-4 py-3 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
                        >
                            <span className="flex items-center gap-2">
                                <ShoppingCart size={16} />
                                Cart
                            </span>
                            {cartCount > 0 ? (
                                <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-on-primary">
                                    {cartCount}
                                </span>
                            ) : null}
                        </Link>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                            {user ? (
                                <Link
                                    href="/account"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`col-span-2 text-center rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActivePath(pathname, "/account")
                                        ? "bg-primary text-on-primary"
                                        : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                                    }`}
                                >
                                    Profile
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-center rounded-xl border border-outline-variant px-4 py-3 text-sm font-medium text-on-surface-variant"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-on-primary"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            ) : null}
        </header>
    )
}