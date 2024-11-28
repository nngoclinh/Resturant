import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import the context
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
const AdminPage = () => {
  const { logout } = useAuth(); // Get the login function from context
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);
  const handleLogout = () => {
    logout();
    navigate("/loginadmin");
  };
  return (
    <div>
        <AdminSidebar/>
    </div>
  );
};
export default AdminPage;
