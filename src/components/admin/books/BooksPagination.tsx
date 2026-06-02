interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (
        page: number
    ) => void;
}

export default function BooksPagination({
                                            currentPage,
                                            totalPages,
                                            onPageChange,
                                        }: Props) {
    return (
        <div className="flex items-center justify-between">

            <p className="text-sm text-gray-500">
                Page {currentPage} of{" "}
                {totalPages}
            </p>

            <div className="flex gap-2">

                {Array.from({
                    length: totalPages,
                }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() =>
                            onPageChange(
                                index + 1
                            )
                        }
                        className={`w-10 h-10 rounded-xl text-sm font-medium transition ${
                            currentPage ===
                            index + 1
                                ? "bg-[#006b11] text-white"
                                : "border border-gray-200 hover:bg-gray-50"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}

            </div>

        </div>
    );
}