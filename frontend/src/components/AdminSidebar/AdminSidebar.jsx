import "./AdminSidebar.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import the context

const Sidebar = () => {
  const { logout } = useAuth();
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
    <div className="sidebar">
        <img
          src="Logo.png"
          alt="Logo"
          className="sidebar-logo"></img>
      <h1>Dashboard</h1>
      <p>Welcome, {username}!</p>
      <div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <ul className="sidebar-menu">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
