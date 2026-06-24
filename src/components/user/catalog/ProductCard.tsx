import Link from "next/link";

type ProductItem = {
    id: number;
    price: number;
    isDefault: boolean;
};

type Book = {
    id: number;
    title: string;
    description: string;
    tag: string;
    image: string;
    items: ProductItem[];
};

type ProductCardProps = {
    book: Book;
};

const getPrice = (book: Book): number => {
    const defaultItem = book.items?.find(
        (item) => item.isDefault
    );

    return (
        defaultItem?.price ??
        book.items?.[0]?.price ??
        0
    );
};

export default function ProductCard({
                                        book,
                                    }: ProductCardProps) {
    return (
        <article className="group overflow-hidden rounded-xl border border-green-200 bg-white transition-all duration-300 hover:shadow-xl">
            <div className="relative aspect-[3/4] bg-green-50 p-4">
                <img
                    src={book.image}
                    alt={book.title}
                    className="h-full w-full rounded object-cover shadow-md transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-lg bg-green-700 px-2 py-1 text-[10px] font-bold uppercase text-white">
                    {book.tag}
                </span>
            </div>

            <div className="space-y-3 p-4">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-green-700">
                    {book.title}
                </h3>

                <p className="line-clamp-2 text-sm text-green-700">
                    {book.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-bold text-slate-900">
                        ${getPrice(book).toFixed(2)}
                    </span>

                    <Link
                        href={`/catalog/${book.id}`}
                        className="rounded-xl border-2 border-green-700 px-4 py-2 text-xs font-bold uppercase text-green-700 transition-all hover:bg-green-700 hover:text-white"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </article>
    );
}