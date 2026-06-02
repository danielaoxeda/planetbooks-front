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

export function getRecentActivities() {
    return products.slice(0, 5).map((product, index) => ({
        id: product.id,

        title:
            index % 2 === 0
                ? "New Product Added"
                : "Inventory Updated",

        description: product.title,

        time: `${index + 1} hour ago`,

        type:
            index % 2 === 0
                ? "product"
                : "inventory",
    }));
}

export function getSalesData() {
    return [
        {
            date: "Oct 01",
            sales: 1200,
        },
        {
            date: "Oct 05",
            sales: 2100,
        },
        {
            date: "Oct 10",
            sales: 1800,
        },
        {
            date: "Oct 15",
            sales: 2600,
        },
        {
            date: "Oct 20",
            sales: 3200,
        },
        {
            date: "Oct 25",
            sales: 2800,
        },
        {
            date: "Oct 30",
            sales: 4100,
        },
    ];
}