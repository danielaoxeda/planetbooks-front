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
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
            <div className="bg-white w-full max-w-lg rounded-lg sm:rounded-2xl shadow-xl my-4">
                <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b border-[#becab7]">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold">
                        {user
                            ? "Edit User"
                            : "Create User"}
                    </h2>

                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition flex-shrink-0">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto">
                    <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
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
                            className="w-full border border-[#becab7] rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#006b11] focus:ring-offset-1"
                        />
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
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
                            className="w-full border border-[#becab7] rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#006b11] focus:ring-offset-1"
                        />
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
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
                            className="w-full border border-[#becab7] rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#006b11] focus:ring-offset-1"
                        >
                            <option value="USER">
                                USER
                            </option>

                            <option value="ADMIN">
                                ADMIN
                            </option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
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
                            className="rounded cursor-pointer"
                        />

                        <span className="text-xs sm:text-sm font-medium">
                            Active User
                        </span>
                    </div>
                </div>

                <div className="p-3 sm:p-4 md:p-6 border-t border-[#becab7] flex flex-col-reverse sm:flex-row-reverse gap-2 sm:gap-3 sm:justify-start">
                    <button
                        onClick={onSubmit}
                        className="px-3 sm:px-4 md:px-5 py-2 bg-[#006b11] text-white rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-medium hover:bg-[#008818] transition"
                    >
                        {user
                            ? "Save Changes"
                            : "Create User"}
                    </button>

                    <button
                        onClick={onClose}
                        className="px-3 sm:px-4 md:px-5 py-2 border border-[#becab7] rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-medium hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}