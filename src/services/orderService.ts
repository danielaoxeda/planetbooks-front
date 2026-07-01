import api from "@/lib/axios";

export async function getOrders() {

    const response =
        await api.get("/v1/orders");

    return response.data;
}
export async function getOrdersSummary() {

    const response =
        await api.get("/v1/orders/summary");

    return response.data;
}


export async function createOrder(
    userId: number
) {
    const response = await api.post(
        `/v1/orders?userId=${userId}`
    );

    return response.data;
}