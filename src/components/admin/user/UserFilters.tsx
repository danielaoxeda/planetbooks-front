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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="relative w-full md:w-80">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                    value={search}
                    onChange={(e) =>
                        onSearchChange(
                            e.target.value
                        )
                    }
                    placeholder="Search users..."
                    className="
                        w-full
                        pl-10
                        pr-4
                        py-3
                        rounded-full
                        bg-white
                        border
                        border-[#becab7]
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[#006b11]
                    "
                />
            </div>

            <button
                onClick={onCreateUser}
                className="
                    flex items-center gap-2
                    bg-[#006b11]
                    text-white
                    px-6 py-3
                    rounded-full
                    font-medium
                    hover:bg-[#008818]
                    transition
                "
            >
                <Plus size={18} />

                Create User
            </button>
        </div>
    );
}