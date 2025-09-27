// components/ui/MultipleSelect.js
import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const MultipleSelect = ({
    label,
    name,
    value = [], // should be an array for multiple selections
    onChange,
    options = [],
    error = null,
    placeholder = "Select options",
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

    // toggle select
    const handleToggle = (option) => {
        let newValue;
        if (value.includes(option.value)) {
            newValue = value.filter((val) => val !== option.value);
        } else {
            newValue = [...value, option.value];
        }
        onChange({ target: { name, value: newValue } });
    };

    // display selected labels
    const selectedLabels = options
        .filter((opt) => value.includes(opt.value))
        .map((opt) => opt.label);

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
                {/* Selected values */}
                <button
                    type="button"
                    className="w-full flex items-center justify-between px-2 md:px-3 py-1.5 md:py-2 focus:outline-none focus:ring-1 focus:ring-green-600 rounded-md"
                    onClick={() => setOpen(!open)}
                >
                    <span
                        className={`truncate ${selectedLabels.length === 0 ? "text-gray-400" : "text-gray-700"
                            }`}
                    >
                        {selectedLabels.length > 0
                            ? selectedLabels.join(", ")
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
                                onClick={() => handleToggle(opt)}
                                className="px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-green-100"
                            >
                                <input
                                    type="checkbox"
                                    checked={value.includes(opt.value)}
                                    onChange={() => { }}
                                    className="h-4 w-4 text-green-600 border-gray-300 rounded"
                                />
                                <span
                                    className={`${value.includes(opt.value) ? "font-medium text-gray-700" : ""
                                        }`}
                                >
                                    {opt.label}
                                </span>
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

export default MultipleSelect;
