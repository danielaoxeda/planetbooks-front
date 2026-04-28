import Link from "next/link";
import { Product } from "@/data/products";

export default function BooksSection({ books }: { books: Product[] }) {
    return (
        <section className="bg-[#eef3ea] py-12 sm:py-16">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* TITLE */}
                <h2 className="text-2xl sm:text-3xl font-serif text-center mb-8 sm:mb-12">
                    Essential Study Guides
                </h2>

                {/* GRID */}
                <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
        ">
                    {books.map((product) => {

                        const item =
                            product.items?.find(i => i.default) || product.items?.[0];

                        return (
                            <Link
                                key={product.id}
                                href={`/catalog/${product.id}`}
                                className="block group"
                            >
                                <div className="
                  bg-white
                  border
                  p-3
                  flex
                  flex-col
                  h-full
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-md
                  hover:border-green-700
                ">

                                    {/* IMAGE */}
                                    <div className="aspect-[3/4] max-h-[260px] sm:max-h-none mb-3 overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    </div>

                                    {/* CATEGORY */}
                                    <p className="text-[10px] uppercase text-green-700 font-bold">
                                        {product.publisher || "Publisher"}
                                    </p>

                                    {/* TITLE */}
                                    <h4 className="font-semibold text-sm line-clamp-2 min-h-[40px]">
                                        {product.title}
                                    </h4>

                                    {/* AUTHOR / PUBLISHER */}
                                    <p className="text-xs text-gray-500 min-h-[16px]">
                                        {product.publisher}
                                    </p>

                                    {/* PRICE + ACTION */}
                                    <div className="flex justify-between items-center mt-auto pt-2">
                    <span className="font-bold">
                      ${item?.price ?? "—"}
                    </span>

                                        <span className="text-lg group-hover:text-green-700 transition">
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