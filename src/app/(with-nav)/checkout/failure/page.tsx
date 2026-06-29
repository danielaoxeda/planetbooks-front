import Link from "next/link";

export default function CheckoutFailurePage() {
    return (
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-lg flex-col items-center rounded-3xl border border-outline-variant bg-surface-container-lowest px-8 py-12 text-center shadow-sm">

                <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M10 10l4 4m0 -4l-4 4" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-on-surface">Payment declined</h1>
                <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
                    Something went wrong with your payment. Check your card details and try again.
                </p>

                <div className="mt-6 w-full rounded-2xl border border-outline-variant bg-surface-container-low px-5 py-4 text-left">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-on-surface-variant">Status</span>
                        <span className="font-semibold text-red-600">Failed</span>
                    </div>
                </div>

                <Link
                    href="/cart"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition-colors hover:brightness-95"
                >
                    Back to cart
                </Link>
            </div>
        </main>
    );
}