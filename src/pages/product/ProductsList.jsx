// pages/admin/ProductsList.js
import React, { use, useState } from "react";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import ProductsTable from "../../components/tables/ProductsTable";
import Button from "../../components/ui/Button";
import SearchBar from "../../components/ui/SearchBar";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Basmati Rice",
            sku: "RICE001",
            description: "Premium quality basmati rice, aged for fragrance.",
            categories: ["Rice", "Grains"],
            images: [
                "https://picsum.photos/1920/1080",
                "https://picsum.photos/1920/1080",
                "https://picsum.photos/1920/1080",
                "https://picsum.photos/1920/1080",
            ],
            price: 120,
            quantity: 50,
            unit: "1 kg",
            active: true,
            createdBy: "Admin1",
            updatedBy: "Admin2",
            createdAt: "2023-01-15",
        },
        {
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
        },
        {
            id: 3,
            name: "Sunflower Oil",
            sku: "OIL001",
            description: "Pure refined sunflower oil.",
            categories: ["Oil"],
            images: [
                "https://picsum.photos/1920/1080",
                "https://picsum.photos/1920/1080",
                "https://picsum.photos/1920/1080",
                "https://picsum.photos/1920/1080",
            ],
            price: 200,
            quantity: 30,
            unit: "1 L",
            active: false,
            createdBy: "Admin2",
            updatedBy: "Admin2",
            createdAt: "2023-03-10",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showFilters, setShowFilters] = useState(false);

    const navigate = useNavigate();
    // Filter products
    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" ||
            (statusFilter === "active" && product.active) ||
            (statusFilter === "inactive" && !product.active);

        return matchesSearch && matchesStatus;
    });

    const toggleProductStatus = (productId) => {
        setProducts(
            products.map((product) =>
                product.id === productId
                    ? { ...product, active: !product.active }
                    : product
            )
        );
    };

    return (
        <div className="p-6 space-y-3">
            <div className="flex justify-between items-center">
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
                    Product Management
                </h1>
                <Button variant="primary" onClick={() => navigate('/products/create')} >
                    <FaPlus className="mr-2" /> Add Product
                </Button>
            </div>

            {/* Search + Filters */}
            <div className="rounded-lg shadow-sm">
                <div className="flex w-full flex-col md:flex-row md:items-center gap-4">
                    <div className="flex w-full">
                        <SearchBar
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search products..."
                        />
                    </div>
                    <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
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
                                <option value="all">All Products</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
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
                                <option value="price">Price High → Low</option>
                                <option value="quantity">Stock High → Low</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Created Date
                            </label>
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Products Table */}
            <ProductsTable products={filteredProducts} toggleProductStatus={toggleProductStatus} />

            {/* Pagination */}
            <Pagination />

        </div>
    );
};

export default ProductsList;
