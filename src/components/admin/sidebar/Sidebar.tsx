"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LayoutDashboard,
    Users,
    BookOpen,
    Settings,
} from "lucide-react";

export default function Sidebar() {
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

    return (
        <aside className="hidden md:flex flex-col w-64 border-r border-[#becab7] bg-white">
            <div className="h-16 px-8 flex items-center border-b border-[#becab7]">
                <h2 className="font-bold text-xl text-[#006b11]">
                    Planet Books
                </h2>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;

                    const active =
                        pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`
                                flex items-center gap-3
                                px-4 py-3
                                rounded-xl
                                transition
                                ${
                                active
                                    ? "bg-[#b9edad] text-[#3f6d3a]"
                                    : "hover:bg-[#eff6e8]"
                            }
                            `}
                        >
                            <Icon size={20} />

                            <span className="font-medium">
                                {link.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-[#becab7]">
                <div className="bg-[#eff6e8] rounded-xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#006b11] text-white flex items-center justify-center font-bold">
                        A
                    </div>

                    <div>
                        <p className="font-semibold text-sm">
                            Admin
                        </p>

                        <p className="text-xs text-gray-500">
                            Planet Books
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}