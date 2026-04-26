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

                    <div className="space-y-4">
                        <p>✔ Curated curriculum for your certification</p>
                        <p>✔ Latest editions and updates</p>
                        <p>✔ Student-focused guidance</p>
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