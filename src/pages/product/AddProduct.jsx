// pages/AddProduct.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import CustomSelect from "../../components/ui/DropdownSelect";
import MultipleSelect from "../../components/ui/MultipleSelect";

const AddProduct = ({ addProduct }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        price: "",
        quantity: "",
        unit: "",
        description: "",
        categories: [],
        images: ["", "", "", ""], // 4 slots minimum
        active: "true", // now stored as string for dropdown
    });

    const [errors, setErrors] = useState({});
    const [hoverIndex, setHoverIndex] = useState(null); // track hover on images

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (index, file) => {
        if (file) {
            const url = URL.createObjectURL(file);
            setFormData((prev) => {
                const newImages = [...prev.images];
                newImages[index] = url;
                return { ...prev, images: newImages };
            });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Product name is required";
        if (!formData.sku.trim()) newErrors.sku = "SKU is required";
        if (!formData.price || formData.price <= 0)
            newErrors.price = "Price must be greater than 0";
        if (!formData.quantity || formData.quantity < 0)
            newErrors.quantity = "Quantity must be valid";
        if (!formData.unit.trim()) newErrors.unit = "Unit is required";
        if (!formData.description.trim())
            newErrors.description = "Description is required";
        if (formData.images.filter(Boolean).length < 4)
            newErrors.images = "At least 4 images are required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const newProduct = {
            ...formData,
            id: Date.now(),
            active: formData.active === "true", // convert to boolean
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity, 10),
            createdAt: new Date().toISOString().split("T")[0],
        };
        addProduct(newProduct);
        navigate("/products");
    };

    return (
        <div className="mx-auto p-6">
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
                        Add New Product
                    </h1>
                    <Button variant="primary" type="submit">
                        Save Product
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">

                        {/* Product Name */}
                        <InputField label="Product Name" name="name" onChange={handleChange} value={formData.name} error={errors.name} />

                        {/* SKU */}
                        <InputField label="SKU" name="sku" onChange={handleChange} value={formData.sku} error={errors.sku} />

                        {/* Category */}
                        <MultipleSelect
                            label="Categories"
                            name="categories"
                            value={formData.categories}
                            onChange={handleChange}
                            options={[
                                { value: "2436tfd4564345", label: "Rice" },
                                { value: "345435ef324532", label: "Friuts" },
                                { value: "345435efsad332", label: "Vegitables" },
                                { value: "3454rfwefd4532", label: "Books" },
                            ]}
                            placeholder="Select Categories ..."
                            error={errors.categories}
                        />

                        {/* Price */}
                        <InputField label="Price (₹)" name="price" type="number" onChange={handleChange} value={formData.price} error={errors.price} />

                        {/* Quantity */}
                        <InputField label="Stock Quantity" name="quantity" type="number" onChange={handleChange} value={formData.quantity} error={errors.quantity} />

                        {/* Unit */}
                        <InputField label="Unit" name="unit" placeholder="e.g., kg, pcs" onChange={handleChange} value={formData.unit} error={errors.unit} />

                        {/* Description */}
                        <div className="space-y-1">
                            <label className="block text-xs md:text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="5"
                                className={`w-full border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 text-sm focus:outline-none  focus:border-green-600`}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-xs">{errors.description}</p>
                            )}
                        </div>

                    </div>
                    <div className="space-y-2">

                        <CustomSelect
                            label="Status"
                            name="active"
                            value={formData.active}
                            onChange={handleChange}
                            options={[
                                { value: "true", label: "Active" },
                                { value: "false", label: "Inactive" },
                            ]}
                            placeholder="Choose status..."
                            error={errors.active}
                        />
                        {/* Status Dropdown */}

                        {/* Images Upload with replace */}
                        <div className="md:col-span-2">
                            <label className="block text-xs md:text-sm font-medium text-gray-700">Product Images</label>
                            <div className="grid grid-cols-2 gap-3 mt-2">
                                {formData.images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="border border-dashed bg-white border-gray-400 hover:border-green-600 rounded-md flex items-center justify-center h-28 lg:h-40 relative group"
                                        onMouseEnter={() => setHoverIndex(idx)}
                                        onMouseLeave={() => setHoverIndex(null)}
                                    >
                                        {img ? (
                                            <>
                                                <img
                                                    src={img}
                                                    alt={`preview-${idx}`}
                                                    className="w-full h-full object-cover rounded"
                                                />
                                                {/* Overlay on hover */}
                                                {hoverIndex === idx && (
                                                    <label className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-sm cursor-pointer">
                                                        Change Image
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) =>
                                                                handleFileChange(idx, e.target.files[0])
                                                            }
                                                        />
                                                    </label>
                                                )}
                                            </>
                                        ) : (
                                            <label className="cursor-pointer text-gray-400 text-sm flex flex-col items-center">
                                                <span>+ Add</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) =>
                                                        handleFileChange(idx, e.target.files[0])
                                                    }
                                                />
                                            </label>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {errors.images && (
                                <p className="text-red-500 text-xs">{errors.images}</p>
                            )}
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
