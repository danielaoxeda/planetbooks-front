import api from "@/lib/axios";
import {AxiosError} from "axios";
import {CreateProductDto, Product} from "@/types/product";

export async function getProducts() {
    const response = await api.get("/v1/products");
    return response.data;
}

export async function getProductById(id: number) {
    try {
        const response = await api.get(`/v1/products/${id}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if(axiosError.response?.status === 404) {
            return null;
        }
        throw error;
    }
}

export async function createProduct(
    product: CreateProductDto) {
    const response = await api.post("/v1/products", product);
    return response.data;
}

export async function updateProduct(
    id: number,
    product: Product,
) {
    const response = await api.put(`/v1/products/${id}`, product);
    return response.data;
}

export async function deleteProduct(id: number) {
    const response = await api.delete(`/v1/products/${id}`);
    return response.data;
}

export async function uploadProductImage(
    productId: number,
    file: File
) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(
        `/v1/products/${productId}/images`,
        formData
    );

    return response.data;
}