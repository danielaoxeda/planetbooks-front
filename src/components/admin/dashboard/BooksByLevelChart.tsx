"use client";

import { useMemo } from "react";
import { Download, FileBarChart } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";

export default function BooksByLevelChart() {

    const { books, loading } = useProducts();

    const data = useMemo(() => {

        const levels: Record<string, number> = {};

        books.forEach(book => {
            const level = book.level || "Unknown";
            levels[level] = (levels[level] || 0) + 1;
        });

        return Object.entries(levels)
            .sort((a, b) => b[1] - a[1]);

    }, [books]);

    const handleExportCSV = () => {

        const headers = ["Level", "Count"];

        const rows = data.map(([level, count]) => [
            level,
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
        link.setAttribute("download", "books-by-level-report.csv");

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className="bg-white rounded-2xl border p-8 h-[400px] animate-pulse" />
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm h-[400px] flex flex-col">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">

                <div>
                    <h3 className="text-xl font-bold text-gray-900">
                        Books by Level
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        Distribution of books by difficulty level
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
            <div className="space-y-3 flex-1 overflow-auto">

                {data.length === 0 && (
                    <p className="text-sm text-gray-500">
                        No levels found
                    </p>
                )}

                {data.map(([level, count]) => (
                    <div key={level} className="flex justify-between">
                        <span className="text-gray-700">{level}</span>
                        <span className="font-semibold">{count}</span>
                    </div>
                ))}

            </div>

        </div>
    );
}