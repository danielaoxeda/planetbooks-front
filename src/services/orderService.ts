import api from "@/lib/axios";

export async function getOrders() {

    const response =
        await api.get("/orders");

    return response.data;
}
export async function getOrdersSummary() {

    const response =
        await api.get("/orders/summary");

    return response.data;
}