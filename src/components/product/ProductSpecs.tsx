import React from "react";
import {Product} from "@/data/products";

interface Props {
    product: Product;
}

export default function ProductSpecs({product}: Props) {
    return (
        <div className="space-y-6">
            <section
                className="bg-surface-container-lowest border border-outline-variant p-5 sm:p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <span className="w-1 h-6 bg-primary rounded-full"/>
                    <h2 className="font-h3 text-h3 text-on-background">Detailed Description</h2>
                </div>

                <div className="font-body-md text-on-surface-variant space-y-4">
                    <p className="leading-relaxed">{product.description}</p>

                </div>
            </section>

            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg shadow-sm">
                    <div className="font-label-caps text-on-surface-variant mb-1">Format</div>
                    <div className="font-body-md font-semibold">{product.format ?? "—"}</div>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg shadow-sm">
                    <div className="font-label-caps text-on-surface-variant mb-1">Pages</div>
                    <div className="font-body-md font-semibold">{product.pages ?? "—"}</div>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg shadow-sm">
                    <div className="font-label-caps text-on-surface-variant mb-1">Publisher</div>
                    <div className="font-body-md font-semibold">{product.publisher ?? "—"}</div>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg shadow-sm">
                    <div className="font-label-caps text-on-surface-variant mb-1">Language</div>
                    <div className="font-body-md font-semibold">{product.language ?? "—"}</div>
                </div>
            </div>
        </div>
    );
}

