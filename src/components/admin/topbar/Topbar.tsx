"use client";

import { useState } from "react";

import {
    ChevronDown,
    LogOut,
    User,
} from "lucide-react";

export default function Topbar() {
    const [open, setOpen] =
        useState(false);

    return (
        <header className="h-16 border-b border-[#becab7] bg-white flex items-center justify-between px-8">
            <h1 className="font-bold text-xl">
                User Management
            </h1>

            <div className="relative">
                <button
                    onClick={() =>
                        setOpen(!open)
                    }
                    className="flex items-center gap-2"
                >
                    <div className="w-10 h-10 rounded-full bg-[#006b11] text-white flex items-center justify-center font-semibold">
                        A
                    </div>

                    <ChevronDown
                        size={18}
                    />
                </button>

                {open && (
                    <div className="absolute right-0 top-14 w-52 bg-white border rounded-xl shadow-lg overflow-hidden">
                        <button className="w-full px-4 py-3 hover:bg-gray-50 flex items-center gap-3">
                            <User
                                size={18}
                            />
                            Profile
                        </button>

                        <button className="w-full px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-red-500">
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