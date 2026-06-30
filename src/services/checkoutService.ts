import api from "@/lib/axios";
import type { CheckoutRequest, CheckoutResponse } from "@/types/checkout";

export async function createCheckoutOrder(payload: CheckoutRequest): Promise<CheckoutResponse> {
    const response = await api.post<CheckoutResponse>("/v1/checkout", payload);
    return response.data;
}