export default function AboutHero() {
    return (
        <section className="bg-[#f5f5f5] py-6">
            <div className="max-w-[1280px] mx-auto px-8">

                {/* TEXTO SUPERIOR */}
                <div className="w-full mb-7">
          <span className="text-green-700 tracking-widest uppercase text-l font-semibold block mb-2">
             Our Story
            </span>

                    <h1 className="text-3xl font-bold text-gray-900 mb-5 leading-tight">
                        Supporting english learning since 2001
                    </h1>

                    <p className="text-gray-600 text-lg leading-relaxed text-justify">
                        Planet Books started as a small bookstore in Lima, with the purpose of
                        offering learning materials to students and teachers.
                        Over the years, we worked with recognized publishers such as
                        Macmillan, Cambridge, Oxford and Pearson, helping learners prepare for exams, certifications
                        and academic goals.
                    </p>

                    <p className="text-gray-600 text-lg leading-relaxed mt-2 text-justify">
                        As learning needs evolved, we became a fully virtual bookstore, making it easier for
                        students across Peru to access reliable practice books, exam preparation materials,
                        and language resources from wherever they are.
                    </p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

                    {/* IMAGEN */}
                    <div className="md:col-span-7">
                        <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-sm border">
                            <img
                                src="/about/store.png"
                                alt="Library"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* TARJETAS */}
                    <div className="md:col-span-5 flex flex-col gap-6">

                        <div className="p-6 bg-white border rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-2 text-gray-900">
                                Our Mission
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed text-justify">
                                To provide students, teachers, and institutions with trusted English learning
                                materials, certification resources, and digital books that support academic
                                growth and professional success.
                            </p>
                        </div>

                        <div className="p-6 bg-green-900 text-white rounded-xl shadow-lg border-l-4 border-green-600">
                            <h3 className="text-xl font-semibold mb-2">
                                Our Vision
                            </h3>
                            <p className="text-sm opacity-90 leading-relaxed text-justify">
                                To become the leading virtual bookstore for English learning materials in Peru
                                and Latin America, connecting learners with world-class publishers through an
                                accessible, reliable, and modern shopping experience.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}