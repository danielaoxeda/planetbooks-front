export interface ProductItem {
    id: number;
    productId: number;
    key: string;
    title: string;
    price: number;
    image: string;
    description: string;
    pages: string;
    format: string;
    stock: number;
    isDefault: boolean;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    tag: string;
    categories: string[];
    level: string;
    image: string;
    gallery: string[];
    pages: string;
    format: string;
    publisher: string;
    language: string;
    items: ProductItem[];
}

export interface CreateProductDto {
    title: string;
    description: string;
    tag: string;
    categories: string[];
    level: string;
    image: string;
    pages: number;
    format: string;
    publisher: string;
    language: string;
    items: {
        key: string;
        title: string;
        price: number;
        stock: number;
        isDefault: boolean;
    }[];
}