"use client";

import { useEffect, useState } from "react";

import { Product } from "@/types/product";

import BookForm from "@/components/admin/books/forms/BookForm";

import {
    BookFormData,
    validateBookForm,
} from "@/components/admin/books/forms/BookValidation";

interface Props {
    open: boolean;
    onClose: () => void;
    book: Product | null;
    onSave: (updatedBook: Product) => void;
}

const emptyForm: BookFormData = {
    title: "",
    description: "",
    tag: "",
    level: "",
    year: "",
    format: "",
    publisher: "",
    language: "",
    image: "",
    price: "",
};

export default function EditBookModal({
                                          open,
                                          onClose,
                                          book,
                                          onSave,
                                      }: Props) {

    const [formData, setFormData] =
        useState<BookFormData>(emptyForm);

    const [errors, setErrors] =
        useState<Record<string, string>>({});

    const [preview, setPreview] =
        useState("");

    useEffect(() => {

        if (!book) return;

        const newForm: BookFormData = {
            title: book.title ?? "",
            description: book.description ?? "",
            tag: book.tag ?? "",
            level: book.level ?? "",
            year: String(book.year ?? ""),
            format: book.format ?? "",
            publisher: book.publisher ?? "",
            language: book.language ?? "",
            image: book.image ?? "",
            price: String(
                book.items?.[0]?.price ?? ""
            ),
        };

        setFormData(newForm);
        setPreview(book.image ?? "");

    }, [book]);

    const handleChange = (
        field: keyof BookFormData,
        value: string
    ) => {

        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));

        if (errors[field]) {
            setErrors(prev => ({
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

        setFormData(prev => ({
            ...prev,
            image: imageUrl,
        }));
    };

    const handleSubmit = () => {

        if (!book) return;

        const validationErrors =
            validateBookForm(formData);

        if (
            Object.keys(validationErrors).length > 0
        ) {
            setErrors(validationErrors);
            return;
        }

        const updatedBook: Product = {

            ...book,

            title: formData.title,

            description:
            formData.description,

            tag: formData.tag,

            categories: [
                formData.level,
            ],

            level:
            formData.level,

            year:
            formData.year,

            format:
            formData.format,

            publisher:
            formData.publisher,

            language:
            formData.language,

            image:
            formData.image,

            items:
                book.items?.length > 0
                    ? [
                        {
                            ...book.items[0],

                            price: Number(
                                formData.price
                            ),

                            image:
                            formData.image,
                        },
                    ]
                    : [],
        };

        onSave(updatedBook);
        onClose();
    };

    if (!open || !book) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8">

                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h2 className="text-2xl font-bold">
                            Edit Book
                        </h2>

                        <p className="text-sm text-gray-500">
                            Update book information
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-400 hover:text-gray-700"
                    >
                        ×
                    </button>

                </div>

                <BookForm
                    formData={formData}
                    errors={errors}
                    onChange={handleChange}
                />

                <div className="mt-6">

                    <label className="block text-sm font-medium mb-2">
                        Book Cover
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />

                </div>

                {preview && (

                    <div className="flex justify-center mt-6">

                        <img
                            src={preview}
                            alt="Preview"
                            className="w-40 rounded-2xl border border-gray-200"
                        />

                    </div>

                )}

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        onClick={onClose}
                        className="px-5 py-3 rounded-xl border border-gray-200"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="px-5 py-3 rounded-xl bg-[#006b11] text-white"
                    >
                        Save Changes
                    </button>

                </div>

            </div>

        </div>
    );
}