"use client";

import { BookOpen, Package, LucideIcon } from "lucide-react";
import { useMemo } from "react";
import { useOrders } from "@/hooks/useOrders";

type OrderStatus = "PAID" | "COMPLETED" | "PENDING";
type Order = {
    id: number;
    status: OrderStatus;
    totalAmount: number;
    createdAt: string;
};
const iconMap :  Record<
    OrderStatus,
    {
        icon: LucideIcon;
        bg: string;
        color: string;
        label: string;
    }
> = {
    PAID: {
        icon: BookOpen,
        bg: "bg-blue-100",
        color: "text-blue-700",
        label: "Order Paid",
    },

    COMPLETED: {
        icon: Package,
        bg: "bg-orange-100",
        color: "text-orange-700",
        label: "Order Completed",
    },

    PENDING: {
        icon: Package,
        bg: "bg-yellow-100",
        color: "text-yellow-700",
        label: "Order Pending",
    },
};

export default function ActivityFeed() {

    const { orders, loading } = useOrders() as {
        orders: Order[];
        loading: boolean;
    };

    const activities = useMemo(() => {

        return orders
            .slice()
            .sort((a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 8)
            .map((order) => {

                const config = iconMap[order.status];

                return {
                    id: order.id,
                    type: order.status,
                    title: `${config.label} #${order.id}`,
                    description: `Total $${order.totalAmount ?? 0}`,
                    time: new Date(order.createdAt)
                        .toLocaleString(),
                    icon: config.icon,
                    bg: config.bg,
                    color: config.color,
                };
            });

    }, [orders]);

    if (loading) {
        return (
            <div className="bg-white rounded-2xl border p-6 h-[400px] animate-pulse" />
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-[400px]">

            <div className="flex items-center justify-between mb-6">

                <div>
                    <h3 className="text-xl font-bold text-gray-900">
                        Recent Activity
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        Latest orders updates
                    </p>
                </div>

            </div>

            <div className="space-y-5 overflow-y-auto h-[300px] pr-2">

                {activities.map((activity) => {

                    const Icon = activity.icon;

                    return (
                        <div
                            key={activity.id}
                            className="flex items-start gap-4"
                        >

                            <div
                                className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${activity.bg} ${activity.color}`}
                            >
                                <Icon size={20} />
                            </div>

                            <div className="min-w-0">

                                <h4 className="text-sm font-semibold text-gray-900">
                                    {activity.title}
                                </h4>

                                <p className="text-sm text-gray-500 truncate">
                                    {activity.description}
                                </p>

                                <span className="text-xs text-gray-400 mt-1 block">
                                    {activity.time}
                                </span>

                            </div>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}