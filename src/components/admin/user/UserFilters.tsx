"use client";

import { Search } from "lucide-react";

interface UserFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
}

export default function UserFilters({
                                        search,
                                        onSearchChange,
                                    }: UserFiltersProps) {
    return (
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 w-full">
            <div className="relative w-full sm:max-w-xs">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 flex-shrink-0"
                />

                <input
                    value={search}
                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }
                    placeholder="Search users..."
                    className="w-full pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-full bg-white border border-[#becab7] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#006b11] focus:ring-offset-1"
                />
            </div>
        </div>
    );
}