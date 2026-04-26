type PaginationProps = {
    currentPage: number;
    totalPages: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function Pagination({
                                       currentPage,
                                       totalPages,
                                       setCurrentPage,
                                   }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="mt-8 flex items-center justify-center gap-2">
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 text-green-700 hover:border-green-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
                ‹
            </button>

            {Array.from({length: totalPages}, (_, index) => index + 1).map(
                (page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border font-bold ${
                            currentPage === page
                                ? "bg-green-700 text-white border-green-700"
                                : "border-slate-300 text-green-700 hover:border-green-700"
                        }`}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 text-green-700 hover:border-green-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
                ›
            </button>
        </div>
    );
}