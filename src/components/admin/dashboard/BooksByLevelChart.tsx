"use client";

import { useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";

export default function BooksByLevelChart() {

    const { books } = useProducts();

    const data = useMemo(() => {

        const levels: Record<string, number> = {};

        books.forEach(book => {
            levels[book.level] =
                (levels[book.level] || 0) + 1;
        });

        return Object.entries(levels);

    }, [books]);

    return (
        <section className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm h-[400px] flex flex-col">
            <h3 className="text-lg font-bold mb-4">
                Books by Level
            </h3>

            <div className="space-y-3">
                {data.map(([level, count]) => (
                    <div key={level} className="flex justify-between">
                        <span>{level}</span>
                        <span className="font-semibold">
                            {count}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}