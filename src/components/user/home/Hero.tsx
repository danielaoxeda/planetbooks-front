import Link from "next/link";

export default function Hero() {
    return (
        <section className="bg-[#f5f5f5] py-8">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 items-center gap-8">

                {/* LEFT */}
                <div>

          <span className="text-green-700 tracking-widest uppercase text-sm font-semibold block mb-2">
            Premium Learning
          </span>

                    <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                        Find the Best Books to Master English Exams
                    </h1>

                    <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
                        Explore our curated collection of IELTS, TOEFL, and Cambridge materials.
                        Learn faster with trusted resources used worldwide.
                    </p>

                    <Link href="/catalog">
                        <button className="
              bg-green-900 text-white
              px-6 py-3
              rounded-xl
              font-semibold
              hover:bg-green-800
              transition
            ">
                            Browse Catalog →
                        </button>
                    </Link>

                    {/* USERS */}
                    <div className="flex items-center gap-3 mt-6">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <img
                                    key={i}
                                    src="https://i.pravatar.cc/100"
                                    className="w-8 h-8 rounded-full border-2 border-white"
                                />
                            ))}
                        </div>

                        <p className="text-sm text-gray-500">
                            15,000+ students trust us
                        </p>
                    </div>
                </div>

                {/* IMAGE */}
                <div className="hidden lg:block">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-sm border">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}