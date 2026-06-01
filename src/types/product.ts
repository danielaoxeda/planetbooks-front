export interface ProductItem {
    key: string;
    title: string;
    price: number;
    description: string;
    default?: boolean;
    image: string;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    tag: string;
    categories: string[];
    level: string;
    image: string;
    gallery?: string[];
    pages: string;
    format: string;
    publisher: string;
    language: string;
    items: ProductItem[];
}