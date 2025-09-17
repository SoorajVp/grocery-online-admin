// StatsSummary.js
import React from 'react';
import { FaUsers, FaShoppingCart, FaDollarSign, FaBox } from 'react-icons/fa';

const StatsSummary = () => {
    const stats = [
        {
            title: 'Total Users',
            value: '2,842',
            change: '+12%',
            icon: <FaUsers className="text-green-500 text-xl" />,
            bgColor: 'bg-green-50'
        },
        {
            title: 'Total Orders',
            value: '1,258',
            change: '+8%',
            icon: <FaShoppingCart className="text-green-500 text-xl" />,
            bgColor: 'bg-green-50'
        },
        {
            title: 'Total Revenue',
            value: '$24,895',
            change: '+18%',
            icon: <FaDollarSign className="text-green-500 text-xl" />,
            bgColor: 'bg-green-50'
        },
        {
            title: 'Total Products',
            value: '564',
            change: '+5%',
            icon: <FaBox className="text-green-500 text-xl" />,
            bgColor: 'bg-green-50'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <div key={index} className={`${stat.bgColor} p-6 rounded-lg shadow-sm`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-600">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                            <p className="text-sm text-green-600 mt-2">{stat.change} from last week</p>
                        </div>
                        <div className="p-3 rounded-full bg-white shadow-xs">
                            {stat.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsSummary;