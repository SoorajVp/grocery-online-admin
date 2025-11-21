import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const { token } = useSelector((state) => state.admin);
    const localToken = localStorage.getItem("access-token");

    console.log("PrivateRoute token:", localToken);
    // final authentication check
    const isAuthenticated = token || localToken;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Render the protected component
    return children;
};

export default PrivateRoute;
