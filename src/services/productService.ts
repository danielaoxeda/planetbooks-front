import api from "@/lib/axios";
import {AxiosError} from "axios";

export async function getProducts() {

    const response =
        await api.get("/products");

    return response.data;
}

export async function getProductById(id: number) {
    try {
        const response =
            await api.get(`/v1/products/${id}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if(axiosError.response?.status === 404) {
            return null;
        }
        throw error;
    }
}

export async function createProduct(product: any) {

    const response =
        await api.post(
            "/v1/products",
            product
        );

    return response.data;
}
