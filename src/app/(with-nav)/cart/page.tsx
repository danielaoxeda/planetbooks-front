"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

function formatPrice(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
}

export default function CartPage() {
    const { items, cartCount, cartSubtotal, isHydrated, updateQuantity, removeFromCart, clearCart } = useCart();

    if (!isHydrated) {
        return (
            <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest px-6 py-10 text-center text-on-surface-variant shadow-sm">
                    Loading cart...
                </div>
            </main>
        );
    }

    if (items.length === 0) {
        return (
            <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-outline-variant bg-surface-container-lowest px-6 py-12 text-center shadow-sm">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <ShoppingBag size={28} />
                    </div>
                    <h1 className="text-2xl font-bold text-on-surface">Your cart is empty</h1>
                    <p className="mt-2 text-sm text-on-surface-variant">
                        Add products from each book detail page. For now, the cart is stored only in this browser.
                    </p>
                    <Link
                        href="/catalog"
                        className="mt-6 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition-colors hover:brightness-95"
                    >
                        Go to catalog
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-on-surface">Temporary cart</h1>
                    <p className="mt-1 text-sm text-on-surface-variant">
                        {cartCount} {cartCount === 1 ? "item" : "items"} saved locally in this browser.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={clearCart}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-error/20 bg-error/5 px-4 py-2 text-sm font-semibold text-error transition-colors hover:bg-error/10"
                >
                    <Trash2 size={16} />
                    Clear cart
                </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
                <section className="space-y-4">
                    {items.map((item) => (
                        <article
                            key={item.itemKey}
                            className="flex flex-col gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 shadow-sm sm:flex-row"
                        >
                            <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-surface-container sm:h-32 sm:w-24">
                                <Image
                                    src={item.productImage}
                                    alt={item.itemTitle}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 96px"
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex min-w-0 flex-1 flex-col gap-3">
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                                        {item.productTitle}
                                    </p>
                                    <h2 className="text-lg font-bold text-on-surface">{item.itemTitle}</h2>
                                    {item.itemDescription ? (
                                        <p className="mt-1 text-sm text-on-surface-variant">{item.itemDescription}</p>
                                    ) : null}
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="inline-flex items-center rounded-full border border-outline-variant bg-surface px-2 py-1">
                                            <button
                                                type="button"
                                                onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                                                className="rounded-full p-1 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
                                                aria-label={`Decrease quantity of ${item.itemTitle}`}
                                            >
                                                <Minus size={14} />
                                            </button>

                                            <span className="min-w-10 px-3 text-center text-sm font-semibold text-on-surface">
                                                {item.quantity}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                                                className="rounded-full p-1 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
                                                aria-label={`Increase quantity of ${item.itemTitle}`}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => removeFromCart(item.itemKey)}
                                            className="text-sm font-medium text-error transition-colors hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs uppercase tracking-wide text-on-surface-variant">Subtotal</p>
                                        <p className="text-lg font-bold text-on-surface">
                                            {formatPrice(item.itemPrice * item.quantity)}
                                        </p>
                                        <p className="text-xs text-on-surface-variant">
                                            {formatPrice(item.itemPrice)} each
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>

                <aside className="h-fit rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm lg:sticky lg:top-24">
                    <h2 className="text-lg font-bold text-on-surface">Summary</h2>
                    <div className="mt-4 space-y-3 text-sm text-on-surface-variant">
                        <div className="flex items-center justify-between">
                            <span>Items</span>
                            <span className="font-semibold text-on-surface">{cartCount}</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-outline-variant pt-3">
                            <span>Estimated total</span>
                            <span className="text-base font-bold text-on-surface">{formatPrice(cartSubtotal)}</span>
                        </div>
                    </div>

                    <p className="mt-4 rounded-xl bg-secondary-container/30 px-4 py-3 text-xs text-on-surface-variant">
                        This cart is temporary: it is saved in the browser until we add sessions and backend support.
                    </p>

                    <Link
                        href="/catalog"
                        className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition-colors hover:brightness-95"
                    >
                        Continue shopping
                    </Link>
                </aside>
            </div>
        </main>
    );
}
