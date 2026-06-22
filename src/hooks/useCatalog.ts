"use client";

import { useEffect, useMemo, useState } from "react";

type ProductItem = {
    id: number;
    price: number;
    isDefault: boolean;
};

export type Product = {
    id: number;
    title: string;
    description: string;
    tag: string;
    categories: string[];
    level: string;
    image: string;
    items: ProductItem[];
};

export function useCatalog() {
    const [books, setBooks] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedLevel, setSelectedLevel] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("Most Popular");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 12;

    const getPrice = (book: Product) =>
        book.items?.find(i => i.isDefault)?.price ??
        book.items?.[0]?.price ??
        0;

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch(
                    "https://planetbook.solidwebs.com/api/v1/products?page=0&size=100",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            ...(token && {
                                Authorization: `Bearer ${token}`,
                            }),
                        },
                    }
                );

                // 🧪 LOG 1: status del backend
                console.log("STATUS:", res.status);

                const data = await res.json();

                // 🧪 LOG 2: respuesta cruda del backend
                console.log("RAW DATA BACKEND FULL:", JSON.stringify(data, null, 2));

                const normalized = Array.isArray(data)
                    ? data
                    : data.content ?? [];

                // 🧪 LOG 3: data final que usará el frontend
                console.log("NORMALIZED BOOKS:", normalized);

                setBooks(normalized);
            } catch (err) {
                console.error("ERROR FETCH PRODUCTS:", err);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const filteredBooks = useMemo(() => {
        let result = books.filter(book => {
            const matchTag =
                selectedTags.length === 0 ||
                selectedTags.some(t =>
                    book.categories?.includes(t)
                );

            const matchLevel =
                !selectedLevel || book.level === selectedLevel;

            const q = searchTerm.toLowerCase();

            const matchSearch =
                !q ||
                book.title?.toLowerCase().includes(q) ||
                book.description?.toLowerCase().includes(q) ||
                book.tag?.toLowerCase().includes(q);

            return matchTag && matchLevel && matchSearch;
        });

        if (sortBy === "Price: Low to High") {
            result = [...result].sort(
                (a, b) => getPrice(a) - getPrice(b)
            );
        }

        if (sortBy === "Price: High to Low") {
            result = [...result].sort(
                (a, b) => getPrice(b) - getPrice(a)
            );
        }

        return result;
    }, [books, selectedTags, selectedLevel, searchTerm, sortBy]);

    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

    const paginatedBooks = useMemo(() => {
        return filteredBooks.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    }, [filteredBooks, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedTags, selectedLevel, searchTerm, sortBy]);

    const clearFilters = () => {
        setSelectedTags([]);
        setSelectedLevel("");
        setSearchTerm("");
        setSortBy("Most Popular");
    };

    return {
        books,
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
    };
}