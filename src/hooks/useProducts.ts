"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { getProducts } from "@/services/productService";

export function useProducts() {
    const [books, setBooks] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        try {
            const data = await getProducts();

            setBooks(
                Array.isArray(data)
                    ? data
                    : data.content ?? []
            );

        } catch (error) {
            console.error("Error loading products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return {
        books,
        setBooks,
        loading,
        refreshProducts: loadProducts,
    };
}