import {Search, SlidersHorizontal} from "lucide-react";

interface Props {
    search: string;

    onSearchChange: (
        value: string
    ) => void;

    category: string;

    onCategoryChange: (
        value: string
    ) => void;
}

export default function BooksFilters({
                                         search,
                                         onSearchChange,
                                         category,
                                         onCategoryChange,
                                     }: Props) {
    return (
        <div
            className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

            <div className="relative w-full lg:max-w-md">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search books..."
                    value={search}
                    onChange={(e) =>
                        onSearchChange(
                            e.target.value
                        )
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006b11]"
                />
            </div>

            <div className="flex gap-3">

                <select
                    value={category}
                    onChange={(e) =>
                        onCategoryChange(
                            e.target.value
                        )
                    }
                    className="px-4 py-3 rounded-xl border border-gray-200 text-sm"
                >
                    <option>
                        All Categories
                    </option>
                    <option>
                        YLE
                    </option>
                    <option>
                        A2 Key
                    </option>
                    <option>
                        B1 Preliminary
                    </option>
                    <option>
                        B2 First
                    </option>
                    <option>
                        C1 Advanced
                    </option>
                    <option>
                        IELTS
                    </option>
                    <option>
                        TOEFL
                    </option>
                </select>

                <button
                    className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                    <SlidersHorizontal
                        size={18}
                    />
                </button>

            </div>

        </div>
    );
}