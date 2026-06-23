import ActivityFeed from "@/components/admin/dashboard/ActivityFeed";
import SalesChart from "@/components/admin/dashboard/SalesChart";
import StatsCards from "@/components/admin/dashboard/StatsCards";
import BooksByLevelChart from "@/components/admin/dashboard/BooksByLevelChart";
import CategoryChart from "@/components/admin/dashboard/CategoryChart";

export default function AdminDashboardPage() {
    return (
        <div className="w-full max-w-full p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="w-full max-w-full space-y-6">

                <StatsCards/>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    <div className="xl:col-span-2">
                        <SalesChart/>
                    </div>

                    <ActivityFeed/>

                </div>
                <BooksByLevelChart/>
                <CategoryChart/>

            </div>
        </div>
    );
}