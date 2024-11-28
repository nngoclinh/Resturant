import "./AdminSidebar.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link} from "react-router-dom";
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
          src="Logo1.png"
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
          <Link to="/dashboard/home">Home</Link>
        </li>
        <li>
          <Link to="/dashboard/user">User</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
