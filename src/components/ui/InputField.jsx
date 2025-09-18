// components/ui/InputField.js
import React from "react";

const InputField = ({
    label,
    type = "text",
    placeholder = "",
    value, name,
    onChange, error = null,
    required = false,
}) => {
    return (
        <div className="space-y-1 w-full">
            {label && (
                <label className="block text-xs md:text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input 
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                name={name}
                className={`w-full border ${error ? "border-red-500" : "border-gray-300"} rounded-md px-2 md:px-3 py-1.5 md:py-2 text-sm focus:outline-none  focus:border-green-600`}
            />
            {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
        </div>
    );
};

export default InputField;
