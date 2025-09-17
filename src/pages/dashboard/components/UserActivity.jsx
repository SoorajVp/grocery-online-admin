// UserActivity.js
import React from 'react';

const UserActivity = () => {
    const activities = [
        {
            name: 'New Users',
            data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 100, 110, 120],
            color: 'bg-green-500'
        },
        {
            name: 'Returning Users',
            data: [20, 30, 35, 40, 39, 50, 60, 71, 105, 90, 100, 110],
            color: 'bg-green-300'
        }
    ];

    const maxDataValue = Math.max(...activities.flatMap(activity => activity.data));

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-6">User Activity</h2>
            <div className="space-y-6">
                {activities.map((activity, index) => (
                    <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">{activity.name}</span>
                            <span className="font-medium text-gray-800">{activity.data[activity.data.length - 1]}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className={`${activity.color} h-2.5 rounded-full`}
                                style={{ width: `${(activity.data[activity.data.length - 1] / maxDataValue) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-800 mb-3">Activity Stats</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Avg. Session</p>
                        <p className="font-semibold text-green-700">4m 32s</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Bounce Rate</p>
                        <p className="font-semibold text-green-700">24.8%</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Conversion</p>
                        <p className="font-semibold text-green-700">3.7%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserActivity;