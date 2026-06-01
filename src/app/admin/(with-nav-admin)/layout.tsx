import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { AuthProvider } from "@/context/AuthContext"; // <--- Tu aporte
import { CartProvider } from "@/context/CartContext";
import Sidebar from "@/components/admin/sidebar/Sidebar";
import TopBar from "@/components/admin/topbar/Topbar";

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
        <body className="min-h-full flex">
        {/* AuthProvider permite que Navbar y Children compartan datos de sesión.*/}
        <AuthProvider>
            <CartProvider>
                <Sidebar />
                <main className="flex-1 flex flex-col ">
                    <TopBar />
                    <div className="p-4">{children}</div>
                </main>
            </CartProvider>
        </AuthProvider>
        </body>
        </html>
    );
}