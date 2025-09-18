// components/tables/ProductsTable.js
import React, { useState, useEffect, useRef } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductsTable = ({ products, toggleProductStatus }) => {
    const [openMenu, setOpenMenu] = useState(null);
    const menuRefs = useRef({}); // store refs per productId

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

    const toggleMenu = (productId) => {
        setOpenMenu(openMenu === productId ? null : productId);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 relative">
            <div className="overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th className="text-left">Product</th>
                            <th className="text-center">SKU</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Stock</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Created</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-t">
                                {/* Product Column */}
                                <td className="px-4 py-2">
                                    <div className="flex items-center">
                                        {/* Thumbnail */}
                                        <div className="h-10 w-10 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                                            {product.images?.length > 0 ? (
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <span className="flex items-center justify-center h-full w-full text-gray-400">
                                                    N/A
                                                </span>
                                            )}
                                        </div>
                                        <div className="ml-3">
                                            <div className="font-medium text-gray-900">
                                                {product.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {product.unit}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* SKU */}
                                <td className="px-4 py-2 text-center text-gray-600">
                                    {product.sku}
                                </td>

                                {/* Price */}
                                <td className="px-4 py-2 text-center text-gray-600">
                                    ₹{product.price}
                                </td>

                                {/* Stock */}
                                <td className="px-4 py-2 text-center text-gray-600">
                                    {product.quantity} in stock
                                </td>

                                {/* Status */}
                                <td className="px-4 py-2 text-center">
                                    <span
                                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${product.active
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {product.active ? "Active" : "Inactive"}
                                    </span>
                                </td>

                                {/* Created Date */}
                                <td className="px-4 py-2 text-center text-gray-600">
                                    {product.createdAt}
                                </td>

                                {/* Actions */}
                                <td
                                    className="px-4 py-2 text-center "
                                    ref={(el) => (menuRefs.current[product.id] = el)}
                                >
                                    <button
                                        onClick={() => toggleMenu(product.id)}
                                        className="p-2 rounded-full hover:bg-green-100 focus:outline-none"
                                    >
                                        <FaEllipsisV className="text-gray-600" />
                                    </button>

                                    {openMenu === product.id && (
                                        <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                                            <ul className="py-1 text-sm text-gray-700 text-left">
                                                <li>
                                                    <Link
                                                        to={`/products/${product.id}`}
                                                        className="block px-4 py-1 hover:bg-green-100"
                                                    >
                                                        View
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to={`/products/${product.id}/edit`}
                                                        className="block px-4 py-1 hover:bg-green-100"
                                                    >
                                                        Edit
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={() => {
                                                            toggleProductStatus(product.id);
                                                            setOpenMenu(null);
                                                        }}
                                                        className=" px-4 py-1 hover:bg-green-100"
                                                    >
                                                        {product.active ? "Deactivate" : "Activate"}
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

            {products.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No products found matching your criteria
                </div>
            )}
        </div>
    );
};

export default ProductsTable;
