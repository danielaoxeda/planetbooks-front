import {BadgeCheck, Globe, GraduationCap} from "lucide-react";

export default function AboutWho() {
    return (
        <section className="py-16 bg-[#f5fcee]">
            <div className="max-w-[1280px] mx-auto px-8">

                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Who We Are</h2>
                    <div className="w-12 h-1 bg-green-600 mx-auto mt-2"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* CARD 1 */}
                    <div className="bg-white p-6 border rounded-lg text-center hover:border-green-600 transition">
                        <div
                            className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <GraduationCap size={28} className="text-green-600"/>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Academic Roots</h3>
                        <p className="text-gray-600 text-sm">
                            Founded by educators and linguists focused on structured learning.
                        </p>
                    </div>

                    {/* CARD 2 */}
                    <div className="bg-white p-6 border rounded-lg text-center hover:border-green-600 transition">
                        <div
                            className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <Globe size={28} className="text-green-600"/>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Global Perspective</h3>
                        <p className="text-gray-600 text-sm">
                            Our team spans multiple continents supporting diverse learners.
                        </p>
                    </div>

                    {/* CARD 3 */}
                    <div className="bg-white p-6 border rounded-lg text-center hover:border-green-600 transition">
                        <div
                            className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <BadgeCheck size={28} className="text-green-600"/>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Certified Excellence</h3>
                        <p className="text-gray-600 text-sm">
                            Official materials from top academic publishers worldwide.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}