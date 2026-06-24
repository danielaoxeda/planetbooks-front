import {API_URL} from "@/lib/api";

export async function getOrders() {

    const token = localStorage.getItem("token");

    const res = await fetch(
        `${API_URL}/orders`,
        {
            headers: {
                ...(token && {
                    Authorization: `Bearer ${token}`,
                }),
            },
        }
    );

    if (!res.ok) {
        throw new Error("Error loading orders");
    }

    return res.json();
}
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
    )
    console.log("STATUS:", response.status);
    console.log("STATUS TEXT:", response.statusText);

    if (!response.ok) {
        throw new Error(
            "Error loading orders summary"
        );
    }

    return response.json();
}