"use client";

import { User } from "@/types/user";

interface UserDeleteModalProps {
    open: boolean;

    user: User | null;

    onClose: () => void;

    onConfirm: () => void;
}

export default function UserDeleteModal({
                                            open,
                                            user,
                                            onClose,
                                            onConfirm,
                                        }: UserDeleteModalProps) {
    if (!open || !user) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-3 sm:p-4 md:p-6">
            <div className="bg-white rounded-lg sm:rounded-2xl w-full max-w-sm md:max-w-md p-4 sm:p-6 shadow-xl">
                <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">
                    Delete User
                </h2>

                <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-6 break-words">
                    Are you sure you want to delete
                    <strong>
                        {" "}
                        {user.name}
                    </strong>
                    ?
                </p>

                <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 sm:justify-end">
                    <button
                        onClick={onClose}
                        className="px-3 sm:px-4 md:px-5 py-2 border border-[#becab7] rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-medium hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-3 sm:px-4 md:px-5 py-2 bg-red-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-medium hover:bg-red-700 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}