import {BookOpen, DollarSign, Layers3, Shapes,} from "lucide-react";

import {getDashboardStats} from "@/utils/adminStats";

const stats = getDashboardStats();

const cards = [
    {
        title: "Products",
        value: stats.totalProducts,
        icon: BookOpen,

        iconBg:
            "bg-blue-100",

        iconColor:
            "text-blue-700",

        border:
            "border-blue-100",
    },
    {
        title: "Variants",
        value: stats.totalVariants,
        icon: Layers3,

        iconBg:
            "bg-purple-100",

        iconColor:
            "text-purple-700",

        border:
            "border-purple-100",
    },
    {
        title: "Estimated Revenue",
        value: `$${stats.estimatedRevenue}`,
        icon: DollarSign,

        iconBg:
            "bg-emerald-100",

        iconColor:
            "text-emerald-700",

        border:
            "border-emerald-100",
    },
    {
        title: "Categories",
        value: stats.totalCategories,
        icon: Shapes,

        iconBg:
            "bg-orange-100",

        iconColor:
            "text-orange-700",

        border:
            "border-orange-100",
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
                        className={`bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition-all ${card.border}`}
                    >
                        <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.iconBg} ${card.iconColor}`}
                        >
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