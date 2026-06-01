"use client";

import { Pencil, Trash2 } from "lucide-react";
import { User } from "@/types/user";

interface UserRowProps {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
    isMobile?: boolean;
}

export default function UserRow({
                                    user,
                                    onEdit,
                                    onDelete,
                                    isMobile = false,
                                }: UserRowProps) {
    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("");

    // Mobile Card View
    if (isMobile) {
        return (
            <div className="bg-white border border-[#becab7] rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm w-full">
                <div className="flex items-start justify-between gap-2 mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#bcf0b0] flex items-center justify-center font-semibold text-xs sm:text-sm flex-shrink-0">
                            {initials}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="font-medium text-xs sm:text-sm truncate">
                                {user.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-1 flex-shrink-0">
                        <button
                            onClick={() =>
                                onEdit(user)
                            }
                            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition"
                            title="Edit"
                        >
                            <Pencil size={16} />
                        </button>

                        <button
                            onClick={() =>
                                onDelete(user)
                            }
                            className="p-1.5 sm:p-2 hover:bg-red-100 rounded-lg text-red-500 transition"
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-gray-600 shrink-0">Role</span>
                        <span className={`px-2 py-1 rounded-full font-semibold text-xs whitespace-nowrap ${user.role === "ADMIN" ? "bg-pink-100 text-pink-700" : "bg-gray-100 text-gray-600"}`}>
                            {user.role}
                        </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <span className="text-gray-600 shrink-0">Status</span>
                        <span className={`px-2 py-1 rounded-full font-semibold text-xs whitespace-nowrap ${user.enabled ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {user.enabled ? "Active" : "Inactive"}
                        </span>
                    </div>

                    {user.createdAt && (
                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-200">
                            <span className="text-gray-600 shrink-0">Created</span>
                            <span className="text-gray-700 text-xs">
                                {new Date(
                                    user.createdAt
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Desktop Table Row
    return (
        <tr className="hover:bg-[#f5fcee] transition border-b border-[#becab7] last:border-b-0">
            <td className="px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#bcf0b0] flex items-center justify-center font-semibold text-xs sm:text-sm flex-shrink-0">
                        {initials}
                    </div>

                    <span className="font-medium text-sm truncate">
                        {user.name}
                    </span>
                </div>
            </td>

            <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm truncate">
                {user.email}
            </td>

            <td className="px-4 sm:px-6 py-3 sm:py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap inline-block ${user.role === "ADMIN" ? "bg-pink-100 text-pink-700" : "bg-gray-100 text-gray-600"}`}>
                    {user.role}
                </span>
            </td>

            <td className="px-4 sm:px-6 py-3 sm:py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap inline-block ${user.enabled ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {user.enabled ? "Active" : "Inactive"}
                </span>
            </td>

            <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm">
                {user.createdAt
                    ? new Date(
                        user.createdAt
                    ).toLocaleDateString()
                    : "-"}
            </td>

            <td className="px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex justify-end gap-1 sm:gap-2">
                    <button
                        onClick={() =>
                            onEdit(user)
                        }
                        className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition"
                        title="Edit"
                    >
                        <Pencil size={16} />
                    </button>

                    <button
                        onClick={() =>
                            onDelete(user)
                        }
                        className="p-1.5 sm:p-2 hover:bg-red-100 rounded-lg text-red-500 transition"
                        title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
}