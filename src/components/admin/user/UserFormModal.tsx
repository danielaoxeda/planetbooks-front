"use client";

import { X } from "lucide-react";
import { User } from "@/types/user";

interface UserFormModalProps {
    open: boolean;
    user?: User | null;

    formData: {
        name: string;
        email: string;
        role: "ADMIN" | "USER";
        enabled: boolean;
    };

    onClose: () => void;

    onChange: (
        field: string,
        value: string | boolean
    ) => void;

    onSubmit: () => void;
}

export default function UserFormModal({
                                          open,
                                          user,
                                          formData,
                                          onClose,
                                          onChange,
                                          onSubmit,
                                      }: UserFormModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-bold">
                        {user
                            ? "Edit User"
                            : "Create User"}
                    </h2>

                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Name
                        </label>

                        <input
                            value={formData.name}
                            onChange={(e) =>
                                onChange(
                                    "name",
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-xl p-3"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Email
                        </label>

                        <input
                            value={formData.email}
                            onChange={(e) =>
                                onChange(
                                    "email",
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-xl p-3"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Role
                        </label>

                        <select
                            value={formData.role}
                            onChange={(e) =>
                                onChange(
                                    "role",
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-xl p-3"
                        >
                            <option value="USER">
                                USER
                            </option>

                            <option value="ADMIN">
                                ADMIN
                            </option>
                        </select>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={
                                formData.enabled
                            }
                            onChange={(e) =>
                                onChange(
                                    "enabled",
                                    e.target.checked
                                )
                            }
                        />

                        <span>
                            Active User
                        </span>
                    </div>
                </div>

                <div className="p-6 border-t flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 border rounded-xl"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onSubmit}
                        className="px-5 py-2 bg-[#006b11] text-white rounded-xl"
                    >
                        {user
                            ? "Save Changes"
                            : "Create User"}
                    </button>
                </div>
            </div>
        </div>
    );
}