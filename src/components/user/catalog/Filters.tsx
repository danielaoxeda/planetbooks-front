import React from "react";

type Product = {
    tag: string;
    level: string;
};

type FiltersProps = {
    products: Product[];
    selectedTags: string[];
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
    selectedLevel: string;
    setSelectedLevel: React.Dispatch<React.SetStateAction<string>>;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    clearFilters: () => void;
};

export default function Filters({
                                    products,
                                    selectedTags,
                                    setSelectedTags,
                                    selectedLevel,
                                    setSelectedLevel,
                                    searchTerm,
                                    setSearchTerm,
                                    clearFilters,
                                }: FiltersProps) {
    // Obtener tags únicos del backend
    const certificationTypes = React.useMemo(
        () =>
            [...new Set(products.map((product) => product.tag))]
                .filter(Boolean)
                .sort(),
        [products]
    );

    // Obtener niveles únicos del backend
    const levels = React.useMemo(() => {
        const uniqueLevels = [...new Set(products.map((product) => product.level))];

        // Orden deseado
        const order = ["Elementary", "Intermediate", "Advanced"];

        return uniqueLevels.sort(
            (a, b) => order.indexOf(a) - order.indexOf(b)
        );
    }, [products]);

    const handleTagChange = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((item) => item !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const getTagLabel = (tag: string) => {
        const labels: Record<string, string> = {
            YLE: "YLE (Starters, Movers & Flyers)",
            KET: "KET (A2 Key)",
            PET: "PET (B1 Preliminary)",
            FCE: "FCE (B2 First)",
            CAE: "CAE (C1 Advanced)",
            TOEFL: "TOEFL",
            IELTS: "IELTS",
        };

        return labels[tag] ?? tag;
    };

    return (
        <aside className="w-full shrink-0 md:w-64">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto pr-2">

                {/* Encabezado */}
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Filters
                    </h2>

                    <button
                        onClick={clearFilters}
                        className="text-sm font-medium text-green-700 hover:text-green-900"
                    >
                        Clear all
                    </button>
                </div>

                {/* Buscador */}
                <div className="border-t border-slate-300 pt-4">
                    <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Search Book
                    </p>

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by title..."
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                    />
                </div>

                {/* Certification Type */}
                <div className="border-t border-slate-300 pt-4">
                    <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Certification Type
                    </p>

                    <div className="space-y-3">
                        {certificationTypes.map((tag) => (
                            <label
                                key={tag}
                                className="flex cursor-pointer items-center"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedTags.includes(tag)}
                                    onChange={() => handleTagChange(tag)}
                                    className="h-4 w-4 rounded border-slate-300 text-green-700 focus:ring-green-700"
                                />

                                <span className="ml-3 text-sm text-slate-800 hover:text-green-700">
                                    {getTagLabel(tag)}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Study Level */}
                <div className="border-t border-slate-300 pt-4">
                    <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Study Level
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {levels.map((level) => (
                            <button
                                key={level}
                                onClick={() =>
                                    setSelectedLevel(
                                        selectedLevel === level ? "" : level
                                    )
                                }
                                className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors ${
                                    selectedLevel === level
                                        ? "bg-green-700 text-white"
                                        : "bg-green-100 text-slate-700 hover:bg-green-700 hover:text-white"
                                }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}