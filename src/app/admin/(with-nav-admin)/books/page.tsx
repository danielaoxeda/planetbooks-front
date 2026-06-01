"use client";

import {useState} from "react";

import {products} from "@/data/products";

import BooksFilters from "@/components/admin/books/BooksFilters";
import BooksTable from "@/components/admin/books/BooksTable";
import BooksPagination from "@/components/admin/books/BooksPagination";

export default function BooksPage() {
    const [search, setSearch] =
        useState("");

    const [currentPage, setCurrentPage] =
        useState(1);

    const filteredBooks =
        products.filter((book) =>
            book.title
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">

            <BooksFilters
                search={search}
                onSearchChange={setSearch}
            />

            <BooksTable
                books={filteredBooks}
            />

            <BooksPagination
                currentPage={currentPage}
                totalPages={3}
                onPageChange={setCurrentPage}
            />

        </div>
    );
}