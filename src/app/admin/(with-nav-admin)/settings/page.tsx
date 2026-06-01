import SettingsHero from "@/components/admin/settings/SettingsHero";
import GeneralSettings from "@/components/admin/settings/GeneralSettings";
import DatabaseManagement from "@/components/admin/settings/DatabaseManagement";

export default function SettingsPage() {
    return (
        <div className="w-full max-w-full p-3 sm:p-4 md:p-6 lg:p-8">
        <SettingsHero />

            <GeneralSettings />

            <DatabaseManagement />
        </div>
    );
}