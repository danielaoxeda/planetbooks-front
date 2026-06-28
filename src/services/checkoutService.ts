import api from "@/lib/axios";
import {CheckoutRequest} from "@/types/checkout";

export async function createCheckoutOrder(payload: CheckoutRequest) {
    const response = await api.post(
        "/v1/checkout",
        payload
    );

    return response.data;
}