"use client";

import { useMemo } from "react";
import { Download, FileBarChart } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";

export default function CategoryChart() {

    const { books, loading } = useProducts();

    const data = useMemo(() => {

        const categories: Record<string, number> = {};

        books.forEach(book => {
            book.categories.forEach(cat => {
                categories[cat] = (categories[cat] || 0) + 1;
            });
        });

        return Object.entries(categories)
            .sort((a, b) => b[1] - a[1]);

    }, [books]);

    const handleExportCSV = () => {

        const headers = ["Category", "Count"];

        const rows = data.map(([cat, count]) => [
            cat,
            count,
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(",")),
        ].join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "categories-report.csv");

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className="bg-white rounded-2xl border p-8 h-[300px] animate-pulse" />
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">

                <div>
                    <h3 className="text-xl font-bold text-gray-900">
                        Top Categories
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        Most used book categories
                    </p>
                </div>

                <div className="flex gap-3">

                    <button
                        onClick={handleExportCSV}
                        className="px-4 py-2 rounded-xl border border-gray-200 text-sm flex items-center gap-2 hover:bg-gray-50"
                    >
                        <Download size={16} />
                        Export CSV
                    </button>

                    <button className="px-4 py-2 rounded-xl bg-green-700 text-white text-sm flex items-center gap-2 hover:bg-green-800">
                        <FileBarChart size={16} />
                        View Report
                    </button>

                </div>

            </div>

            {/* Content */}
            <div className="space-y-3">

                {data.length === 0 && (
                    <p className="text-sm text-gray-500">
                        No categories found
                    </p>
                )}

                {data.slice(0, 5).map(([cat, count]) => (
                    <div key={cat} className="flex justify-between">
                        <span className="text-gray-700">{cat}</span>
                        <span className="font-semibold">{count}</span>
                    </div>
                ))}

            </div>

        </div>
    );
}