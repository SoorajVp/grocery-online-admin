// TopProducts.js
import React from 'react';

const TopProducts = () => {
    const products = [
        { name: 'Wireless Headphones', sales: 1254, revenue: '$25,425' },
        { name: 'Smart Watch', sales: 987, revenue: '$19,740' },
        { name: 'Bluetooth Speaker', sales: 754, revenue: '$11,310' },
        { name: 'Phone Case', sales: 652, revenue: '$5,216' },
        { name: 'USB-C Cable', sales: 521, revenue: '$2,605' },
    ];

    const maxSales = Math.max(...products.map(product => product.sales));

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Top Products</h2>
                <button className="text-sm text-green-600 hover:text-green-800 font-medium">
                    View Report
                </button>
            </div>

            <div className="space-y-4">
                {products.map((product, index) => (
                    <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-700">{product.name}</span>
                            <span className="font-medium text-gray-900">{product.sales} units</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${(product.sales / maxSales) * 100}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Revenue: {product.revenue}</span>
                            <span>{((product.sales / maxSales) * 100).toFixed(0)}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopProducts;