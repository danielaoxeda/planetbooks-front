export default function AboutHero() {
    return (
        <section className="bg-[#f5f5f5] py-16">
            <div className="max-w-[1280px] mx-auto px-8">

                {/* TEXTO SUPERIOR */}
                <div className="max-w-3xl mb-12">
          <span className="text-green-700 tracking-widest uppercase text-sm font-semibold block mb-3">
            Our Story
          </span>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        Advancing Global Literacy through Academic Excellence
                    </h1>

                    <p className="text-gray-600 text-lg">
                        Planet Books is the premier destination for students and professionals
                        pursuing international English certifications. We curate world-class
                        educational resources to help you achieve your goals.
                    </p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

                    {/* IMAGEN */}
                    <div className="md:col-span-7">
                        <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-sm border">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFAd1fPyGwmMwVvBh88EEWuaOO44qawaGBhRY7EOqNOwNpL1GWUMgTPvwWWfxo11y2tA9P8vyGs5GAAtWh59q_Cr3-ZfjE9UnCrfnoCYXUTbMcSofTmFAnciBjhqayRD_5f8lbS36Bk7lEG_a8serex08xy3h_bev9gBCneDMnkqULSkv8YPqh47WmSEG1nXef8B-_zIkvAMQ4SruwIW5Jx0d3FUzxRCNppZ1z9TvDogejPc5kZWfzTsRR8QpWT-CDVRz8y7H1C8U"
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
                            <p className="text-gray-600 text-sm leading-relaxed">
                                To democratize access to elite academic training by providing structured,
                                high-quality learning materials that empower individuals to excel in
                                IELTS, TOEFL, and Cambridge assessments.
                            </p>
                        </div>

                        <div className="p-6 bg-green-900 text-white rounded-xl shadow-lg border-l-4 border-green-600">
                            <h3 className="text-xl font-semibold mb-2">
                                The Planet Standard
                            </h3>
                            <p className="text-sm opacity-90 leading-relaxed">
                                Every resource in our catalog undergoes rigorous evaluation by educational
                                experts to ensure it meets the highest standards of linguistic accuracy
                                and pedagogical effectiveness.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}