// pages/ViewProduct.js
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { FaEdit } from "react-icons/fa";

const ViewProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const product = {
        id: 2,
        name: "Organic Wheat Flour",
        sku: "WHEAT001",
        description: "Stone-ground organic wheat flour.",
        categories: ["Wheat", "Flour"],
        images: [
            "https://picsum.photos/1920/1080",
            "https://picsum.photos/1920/1080",
            "https://picsum.photos/1920/1080",
            "https://picsum.photos/1920/1080",
        ],
        price: 80,
        quantity: 100,
        unit: "1 kg",
        active: true,
        createdBy: "Admin1",
        updatedBy: "Admin1",
        createdAt: "2023-02-20",
    }

    if (!product) {
        return (
            <div className="text-center py-12 text-gray-500">Product not found</div>
        );
    }

    return (
        <div className="mx-auto bg-white shadow-md rounded-lg p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Product Details</h1>
                <Button variant="primary" onClick={() => navigate(`/products/${id}/edit`)} >
                    <FaEdit className="mr-2" />Update Product
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
                <div className="space-y-4">
                    <p>
                        <span className="font-semibold">Name:</span> {product.name}
                    </p>
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
                
                <div className="grid grid-cols-2 gap-3">
                    
                    {product.images.slice(1).map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`extra-${idx}`}
                            className="w-full h-44 object-cover rounded"
                        />
                    ))}
                    
                </div>

                {/* Right - Details */}
               
            </div>
        </div>
    );
};

export default ViewProduct;
