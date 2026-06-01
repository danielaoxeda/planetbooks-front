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
        <div
            className="
                bg-white
                border
                border-[#becab7]
                rounded-2xl
                overflow-hidden
                shadow-sm
            "
        >
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="bg-[#eff6e8]">
                        <th className="px-6 py-4 text-left">
                            <button className="flex items-center gap-2">
                                Name
                                <ArrowUpDown
                                    size={
                                        14
                                    }
                                />
                            </button>
                        </th>

                        <th className="px-6 py-4 text-left">
                            Email
                        </th>

                        <th className="px-6 py-4 text-left">
                            Role
                        </th>

                        <th className="px-6 py-4 text-left">
                            Status
                        </th>

                        <th className="px-6 py-4 text-left">
                            Created
                        </th>

                        <th className="px-6 py-4 text-right">
                            Actions
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map(
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
                            />
                        )
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}