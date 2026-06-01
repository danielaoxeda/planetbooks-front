export default function SalesChart() {
    const bars = [45, 65, 85, 55, 70, 40, 95];

    return (
        <div
            className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-xl font-bold">
                        Sales Performance
                    </h3>

                    <p className="text-sm text-gray-500">
                        Last 30 days analytics
                    </p>
                </div>

                <div className="flex gap-3">
                    <button className="px-4 py-2 rounded-xl border border-gray-200 text-sm">
                        Export CSV
                    </button>

                    <button className="px-4 py-2 rounded-xl bg-green-700 text-white text-sm">
                        View Report
                    </button>
                </div>
            </div>

            <div className="flex-1 flex items-end gap-3">
                {bars.map((height, index) => (
                    <div
                        key={index}
                        className="flex-1 bg-green-600 rounded-t-xl hover:opacity-80 transition-all"
                        style={{
                            height: `${height}%`,
                        }}
                    />
                ))}
            </div>

            <div className="flex justify-between mt-4 text-xs text-gray-400 font-medium">
                <span>OCT 01</span>
                <span>OCT 10</span>
                <span>OCT 20</span>
                <span>OCT 30</span>
            </div>
        </div>
    );
}