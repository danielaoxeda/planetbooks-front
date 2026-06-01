"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LayoutDashboard,
    Users,
    BookOpen,
    Settings,
    X,
} from "lucide-react";

interface SidebarProps {
    open?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ open = true, onClose }: SidebarProps) {
    const pathname = usePathname();

    const links = [
        {
            name: "Dashboard",
            href: "/admin/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Users",
            href: "/admin/user",
            icon: Users,
        },
        {
            name: "Books",
            href: "/admin/books",
            icon: BookOpen,
        },
        {
            name: "Settings",
            href: "/admin/settings",
            icon: Settings,
        },
    ];

    // Desktop: siempre visible. Mobile: condicional
    return (
        <>
            {/* Mobile Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed md:static left-0 top-0 w-64 h-screen flex flex-col border-r border-[#becab7] bg-white z-40 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="h-14 sm:h-16 px-4 sm:px-8 flex items-center border-b border-[#becab7] justify-between">
                    <h2 className="font-bold text-sm sm:text-xl text-[#006b11]">
                        Planet Books
                    </h2>
                    <button
                        onClick={onClose}
                        className="md:hidden p-1 hover:bg-gray-100 rounded-lg transition"
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 p-3 sm:p-4 space-y-2">
                    {links.map((link) => {
                        const Icon = link.icon;

                        const active =
                            pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={onClose}
                                className={`flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl transition text-sm sm:text-base ${active ? "bg-[#b9edad] text-[#3f6d3a]" : "hover:bg-[#eff6e8] text-[#171d15]"}`}
                            >
                                <Icon size={20} />

                                <span className="font-medium">
                                    {link.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-3 sm:p-4 border-t border-[#becab7]">
                    <div className="bg-[#eff6e8] rounded-lg sm:rounded-xl p-3 flex items-center gap-3">
                        <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#006b11] text-white flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0">
                            A
                        </div>

                        <div className="min-w-0">
                            <p className="font-semibold text-xs sm:text-sm">
                                Admin
                            </p>

                            <p className="text-xs text-gray-500 truncate">
                                Planet Books
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}