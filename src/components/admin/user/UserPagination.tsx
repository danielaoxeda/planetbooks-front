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
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center mt-6 sm:mt-8 w-full">
            <p className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1 text-center sm:text-left">
                Page {currentPage} of{" "}
                {totalPages}
            </p>

            <div className="flex gap-1 sm:gap-2 justify-center sm:justify-end order-1 sm:order-2 flex-wrap w-full sm:w-auto">
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
                            className={`w-7 h-7 sm:w-8 md:w-10 sm:h-8 md:h-10 rounded-lg text-xs sm:text-sm md:text-base font-medium transition flex items-center justify-center ${currentPage === i + 1 ? "bg-[#006b11] text-white" : "bg-white border border-[#becab7] hover:bg-[#eff6e8]"}`}
                        >
                            {i + 1}
                        </button>
                    )
                )}
            </div>
        </div>
    );
}