// components/tables/UsersTable.js
import React, { useState, useEffect, useRef } from "react";
import { FaEllipsisV, FaEye, FaEdit, FaBan } from "react-icons/fa";
import { Link } from "react-router-dom";

const UsersTable = ({ users, toggleUserStatus }) => {
    const [openMenu, setOpenMenu] = useState(null);
    const menuRefs = useRef({}); // store refs per userId

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openMenu && menuRefs.current[openMenu]) {
                if (!menuRefs.current[openMenu].contains(event.target)) {
                    setOpenMenu(null);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openMenu]);

    const toggleMenu = (userId) => {
        setOpenMenu(openMenu === userId ? null : userId);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 relative">
            <div className="overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th className="text-center">Mobile</th>
                            <th className="text-center">Email</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Join Date</th>
                            <th className="text-center">Orders</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                {/* User Column */}
                                <td>
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="font-medium text-green-800">
                                                {user.username.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-xs lg:text-sm font-medium text-gray-900">
                                                {user.username}
                                            </div>
                                            <div className="text-xs text-gray-500">ID: {user.id}</div>
                                        </div>
                                    </div>
                                </td>

                                {/* Mobile */}
                                <td className="text-center text-gray-500">{user.mobile}</td>

                                {/* Email */}
                                <td className="text-center text-gray-500">{user.email}</td>

                                {/* Status */}
                                <td className="text-center">
                                    <span
                                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${user.status === "active"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>

                                {/* Join Date */}
                                <td className="text-center text-gray-500">{user.joinDate}</td>

                                {/* Orders */}
                                <td className="text-center">
                                    <span className="text-gray-900 font-medium">{user.orders}</span>{" "}
                                    orders
                                </td>

                                {/* Actions (dropdown) */}
                                <td
                                    className="text-center"
                                    ref={(el) => (menuRefs.current[user.id] = el)}
                                >
                                    <button
                                        onClick={() => toggleMenu(user.id)}
                                        className="p-2 rounded-full hover:bg-green-100 focus:outline-none"
                                    >
                                        <FaEllipsisV className="text-gray-600" />
                                    </button>

                                    {openMenu === user.id && (
                                        <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                                            <ul className="py-1 text-sm text-gray-700 ">
                                                <li>
                                                    <Link
                                                        to={`/users/${user.id}`}
                                                        className="flex items-center px-4 py-1 hover:bg-green-100"
                                                    >
                                                        View
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to={`/users/${user.id}/edit`}
                                                        className="flex items-center px-4 py-1 hover:bg-green-100"
                                                    >
                                                         Edit
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={() => {
                                                            toggleUserStatus(user.id);
                                                            setOpenMenu(null);
                                                        }}
                                                        className="w-full flex items-center px-4 py-1 text-left hover:bg-green-100"
                                                    >
                                                        
                                                        {user.status === "active" ? "Block" : "Unblock"}
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {users.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No users found matching your criteria
                </div>
            )}
        </div>
    );
};

export default UsersTable;
