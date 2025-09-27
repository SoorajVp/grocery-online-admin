// utils/validate.js
export const validateAdminForm = (data) => {
    const errors = {};

    if (!data.name.trim()) {
        errors.name = "Full Name is required";
    }

    if (!data.email) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Invalid email format";
    }

    if (!data.mobile) {
        errors.mobile = "Phone number is required";
    } else if (!/^\d{10}$/.test(data.mobile)) {
        errors.mobile = "Phone number must be exactly 10 digits";
    }

    if (!data.password) {
        errors.password = "Password is required";
    } else if (!data.password || data.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    if (!data.role) {
        errors.role = "Admin role is required";
    } else if (data.role !== "admin" || data.role !== "super-admin") {
        errors.password = "Password must be at least 6 characters";
    }

    return errors;
};

export const validateUserForm = (data) => {
    const errors = {};

    if (!data.username.trim()) {
        errors.username = "Username is required";
    }

    if (!data.email) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Invalid email format";
    }

    if (!data.mobile) {
        errors.mobile = "Phone number is required";
    } else if (!/^\d{10}$/.test(data.mobile)) {
        errors.mobile = "Phone number must be exactly 10 digits";
    }

    return errors;
};
