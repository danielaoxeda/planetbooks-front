"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { useProducts } from "@/hooks/useProducts";

interface Props {
    currentId?: number;
}

export default function RelatedBooks({
                                         currentId,
                                     }: Props) {

    const { books, loading } = useProducts();

    const items = useMemo(() => {

        if (!books) return [];

        return books
            .filter(p => p.id !== currentId)
            .slice(0, 4);

    }, [books, currentId]);

    if (loading) {
        return (
            <div className="py-10 text-center text-gray-500">
                Loading related books...
            </div>
        );
    }

    return (
        <div>

            <div className="flex items-center justify-between mb-6">

                <h2 className="font-h2 text-h2 text-on-background">
                    Libros relacionados
                </h2>

                <Link
                    className="text-primary font-manrope font-bold hover:underline flex items-center gap-2"
                    href="/catalog"
                >
                    View Library
                    <ArrowRight size={16} />
                </Link>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">

                {items.map((it) => {

                    const price =
                        it.items?.[0]?.price ?? 0;

                    return (
                        <Link
                            key={it.id}
                            href={`/catalog/${it.id}`}
                            className="group block bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                        >

                            <div className="relative">

                                <div className="relative w-full aspect-3/4">

                                    <Image
                                        alt={it.title}
                                        className="object-contain"
                                        fill
                                        src={it.image}
                                    />

                                </div>

                                <div className="absolute top-2 left-2 bg-surface-container-lowest/90 border border-outline-variant text-[11px] px-2 py-1 rounded-md">
                                    {it.tag}
                                </div>

                            </div>

                            <div className="p-4">

                                <h3 className="font-body-md font-semibold mb-2 leading-tight text-on-background group-hover:text-primary transition-colors">
                                    {it.title}
                                </h3>

                                <div className="text-sm text-on-surface-variant mb-2">
                                    {it.items?.[0]?.title ?? "Item disponible"}
                                </div>

                                <div className="flex items-center justify-between">

                                    <div className="text-sm text-on-surface-variant">
                                        {it.level}
                                    </div>

                                    <div className="text-on-background font-bold">
                                        ${price.toFixed(2)}
                                    </div>

                                </div>

                            </div>

                        </Link>
                    );
                })}

            </div>
        </div>
    );
}