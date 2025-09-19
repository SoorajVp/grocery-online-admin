// components/ui/CustomSelect.js
import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const CustomSelect = ({
    label,
    name,
    value,
    onChange,
    options = [],
    error = null,
    required = false,
    placeholder = "Select an option",
}) => {
    const [open, setOpen] = useState(false);
    const selectRef = useRef(null);

    // close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        onChange({ target: { name, value: option.value } });
        setOpen(false);
    };

    return (
        <div className="space-y-1 w-full" ref={selectRef}>
            {label && (
                <label
                    htmlFor={name}
                    className="block text-xs md:text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}

            <div
                className={`relative w-full border ${error ? "border-red-500" : "border-gray-300"
                    } rounded-md text-sm bg-white`}
            >
                {/* Selected value */}
                <button
                    type="button"
                    className="w-full flex items-center justify-between px-2 md:px-3 py-1.5 md:py-2 focus:outline-none focus:ring-1 focus:ring-green-600 rounded-md"
                    onClick={() => setOpen(!open)}
                >
                    <span className={`${!value ? "text-gray-400" : "text-gray-700"}`}>
                        {value
                            ? options.find((opt) => opt.value === value)?.label
                            : placeholder}
                    </span>
                    <FaChevronDown
                        className={`ml-2 text-gray-500 text-xs transition-transform ${open ? "rotate-180" : ""
                            }`}
                    />
                </button>

                {/* Dropdown */}
                {open && (
                    <ul className="absolute left-0 right-0 mt-1 max-h-48 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg z-50">
                        {options.map((opt) => (
                            <li
                                key={opt.value}
                                onClick={() => handleSelect(opt)}
                                className={`px-3 py-2 cursor-pointer hover:bg-green-100 ${opt.value === value ? "bg-green-50 font-medium" : ""
                                    }`}
                            >
                                {opt.label}
                            </li>
                        ))}
                        {options.length === 0 && (
                            <li className="px-3 py-2 text-gray-500 text-sm">No options</li>
                        )}
                    </ul>
                )}
            </div>

            {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
        </div>
    );
};

export default CustomSelect;
