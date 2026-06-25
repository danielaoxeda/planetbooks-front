"use client";

import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import type {Product, ProductItem} from "@/types/product";

export interface CartItem {
    productId: number;
    productTitle: string;
    productImage: string;
    itemKey: string;
    itemTitle: string;
    itemDescription?: string;
    itemPrice: number;
    quantity: number;
}

export interface CheckoutItem {
    productId: number;
    itemKey: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    isHydrated: boolean;
    cartCount: number;
    cartSubtotal: number;
    addToCart: (product: Product, item: ProductItem, quantity?: number) => void;
    updateQuantity: (itemKey: string, quantity: number) => void;
    removeFromCart: (itemKey: string) => void;
    clearCart: () => void;
    getCheckoutPayload: () => CheckoutItem[];
}

const CART_STORAGE_KEY = "pb_cart";

export const CartContext = createContext<CartContextType | undefined>(undefined);

function getCartItemKey(productId: number, itemKey: string) {
    return `${productId}:${itemKey}`;
}

function safeParseCart(rawValue: string | null): CartItem[] {
    if (!rawValue) return [];

    try {
        const parsed = JSON.parse(rawValue) as CartItem[];
        if (!Array.isArray(parsed)) return [];

        return parsed.filter((item) => (
            typeof item?.productId === "number"
            && typeof item?.itemKey === "string"
            && typeof item?.quantity === "number"
        ));
    } catch {
        return [];
    }
}

export function CartProvider({children}: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const savedCart = safeParseCart(localStorage.getItem(CART_STORAGE_KEY));
        Promise.resolve().then(() => {
            setItems(savedCart);
            setIsHydrated(true);
        });
    }, []);

    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [items, isHydrated]);

    const getCheckoutPayload = () => {
        return items.map(item => ({
            productId: item.productId,
            itemKey: item.itemKey,
            quantity: item.quantity,
        }));
    };

    const addToCart = (product: Product, item: ProductItem, quantity = 1) => {
        const normalizedQuantity = Math.max(1, quantity);
        const itemKey = getCartItemKey(product.id, item.key);

        setItems((current) => {
            const existingIndex = current.findIndex((currentItem) => currentItem.itemKey === itemKey);

            if (existingIndex >= 0) {
                return current.map((currentItem) => (
                    currentItem.itemKey === itemKey
                        ? {...currentItem, quantity: currentItem.quantity + normalizedQuantity}
                        : currentItem
                ));
            }

            return [
                ...current,
                {
                    productId: product.id,
                    productTitle: product.title,
                    productImage: item.image ?? product.image,
                    itemKey,
                    itemTitle: item.title,
                    itemDescription: item.description,
                    itemPrice: item.price,
                    quantity: normalizedQuantity,
                },
            ];
        });
    };

    const updateQuantity = (itemKey: string, quantity: number) => {
        const normalizedQuantity = Math.max(1, quantity);
        setItems((current) => current.map((item) => (
            item.itemKey === itemKey ? {...item, quantity: normalizedQuantity} : item
        )));
    };

    const removeFromCart = (itemKey: string) => {
        setItems((current) => current.filter((item) => item.itemKey !== itemKey));
    };

    const clearCart = () => {
        setItems([]);
    };

    const {cartCount, cartSubtotal} = useMemo(() => {
        return items.reduce(
            (accumulator, item) => ({
                cartCount: accumulator.cartCount + item.quantity,
                cartSubtotal: accumulator.cartSubtotal + (item.itemPrice * item.quantity),
            }),
            {cartCount: 0, cartSubtotal: 0}
        );
    }, [items]);

    const value = {
        items,
        isHydrated,
        cartCount,
        cartSubtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCheckoutPayload
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
}
