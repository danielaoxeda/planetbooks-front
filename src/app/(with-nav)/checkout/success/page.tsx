"use client"

import Link from "next/link";
import {useEffect, useRef} from "react";
import {createOrder} from "@/services/orderService";
import {authService} from "@/services/authService";

export default function CheckoutSuccessPage() {

    const orderCreated = useRef(false);
    useEffect(() => {
        if (orderCreated.current) {
            return;
        }
        orderCreated.current = true;
        const saveOrder = async () => {

            try {
                const user= await authService.getMe();
                const order = await createOrder(user.id);

            } catch (error) {

                console.error("ORDER ERROR",error);

            }
        };

        saveOrder();

    }, []);

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-lg flex-col items-center rounded-3xl border border-outline-variant bg-surface-container-lowest px-8 py-12 text-center shadow-sm">

                <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M9 12l2 2l4 -4" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-on-surface">Payment confirmed</h1>
                <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
                    Your order has been placed. Check your email for the receipt and delivery details.
                </p>

                <div className="mt-6 w-full rounded-2xl border border-outline-variant bg-surface-container-low px-5 py-4 text-left">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-on-surface-variant">Status</span>
                        <span className="font-semibold text-green-600">Confirmed</span>
                    </div>
                </div>

                <Link
                    href="/catalog"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition-colors hover:brightness-95"
                >
                    Continue shopping
                </Link>
            </div>
        </main>
    );
}