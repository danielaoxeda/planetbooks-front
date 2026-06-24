import ProductCard from "@/components/user/catalog/ProductCard";
import { Product } from "@/hooks/useCatalog";

type Props = {
    books: Product[];
};

export default function CatalogGrid({ books }: Props) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {books.map(book => (
                <ProductCard key={book.id} book={book} />
            ))}
        </div>
    );
}