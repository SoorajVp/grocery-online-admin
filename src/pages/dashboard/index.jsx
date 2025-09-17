// Main Dashboard Component
import React from 'react';
import StatsSummary from './components/StatsSummary';
import SalesChart from './components/SalesChart';
import UserActivity from './components/UserActivity';
import RecentOrders from './components/RecentOrders';
import TopProducts from './components/TopProducts';


const Dashboard = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-5">Dashboard Overview</h1>

            {/* Stats Cards Row */}
            <StatsSummary />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Sales Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <SalesChart />
                </div>

                {/* User Activity */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <UserActivity />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Recent Orders */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <RecentOrders />
                </div>

                {/* Top Products */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <TopProducts />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;