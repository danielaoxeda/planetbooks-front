"use client";

import {useState} from "react";
import {Plus, Upload} from "lucide-react";
import {products} from "@/data/products";

interface AddBookButtonProps {
    onClick?: () => void
}

export default function BooksPage({onClick}: AddBookButtonProps) {

    const [books, setBooks] =
        useState(products);

    const [search, setSearch] =
        useState("");

    const [currentPage, setCurrentPage] =
        useState(1);

    const [modalOpen, setModalOpen] =
        useState(false);

    const [preview, setPreview] =
        useState("");

    const [formData, setFormData] =
        useState({
            title: "",
            description: "",
            tag: "",
            level: "",
            pages: "",
            format: "",
            publisher: "",
            language: "English",
            image: "",
            price: "",
        });


    const handleChange = (
        field: string,
        value: string
    ) => {
        setFormData((prev) => ({
                ...prev,
                [field]: value,
            })
        );
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

    const handleSubmit = () => {

        const newBook = {
            id: books.length + 1,
            title: formData.title,
            description:
            formData.description,
            tag: formData.tag,
            categories: [formData.tag],
            level: formData.level,
            image:
                formData.image ||
                "/books/default.png",
            pages: formData.pages,
            format: formData.format,
            publisher:
            formData.publisher,
            language:
            formData.language,
            items: [
                {
                    key: crypto.randomUUID(),
                    title: "Digital PDF",
                    price: Number(
                        formData.price
                    ),
                    description:
                        "Instant download",
                    default: true,
                    image:
                    formData.image,
                },
            ],
        };

        setBooks((prev) => [
            ...prev,
            newBook,
        ]);

        setModalOpen(false);

        setPreview("");

        setFormData({
            title: "",
            description: "",
            tag: "",
            level: "",
            pages: "",
            format: "",
            publisher: "",
            language: "English",
            image: "",
            price: "",
        });
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-3">
            <button
                onClick={() =>
                    setModalOpen(true)
                }
                className="flex items-center gap-2 bg-[#006b11] text-white px-5 py-3 rounded-xl hover:bg-[#00520d] transition"
            >
                <Plus size={18}/>

                Add Book
            </button>

            {modalOpen && (
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
                                onClick={() =>
                                    setModalOpen(false)
                                }
                                className="text-gray-400 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <input
                                type="text"
                                placeholder="Book title"
                                value={
                                    formData.title
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "title",
                                        e.target.value
                                    )
                                }
                                className="border border-gray-200 rounded-xl px-4 py-3"
                            />

                            <select
                                value={formData.tag}
                                onChange={(e) =>
                                    handleChange(
                                        "tag",
                                        e.target.value
                                    )
                                }
                                className="border border-gray-200 rounded-xl px-4 py-3"
                            >
                                <option value="">
                                    Select Type
                                </option>

                                <option value="Practice Tests">
                                    Practice Tests
                                </option>

                                <option value="Coursebook">
                                    Coursebook
                                </option>
                            </select>

                            <textarea
                                placeholder="Description"
                                value={
                                    formData.description
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "description",
                                        e.target.value
                                    )
                                }
                                className="border border-gray-200 rounded-xl px-4 py-3 md:col-span-2 min-h-[120px]"
                            />

                            <select
                                value={formData.level}
                                onChange={(e) =>
                                    handleChange(
                                        "level",
                                        e.target.value
                                    )
                                }
                                className="border border-gray-200 rounded-xl px-4 py-3"
                            >
                                <option value="">
                                    Select Level
                                </option>

                                <option value="YLE - Starters, Movers & Flyers">
                                    YLE - Starters, Movers & Flyers
                                </option>

                                <option value="KET - A2 Key">
                                    KET - A2 Key
                                </option>

                                <option value="PET - B1">
                                    PET - B1
                                </option>

                                <option value="FCE - B2">
                                    FCE - B2
                                </option>

                                <option value="CAE - C1">
                                    CAE - C1
                                </option>

                                <option value="IELTS">
                                    IELTS
                                </option>

                                <option value="TOEFL">
                                    TOEFL
                                </option>
                            </select>

                            <select
                                value={formData.publisher}
                                onChange={(e) =>
                                    handleChange(
                                        "publisher",
                                        e.target.value
                                    )
                                }
                                className="border border-gray-200 rounded-xl px-4 py-3"
                            >
                                <option value="">
                                    Select Publisher
                                </option>

                                <option value="Cambridge">
                                    Cambridge
                                </option>

                                <option value="Oxford">
                                    Oxford
                                </option>

                                <option value="Pearson">
                                    Pearson
                                </option>

                                <option value="ETS">
                                    ETS
                                </option>

                                <option value="Other">
                                    Other
                                </option>
                            </select>

                            <input
                                type="text"
                                placeholder="Format"
                                value={
                                    formData.format
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "format",
                                        e.target.value
                                    )
                                }
                                className="border border-gray-200 rounded-xl px-4 py-3"
                            />

                            <input
                                type="number"
                                placeholder="Price"
                                value={
                                    formData.price
                                }
                                onChange={(e) =>
                                    handleChange(
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
                                            handleImageUpload
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
                                onClick={() =>
                                    setModalOpen(false)
                                }
                                className="px-5 py-3 rounded-xl border border-gray-200 hover:bg-gray-50"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={
                                    handleSubmit
                                }
                                className="px-5 py-3 rounded-xl bg-[#006b11] text-white hover:bg-[#00520d]"
                            >
                                Save Book
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}