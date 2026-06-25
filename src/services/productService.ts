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
            await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if(axiosError.response?.status === 404) {
            return null;
        }
        throw error;
    }
}
