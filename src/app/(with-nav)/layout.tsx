import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "../globals.css";
import Navbar from "@/components/user/navbar/Navbar";
import Footer from "@/components/user/footer/Footer";
import {AuthProvider} from "@/context/AuthContext";
import {CartProvider} from "@/context/CartContext";
import {ToastProvider} from "@/context/ToastContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "PlanetBooks",
    description: "",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
        <body className="min-h-full flex flex-col">
        {/* AuthProvider permite que Navbar y Children compartan datos de sesión.*/}
        <AuthProvider>
            <CartProvider>
                <ToastProvider>
                    <Navbar/>
                    <main className="flex-1 flex flex-col">
                        {children}
                    </main>
                    <Footer/>
                </ToastProvider>
            </CartProvider>
        </AuthProvider>
        </body>
        </html>
    );
}