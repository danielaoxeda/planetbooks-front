import {BookOpen, DollarSign, Layers3, Shapes,} from "lucide-react";

import {getDashboardStats} from "@/utils/adminStats";

const stats = getDashboardStats();

const cards = [
    {
        title: "Products",
        value: stats.totalProducts,
        icon: BookOpen,
    },
    {
        title: "Variants",
        value: stats.totalVariants,
        icon: Layers3,
    },
    {
        title: "Estimated Revenue",
        value: `$${stats.estimatedRevenue}`,
        icon: DollarSign,
    },
    {
        title: "Categories",
        value: stats.totalCategories,
        icon: Shapes,
    },
];

export default function StatsCards() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
                    >
                        <div
                            className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-4">
                            <Icon size={22}/>
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