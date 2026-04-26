"use client";

import {useEffect, useMemo, useState} from "react";
import Filters from "@/components/catalog/Filters";
import ProductCard from "@/components/catalog/ProductCard";
import Pagination from "@/components/catalog/Pagination";

{/* Books catalog */
}
const books = [
    {
        id: 1,
        title: "Cambridge English Authentic Examination Papers for Starters, Movers, Flyers",
        description:
            "Cambridge English Authentic Examination Papers for Starters, Movers, Flyers : PDF, Audio, Answer Booklet",
        price: 18.0,
        tag: "YLE",
        categories: ["YLE", "STARTERS", "MOVERS", "FLYERS"],
        level: "Beginner",
        image: "/books/Cambridge-AEP.png",
    },
    {
        id: 2,
        title: "Cambridge Mini Trainer: Starters (Pre-A1), Movers (A1), Flyers (A2)",
        description:
            "Cambridge Mini Trainer: Starters (Pre-A1), Movers (A1), Flyers (A2) PDF, Audio, Answer keys",
        price: 15.0,
        tag: "YLE",
        categories: ["YLE", "STARTERS", "MOVERS", "FLYERS"],
        level: "Beginner",
        image: "/books/Cambridge-MiniTrainer.png",
    },
    {
        id: 3,
        title: "A2 KEY for Schools Trainer 2",
        description: "Six practice tests + Teacher''s Notes: PDF + MP3 +SB + TB + AK",
        price: 5.0,
        tag: "A2 Key",
        categories: ["KET-A2"],
        level: "Beginner",
        image: "/books/ket-cambridge-2024.jpeg",
    },
    {
        id: 4,
        title: "A2 Key for Schools 3 (2025)",
        description: "PDF, audio answer key A2 Key for Schools 3 (2025)",
        price: 7.0,
        tag: "A2 Key",
        level: "Beginner",
        categories: ["KET-A2"],
        image: "/books/A2-KeyForSchools-3.png",
    },
    {
        id: 5,
        title: "B1 Preliminary for Schools 3",
        description:
            "B1 Preliminary for Schools 3 PDF, Answer key, Audio Script, resources bank",
        price: 9.0,
        tag: "B1 Preliminary",
        categories: ["PET-B1"],
        level: "Intermediate",
        image: "/books/B1-PreliminarySchools-3.jpg",
    },
    {
        id: 6,
        title: "B2 First Trainer 3 (2025)",
        description:
            "B2 First Trainer 3 (2025): PDF, Audio, Test, Answer key, teacher note.",
        price: 7.0,
        tag: "B2 First",
        categories: ["FCE-B2"],
        level: "Intermediate",
        image: "/books/B2-FirstTrainer-3.png",
    },
    {
        id: 7,
        title: "C1 Advanced 5 Student’s Book with Answers with Digital Pack",
        description:
            "C1 Advanced 5 Student’s Book with Answers with Digital Pack PDF + Audio",
        price: 8.0,
        tag: "C1 Advanced",
        categories: ["CA1-C1"],
        level: "Advanced",
        image: "/books/C1-Advanced-5.png",
    },
    {
        id: 8,
        title: "The Official Guide to the TOEFL iBT Test 7th edition",
        description:
            "The Official Guide to the TOEFL iBT Test 7th edition PDF + Audio + Practice Test",
        price: 18.0,
        tag: "TOEFL",
        categories: ["TOEFL"],
        level: "Advanced",
        image: "/books/TOEFLiBT-OfficialGuide-7th.png",
    },
    {
        id: 9,
        title: "Cambridge IELTS 20 Practice Tests Academic",
        description:
            "Cambridge IELTS 20 Practice Tests Academic: PDF, audio, answer key, transcript",
        price: 7.0,
        tag: "IELTS",
        categories: ["IELTS"],
        level: "Advanced",
        image: "/books/IELTS-Academic-20.png",
    },
];

{/* Filters */
}
export default function CatalogPage() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedLevel, setSelectedLevel] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("Most Popular");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const filteredBooks = useMemo(() => {
        let result = books.filter((book) => {
            const matchesTag =
                selectedTags.length === 0 ||
                selectedTags.some((tag) => book.categories.includes(tag));

            const matchesLevel =
                selectedLevel === "" || book.level === selectedLevel;

            const matchesSearch =
                searchTerm.trim() === "" ||
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.tag.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesTag && matchesLevel && matchesSearch;
        });

        if (sortBy === "Price: Low to High") {
            result = [...result].sort((a, b) => a.price - b.price);
        }

        if (sortBy === "Price: High to Low") {
            result = [...result].sort((a, b) => b.price - a.price);
        }

        return result;
    }, [selectedTags, selectedLevel, searchTerm, sortBy]);

    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

    const paginatedBooks = filteredBooks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedTags, selectedLevel, searchTerm, sortBy]);

    const clearFilters = () => {
        setSelectedTags([]);
        setSelectedLevel("");
        setSearchTerm("");
        setSortBy("Most Popular");
    };

    return (
        <main className="mx-auto flex max-w-[1280px] flex-col gap-6 px-8 py-8 md:flex-row">
            <Filters
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                clearFilters={clearFilters}
            />

            <section className="flex-1">
                <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Digital Certification Guides
                        </h1>
                        <p className="mt-1 text-sm text-green-700">
                            Showing {filteredBooks.length} results
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-500">Sort by:</span>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold"
                        >
                            <option>Most Popular</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {paginatedBooks.map((book) => (
                            <ProductCard key={book.id} book={book}/>
                        ))}
                    </div>
                ) : (
                    <p className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-500">
                        No books found with the selected filters.
                    </p>
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </section>
        </main>
    );
}