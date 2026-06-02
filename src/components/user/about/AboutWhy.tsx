import {CheckCircle2} from "lucide-react";

export default function AboutWhy() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-[1280px] mx-auto px-8 flex flex-col md:flex-row gap-12 items-center">

                <div className="md:w-1/2">
          <span className="text-green-700 uppercase text-sm font-semibold tracking-widest">
            Strategic Advantage
          </span>

                    <h2 className="text-3xl font-bold mt-2 mb-6">
                        Why Choose Planet Books?
                    </h2>

                    <div className="space-y-4 text-gray-700 text-base leading-relaxed">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-700 mt-1 shrink-0"/>
                            <p className="text-justify">
                                Carefully selected materials for certifications, teaching, and self-study.
                            </p>
                        </div>

                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-700 mt-1 shrink-0"/>
                            <p className="text-justify">
                                Latest editions from trusted publishers such as Cambridge, Oxford, Macmillan, and
                                Pearson.
                            </p>
                        </div>

                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-700 mt-1 shrink-0"/>
                            <p className="text-justify">
                                Resources for teachers, institutions, and independent learners at every level.
                            </p>
                        </div>

                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-700 mt-1 shrink-0"/>
                            <p className="text-justify">
                                Practical guidance to help students choose the right books for their goals.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2 grid grid-cols-2 gap-4">
                    <img
                        src="/about/educacion.png"
                        className="rounded-xl object-cover"
                    />
                    <img
                        src="/about/librovirtual.png"
                        className="rounded-xl object-cover mt-6"
                    />
                </div>

            </div>
        </section>
    );
}