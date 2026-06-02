"use client";

import {useState} from "react";
import {products} from "@/data/products";
import AddBookButton from "@/components/admin/books/AddBookButton";
import AddBookModal from "@/components/admin/books/AddBookModal";
import BooksFilters from "@/components/admin/books/BooksFilters";
import BooksPagination from "@/components/admin/books/BooksPagination";
import BooksTable from "@/components/admin/books/BooksTable";

export default function BooksPage() {


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

    const [search, setSearch] =
        useState("");

    const [category, setCategory] =
        useState("All Categories");
    const filteredBooks = products.filter((book) => {

        const matchesSearch =
            book.title
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            category === "All Categories" ||
            book.categories.includes(category);

        return (
            matchesSearch &&
            matchesCategory
        );
    });

    const [selectedBook, setSelectedBook] =
        useState<any | null>(null);

    const [deleteOpen, setDeleteOpen] =
        useState(false);


    const handleEdit = (book: any) => {
        setSelectedBook(book);

        setFormData({
            title: book.title,
            description: book.description,
            tag: book.tag,
            categories: book.categories.join(", "),
            level: book.level,
            pages: book.pages,
            format: book.format,
            publisher: book.publisher,
            language: book.language,
            price: book.items?.[0]?.price || "",
            image: book.image,
        });

        setPreview(book.image);

        setModalOpen(true);
    };

    const handleDelete = (book: any) => {
        setSelectedBook(book);

        setDeleteOpen(true);
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
                onSubmit={handleSubmit}
                formData={formData}
                onChange={handleChange}
                preview={preview}
                onImageUpload={
                    handleImageUpload
                }
            />

            <BooksFilters
                search={search}
                onSearchChange={setSearch}
                category={category}
                onCategoryChange={setCategory}
            />

            <BooksTable
                books={filteredBooks}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <BooksPagination
                currentPage={currentPage}
                totalPages={3}
                onPageChange={setCurrentPage}
            />

        </div>


    );
}