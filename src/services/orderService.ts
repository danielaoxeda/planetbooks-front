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