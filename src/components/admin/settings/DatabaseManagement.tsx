import { Download } from "lucide-react";

export default function DatabaseManagement() {
    return (
        <section>
            <div className="mb-4">
                <h3 className="text-lg font-bold">
                    Quick System Controls
                </h3>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="font-semibold">
                            Database Management
                        </h4>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage your data exports and backups safely.
                        </p>

                        <span className="text-xs text-gray-400 block mt-4">
                            Last backup: 2h ago
                        </span>
                    </div>

                    <button className="bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-green-800">
                        <Download size={16} />
                        Backup
                    </button>
                </div>
            </div>
        </section>
    );
}