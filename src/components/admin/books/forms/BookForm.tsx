"use client";

import { BookFormData } from "./BookValidation";

interface Props {
    formData: BookFormData;
    errors: Record<string, string>;
    onChange: (
        field: keyof BookFormData,
        value: string
    ) => void;
}

export default function BookForm({
                                     formData,
                                     errors,
                                     onChange,
                                 }: Props) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* TITLE */}

            <div>
                <label className="block text-sm font-medium mb-2">
                    Book Title
                </label>

                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                        onChange(
                            "title",
                            e.target.value
                        )
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                />

                {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.title}
                    </p>
                )}
            </div>


            <div>
                <label className="block text-sm font-medium mb-2">
                    Exam
                </label>

                <select
                    value={formData.tag}
                    onChange={(e) =>
                        onChange(
                            "tag",
                            e.target.value
                        )
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                >
                    <option value="">
                        Select Exam
                    </option>

                    <option value="YLE">YLE</option>
                    <option value="KET">KET</option>
                    <option value="PET">PET</option>
                    <option value="FCE">FCE</option>
                    <option value="CAE">CAE</option>
                    <option value="IELTS">IELTS</option>
                    <option value="TOEFL">TOEFL</option>
                </select>

                {errors.tag && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.tag}
                    </p>
                )}
            </div>

            {/* DESCRIPTION */}

            <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                    Description
                </label>

                <textarea
                    value={formData.description}
                    onChange={(e) =>
                        onChange(
                            "description",
                            e.target.value
                        )
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 min-h-[120px]"
                />

                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.description}
                    </p>
                )}
            </div>

            {/* LEVEL */}

            <div>
                <label className="block text-sm font-medium mb-2">
                    Level
                </label>

                <select
                    value={formData.level}
                    onChange={(e) =>
                        onChange(
                            "level",
                            e.target.value
                        )
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                >
                    <option value="">
                        Select Level
                    </option>

                    <option value="Elementary">Elementary</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>

                </select>

                {errors.level && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.level}
                    </p>
                )}
            </div>

            {/* PAGES */}

            <div>
                <label className="block text-sm font-medium mb-2">
                    Pages
                </label>

                <input
                    type="number"
                    value={formData.pages}
                    onChange={(e) =>
                        onChange(
                            "pages",
                            e.target.value
                        )
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                />

                {errors.pages && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.pages}
                    </p>
                )}
            </div>

            {/* FORMAT */}

            <div>
                <label className="block text-sm font-medium mb-2">
                    Format
                </label>

                <select
                    value={formData.format}
                    onChange={(e) =>
                        onChange(
                            "format",
                            e.target.value
                        )
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                >
                    <option value="">
                        Select Format
                    </option>

                    <option value="Practice Tests">
                        Practice Tests
                    </option>

                    <option value="Coursebook">
                        Coursebook
                    </option>
                </select>

                {errors.format && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.format}
                    </p>
                )}
            </div>

            {/* PUBLISHER */}

            <div>
                <label className="block text-sm font-medium mb-2">
                    Publisher
                </label>

                <select
                    value={formData.publisher}
                    onChange={(e) =>
                        onChange(
                            "publisher",
                            e.target.value
                        )
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
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

                {errors.publisher && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.publisher}
                    </p>
                )}
            </div>

            {/* LANGUAGE */}

            <div>
                <label className="block text-sm font-medium mb-2">
                    Language
                </label>

                <input
                    type="text"
                    placeholder="English, Spanish, French..."
                    value={formData.language}
                    onChange={(e) =>
                        onChange(
                            "language",
                            e.target.value
                        )
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                />

                {errors.language && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.language}
                    </p>
                )}
            </div>

            {/* PRICE */}

            <div>
                <label className="block text-sm font-medium mb-2">
                    Price
                </label>

                <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                        onChange(
                            "price",
                            e.target.value
                        )
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                />

                {errors.price && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.price}
                    </p>
                )}
            </div>

        </div>
    );
}