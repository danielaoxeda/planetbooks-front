import ProductDetailClient from "@/components/user/product/ProductDetailClient";
import { getProductById } from "@/services/productService";

interface Props {params: Promise<{ productId: string }>;
}
export default async function ProductDetailPage({params,}: Props) {

    const { productId } = await params;

    const product = await getProductById(Number(productId));

    if (!product) {
        return (
            <main className="pt-32 px-8 max-w-7xl mx-auto">
                <div className="text-center py-20">
                    Product not found.
                </div>
            </main>
        );
    }

    return (
        <ProductDetailClient product={product}/>
    );
}