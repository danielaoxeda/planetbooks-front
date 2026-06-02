"use client";

import {useState} from "react";

import {products} from "@/data/products";

import AddBookButton from "@/components/admin/books/AddBookButton";
import AddBookModal from "@/components/admin/books/AddBookModal";
import BooksFilters from "@/components/admin/books/BooksFilters";
import BooksPagination from "@/components/admin/books/BooksPagination";
import BooksTable from "@/components/admin/books/BooksTable";
import EditBookModal from "@/components/admin/books/EditBookModal";

import {Product} from "@/types/product";

export default function BooksPage() {

    const [books, setBooks] =
        useState<Product[]>(products);

    const [currentPage, setCurrentPage] =
        useState(1);

    const [modalOpen, setModalOpen] =
        useState(false);

    const [search, setSearch] =
        useState("");

    const [category, setCategory] =
        useState("All Categories");

    const [editModalOpen, setEditModalOpen] =
        useState(false);

    const [selectedBook, setSelectedBook] =
        useState<Product | null>(null);

    const filteredBooks =
        books.filter((book) => {

            const matchesSearch =
                book.title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesCategory =
                category ===
                "All Categories" ||

                book.categories.includes(
                    category
                );

            return (
                matchesSearch &&
                matchesCategory
            );
        });

    const handleDelete = (
        book: Product
    ) => {

        setBooks((prev) =>
            prev.filter(
                (item) =>
                    item.id !== book.id
            )
        );
    };

    const handleAddBook = (
        newBook: Product
    ) => {

        setBooks((prev) => [
            ...prev,
            newBook,
        ]);
    };

    const handleEdit = (
        book: Product
    ) => {

        setSelectedBook(book);

        setEditModalOpen(true);
    };

    const handleUpdateBook = (
        updatedBook: Product
    ) => {

        setBooks((prev) =>
            prev.map((book) =>
                book.id === updatedBook.id
                    ? updatedBook
                    : book
            )
        );
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">

            <div className="flex justify-end">

                <AddBookButton
                    onClick={() =>
                        setModalOpen(true)
                    }
                />

            </div>

            <AddBookModal
                open={modalOpen}
                onClose={() =>
                    setModalOpen(false)
                }
                onSave={handleAddBook}
            />

            <BooksFilters
                search={search}
                onSearchChange={
                    setSearch
                }
                category={category}
                onCategoryChange={
                    setCategory
                }
            />

            <BooksTable
                books={filteredBooks}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <BooksPagination
                currentPage={
                    currentPage
                }
                totalPages={3}
                onPageChange={
                    setCurrentPage
                }
            />

            <EditBookModal
                open={editModalOpen}
                onClose={() =>
                    setEditModalOpen(false)
                }
                book={selectedBook}
                onSave={handleUpdateBook}
            />

        </div>
    );
}