import {
    ShieldCheck,
    Mail,
} from "lucide-react";

export default function FooterCards() {
    return (
        <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white border border-[#becab7] rounded-2xl p-6">
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#bcf0b0] flex items-center justify-center">
                        <ShieldCheck />
                    </div>

                    <div>
                        <h3 className="font-semibold">
                            Access Logs
                        </h3>

                        <p className="text-sm text-gray-500 mt-2">
                            Monitor recent authentication
                            attempts and security
                            events.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-[#becab7] rounded-2xl p-6">
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
                        <Mail />
                    </div>

                    <div>
                        <h3 className="font-semibold">
                            Bulk Invitations
                        </h3>

                        <p className="text-sm text-gray-500 mt-2">
                            Invite multiple users at
                            once using email lists.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}