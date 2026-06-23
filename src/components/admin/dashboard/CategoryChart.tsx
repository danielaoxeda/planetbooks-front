"use client";

import { useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";

export default function CategoryChart() {

    const { books } = useProducts();

    const data = useMemo(() => {

        const categories: Record<string, number> = {};

        books.forEach(book => {
            book.categories.forEach(cat => {
                categories[cat] =
                    (categories[cat] || 0) + 1;
            });
        });

        return Object.entries(categories)
            .sort((a, b) => b[1] - a[1]);

    }, [books]);

    return (
        <section className="bg-white rounded-2xl p-6 shadow-sm border">
            <h3 className="text-lg font-bold mb-4">
                Top Categories
            </h3>

            <div className="space-y-3">
                {data.slice(0, 5).map(([cat, count]) => (
                    <div key={cat} className="flex justify-between">
                        <span>{cat}</span>
                        <span className="font-semibold">
                            {count}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}