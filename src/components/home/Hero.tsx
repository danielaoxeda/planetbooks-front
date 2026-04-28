export default function Hero() {
    return (
        <section className="relative bg-white overflow-hidden">

            <div className="
        max-w-[1280px] mx-auto
        grid lg:grid-cols-2
        items-center
        min-h-[480px] sm:min-h-[520px] lg:min-h-[620px]
      ">

                {/* LEFT */}
                <div className="px-3 sm:px-6 lg:px-8 py-8 sm:py-10">

                    {/* TAG */}
                    <span className="
            text-[10px] sm:text-[11px]
            tracking-widest uppercase
            bg-green-100 text-green-800
            px-2 py-1 font-semibold
            inline-block
          ">
            Excellence in Education
          </span>

                    {/* TITLE */}
                    <h1 className="
            mt-5 mb-4
            font-serif
            text-2xl
            sm:text-3xl
            lg:text-[52px]
            leading-tight
            text-[#1a1a1a]
            max-w-full sm:max-w-xl
            break-words
          ">
                        Unlock Your Potential with{" "}
                        <span className="text-green-700">International</span>{" "}
                        English Certifications
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="
            text-gray-600
            mb-6
            text-xs sm:text-sm md:text-base
            max-w-full sm:max-w-md
          ">
                        Access the worlds most comprehensive library of study materials
                        for IELTS, TOEFL, and Cambridge exams.
                    </p>

                    {/* SEARCH (FIX CLAVE 💥) */}
                    <div className="
            flex
            flex-col
            sm:flex-row
            w-full
            max-w-xl
            border border-gray-300
            overflow-hidden
          ">
                        <input
                            className="
                w-full
                px-3 sm:px-4
                py-3
                outline-none
                text-xs sm:text-sm
              "
                            placeholder="Find your exam guide..."
                        />

                        <button className="
              w-full sm:w-auto
              bg-green-800 text-white
              px-4 sm:px-6
              py-3
              font-semibold
              text-sm
              whitespace-nowrap
            ">
                            Search →
                        </button>
                    </div>

                    {/* USERS */}
                    <div className="flex items-center gap-2 sm:gap-3 mt-6">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <img
                                    key={i}
                                    src="https://i.pravatar.cc/100"
                                    className="
                    w-7 h-7 sm:w-9 sm:h-9
                    rounded-full
                    border-2 border-white
                  "
                                />
                            ))}
                        </div>

                        <p className="text-[10px] sm:text-sm text-gray-500">
                            Join 15,000+ students worldwide
                        </p>
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative h-full hidden lg:block">
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent z-10" />

                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}