// components/ui/InputField.js
import React from "react";

const InputField = ({
    label,
    type = "text",
    placeholder = "",
    value,
    onChange,
    required = false,
}) => {
    return (
        <div className="space-y-1 w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
            />
        </div>
    );
};

export default InputField;
