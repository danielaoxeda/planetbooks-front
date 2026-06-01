"use client";

import { Pencil, Trash2 } from "lucide-react";
import { User } from "@/types/user";

interface UserRowProps {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

export default function UserRow({
                                    user,
                                    onEdit,
                                    onDelete,
                                }: UserRowProps) {
    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("");

    return (
        <tr className="hover:bg-[#f5fcee] transition">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div
                        className="
                            w-10 h-10
                            rounded-full
                            bg-[#bcf0b0]
                            flex
                            items-center
                            justify-center
                            font-semibold
                        "
                    >
                        {initials}
                    </div>

                    <span className="font-medium">
                        {user.name}
                    </span>
                </div>
            </td>

            <td className="px-6 py-4">
                {user.email}
            </td>

            <td className="px-6 py-4">
                <span
                    className={`
                        px-3 py-1 rounded-full text-xs font-semibold
                        ${
                        user.role ===
                        "ADMIN"
                            ? "bg-pink-100 text-pink-700"
                            : "bg-gray-100 text-gray-600"
                    }
                    `}
                >
                    {user.role}
                </span>
            </td>

            <td className="px-6 py-4">
                <span
                    className={`
                        px-3 py-1 rounded-full text-xs font-semibold
                        ${
                        user.enabled
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }
                    `}
                >
                    {user.enabled
                        ? "Active"
                        : "Inactive"}
                </span>
            </td>

            <td className="px-6 py-4">
                {user.createdAt
                    ? new Date(
                        user.createdAt
                    ).toLocaleDateString()
                    : "-"}
            </td>

            <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() =>
                            onEdit(user)
                        }
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <Pencil size={18} />
                    </button>

                    <button
                        onClick={() =>
                            onDelete(user)
                        }
                        className="p-2 hover:bg-red-100 rounded-lg text-red-500"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </td>
        </tr>
    );
}