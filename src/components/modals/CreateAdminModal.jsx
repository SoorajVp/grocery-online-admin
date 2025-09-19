import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { validateAdminForm } from "../../utils/validate";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import AdminService from "../../api/service/admin";
import CustomSelect from "../ui/CustomSelect";

const CreateAdminModal = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        role: "admin",
        blocked: "false",
    });

    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({}); // ✅ hold validation errors

    useEffect(() => {
        // Trigger opening animation
        setOpen(true);
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const validationErrors = validateAdminForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // show errors
            return;
        }

        try {
            const res = await AdminService.createAdmin(formData)
            onSave(res.admin); 
        } catch (error) {
            console.error("Error creating admin:", error);
        }

    };

    const handleClose = () => {
        // Trigger closing animation
        setOpen(false);
        setTimeout(onClose, 300); // wait for animation to finish
    };



    return (
        <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${open ? "bg-opacity-50" : "bg-opacity-0"
                    }`}
                onClick={handleClose}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-1/2 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Create New Admin
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6 overflow-y-auto h-[calc(100%-64px)]"
                >
                    <div className="space-y-4">
                        {/* Name */}
                        <InputField label="Full Name *" name="name" onChange={handleChange} value={formData.name} error={errors.name} />

                        {/* Email */}
                        <InputField label="Email Address *" name="email" onChange={handleChange} value={formData.email} error={errors.email} />

                        {/* Mobile */}
                        <InputField label="Phone Number *" name="mobile" onChange={handleChange} value={formData.mobile} error={errors.mobile} />

                        {/* Password */}
                        <InputField label="Password *" type="password" name="password" onChange={handleChange} value={formData.password} error={errors.password} />

                        {/* Role */}
                        <CustomSelect label="Role" name="role" value={formData.role}
                            onChange={handleChange}
                            options={[
                                { value: "admin", label: "Admin" },
                                { value: "super-admin", label: "Super Admin" },
                            ]}
                            placeholder="Choose status..."
                            error={errors.role}
                        />

                        {/* Status */}
                        <CustomSelect label="Status" name="blocked" value={formData.blocked}
                            onChange={handleChange}
                            options={[
                                { value: "false", label: "Active" },
                                { value: "true", label: "Blocked" },
                            ]}
                            placeholder="Choose status..."
                            error={errors.blocked}
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="active">Active</option>
                                <option value="blocked">Blocked</option>
                            </select>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex justify-end space-x-3">
                       
                        <Button variant="muted" onClick={handleClose} >
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" >
                            Create
                        </Button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAdminModal;
