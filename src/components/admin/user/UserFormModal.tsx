"use client";

import { X } from "lucide-react";
import { User } from "@/types/user";

interface UserFormModalProps {
    open: boolean;
    user?: User | null;

    formData: {
        name: string;
        email: string;
    };

    onClose: () => void;

    onChange: (
        field: string,
        value: string
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

        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">

                <div className="flex items-center justify-between p-6 border-b border-[#becab7]">

                    <h2 className="text-xl font-bold">
                        {user ? "Edit User" : "Create User"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <X size={20}/>
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
                            className="w-full border border-[#becab7] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#006b11]"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                onChange(
                                    "email",
                                    e.target.value
                                )
                            }
                            className="w-full border border-[#becab7] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#006b11]"
                        />

                    </div>

                </div>

                <div className="p-6 border-t border-[#becab7] flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 border border-[#becab7] rounded-xl hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onSubmit}
                        className="px-5 py-2 bg-[#006b11] text-white rounded-xl hover:bg-[#008818]"
                    >
                        Save Changes
                    </button>

                </div>

            </div>

        </div>

    );

}