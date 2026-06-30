"use client";

import { useProducts } from "./useProducts";

export function useAdminBooks() {

    const {
        books,
        setBooks,
        loading,
        refreshProducts,
    } = useProducts();

    return {
        books,
        setBooks,
        loading,
        refreshProducts,
    };
}