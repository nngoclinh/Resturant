import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import AdminHome from "../../components/AdminHome/AdminHome";
import User from "../../components/AdminUser/AdminUser"
const AdminPage = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <AdminSidebar />
        <div style={{ marginLeft: "250px", padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Navigate to="home" />} /> {/* Default to Home */}
            <Route path="home" element={<AdminHome />} />
            <Route path="user" element={<User />} />
            {/* <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
