import SettingsHero from "@/components/admin/settings/SettingsHero";
import SecuritySettings from "@/components/admin/settings/SecuritySettings";

export default function SettingsPage() {

    return (

        <div className="w-full max-w-full p-3 sm:p-4 md:p-6 lg:p-8">

            <SettingsHero />

            <SecuritySettings />

        </div>

    );

}