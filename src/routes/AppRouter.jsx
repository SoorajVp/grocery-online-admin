import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Dashboard from "../pages/dashboard";
import UserManagement from "../pages/users/UsersList";
import UserDetails from "../pages/users/UserDetails";

const AppRouter = () => {
  return (
      <BrowserRouter>
          <Routes>
              {/* Main layout with header/footer */}
              <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="users/:id" element={<UserDetails />} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default AppRouter