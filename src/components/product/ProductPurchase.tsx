"use client";
import React, {useState} from "react";
import type {Product, ProductItem} from "../../data/products";
import {ShoppingCart} from "lucide-react";

interface Props {
    product: Product;
    onSelectItem?: (item: ProductItem) => void;
}

const ProductPurchase: React.FC<Props> = ({product, onSelectItem}) => {
    const defaultItem = product.items?.find((v) => v.default) ?? product.items?.[0];
    const [item, setItem] = useState<ProductItem | undefined>(defaultItem);
    const [quantity, setQuantity] = useState<number>(1);

    const price = item ? item.price : product.price;

    return (
        <div className="w-full">
            <div className="mb-5">
                <div
                    className="text-[36px] sm:text-[40px] font-bold text-on-background font-h2">${price.toFixed(2)}</div>
                <div className="text-on-surface-variant font-label-caps text-[11px]">Inclusive of all international
                    taxes
                </div>
            </div>

            <div className="w-full mb-md">
                <div
                    className="font-label-caps text-on-surface-variant mb-sm uppercase tracking-widest text-[10px]">Choose
                    your book
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm gap-4">
                    {product.items?.map((v) => (
                        <label
                            key={v.key}
                            className={`relative flex flex-row items-center gap-4 p-3 rounded-lg cursor-pointer transition-all border ${
                                v.key === item?.key
                                    ? "border-primary bg-secondary-container/25 shadow-sm"
                                    : "border-outline-variant bg-surface hover:shadow-sm hover:-translate-y-0.5"
                            }`}
                        >
                            <input
                                className="sr-only"
                                name="book_item"
                                type="radio"
                                value={v.key}
                                checked={v.key === item?.key}
                                onChange={() => {
                                    setItem(v);
                                    if (onSelectItem) onSelectItem(v);
                                }}
                            />

                            <img src={v.image ?? product.image} alt={v.title}
                                 className="w-16 h-20 object-cover rounded-sm border border-outline-variant/60 shadow-sm"/>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm font-semibold truncate">{v.title}</div>
                                    <div className="text-sm font-bold text-on-background">${v.price.toFixed(2)}</div>
                                </div>
                                {v.description ? <div
                                    className="text-xs text-on-surface-variant mt-1 truncate">{v.description}</div> : null}
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <label className="text-sm text-on-surface-variant">Qty</label>
                    <input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value || 1)))}
                        className="w-full sm:w-20 text-center rounded-md border border-outline-variant px-2 py-2 bg-surface-container-lowest"
                    />
                </div>

                <button
                    className="w-full sm:flex-1 bg-primary text-on-primary px-6 py-3 font-manrope font-bold rounded-lg hover:brightness-95 transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <ShoppingCart size={16}/>
                    Add to cart
                </button>

            </div>
        </div>
    );
};

export default ProductPurchase;


