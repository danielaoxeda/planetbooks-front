import React from "react";
import type {Product} from "@/types/product";
import {ChevronRight} from "lucide-react";

interface Props {
    product: Product;
}

export default function ProductDetails({product}: Props) {
    return (
        <section className="space-y-4 lg:space-y-5">
            <nav
                className="flex items-center space-x-2 text-on-surface-variant font-label-caps uppercase tracking-widest text-[10px]">
                <a className="hover:text-primary transition-colors" href="#">Library</a>
                <ChevronRight size={14} className="text-on-surface-variant"/>
                <a className="hover:text-primary transition-colors" href="#">Study Guides</a>
                <ChevronRight size={14} className="text-on-surface-variant"/>
                <span className="text-primary font-bold">{product.tag ?? ""}</span>
            </nav>

            <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6 shadow-sm">
                <div className="flex flex-col gap-5 md:gap-6">
                    <div className="flex items-center gap-3">
                        <div
                            className="inline-block bg-secondary-container text-on-secondary-container font-label-caps px-3 py-1 rounded-md uppercase text-[10px] sm:text-xs">{product.level ?? ""}</div>
                    </div>

                    <h1 className="font-h1 text-2xl sm:text-3xl lg:text-4xl text-on-background leading-tight">{product.title}</h1>

                    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                        <div className="lg:col-span-7">
                            <p className="font-body-lg text-on-surface-variant leading-relaxed">{product.description}</p>
                        </div>

                        <div className="lg:col-span-5 w-full space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {product.categories?.slice(0, 4).map((c) => (
                                    <span key={c}
                                          className="px-2.5 py-1 text-xs rounded-md bg-surface-container-high text-on-surface-variant border border-outline-variant/60">{c}</span>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm text-on-surface-variant">
                                <div>
                                    <div className="font-label-caps text-[10px]">Publisher</div>
                                    <div className="text-on-background font-semibold">{product.publisher ?? "—"}</div>
                                </div>
                                <div>
                                    <div className="font-label-caps text-[10px]">Pages</div>
                                    <div className="text-on-background font-semibold">{product.pages ?? "—"}</div>
                                </div>
                                <div>
                                    <div className="font-label-caps text-[10px]">Format</div>
                                    <div className="text-on-background font-semibold">{product.format ?? "—"}</div>
                                </div>
                                <div>
                                    <div className="font-label-caps text-[10px]">Language</div>
                                    <div className="text-on-background font-semibold">{product.language ?? "—"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


