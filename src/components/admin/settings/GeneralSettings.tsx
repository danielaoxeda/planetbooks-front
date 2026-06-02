"use client";

import { useState } from "react";

export default function GeneralSettings() {
    const [siteName, setSiteName] = useState("Planet Books");
    const [contactEmail, setContactEmail] =
        useState("support@planetbooks.com");

    return (
        <section>
            <div className="mb-4">
                <h3 className="text-lg font-bold">
                    General Site Settings
                </h3>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Site Name
                            </label>

                            <input
                                type="text"
                                value={siteName}
                                onChange={(e) =>
                                    setSiteName(e.target.value)
                                }
                                className="w-full border rounded-xl px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Contact Email
                            </label>

                            <input
                                type="email"
                                value={contactEmail}
                                onChange={(e) =>
                                    setContactEmail(e.target.value)
                                }
                                className="w-full border rounded-xl px-4 py-3"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Logo Branding
                        </label>

                        <div className="border-2 border-dashed rounded-xl p-6 flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-green-100 flex items-center justify-center font-bold text-green-700">
                                PB
                            </div>

                            <div>
                                <p className="font-semibold">
                                    Upload new logo
                                </p>

                                <p className="text-sm text-gray-500">
                                    PNG, JPG up to 5MB
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}