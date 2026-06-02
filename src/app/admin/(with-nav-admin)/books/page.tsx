"use client";

import {useState} from "react";

import {products} from "@/data/products";

import BooksFilters from "@/components/admin/books/BooksFilters";
import BooksTable from "@/components/admin/books/BooksTable";
import BooksPagination from "@/components/admin/books/BooksPagination";

import AddBookButton from "@/components/admin/books/AddBookButton";
import AddBookModal from "@/components/admin/books/AddBookModal";

export default function BooksPage() {

    const [search, setSearch] =
        useState("");

    const [currentPage, setCurrentPage] =
        useState(1);

    const [modalOpen, setModalOpen] =
        useState(false);

    const [preview, setPreview] =
        useState("");

    const [formData, setFormData] =
        useState({
            title: "",
            description: "",
            tag: "",
            categories: "",
            level: "",
            pages: "",
            format: "",
            publisher: "",
            language: "",
            price: "",
            image: "",
        });

    const handleChange = (
        field: string,
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file =
            e.target.files?.[0];

        if (!file) return;

        const imageUrl =
            URL.createObjectURL(file);

        setPreview(imageUrl);

        setFormData((prev) => ({
            ...prev,
            image: imageUrl,
        }));
    };

    const handleSubmit = () => {
        console.log(formData);

        setModalOpen(false);
    };

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

            <div className="flex justify-end">
                <AddBookButton
                    onClick={() =>
                        setModalOpen(true)
                    }
                />
            </div>

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

            <AddBookModal
                open={modalOpen}
                onClose={() =>
                    setModalOpen(false)
                }
                onSubmit={handleSubmit}
                formData={formData}
                onChange={handleChange}
                preview={preview}
                onImageUpload={
                    handleImageUpload
                }
            />

        </div>
    );
}