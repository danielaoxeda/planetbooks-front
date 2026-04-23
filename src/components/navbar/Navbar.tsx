'use client'

import Link from "next/link"
import {useState} from "react"
import {usePathname} from "next/navigation"

interface NavItem {
    name: string
    href: string
}

const navItems: NavItem[] = [
    {name: "Home", href: "/"},
    {name: "About Us", href: "/about"},
    {name: "Catalog", href: "/catalog"},
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
    const activeItem = navItems.find((item) => isActivePath(pathname, item.href))

    return (
        <header key={pathname}
                className="sticky top-0 z-50 border-b border-outline-variant/80 bg-surface/95 backdrop-blur supports-backdrop-filter:bg-surface/80">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    className="text-lg font-semibold tracking-tight text-on-surface transition-colors flex items-center gap-2"
                    aria-label="Planet Books home"
                >
                    <img src="/logo.png" alt="Planet Books logo" className="h-10 w-auto"/>
                    <div>
                        Planet
                        <span className="text-primary">Books</span>
                    </div>
                </Link>

                <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
                    {navItems.map((item) => {
                        const active = isActivePath(pathname, item.href)

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? "page" : undefined}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                    active
                                        ? "bg-primary text-on-primary"
                                        : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                                }`}
                            >
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    <button
                        type="button"
                        className="rounded-full px-4 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-all hover:bg-primary-container hover:text-on-primary-container active:scale-[0.98]"
                    >
                        Register
                    </button>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center rounded-full border border-outline-variant p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low md:hidden"
                    aria-expanded={mobileMenuOpen}
                    aria-controls="mobile-navigation"
                    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    onClick={() => setMobileMenuOpen((value) => !value)}
                >
                    <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
                    <span className="flex flex-col gap-1.5">
                        <span className="block h-0.5 w-5 rounded bg-current"/>
                        <span className="block h-0.5 w-5 rounded bg-current"/>
                        <span className="block h-0.5 w-5 rounded bg-current"/>
                    </span>
                </button>
            </div>

            {mobileMenuOpen ? (
                <div
                    id="mobile-navigation"
                    className="border-t border-outline-variant bg-surface-container-lowest px-4 py-4 shadow-sm md:hidden"
                >
                    <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
                        {navItems.map((item) => {
                            const active = isActivePath(pathname, item.href)

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={active ? "page" : undefined}
                                    className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                                        active
                                            ? "bg-primary text-on-primary"
                                            : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            )
                        })}

                        <div className="mt-2 grid grid-cols-2 gap-3 pt-2">
                            <button
                                type="button"
                                className="rounded-xl border border-outline-variant px-4 py-3 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-container hover:text-on-primary-container"
                            >
                                Register
                            </button>
                        </div>

                        {activeItem ? (
                            <p className="pt-2 text-xs font-medium uppercase tracking-wide text-on-surface-variant">
                                Sección actual: {activeItem.name}
                            </p>
                        ) : null}
                    </nav>
                </div>
            ) : null}
        </header>
    )
}