// components/tables/AdminTable.js
import React, { useState, useEffect, useRef } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminTable = ({ admins, toggleAdminStatus }) => {
    const [openMenu, setOpenMenu] = useState(null);
    const { loading } = useSelector((state) => state.admin);
    const menuRefs = useRef({});

    // close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openMenu && menuRefs.current[openMenu]) {
                if (!menuRefs.current[openMenu].contains(event.target)) {
                    setOpenMenu(null);
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openMenu]);

    const toggleMenu = (adminId) => {
        setOpenMenu(openMenu === adminId ? null : adminId);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 relative">
            <div className="overflow-x-auto overflow-visible">
                <table>
                    <thead>
                        <tr>
                            <th>Admin</th>
                            <th className="text-center">Mobile</th>
                            <th className="text-center">Email</th>
                            <th className="text-center">Role</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Created</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan="7" className="text-center py-6">
                                    Loading...
                                </td>
                            </tr>
                        )}
                        {admins.map((admin) => (
                            <tr key={admin._id}>
                                {/* Admin column */}
                                <td>
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0 bg-indigo-100 rounded-full flex items-center justify-center">
                                            <span className="font-medium text-indigo-700">
                                                {admin.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-xs lg:text-sm font-medium text-gray-900">
                                                {admin.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                ID: {admin._id?.slice(-6)}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* Mobile */}
                                <td className="text-center text-gray-500 text-nowrap">
                                    {admin.mobile}
                                </td>

                                {/* Email */}
                                <td className="text-center text-gray-500">{admin.email}</td>

                                {/* Role */}
                                <td className="text-center">
                                    <span
                                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${admin.role === "super-admin"
                                                ? "bg-purple-100 text-purple-700"
                                                : "bg-blue-100 text-blue-700"
                                            }`}
                                    >
                                        {admin.role}
                                    </span>
                                </td>

                                {/* Status */}
                                <td className="text-center">
                                    <span
                                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${admin.blocked
                                                ? "bg-red-100 text-red-800"
                                                : "bg-green-100 text-green-800"
                                            }`}
                                    >
                                        {admin.blocked ? "Blocked" : "Active"}
                                    </span>
                                </td>

                                {/* Created */}
                                <td className="text-center text-gray-500">
                                    {new Date(admin.createdAt).toLocaleDateString()}
                                </td>

                                {/* Actions */}
                                <td className="text-center " ref={(el) => (menuRefs.current[admin._id] = el)}>
                                    <div className="inline-block">
                                        <button
                                            onClick={() => toggleMenu(admin._id)}
                                            className="p-2 rounded-full hover:bg-green-100 focus:outline-none"
                                        >
                                            <FaEllipsisV className="text-gray-600" />
                                        </button>

                                        {openMenu === admin._id && (
                                            <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                                <ul className="py-1 text-sm text-gray-700">
                                                    <li>
                                                        <Link
                                                            to={`/admins/${admin._id}`}
                                                            className="flex items-center px-4 py-1 hover:bg-green-100"
                                                        >
                                                            View
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            to={`/admins/${admin._id}/edit`}
                                                            className="flex items-center px-4 py-1 hover:bg-green-100"
                                                        >
                                                            Edit
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <button
                                                            onClick={() => {
                                                                toggleAdminStatus(admin._id);
                                                                setOpenMenu(null);
                                                            }}
                                                            className="w-full flex items-center px-4 py-1 text-left hover:bg-green-100"
                                                        >
                                                            {admin.blocked ? "Unblock" : "Block"}
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {admins.length === 0 && !loading && (
                <div className="text-center py-6 text-gray-500">No admins found</div>
            )}
        </div>
    );
};

export default AdminTable;
