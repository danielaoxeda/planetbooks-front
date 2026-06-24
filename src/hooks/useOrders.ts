"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/services/orderService";

export function useOrders() {

    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {

            try {

                const data = await getOrders();

                setOrders(
                    Array.isArray(data)
                        ? data
                        : data.content ?? []
                );

            } finally {
                setLoading(false);
            }
        }

        load();

    }, []);

    return { orders, loading };
}