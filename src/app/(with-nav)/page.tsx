"use client";

import { useProducts } from "@/hooks/useProducts";

import Hero from "@/components/user/home/Hero";
import Certifications from "@/components/user/home/Certifications";
import BooksSection from "@/components/user/home/BooksSection";

export default function Page() {

    const {
        books,
        loading
    } = useProducts();

    const featured =
        [...books]
            .sort((a, b) => b.id - a.id)
            .slice(0, 4);

    if (loading) {
        return (
            <div className="flex justify-center py-10">
                Loading...
            </div>
        );
    }

    return (
        <>
            <Hero />
            <Certifications />
            <BooksSection books={featured} />
        </>
    );
}