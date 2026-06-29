import {Pencil, Trash2,} from "lucide-react";
import {Product} from "@/types/product";

interface Props {
    books: Product[];
    onEdit: (book: Product) => void;
    onDelete: (book: Product) => void;
}

export default function BooksTable({
                                       books,
                                       onEdit,
                                       onDelete,
                                   }: Props) {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

            <div className="overflow-x-auto">

                <table className="w-full min-w-[900px]">

                    <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                            Book
                        </th>

                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                            Category
                        </th>

                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                            Level
                        </th>

                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                            Format
                        </th>

                        <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                            Actions
                        </th>
                    </tr>
                    </thead>

                    <tbody>

                    {books.map((book) => (
                        <tr
                            key={book.id}
                            className="border-b border-gray-100 hover:bg-gray-50 transition"
                        >
                            <td className="px-6 py-4">

                                <div className="flex items-center gap-4">

                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="w-12 h-16 rounded-lg object-cover border border-gray-200"
                                    />

                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            {book.title}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            {book.publisher}
                                        </p>
                                    </div>

                                </div>

                            </td>

                            <td className="px-6 py-4">
                                <span
                                    className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                    {book.tag}
                                </span>
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-600">
                                {book.level}
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-600">
                                {book.format}
                            </td>

                            <td className="px-6 py-4">

                                <div className="flex justify-end gap-2">

                                    <button
                                        onClick={() => onEdit(book)}
                                        className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                                    >
                                        <Pencil size={18}/>
                                    </button>

                                    <button
                                        onClick={() => {
                                            const confirmed = window.confirm(
                                                "Are you sure you want to delete this item?"
                                            );

                                            if (confirmed) {
                                                onDelete(book);
                                            }
                                        }}
                                        className="w-10 h-10 rounded-xl border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50"
                                    >
                                        <Trash2 size={18}/>
                                    </button>
                                </div>

                            </td>
                        </tr>
                    ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}