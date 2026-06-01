import {products} from "@/data/products";

export default function BooksTable() {
    return (
        <section className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm overflow-x-auto">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">
                    Product Inventory
                </h3>

                <button className="text-green-700 font-semibold text-sm">
                    View Inventory
                </button>
            </div>

            <table className="w-full min-w-[900px]">
                <thead>
                <tr className="border-b text-sm text-gray-500 text-left">
                    <th className="pb-4">Product</th>
                    <th className="pb-4">Category</th>
                    <th className="pb-4">Level</th>
                    <th className="pb-4">Format</th>
                    <th className="pb-4">Variants</th>
                    <th className="pb-4">Publisher</th>
                </tr>
                </thead>

                <tbody>
                {products.map((product) => (
                    <tr
                        key={product.id}
                        className="border-b last:border-none"
                    >
                        <td className="py-5">
                            <div className="flex items-center gap-4">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-14 h-20 rounded-lg object-cover"
                                />

                                <div>
                                    <h4 className="font-semibold max-w-[300px]">
                                        {product.title}
                                    </h4>

                                    <p className="text-sm text-gray-500 line-clamp-1">
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                        </td>

                        <td>
                            <div className="flex flex-wrap gap-2">
                                {product.categories.map((category) => (
                                    <span
                                        key={category}
                                        className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium"
                                    >
                      {category}
                    </span>
                                ))}
                            </div>
                        </td>

                        <td>
                <span className="text-sm font-medium">
                  {product.level}
                </span>
                        </td>

                        <td>{product.format}</td>

                        <td>
                <span className="font-semibold">
                  {product.items.length}
                </span>
                        </td>

                        <td>{product.publisher}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
}