interface UserPaginationProps {
    currentPage: number;
    totalPages: number;

    onPageChange: (
        page: number
    ) => void;
}

export default function UserPagination({
                                           currentPage,
                                           totalPages,
                                           onPageChange,
                                       }: UserPaginationProps) {
    return (
        <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">
                Page {currentPage} of{" "}
                {totalPages}
            </p>

            <div className="flex gap-2">
                {Array.from(
                    {
                        length:
                        totalPages,
                    },
                    (_, i) => (
                        <button
                            key={i}
                            onClick={() =>
                                onPageChange(
                                    i + 1
                                )
                            }
                            className={`
                                w-10 h-10 rounded-lg
                                ${
                                currentPage ===
                                i + 1
                                    ? "bg-[#006b11] text-white"
                                    : "bg-white border"
                            }
                            `}
                        >
                            {i + 1}
                        </button>
                    )
                )}
            </div>
        </div>
    );
}