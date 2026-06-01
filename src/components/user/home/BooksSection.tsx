import Link from "next/link";
import { Product } from "@/data/products";

export default function BooksSection({ books }: { books: Product[] }) {
    return (
        <section className="bg-[#f5f5f5] py-12">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
                    Featured Books
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {books.map((product) => {
                        const item =
                            product.items?.find(i => i.default) || product.items?.[0];

                        return (
                            <Link
                                key={product.id}
                                href={`/catalog/${product.id}`}
                                className="group"
                            >
                                <div className="
                  bg-white border
                  rounded-xl
                  shadow-sm
                  hover:shadow-md
                  transition
                  p-4
                  flex flex-col h-full
                ">

                                    {/* IMAGE */}
                                    <div className="aspect-[3/4] mb-3 overflow-hidden rounded-lg">
                                        <img
                                            src={product.image}
                                            className="w-full h-full object-cover group-hover:scale-105 transition"
                                        />
                                    </div>

                                    <p className="text-[10px] uppercase text-green-700 font-semibold">
                                        {product.publisher}
                                    </p>

                                    <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 min-h-[40px]">
                                        {product.title}
                                    </h4>

                                    <p className="text-xs text-gray-500 min-h-[16px]">
                                        {product.publisher}
                                    </p>

                                    <div className="flex justify-between items-center mt-auto pt-2">
                    <span className="font-bold text-gray-900">
                      ${item?.price}
                    </span>

                                        <span className="text-lg group-hover:text-green-700">
                      🛍
                    </span>
                                    </div>

                                </div>
                            </Link>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}