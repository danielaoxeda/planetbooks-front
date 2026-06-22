type Props = {
    total: number;
    sortBy: string;
    setSortBy: (value: string) => void;
};

export default function CatalogHeader({ total, sortBy, setSortBy }: Props) {
    return (
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">
                    Digital Certification Guides
                </h1>
                <p className="mt-1 text-sm text-green-700">
                    Showing {total} results
                </p>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">Sort by:</span>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-lg border px-3 py-2 text-sm font-semibold"
                >
                    <option>Most Popular</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                </select>
            </div>
        </div>
    );
}