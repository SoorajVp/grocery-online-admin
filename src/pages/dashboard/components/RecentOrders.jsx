// RecentOrders.js
import React from 'react';

const RecentOrders = () => {
    const orders = [
        { id: '#ORD-001', customer: 'John Doe', date: '2023-05-15', amount: '$125.99', status: 'Delivered' },
        { id: '#ORD-002', customer: 'Sarah Smith', date: '2023-05-14', amount: '$89.50', status: 'Processing' },
        { id: '#ORD-003', customer: 'Michael Johnson', date: '2023-05-14', amount: '$215.75', status: 'Shipped' },
        { id: '#ORD-004', customer: 'Emily Davis', date: '2023-05-13', amount: '$49.99', status: 'Delivered' },
        { id: '#ORD-005', customer: 'Robert Wilson', date: '2023-05-13', amount: '$179.99', status: 'Processing' },
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-100 text-green-800';
            case 'Processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'Shipped':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
                <button className="text-sm text-green-600 hover:text-green-800 font-medium">
                    View All
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">Customer</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{order.amount}</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrders;