import Link from "next/link";
import { BookOpen, GraduationCap, Globe } from "lucide-react";

const categories = [
    {
        title: "IELTS Preparation",
        description: "Top materials for Academic & General Training",
        icon: Globe,
    },
    {
        title: "TOEFL Guides",
        description: "Official guides and practice tests",
        icon: GraduationCap,
    },
    {
        title: "Cambridge Exams",
        description: "A2, B1, B2, C1 official preparation books",
        icon: BookOpen,
    },
];

export default function FeaturedCategories() {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* TITLE */}
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Shop by Category
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Find the right materials for your exam
                    </p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {categories.map((cat, index) => {
                        const Icon = cat.icon;

                        return (
                            <div
                                key={index}
                                className="
                  p-6 bg-[#f5f5f5]
                  border rounded-xl
                  shadow-sm
                  hover:shadow-md
                  transition
                  text-center
                "
                            >
                                <div className="flex justify-center mb-4">
                                    <Icon className="w-8 h-8 text-green-700" />
                                </div>

                                <h3 className="font-semibold text-lg mb-2 text-gray-900">
                                    {cat.title}
                                </h3>

                                <p className="text-sm text-gray-600">
                                    {cat.description}
                                </p>
                            </div>
                        );
                    })}

                </div>

                {/* CTA */}
                <div className="flex justify-center mt-12">
                    <Link href="/catalog">
                        <button className="
              bg-green-900 text-white
              px-8 py-3
              rounded-xl
              font-semibold
              hover:bg-green-800
              transition
            ">
                            Explore Full Catalog →
                        </button>
                    </Link>
                </div>

            </div>
        </section>
    );
}