"use client";

import {useEffect, useState} from "react";
import {Upload} from "lucide-react";
import {Product} from "@/types/product";

interface Props {
    open: boolean;
    onClose: () => void;
    book: Product | null;
    onSave: (updatedBook: Product) => void;
}
export default function EditBookModal({open, onClose, book, onSave,}: Props) {
    const [preview, setPreview] = useState("");
    const [formData, setFormData] =
        useState({
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
        });
    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title ?? "",
                description: book.description ?? "",
                tag: book.tag ?? "",
                level: book.level ?? "",
                year: book.year ?? "",
                format: book.format ?? "",
                publisher: book.publisher ?? "",
                language: book.language ?? "",
                image: book.image ?? "",
                price: String(book.items?.[0]?.price ?? 0),
            });
            setPreview(book.image ?? "");
        }
        }, [book]);

    const handleChange = (field: string, value: string
    ) => {setFormData((prev) => ({...prev, [field]: value,}));
    };
    const handleImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const imageUrl = URL.createObjectURL(file);setPreview(imageUrl);

        setFormData((prev) => ({...prev, image: imageUrl,}));
    };

    const handleSubmit = () => {

        if (!book) return;

        const updatedBook: Product = {
            ...book,
            title: formData.title,
            description: formData.description,
            tag: formData.tag,
            categories: [formData.tag,],
            level: formData.level,
            year: formData.year,
            format: formData.format,
            publisher: formData.publisher,
            language: formData.language,
            image: formData.image,
            items: book.items?.length ? [
                    {
                        ...book.items[0],
                        price: Number(formData.price),
                        image: formData.image,
                    },
                ]
                : [],
        };

        onSave(updatedBook);
        onClose();
    };

    if (!open || !book)
        return null;
    console.log("book", book);
    console.log("formData", formData);

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">
                            Edit Book
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Book Title
                        </label>

                        <input type="text" value={formData.title || ""}
                            onChange={(e) =>
                                handleChange("title", e.target.value)
                            } className="w-full border border-gray-200 rounded-xl px-4 py-3"/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Type
                        </label>

                        <select
                            value={formData.tag || ""}
                            onChange={(e) => handleChange("tag", e.target.value)
                            } className="w-full border border-gray-200 rounded-xl px-4 py-3">
                            <option value="Practice Tests">
                                Practice Tests
                            </option>

                            <option value="Coursebook">
                                Coursebook
                            </option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">
                            Description
                        </label>

                        <textarea
                            value={
                                formData.description
                            }
                            onChange={(e) =>
                                handleChange(
                                    "description",
                                    e.target.value
                                )
                            }
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 min-h-[120px]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Level
                        </label>

                        <select
                            value={
                                formData.level || ""
                            }
                            onChange={(e) =>
                                handleChange(
                                    "level",
                                    e.target.value
                                )
                            }
                            className="w-full border border-gray-200 rounded-xl px-4 py-3"
                        >
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
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Publisher
                        </label>

                        <select
                            value={
                                formData.publisher || ""
                            }
                            onChange={(e) =>
                                handleChange(
                                    "publisher",
                                    e.target.value
                                )
                            }
                            className="w-full border border-gray-200 rounded-xl px-4 py-3"
                        >
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
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Format
                        </label>

                        <input
                            type="text"
                            value={formData.format || ""}
                            onChange={(e) =>
                                handleChange("format", e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3"/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Year
                        </label>

                        <input
                            type="number"
                            min="2000"
                            value={formData.year}
                            onChange={(e) => handleChange("year", e.target.value)
                            } className="w-full border border-gray-200 rounded-xl px-4 py-3"/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Language
                        </label>

                        <input
                            type="text"
                            placeholder="English, Spanish, French..."
                            value={formData.language}
                            onChange={(e) =>
                                handleChange(
                                    "language",
                                    e.target.value
                                )
                            }
                            className="w-full border border-gray-200 rounded-xl px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Price
                        </label>

                        <input
                            type="number"
                            value={formData.price || ""}
                            onChange={(e) => handleChange("price", e.target.value)
                            } className="w-full border border-gray-200 rounded-xl px-4 py-3"/>
                    </div>

                    <div className="md:col-span-2">

                        <label className="block text-sm font-medium mb-2">
                            Book Cover
                        </label>

                        <label
                            className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#006b11] transition">

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
                        onClick={onClose}
                        className="px-5 py-3 rounded-xl border border-gray-200 hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button onClick={handleSubmit}
                        className="px-5 py-3 rounded-xl bg-[#006b11] text-white hover:bg-[#00520d]"
                    >
                        Save Changes
                    </button>

                </div>

            </div>

        </div>
    );
}