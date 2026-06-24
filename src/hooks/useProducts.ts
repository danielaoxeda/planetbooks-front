"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";

export function useProducts() {
    const [books, setBooks] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                "https://planetbook.solidwebs.com/api/v1/products?page=0&size=100",
                {
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && {
                            Authorization: `Bearer ${token}`,
                        }),
                    },
                }
            );

            const data = await res.json();

            setBooks(
                Array.isArray(data)
                    ? data
                    : data.content ?? []
            );

        } catch (error) {
            console.error(error);
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