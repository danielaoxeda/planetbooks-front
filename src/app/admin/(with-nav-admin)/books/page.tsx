"use client";

import {useState} from "react";

import AddBookButton from "@/components/admin/books/AddBookButton";
import AddBookModal from "@/components/admin/books/AddBookModal";
import BooksFilters from "@/components/admin/books/BooksFilters";
import BooksPagination from "@/components/admin/books/BooksPagination";
import BooksTable from "@/components/admin/books/BooksTable";
import EditBookModal from "@/components/admin/books/EditBookModal";

import {Product} from "@/types/product";
import {useProducts} from "@/hooks/useProducts";
import {createProduct, deleteProduct, updateProduct} from "@/services/productService";

export default function BooksPage() {

    const {
        books,
        loading,
        refreshProducts,
    } = useProducts();

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

            const matchesCategory = category === "All Categories" || book.categories.includes(category);

            return (matchesSearch && matchesCategory
            );
        });

    const handleAddBook = async (
        newBook: Product
    ) => {
        try {

            await createProduct(newBook);

            setModalOpen(false);

            await refreshProducts();

        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateBook = async (
        updatedBook: Product
    ) => {
        try {

            await updateProduct(
                updatedBook.id,
                updatedBook
            );

            setEditModalOpen(false);

            await refreshProducts();

        } catch (error) {
            console.error(error);
        }
    };
    const handleDelete = async (
        book: Product
    ) => {
        try {

            await deleteProduct(book.id);
            await refreshProducts();

        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (
        book: Product
    ) => {
        setSelectedBook(book);
        setEditModalOpen(true);
    };


    if (loading) {
        return (
            <div className="flex justify-center py-10">
                Loading books...
            </div>
        );
    }

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