import React from "react";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import products from "@/data/products";

interface Props {
    params: Promise<{ productId: string }>;
}

export default async function ProductDetailPage({params}: Props) {
    const {productId} = await params;


    const id = Number(productId);
    const product = products.find((p) => p.id === id);

    if (!product) {
        return (
            <main className="pt-32 px-8 max-w-7xl mx-auto">
                <div className="text-center py-20">Producto no encontrado.</div>
            </main>
        );
    }

    return <ProductDetailClient product={product}/>;
}