"use client";
import React, {useState} from "react";
import type {Product, ProductItem} from "@/types/product";
import {ShoppingCart} from "lucide-react";
import {useCart} from "@/context/CartContext";

interface Props {
    product: Product;
    onSelectItems?: (items: ProductItem[]) => void;
}

export default function ProductPurchase({product, onSelectItems}: Props) {
    const firstItem = product.items?.[0];
    const [selectedItems, setSelectedItems] = useState<ProductItem[]>(firstItem ? [firstItem] : []);
    const [quantity, setQuantity] = useState<number>(1);
    const {addToCart} = useCart();

    const price = selectedItems.length > 0
        ? selectedItems.reduce((sum, current) => sum + current.price, 0)
        : firstItem?.price ?? 0;

    function toggleItem(item: ProductItem) {
        setSelectedItems((current) => {
            const exists = current.some((selected) => selected.key === item.key);
            const nextItems = exists
                ? current.filter((selected) => selected.key !== item.key)
                : [...current, item];

            if (onSelectItems) onSelectItems(nextItems);

            return nextItems;
        });
    }

    function handleAddToCart() {
        const itemsToAdd = selectedItems.length > 0
            ? selectedItems
            : firstItem
                ? [firstItem]
                : [];

        itemsToAdd.forEach((item) => addToCart(product, item, quantity));
    }

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
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3">
                    {product.items?.map((v) => (
                        <label
                            key={v.key}
                            className={`relative flex flex-row items-center gap-4 p-3 rounded-lg cursor-pointer transition-all border ${
                                selectedItems.some((selected) => selected.key === v.key)
                                    ? "border-primary bg-secondary-container/25 shadow-sm"
                                    : "border-outline-variant bg-surface hover:shadow-sm hover:-translate-y-0.5"
                            }`}
                        >
                            <input
                                className="sr-only"
                                name="book_item"
                                type="checkbox"
                                value={v.key}
                                checked={selectedItems.some((selected) => selected.key === v.key)}
                                onChange={() => toggleItem(v)}
                            />

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

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <label className="text-sm font-medium text-on-surface-variant shrink-0">Qty</label>
                    <input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value || 1)))}
                        className="flex-1 sm:w-20 text-center rounded-md border border-outline-variant px-2 py-2.5 bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full sm:flex-1 bg-primary text-on-primary px-6 py-3 font-manrope font-bold rounded-lg hover:brightness-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                    <ShoppingCart size={18}/>
                    <span>Add to cart</span>
                </button>

            </div>
        </div>
    );
};



