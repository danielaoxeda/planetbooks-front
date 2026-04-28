export default function Certifications() {
    return (
        <section className="bg-[#eef3ea] py-16">
            <div className="max-w-[1280px] mx-auto px-8">

                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-serif text-[#1a1a1a]">
                            Featured Certifications
                        </h2>
                        <p className="text-gray-600">
                            Structured learning paths for global recognition.
                        </p>
                    </div>

                    <button className="text-sm font-semibold">
                        View all programs →
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        "IELTS Academic",
                        "TOEFL iBT",
                        "Cambridge English"
                    ].map((title) => (
                        <div key={title} className="bg-white border p-6 hover:border-green-700 transition">
                            <p className="text-xs uppercase text-gray-500 mb-2">
                                Official Curriculum
                            </p>
                            <h3 className="font-serif text-xl mb-2">{title}</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Description of the certification program.
                            </p>
                            <span className="text-green-700 text-sm font-semibold">
                Resources Available
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}