type FiltersProps = {
    selectedTags: string[];
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
    selectedLevel: string;
    setSelectedLevel: React.Dispatch<React.SetStateAction<string>>;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    clearFilters: () => void;
};

const certificationTypes = [
    "YLE",
    "STARTERS",
    "MOVERS",
    "FLYERS",
    "KET-A2",
    "PET-B1",
    "FCE-B2",
    "CAE-C1",
    "TOEFL",
    "IELTS",
];

const levels = ["Beginner", "Intermediate", "Advanced"];

export default function Filters({
                                    selectedTags,
                                    setSelectedTags,
                                    selectedLevel,
                                    setSelectedLevel,
                                    searchTerm,
                                    setSearchTerm,
                                    clearFilters,
                                }: FiltersProps) {
    const handleTagChange = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((item) => item !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    return (
        <aside className="w-full shrink-0 md:w-64">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto pr-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">Filters</h2>

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
                        placeholder="Search by title, tag..."
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                    />
                </div>

                {/* Checkbox filter */}

                <div className="border-t border-slate-300 pt-4">
                    <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Certification Type
                    </p>

                    <div className="space-y-3">
                        {certificationTypes.map((item) => (
                            <label key={item} className="flex cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedTags.includes(item)}
                                    onChange={() => handleTagChange(item)}
                                    className="h-4 w-4 rounded border-slate-300 text-green-700 focus:ring-green-700"
                                />

                                <span className="ml-3 text-sm text-slate-800 hover:text-green-700">
                  {item}
                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* English level filter */}
                <div className="border-t border-slate-300 pt-4">
                    <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Study Level
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {levels.map((level) => (
                            <button
                                key={level}
                                onClick={() =>
                                    setSelectedLevel(selectedLevel === level ? "" : level)
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