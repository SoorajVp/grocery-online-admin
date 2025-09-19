// components/ui/SearchBar.js
import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-400" />
            </div>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            />
        </div>
    );
};

export default SearchBar;
