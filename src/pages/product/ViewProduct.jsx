// pages/ViewProduct.js
import React from "react";
import { useParams, Link } from "react-router-dom";

const ViewProduct = ({ products }) => {
    const { id } = useParams();
    const product = products.find((p) => p.id.toString() === id);

    if (!product) {
        return (
            <div className="text-center py-12 text-gray-500">Product not found</div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">{product.name}</h1>
                <Link
                    to={`/products/${product.id}/edit`}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Edit
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left - Images */}
                <div>
                    <div className="w-full h-64 bg-gray-100 rounded overflow-hidden">
                        {product.images?.[0] ? (
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                No Image
                            </div>
                        )}
                    </div>

                    {product.images?.length > 1 && (
                        <div className="flex gap-3 mt-3">
                            {product.images.slice(1).map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`extra-${idx}`}
                                    className="w-20 h-20 object-cover rounded"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Right - Details */}
                <div className="space-y-4">
                    <p>
                        <span className="font-semibold">SKU:</span> {product.sku}
                    </p>
                    <p>
                        <span className="font-semibold">Price:</span> ₹{product.price}
                    </p>
                    <p>
                        <span className="font-semibold">Stock:</span> {product.quantity}{" "}
                        {product.unit}
                    </p>
                    <p>
                        <span className="font-semibold">Status:</span>{" "}
                        <span
                            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${product.active
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                        >
                            {product.active ? "Active" : "Inactive"}
                        </span>
                    </p>
                    <p>
                        <span className="font-semibold">Created:</span> {product.createdAt}
                    </p>

                    {/* Description */}
                    <div>
                        <h2 className="font-semibold mb-1">Description</h2>
                        <p className="text-gray-700 whitespace-pre-line">
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
