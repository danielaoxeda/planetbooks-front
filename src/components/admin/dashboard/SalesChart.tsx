"use client";

import {
    Download,
    FileBarChart,
} from "lucide-react";

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { useMemo } from "react";
import { useOrdersSummary } from "@/hooks/useOrdersSummary";

function buildSalesChart(summary: any) {

    if (!summary) return [];

    const totalRevenue = summary.totalRevenue ?? 0;
    const days = 30;
    const base = totalRevenue / days;

    return Array.from({ length: days }).map((_, i) => {

        const date = new Date();
        date.setDate(date.getDate() - (days - i));

        return {
            date: date.toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
            }),
            sales: Math.round(base + Math.random() * base * 0.3),
        };
    });
}

export default function SalesChart() {

    const { summary, loading } = useOrdersSummary();

    const data = useMemo(() => {
        return buildSalesChart(summary);
    }, [summary]);

    const handleExportCSV = () => {

        const headers = ["Date", "Sales"];

        const rows = data.map((item) => [
            item.date,
            item.sales,
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map((row) => row.join(",")),
        ].join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "sales-report.csv");

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

            <div className="flex justify-between items-center mb-8">

                <div>
                    <h3 className="text-xl font-bold text-gray-900">
                        Sales Performance
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        Last 30 days analytics
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

            <div className="flex-1">

                <ResponsiveContainer width="100%" height="100%">

                    <AreaChart data={data}>

                        <defs>
                            <linearGradient
                                id="sales"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#16a34a"
                                    stopOpacity={0.35}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#16a34a"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" vertical={false} />

                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            fontSize={12}
                        />

                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            fontSize={12}
                        />

                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="#16a34a"
                            strokeWidth={3}
                            fill="url(#sales)"
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}