"use client";
import React, {useState} from "react";
import type {Product, ProductItem} from "@/types/product";
import ProductGallery from "./ProductGallery";
import ProductDetails from "./ProductDetails";
import ProductPurchase from "./ProductPurchase";
import ProductSpecs from "./ProductSpecs";
import RelatedBooks from "./RelatedBooks";

interface Props {
    product: Product;
}

export default function ProductDetailClient({product}: Props) {
    const defaultImage = product.items?.[0]?.image ?? product.image;
    const [selectedImage, setSelectedImage] = useState<string>(defaultImage as string);

    function handleSelectItems(items: ProductItem[]) {
        setSelectedImage(items.find((item) => item.image)?.image ?? defaultImage);
    }

    return (
        <main className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="w-full md:col-span-5 lg:col-span-4 md:sticky md:top-32">
                    <ProductGallery cover={product.image} images={product.gallery} selectedImage={selectedImage}
                                    onSelect={(s) => setSelectedImage(s)}/>
                </div>

                <div className="w-full md:col-span-7 lg:col-span-8 flex flex-col gap-6 lg:gap-8">
                    <ProductDetails product={product}/>

                    <div
                        className="rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-5 sm:px-6 shadow-sm">
                        <ProductPurchase product={product} onSelectItems={handleSelectItems}/>
                    </div>

                    <ProductSpecs product={product}/>
                </div>
            </div>

            <section className="mt-12 lg:mt-16">
                <RelatedBooks currentId={product.id}/>
            </section>
        </main>
    );
}

