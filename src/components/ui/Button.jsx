// components/ui/Button.js
import React from "react";

const Button = ({ children, variant = "primary", onClick, type = "button" }) => {
  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm focus:outline-none transition";

  const variants = {
    primary:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500",
    outline:
      "border border-green-600 text-green-600 hover:bg-green-50 focus:ring-2 focus:ring-green-500",
    ghost:
      "text-green-600 hover:bg-green-100 focus:ring-2 focus:ring-green-500",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
