import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Dashboard from "../pages/dashboard";
import UserManagement from "../pages/users/UsersList";
import UserDetails from "../pages/users/UserDetails";
import AdminLogin from "../pages/auth/Login";
import ProductsList from "../pages/product/ProductsList";
import AddProduct from "../pages/product/AddProduct";
import ViewProduct from "../pages/product/ViewProduct";
import EditProduct from "../pages/product/EditProduct";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<AdminLogin />} />

                {/* Main layout with header/footer */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="users/:id" element={<UserDetails />} />
                    <Route path="products" element={<ProductsList />} />
                    <Route path="products/create" element={<AddProduct />} />
                    <Route path="products/:id" element={<ViewProduct />} />
                    <Route path="products/:id/edit" element={<EditProduct />} />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter