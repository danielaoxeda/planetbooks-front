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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6">
                <h2 className="text-xl font-bold mb-4">
                    Delete User
                </h2>

                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete
                    <strong>
                        {" "}
                        {user.name}
                    </strong>
                    ?
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 border rounded-xl"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-5 py-2 bg-red-600 text-white rounded-xl"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}