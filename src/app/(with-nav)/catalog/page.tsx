"use client";

import Filters from "@/components/user/catalog/Filters";
import Pagination from "@/components/user/catalog/Pagination";
import CatalogHeader from "@/components/user/catalog/CatalogHeader";
import CatalogGrid from "@/components/user/catalog/CatalogGrid";
import EmptyState from "@/components/user/catalog/EmptyState";

import { useCatalog } from "@/hooks/useCatalog";

export default function CatalogPage() {
    const {
        loading,
        selectedTags,
        setSelectedTags,
        selectedLevel,
        setSelectedLevel,
        searchTerm,
        setSearchTerm,
        sortBy,
        setSortBy,
        currentPage,
        setCurrentPage,
        filteredBooks,
        paginatedBooks,
        totalPages,
        clearFilters,
    } = useCatalog();

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                Loading products...
            </div>
        );
    }

    return (
        <main className="mx-auto flex max-w-[1280px] flex-col gap-6 px-8 py-8 md:flex-row">

            <Filters
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                clearFilters={clearFilters}
            />

            <section className="flex-1">
                <CatalogHeader
                    total={filteredBooks.length}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

                {filteredBooks.length > 0 ? (
                    <>
                        <CatalogGrid books={paginatedBooks} />

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                        />
                    </>
                ) : (
                    <EmptyState />
                )}
            </section>
        </main>
    );
}