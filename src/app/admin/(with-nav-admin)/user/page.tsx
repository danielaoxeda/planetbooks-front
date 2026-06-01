import Sidebar from "@/components/admin/sidebar/Sidebar";
import TopBar from "@/components/admin/topbar/Topbar";

export default function AboutPage() {
    return (
        <main className="flex flex-col">
            <TopBar />
            <Sidebar />
        </main>
    );
}