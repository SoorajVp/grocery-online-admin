// SalesChart.js - Custom chart implementation without external dependencies
import React from 'react';

const SalesChart = () => {
    // Sample data
    const salesData = [65, 78, 60, 79, 85, 72, 90];
    const ordersData = [45, 62, 50, 65, 75, 62, 80];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

    // Calculate max value for scaling
    const maxValue = Math.max(...salesData, ...ordersData);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Sales Overview</h2>
                <select className="text-sm border border-gray-300 rounded-md px-3 py-1.5">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                </select>
            </div>

            <div className="relative h-72">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 w-8">
                    <span>${maxValue}</span>
                    <span>${Math.round(maxValue * 0.75)}</span>
                    <span>${Math.round(maxValue * 0.5)}</span>
                    <span>${Math.round(maxValue * 0.25)}</span>
                    <span>$0</span>
                </div>

                {/* Chart area */}
                <div className="ml-8 h-full flex flex-col">
                    {/* Grid lines */}
                    <div className="h-full flex flex-col justify-between pb-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="border-t border-gray-200"></div>
                        ))}
                    </div>

                    {/* Chart bars */}
                    <div className="absolute inset-0 ml-8 h-full flex items-end justify-between px-4 pb-4">
                        {salesData.map((value, i) => (
                            <div key={i} className="flex flex-col items-center h-full">
                                <div className="flex items-end h-full w-full justify-center space-x-1">
                                    {/* Sales bar */}
                                    <div
                                        className="w-3 bg-green-400 rounded-t transition-all duration-300 hover:bg-green-500"
                                        style={{ height: `${(value / maxValue) * 85}%` }}
                                        title={`Sales: $${value}`}
                                    ></div>

                                    {/* Orders bar */}
                                    <div
                                        className="w-3 bg-green-200 rounded-t transition-all duration-300 hover:bg-green-300"
                                        style={{ height: `${(ordersData[i] / maxValue) * 85}%` }}
                                        title={`Orders: $${ordersData[i]}`}
                                    ></div>
                                </div>

                                {/* X-axis label */}
                                <span className="text-xs text-gray-500 mt-2">{labels[i]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center space-x-4 mt-4">
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-400 rounded mr-2"></div>
                    <span className="text-sm text-gray-600">Sales</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-200 rounded mr-2"></div>
                    <span className="text-sm text-gray-600">Orders</span>
                </div>
            </div>
        </div>
    );
};

export default SalesChart;