import api from "@/lib/axios";

export async function addCartItem(
    userId: number,
    productId: number,
    itemKey: string,
    quantity: number
) {
    const response = await api.post(
        `/v1/carts/items?userId=${userId}`,
        {
            productId,
            itemKey,
            quantity,
        }
    );

    return response.data;
}

export async function getCart(userId: number) {
    const response = await api.get(
        `/v1/carts?userId=${userId}`
    );

    return response.data;
}

export async function clearBackendCart(
    userId: number
) {
    const response = await api.delete(
        `/v1/carts?userId=${userId}`
    );

    return response.data;
}