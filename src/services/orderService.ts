import {API_URL} from "@/lib/api";

export async function getOrdersSummary() {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/orders/summary`,
        {
            headers: {
                ...(token && {
                    Authorization:
                        `Bearer ${token}`,
                }),
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            "Error loading orders summary"
        );
    }

    return response.json();
}