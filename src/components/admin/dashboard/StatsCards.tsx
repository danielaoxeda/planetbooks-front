"use client";

import {
    BookOpen,
    DollarSign,
    Layers3,
    ShoppingCart,
} from "lucide-react";

import { useProducts } from "@/hooks/useProducts";
import { useOrdersSummary } from "@/hooks/useOrdersSummary";

export default function StatsCards() {

    const {
        books,
        loading: productsLoading,
    } = useProducts();

    const {
        summary,
        loading: summaryLoading,
    } = useOrdersSummary();

    if (productsLoading || summaryLoading) {
        return (
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="bg-white rounded-2xl border p-6 shadow-sm h-[140px] animate-pulse"
                    />
                ))}
            </section>
        );
    }

    const totalProducts = books.length;

    const totalVariants = books.reduce(
        (acc, product) =>
            acc + (product.items?.length ?? 0),
        0
    );

    const cards = [
        {
            title: "Products",
            value: totalProducts,
            icon: BookOpen,

            iconBg: "bg-blue-100",
            iconColor: "text-blue-700",
            border: "border-blue-100",
        },

        {
            title: "Variants",
            value: totalVariants,
            icon: Layers3,

            iconBg: "bg-purple-100",
            iconColor: "text-purple-700",
            border: "border-purple-100",
        },

        {
            title: "Revenue",
            value: `$${(
                summary?.totalRevenue ?? 0
            ).toFixed(2)}`,

            icon: DollarSign,

            iconBg: "bg-emerald-100",
            iconColor: "text-emerald-700",
            border: "border-emerald-100",
        },

        {
            title: "Orders",
            value:
                summary?.totalOrders ?? 0,

            icon: ShoppingCart,

            iconBg: "bg-orange-100",
            iconColor: "text-orange-700",
            border: "border-orange-100",
        },
    ];

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {cards.map((card) => {

                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className={`
                            bg-white
                            rounded-2xl
                            border
                            p-6
                            shadow-sm
                            hover:shadow-md
                            transition-all
                            ${card.border}
                        `}
                    >
                        <div
                            className={`
                                w-12
                                h-12
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                mb-4
                                ${card.iconBg}
                                ${card.iconColor}
                            `}
                        >
                            <Icon size={22} />
                        </div>

                        <p className="text-sm text-gray-500">
                            {card.title}
                        </p>

                        <h3 className="text-3xl font-bold mt-1">
                            {card.value}
                        </h3>
                    </div>
                );
            })}

        </section>
    );
}