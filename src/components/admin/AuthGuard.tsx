"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({
                                      children,
                                  }: {
    children: React.ReactNode;
}) {

    const { user, isReady } = useAuth();
    const router = useRouter();

    useEffect(() => {

        if (!isReady) return;

        if (!user) {
            router.replace("/login");
            return;
        }

        if (user.role !== "ADMIN") {
            router.replace("/");
            return;
        }

    }, [user, isReady, router]);

    if (!isReady) {
        return <p>Cargando...</p>;
    }

    if (!user || user.role !== "ADMIN") {
        return null;
    }

    return <>{children}</>;
}