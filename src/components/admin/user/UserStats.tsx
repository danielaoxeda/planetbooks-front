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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 w-full">
            {stats.map((item) => (
                <div
                    key={item.label}
                    className="bg-white border border-[#becab7] rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 shadow-sm w-full"
                >
                    <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                        {item.label}
                    </p>

                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#171d15]">
                        {item.value}
                    </h3>
                </div>
            ))}
        </div>
    );
}