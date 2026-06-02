"use client";

import {Upload} from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
    formData: any;
    onChange: (
        field: string,
        value: string
    ) => void;
    preview: string;
    onImageUpload: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

export default function AddBookModal({
                                         open,
                                         onClose,
                                         onSubmit,
                                         formData,
                                         onChange,
                                         preview,
                                         onImageUpload,
                                     }: Props) {

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8">

                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h2 className="text-2xl font-bold">
                            Add New Book
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Complete all book details
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-400 hover:text-gray-700"
                    >
                        ×
                    </button>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <input
                        type="text"
                        placeholder="Book title"
                        value={formData.title}
                        onChange={(e) =>
                            onChange(
                                "title",
                                e.target.value
                            )
                        }
                        className="border border-gray-200 rounded-xl px-4 py-3"
                    />

                    <input
                        type="text"
                        placeholder="Tag"
                        value={formData.tag}
                        onChange={(e) =>
                            onChange(
                                "tag",
                                e.target.value
                            )
                        }
                        className="border border-gray-200 rounded-xl px-4 py-3"
                    />

                    <textarea
                        placeholder="Description"
                        value={
                            formData.description
                        }
                        onChange={(e) =>
                            onChange(
                                "description",
                                e.target.value
                            )
                        }
                        className="border border-gray-200 rounded-xl px-4 py-3 md:col-span-2 min-h-[120px]"
                    />

                    <input
                        type="text"
                        placeholder="Level"
                        value={formData.level}
                        onChange={(e) =>
                            onChange(
                                "level",
                                e.target.value
                            )
                        }
                        className="border border-gray-200 rounded-xl px-4 py-3"
                    />

                    <input
                        type="text"
                        placeholder="Publisher"
                        value={
                            formData.publisher
                        }
                        onChange={(e) =>
                            onChange(
                                "publisher",
                                e.target.value
                            )
                        }
                        className="border border-gray-200 rounded-xl px-4 py-3"
                    />

                    <input
                        type="text"
                        placeholder="Pages"
                        value={formData.pages}
                        onChange={(e) =>
                            onChange(
                                "pages",
                                e.target.value
                            )
                        }
                        className="border border-gray-200 rounded-xl px-4 py-3"
                    />

                    <input
                        type="text"
                        placeholder="Format"
                        value={formData.format}
                        onChange={(e) =>
                            onChange(
                                "format",
                                e.target.value
                            )
                        }
                        className="border border-gray-200 rounded-xl px-4 py-3"
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        value={formData.price}
                        onChange={(e) =>
                            onChange(
                                "price",
                                e.target.value
                            )
                        }
                        className="border border-gray-200 rounded-xl px-4 py-3"
                    />

                    <div className="md:col-span-2">

                        <label
                            className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#006b11] transition"
                        >
                            <Upload
                                size={28}
                                className="text-gray-400 mb-3"
                            />

                            <span className="text-sm text-gray-500">
                                Upload Book Cover
                            </span>

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={
                                    onImageUpload
                                }
                            />
                        </label>

                    </div>

                    {preview && (
                        <div className="md:col-span-2 flex justify-center">

                            <img
                                src={preview}
                                alt="Preview"
                                className="w-40 rounded-2xl border border-gray-200 shadow-sm"
                            />

                        </div>
                    )}

                </div>

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        onClick={onClose}
                        className="px-5 py-3 rounded-xl border border-gray-200 hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onSubmit}
                        className="px-5 py-3 rounded-xl bg-[#006b11] text-white hover:bg-[#00520d]"
                    >
                        Save Book
                    </button>

                </div>

            </div>

        </div>
    );
}