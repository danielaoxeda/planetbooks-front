"use client";

import {Geist, Geist_Mono} from "next/font/google";
import "../../globals.css";
import {AuthProvider} from "@/context/AuthContext";
import {CartProvider} from "@/context/CartContext";
import Sidebar from "@/components/admin/sidebar/Sidebar";
import TopBar from "@/components/admin/topbar/Topbar";
import {useState} from "react";
import {usePathname} from "next/navigation";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const topbarConfig: Record<
        string,
        {
            title: string;
            subtitle: string;
        }
    > = {
        "/admin/dashboard": {
            title: "Dashboard",
            subtitle:
                "Overview of platform analytics",
        },

        "/admin/users": {
            title: "Users",
            subtitle:
                "Manage platform users",
        },

        "/admin/books": {
            title: "Books",
            subtitle:
                "Manage products and inventory",
        },

        "/admin/settings": {
            title: "Settings",
            subtitle:
                "Configure your platform",
        },
    };
    const currentTopbar =
        Object.entries(topbarConfig).find(
            ([route]) =>
                pathname.startsWith(route)
        )?.[1] || {
            title: "Admin Panel",
            subtitle:
                "Manage your platform",
        };
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
        <body className="min-h-full flex flex-col md:flex-row overflow-x-hidden">
        <AuthProvider>
            <CartProvider>
                <Sidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />
                <div className="flex-1 flex flex-col w-full min-h-screen overflow-x-hidden md:ml-64">
                    <TopBar
                        title={currentTopbar.title}
                        subtitle={currentTopbar.subtitle}
                        onMenuClick={() =>
                            setSidebarOpen(!sidebarOpen)
                        }
                    />
                    <main className="flex-1 overflow-y-auto overflow-x-hidden">
                        {children}
                    </main>
                </div>
            </CartProvider>
        </AuthProvider>
        </body>
        </html>
    );
}