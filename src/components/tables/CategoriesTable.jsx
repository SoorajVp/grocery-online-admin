// components/tables/CategoryTable.js
import React, { useState, useEffect, useRef } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CategoryTable = ({ categories, toggleCategoryStatus }) => {
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

    const toggleMenu = (categoryId) => {
        setOpenMenu(openMenu === categoryId ? null : categoryId);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 relative">
            <div className="overflow-x-auto overflow-visible">
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th className="text-center">Slug</th>
                            <th className="text-center">Created By</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Created</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan="6" className="text-center py-6">
                                    Loading...
                                </td>
                            </tr>
                        )}
                        {categories.map((category) => (
                            <tr key={category._id}>
                                {/* Category name */}
                                <td>
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0 bg-indigo-100 rounded-full flex items-center justify-center">
                                            <span className="font-medium text-indigo-700">
                                                {category.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-xs lg:text-sm font-medium text-gray-900">
                                                {category.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                ID: {category._id?.slice(-6)}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* Slug */}
                                <td className="text-center text-gray-500">
                                    {category.slug}
                                </td>

                                {/* Created By */}
                                <td className="text-center text-gray-500">
                                    {category.createdBy?.name || "—"}
                                </td>

                                {/* Status */}
                                <td className="text-center">
                                    <span
                                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${category.active
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {category.active ? "Active" : "Inactive"}
                                    </span>
                                </td>

                                {/* Created At */}
                                <td className="text-center text-gray-500">
                                    {new Date(category.createdAt).toLocaleDateString()}
                                </td>

                                {/* Actions */}
                                <td className="text-center " ref={(el) => (menuRefs.current[category._id] = el)}>
                                    <div className="inline-block">
                                        <button
                                            onClick={() => toggleMenu(category._id)}
                                            className="p-2 rounded-full hover:bg-green-100 focus:outline-none"
                                        >
                                            <FaEllipsisV className="text-gray-600" />
                                        </button>

                                        {openMenu === category._id && (
                                            <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                                <ul className="py-1 text-sm text-gray-700">
                                                    <li>
                                                        <Link
                                                            to={`/categories/${category._id}`}
                                                            className="flex items-center px-4 py-1 hover:bg-green-100"
                                                        >
                                                            View
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            to={`/categories/${category._id}/edit`}
                                                            className="flex items-center px-4 py-1 hover:bg-green-100"
                                                        >
                                                            Edit
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <button
                                                            onClick={() => {
                                                                toggleCategoryStatus(category._id);
                                                                setOpenMenu(null);
                                                            }}
                                                            className="w-full flex items-center px-4 py-1 text-left hover:bg-green-100"
                                                        >
                                                            {category.active ? "Deactivate" : "Activate"}
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

            {categories.length === 0 && !loading && (
                <div className="text-center py-6 text-gray-500">No categories found</div>
            )}
        </div>
    );
};

export default CategoryTable;
