import Link from 'next/link';
import {Mail, MapPin, Phone} from "lucide-react";


export default function Footer() {
    return (
        <footer className="bg-green-800 text-white mt-20">

            {/* CTA */}
            <div className="bg-green-700 text-center py-12 px-6">
                <h2 className="text-2xl font-semibold mb-2">
                    Do you have any questions?
                </h2>

                <p className="text-sm opacity-90 mb-6">
                    Our team is ready to help you find the perfect learning material for your needs.
                </p>

                <div className="flex justify-center gap-4 flex-wrap">
                    <a
                        href="https://wa.me/51960648959?text=Hello, Planet Books%20I%20would%20like%20to%20receive%20more%20information%20about%20a%20book%20available."
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="bg-white text-green-800 px-6 py-2 rounded font-medium">
                            Contact Now
                        </button>
                    </a>

                    <Link href={"/catalog"}>
                        <button className="border border-white px-6 py-2 rounded font-medium">
                            View Catalog
                        </button>
                    </Link>
                </div>
            </div>

            {/* INFO */}
            <div className="max-w-[1280px] mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* BRAND */}
                <div>
                    <h3 className="text-lg font-bold mb-2"> PlanetBooks</h3>
                    <p className="text-sm opacity-80 mb-2">
                        Your partner for academic success.
                    </p>
                    <p className="text-sm opacity-80">
                        Specialists in ebooks for international certifications.
                    </p>
                </div>

                {/* LINKS */}
                <div>
                    <h4 className="font-semibold mb-3">Quick Links</h4>
                    <ul className="space-y-2 text-sm opacity-90">
                        <li>
                            <Link href="/" className="hover:underline">
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link href="/about" className="hover:underline">
                                About
                            </Link>
                        </li>

                        <li>
                            <Link href="/catalog" className="hover:underline">
                                Catalog
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* CONTACT */}
                <div>
                    <h4 className="font-semibold mb-3">Contact</h4>

                    <ul className="space-y-2 text-sm opacity-90">

                        <li className="flex items-center gap-2">
                            <Phone size={16}/>
                            <span>+51 960 648 959</span>
                        </li>

                        <li className="flex items-center gap-2">
                            <Mail size={16}/>
                            <span>info@planetbooks.com</span>
                        </li>

                        <li className="flex items-center gap-2">
                            <MapPin size={16}/>
                            <span>Lima, Peru</span>
                        </li>

                    </ul>
                </div>
            </div>

            {/* BOTTOM */}
            <div
                className="border-t border-white/20 text-sm py-4 px-8 flex flex-col md:flex-row justify-between items-center gap-2">
                <p>© 2025 PlanetBooks - All Rights Reserved</p>

            </div>

        </footer>
    );
}