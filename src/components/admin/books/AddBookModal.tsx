"use client";

import { useState } from "react";

import { Product } from "@/types/product";

import { createProduct } from "@/services/productService";
import {BookFormData, validateBookForm} from "@/components/admin/books/forms/BookValidation";
import BookForm from "@/components/admin/books/forms/BookForm";

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (book: Product) => void;
}

const initialFormData: BookFormData = {
    title: "",
    description: "",
    tag: "",
    level: "",
    pages: "",
    format: "",
    publisher: "",
    language: "",
    image: "",
    price: "",
};

export default function AddBookModal({
                                         open,
                                         onClose,
                                         onSave,
                                     }: Props) {

    const [formData, setFormData] =
        useState<BookFormData>(
            initialFormData
        );

    const [errors, setErrors] =
        useState<Record<string, string>>(
            {}
        );

    const [saving, setSaving] =
        useState(false);

    const [preview, setPreview] =
        useState("");

    const handleChange = (
        field: keyof BookFormData,
        value: string
    ) => {

        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: "",
            }));
        }
    };

    const handleImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file =
            e.target.files?.[0];

        if (!file) return;

        const imageUrl =
            URL.createObjectURL(file);

        setPreview(imageUrl);

        setFormData((prev) => ({
            ...prev,
            image: imageUrl,
        }));
    };

    const resetForm = () => {

        setFormData(
            initialFormData
        );

        setErrors({});

        setPreview("");
    };

    const handleSubmit = async () => {

        const validationErrors =
            validateBookForm(formData);

        if (
            Object.keys(
                validationErrors
            ).length > 0
        ) {

            setErrors(
                validationErrors
            );

            return;
        }

        if (saving) return;

        try {

            setSaving(true);

            const payload = {
                title: formData.title,
                description: formData.description,
                tag: formData.tag,
                categories: [formData.level,],
                level: formData.level,
                image: formData.image,
                pages: formData.pages,
                format: formData.format,
                publisher: formData.publisher,
                language: formData.language,
                gallery: [],
                items: [
                    {
                        key: "pdf",
                        title: "PDF",
                        price: Number(formData.price),
                        stock: 100,
                        isDefault: true,
                    },
                ],
            };

            const savedBook =
                await createProduct(
                    payload
                );

            onSave(savedBook);

            resetForm();

            onClose();

        } catch (error) {

            console.error(
                "Error creating product",
                error
            );

        } finally {

            setSaving(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8">

                {/* HEADER */}

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

                {/* FORM */}

                <BookForm
                    formData={formData}
                    errors={errors}
                    onChange={handleChange}
                />

                {/* IMAGE */}

                <div className="mt-6">

                    <label className="block text-sm font-medium mb-2">
                        Book Cover
                    </label>

                    <label
                        className="
                            border-2
                            border-dashed
                            border-gray-300
                            rounded-2xl
                            p-6
                            flex
                            flex-col
                            items-center
                            justify-center
                            cursor-pointer
                            hover:border-[#006b11]
                            transition
                        "
                    >

                        <span className="text-sm text-gray-500">
                            Upload Book Cover
                        </span>

                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={
                                handleImageUpload
                            }
                        />

                    </label>

                </div>

                {/* PREVIEW */}

                {preview && (

                    <div className="flex justify-center mt-6">

                        <img
                            src={preview}
                            alt="Preview"
                            className="
                                w-40
                                rounded-2xl
                                border
                                border-gray-200
                                shadow-sm
                            "
                        />

                    </div>
                )}

                {/* ACTIONS */}

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        onClick={onClose}
                        className="
                            px-5
                            py-3
                            rounded-xl
                            border
                            border-gray-200
                            hover:bg-gray-50
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="
                            px-5
                            py-3
                            rounded-xl
                            bg-[#006b11]
                            text-white
                            hover:bg-[#00520d]
                            disabled:opacity-50
                        "
                    >
                        {saving
                            ? "Saving..."
                            : "Save Book"}
                    </button>

                </div>

            </div>

        </div>
    );
}