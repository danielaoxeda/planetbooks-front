import {BadgeCheck, BookOpen, DollarSign,} from "lucide-react";

const stats = [
    {
        title: "Total Revenue",
        value: "$42,905",
        icon: DollarSign,
    },
    {
        title: "Books Sold",
        value: "1,284",
        icon: BookOpen,
    },
    {
        title: "Subscriptions",
        value: "3,492",
        icon: BadgeCheck,
    },
];

export default function StatsCards() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.title}
                        className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
                    >
                        <div
                            className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-700 mb-4">
                            <Icon size={22}/>
                        </div>

                        <p className="text-sm text-gray-500">
                            {stat.title}
                        </p>

                        <h3 className="text-2xl font-bold mt-1">
                            {stat.value}
                        </h3>
                    </div>
                );
            })}
        </section>
    );
}