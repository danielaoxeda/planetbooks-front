import {BookOpen, Package,} from "lucide-react";

import {getRecentActivities} from "@/utils/adminStats";

const iconMap = {
    product: BookOpen,
    inventory: Package,
};

export default function ActivityFeed() {

    const activities =
        getRecentActivities();

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-[400px]">

            <div className="flex items-center justify-between mb-6">

                <div>
                    <h3 className="text-xl font-bold text-gray-900">
                        Recent Activity
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        Latest dashboard updates
                    </p>
                </div>

            </div>

            <div className="space-y-5 overflow-y-auto h-[300px] pr-2">

                {activities.map((activity) => {

                    const Icon =
                        iconMap[
                            activity.type as keyof typeof iconMap
                            ];

                    return (
                        <div
                            key={activity.id}
                            className="flex items-start gap-4"
                        >

                            <div
                                className="w-11 h-11 rounded-xl bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">
                                <Icon size={20}/>
                            </div>

                            <div className="min-w-0">

                                <h4 className="text-sm font-semibold text-gray-900">
                                    {activity.title}
                                </h4>

                                <p className="text-sm text-gray-500 truncate">
                                    {activity.description}
                                </p>

                                <span className="text-xs text-gray-400 mt-1 block">
                                    {activity.time}
                                </span>

                            </div>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}