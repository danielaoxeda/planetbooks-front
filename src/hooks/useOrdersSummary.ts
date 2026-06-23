"use client";

import { useEffect, useState } from "react";
import { getOrdersSummary } from "@/services/orderService";

export function useOrdersSummary() {

    const [summary, setSummary] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        async function load() {

            try {

                const data =
                    await getOrdersSummary();

                setSummary(data);

            } finally {

                setLoading(false);

            }
        }

        load();

    }, []);

    return {
        summary,
        loading,
    };
}