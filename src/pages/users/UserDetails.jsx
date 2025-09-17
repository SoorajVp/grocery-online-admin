// UserDetails.js - User Detail Page
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import Button from '../../components/ui/Button';

const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // In a real app, you would fetch user data based on userId
    const user = {
        id: 1,
        username: 'john_doe',
        email: 'john@example.com',
        mobile: '+1 234-567-8901',
        status: 'active',
        joinDate: '2023-01-15',
        orders: 12,
        lastLogin: '2023-05-20 14:32',
        ipAddress: '192.168.1.1'
    };

    // Sample addresses data
    const addresses = [
        {
            id: 1,
            type: 'Home',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            isDefault: true
        },
        {
            id: 2,
            type: 'Work',
            street: '456 Office Rd',
            city: 'New York',
            state: 'NY',
            zipCode: '10002',
            isDefault: false
        }
    ];

    return (
        <div className="p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-5">
                {/* <Link
                    to="/users"
                    className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
                >
                    <FaArrowLeft className="mr-2" /> Back to Users
                </Link> */}
                <h1 className="text-2xl font-bold text-gray-800">User Details</h1>
                <Button variant="primary" onClick={() => navigate(`/admin/users/${id}/edit`)} >
                    <FaEdit className="mr-2" />Edit User
                </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <h3 className="text-base lg:text-lg font-medium text-gray-800 mb-2">Personal Information</h3>
                            <div className="space-y-3 border border-gray-300 rounded-md p-4">
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-600">Username</label>
                                    <p className="mt-1 text-sm md:text-base text-gray-900">{user.username}</p>
                                </div>
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-600">Email Address</label>
                                    <p className="mt-1 text-sm md:text-base text-gray-900">{user.email}</p>
                                </div>
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-600">Phone Number</label>
                                    <p className="mt-1 text-sm md:text-base text-gray-900">{user.mobile}</p>
                                </div>
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-600">Status</label>
                                    <p className="mt-1">
                                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-md ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {user.status}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-base lg:text-lg font-medium text-gray-800 mb-2">Activity Information</h3>
                            <div className="space-y-3 border border-gray-300 rounded-md p-4">
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-600">Join Date</label>
                                    <p className="mt-1 text-sm md:text-base text-gray-900">{user.joinDate}</p>
                                </div>
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-600">Total Orders</label>
                                    <p className="mt-1 text-sm md:text-base text-gray-900">{user.orders}</p>
                                </div>
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-600">Last Login</label>
                                    <p className="mt-1 text-sm md:text-base text-gray-900">{user.lastLogin}</p>
                                </div>
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-gray-600">IP Address</label>
                                    <p className="mt-1 text-sm md:text-base text-gray-900">{user.ipAddress}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-base lg:text-lg font-medium text-gray-800 mb-2">Addresses</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {addresses.map(address => (
                                <div key={address.id} className="border border-gray-300 rounded-md p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-medium text-sm md:text-base text-gray-800">{address.type}</span>
                                        {address.isDefault && (
                                            <span className="bg-green-100  text-green-800 text-xs px-3 py-1 rounded-md">
                                                Default
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm md:text-base text-gray-600">{address.street}</p>
                                    <p className="text-sm md:text-base text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;