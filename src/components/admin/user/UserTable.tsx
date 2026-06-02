"use client";

import { ArrowUpDown } from "lucide-react";

import { User } from "@/types/user";
import UserRow from "./UserRow";

interface UserTableProps {
    users: User[];

    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

export default function UserTable({
                                      users,
                                      onEdit,
                                      onDelete,
                                  }: UserTableProps) {
    return (
        <>
            {/* Mobile View - Cards */}
            <div className="md:hidden space-y-3 w-full max-w-full">
                {users.length > 0 ? (
                    users.map((user) => (
                        <UserRow
                            key={user.id}
                            user={user}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            isMobile={true}
                        />
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No users found
                    </div>
                )}
            </div>

            {/* Desktop View - Table */}
            <div className="hidden md:block bg-white border border-[#becab7] rounded-2xl overflow-hidden shadow-sm w-full max-w-full">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="bg-[#eff6e8]">
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-sm">
                                <button className="flex items-center gap-2 whitespace-nowrap">
                                    Name
                                    <ArrowUpDown
                                        size={
                                            14
                                        }
                                    />
                                </button>
                            </th>

                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-sm">
                                Email
                            </th>

                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-sm">
                                Role
                            </th>

                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-sm">
                                Status
                            </th>

                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-sm">
                                Created
                            </th>

                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-sm">
                                Actions
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        {users.length > 0 ? (
                            users.map(
                                (user) => (
                                    <UserRow
                                        key={
                                            user.id
                                        }
                                        user={
                                            user
                                        }
                                        onEdit={
                                            onEdit
                                        }
                                        onDelete={
                                            onDelete
                                        }
                                        isMobile={false}
                                    />
                                )
                            )
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}