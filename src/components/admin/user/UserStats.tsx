interface UserStatsProps {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    admins: number;
}

export default function UserStats({
                                      totalUsers,
                                      activeUsers,
                                      inactiveUsers,
                                      admins,
                                  }: UserStatsProps) {
    const stats = [
        {
            label: "Total Users",
            value: totalUsers,
        },
        {
            label: "Active Users",
            value: activeUsers,
        },
        {
            label: "Inactive Users",
            value: inactiveUsers,
        },
        {
            label: "Admins",
            value: admins,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((item) => (
                <div
                    key={item.label}
                    className="
                        bg-white
                        border
                        border-[#becab7]
                        rounded-2xl
                        p-6
                        shadow-sm
                    "
                >
                    <p className="text-sm text-gray-500 mb-2">
                        {item.label}
                    </p>

                    <h3 className="text-3xl font-bold">
                        {item.value}
                    </h3>
                </div>
            ))}
        </div>
    );
}