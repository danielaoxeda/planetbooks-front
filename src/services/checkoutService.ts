import axios from "axios";
import type { CheckoutResponse } from "@/types/checkout";
import type { CartItem } from "@/context/CartContext";

export async function createCheckoutOrder(items: CartItem[]): Promise<CheckoutResponse> {
    const response = await axios.post<CheckoutResponse>("/api/checkout", { items });
    return response.data;
}