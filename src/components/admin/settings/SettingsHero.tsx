export default function SettingsHero() {
    return (
        <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Platform Integrity
            </h2>

            <p className="text-gray-500 max-w-xl mb-6">
                Manage the foundational elements of the Planet Books ecosystem,
                from branding to security protocols.
            </p>

            <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-green-300 border-2 border-white flex items-center justify-center text-xs font-bold">
                        JD
                    </div>

                    <div className="w-8 h-8 rounded-full bg-pink-300 border-2 border-white flex items-center justify-center text-xs font-bold">
                        AS
                    </div>
                </div>

                <span className="text-sm font-medium text-green-700">
                    2 Active Administrators
                </span>
            </div>
        </section>
    );
}