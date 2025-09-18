// pages/admin/UserManagement.js
import React, { useState } from "react";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import CreateUserModal from "../../components/modals/CreateUserModal";
import Pagination from "../../components/Pagination";
import UsersTable from "../../components/tables/UsersTable";
import Button from "../../components/ui/Button";
import SearchBar from "../../components/ui/SearchBar";

const UserManagement = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            username: "john_doe",
            email: "john@example.com",
            mobile: "+1 234-567-8901",
            status: "active",
            joinDate: "2023-01-15",
            orders: 12,
        },
        {
            id: 2,
            username: "sarah_smith",
            email: "sarah@example.com",
            mobile: "+1 345-678-9012",
            status: "active",
            joinDate: "2023-02-20",
            orders: 8,
        },
        {
            id: 3,
            username: "mike_jones",
            email: "mike@example.com",
            mobile: "+1 456-789-0123",
            status: "blocked",
            joinDate: "2023-03-10",
            orders: 3,
        },
        {
            id: 4,
            username: "emily_wilson",
            email: "emily@example.com",
            mobile: "+1 567-890-1234",
            status: "active",
            joinDate: "2023-04-05",
            orders: 15,
        },
        {
            id: 5,
            username: "david_brown",
            email: "david@example.com",
            mobile: "+1 678-901-2345",
            status: "active",
            joinDate: "2023-05-12",
            orders: 6,
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showFilters, setShowFilters] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Filter users
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.mobile.includes(searchTerm);

        const matchesStatus = statusFilter === "all" || user.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const toggleUserStatus = (userId) => {
        setUsers(
            users.map((user) =>
                user.id === userId
                    ? { ...user, status: user.status === "active" ? "blocked" : "active" }
                    : user
            )
        );
    };

    const handleCreateUser = (userData) => {
        const newUser = {
            id: Math.max(...users.map((u) => u.id)) + 1,
            ...userData,
            joinDate: new Date().toISOString().split("T")[0],
            orders: 0,
        };
        setUsers([...users, newUser]);
        setShowCreateModal(false);
    };

    return (
        <div className="p-6 space-y-3">
            <div className="flex justify-between items-center">
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
                    User Management
                </h1>
                <Button variant="primary" onClick={() => setShowCreateModal(true)} >
                    <FaPlus className="mr-2" />  Add User
                </Button>

            </div>

            {/* Search + Filters */}
            <div className="rounded-lg shadow-sm">
                <div className="flex w-full flex-col md:flex-row md:items-center gap-4">
                    <div className="flex w-full">
                        <SearchBar
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search users..."
                        />
                    </div>
                    <Button variant="outline" onClick={() => setShowFilters(!showFilters)} >
                        <FaFilter className="mr-2" /> Filters
                    </Button>
                  
                </div>

                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="blocked">Blocked</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Sort By
                            </label>
                            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500">
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="name">Name A-Z</option>
                                <option value="orders">Most Orders</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Join Date
                            </label>
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Users Table */}
            <UsersTable users={filteredUsers} toggleUserStatus={toggleUserStatus} />

            {/* Pagination */}
            <Pagination />

            {/* Create User Modal */}
            {showCreateModal && (
                <CreateUserModal
                    onClose={() => setShowCreateModal(false)}
                    onSave={handleCreateUser}
                />
            )}
        </div>
    );
};

export default UserManagement;
