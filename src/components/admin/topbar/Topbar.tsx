"use client";

import { useState } from "react";

import {
    ChevronDown,
    LogOut,
    User,
    Menu,
} from "lucide-react";

interface TopbarProps {
    onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
    const [open, setOpen] =
        useState(false);

    return (
        <header className="h-14 sm:h-16 border-b border-[#becab7] bg-white flex items-center justify-between px-3 sm:px-6 md:px-8">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
                    aria-label="Toggle menu"
                >
                    <Menu size={20} />
                </button>

                <h1 className="font-bold text-lg sm:text-xl">
                    User Management
                </h1>
            </div>

            <div className="relative">
                <button
                    onClick={() =>
                        setOpen(!open)
                    }
                    className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded-lg transition"
                >
                    <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#006b11] text-white flex items-center justify-center font-semibold text-sm sm:text-base">
                        A
                    </div>

                    <ChevronDown
                        size={18}
                        className="hidden sm:block"
                    />
                </button>

                {open && (
                    <div className="absolute right-0 top-12 w-48 sm:w-52 bg-white border border-[#becab7] rounded-xl shadow-lg overflow-hidden z-40">
                        <button className="w-full px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-sm transition">
                            <User
                                size={18}
                            />
                            Profile
                        </button>

                        <button className="w-full px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-red-500 text-sm transition">
                            <LogOut
                                size={18}
                            />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}