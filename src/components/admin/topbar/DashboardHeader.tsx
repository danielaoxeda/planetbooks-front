"use client";

import {Bell, CircleHelp, Search,} from "lucide-react";

export default function AdminHeader() {
    return (
        <header
            className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
            <h2 className="text-xl font-bold">
                Dashboard Overview
            </h2>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-2">
                    <Search size={18} className="text-gray-500"/>

                    <input
                        type="text"
                        placeholder="Search analytics..."
                        className="bg-transparent outline-none text-sm ml-2"
                    />
                </div>

                <button>
                    <Bell size={20}/>
                </button>

                <button>
                    <CircleHelp size={20}/>
                </button>
            </div>
        </header>
    );
}