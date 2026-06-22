import { API_URL } from "@/lib/api";

export async function getProducts() {

    const response = await fetch(
        `${API_URL}/products?page=0&size=100`
    );

    if (!response.ok) {
        throw new Error("Error loading products");
    }

    return response.json();
}