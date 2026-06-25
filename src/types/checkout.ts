export interface CheckoutRequest {
    items: {
        productId: number;
        itemKey: string;
        quantity: number;
    }[];
}