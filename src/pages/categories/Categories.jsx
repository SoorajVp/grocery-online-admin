// pages/admin/Categories.js
import React, { useState, useEffect } from "react";
import { FaFilter, FaPlus } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import Button from "../../components/ui/Button";
import SearchBar from "../../components/ui/SearchBar";
// import CreateCategoryModal from "../../components/modals/CreateCategoryModal";
import CategoryService from "../../api/service/categories";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../../redux/slice/adminSlice";; // 👈 make sure you have a category slice
import CategoryTable from "../../components/tables/CategoriesTable";
import InputField from "../../components/ui/InputField";

const Categories = () => {
    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showFilters, setShowFilters] = useState(false);
    const [showCreateCategory, setCreateCategory] = useState(false);

    const dispatch = useDispatch();

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                dispatch(toggleLoading(true));
                const data = await CategoryService.getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                dispatch(toggleLoading(false));
            }
        };
        fetchCategories();
    }, [dispatch]);

    // Filter categories
    const filteredCategories = categories.filter((cat) => {
        const matchesSearch =
            cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cat.slug.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && cat.active) ||
            (statusFilter === "inactive" && !cat.active);

        return matchesSearch && matchesStatus;
    });

    // Toggle active/inactive
    const toggleCategoryStatus = (id) => {
        setCategories(
            categories.map((c) =>
                c._id === id ? { ...c, active: !c.active } : c
            )
        );
    };

    // Handle create new category
    const handleCreateCategory = (newCategory) => {
        setCategories([...categories, newCategory]);
        setCreateCategory(false);
    };

    return (
        <div className="p-6 space-y-3">
            {/* Header */}
            <div className="flex justify-between items-center w-full">
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
                    Category Management
                </h1>
                <div className="flex gap-3">
                    {
                        showCreateCategory &&
                        <div className="max-w-lg">
                            <InputField name="name" 
                            placeholder="Enter category name"
                            onChange={(e) => setCategoryName(e.target.value)} 
                            value={categoryName} 
                            />
                        </div>
                    }

                    <Button variant="primary" onClick={() => setCreateCategory(true)}>
                        <FaPlus className="mr-2" /> Add Category
                    </Button>
                </div>
            </div>

            {/* Search + Filters */}
            <div className="rounded-lg shadow-sm">
                <div className="flex w-full flex-col md:flex-row md:items-center gap-4">
                    <div className="flex w-full">
                        <SearchBar
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search categories..."
                        />
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                    >
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
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Category Table */}
            <CategoryTable
                categories={filteredCategories}
                toggleCategoryStatus={toggleCategoryStatus}
            />

            {/* Pagination */}
            <Pagination />

        </div>
    );
};

export default Categories;
