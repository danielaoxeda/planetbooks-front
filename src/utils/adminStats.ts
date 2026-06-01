import {products} from "@/data/products";

export function getDashboardStats() {
    const totalProducts = products.length;

    const totalVariants = products.reduce(
        (acc, product) => acc + product.items.length,
        0
    );

    const estimatedRevenue = products.reduce(
        (acc, product) =>
            acc +
            product.items.reduce(
                (sum, item) => sum + item.price,
                0
            ),
        0
    );

    const categories = new Set(
        products.flatMap((p) => p.categories)
    );

    return {
        totalProducts,
        totalVariants,
        estimatedRevenue,
        totalCategories: categories.size,
    };
}