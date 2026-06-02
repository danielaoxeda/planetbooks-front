import {
    ShieldCheck,
    Mail,
} from "lucide-react";

export default function FooterCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 w-full">
            <div className="bg-white border border-[#becab7] rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 w-full">
                <div className="flex gap-2 sm:gap-3 md:gap-4">
                    <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-lg sm:rounded-lg md:rounded-xl bg-[#bcf0b0] flex items-center justify-center flex-shrink-0">
                        <ShieldCheck size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-xs sm:text-sm md:text-base">
                            Access Logs
                        </h3>

                        <p className="text-xs sm:text-xs md:text-sm text-gray-500 mt-1 sm:mt-1 md:mt-2 line-clamp-2">
                            Monitor recent authentication
                            attempts and security
                            events.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-[#becab7] rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 w-full">
                <div className="flex gap-2 sm:gap-3 md:gap-4">
                    <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-lg sm:rounded-lg md:rounded-xl bg-pink-100 flex items-center justify-center flex-shrink-0">
                        <Mail size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-xs sm:text-sm md:text-base">
                            Bulk Invitations
                        </h3>

                        <p className="text-xs sm:text-xs md:text-sm text-gray-500 mt-1 sm:mt-1 md:mt-2 line-clamp-2">
                            Invite multiple users at
                            once using email lists.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}