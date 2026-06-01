"use client";

import { Search, Plus } from "lucide-react";

interface UserFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    onCreateUser: () => void;
}

export default function UserFilters({
                                        search,
                                        onSearchChange,
                                        onCreateUser,
                                    }: UserFiltersProps) {
    return (
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 sm:flex-row sm:items-center sm:justify-between w-full">
            <div className="relative w-full sm:flex-1 sm:max-w-xs">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 flex-shrink-0"
                />

                <input
                    value={search}
                    onChange={(e) =>
                        onSearchChange(
                            e.target.value
                        )
                    }
                    placeholder="Search users..."
                    className="w-full pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-full bg-white border border-[#becab7] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#006b11] focus:ring-offset-1"
                />
            </div>

            <button
                onClick={onCreateUser}
                className="flex items-center justify-center gap-2 bg-[#006b11] text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-full font-medium text-xs sm:text-sm md:text-base hover:bg-[#008818] transition w-full sm:w-auto flex-shrink-0"
            >
                <Plus size={18} className="flex-shrink-0" />

                <span className="whitespace-nowrap">Create User</span>
            </button>
        </div>
    );
}