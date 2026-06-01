import SettingsHero from "@/components/admin/settings/SettingsHero";
import GeneralSettings from "@/components/admin/settings/GeneralSettings";
import DatabaseManagement from "@/components/admin/settings/DatabaseManagement";

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <SettingsHero />

            <GeneralSettings />

            <DatabaseManagement />
        </div>
    );
}