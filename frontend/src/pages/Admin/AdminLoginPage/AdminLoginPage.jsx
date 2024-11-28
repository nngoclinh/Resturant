import React, { useState } from "react";
import "./AdminLoginPage.css";
import { useAuth } from '../../../context/AuthContext'; // Import the context
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
const AdminLoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        const decodedToken = jwtDecode(data.token);
        const role = decodedToken.role;
        toast.success("Login successful")
        if (data.token) {
          login(data.token, username,role); // Use the login function from context
          navigate('/dashboard');
        }
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || JSON.stringify(errorData) || "Login failed";
        setErrorMessage(errorMessage);
        toast.error("Login failed:",errorMessage)
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleShowPassword = (e) => {
    const password = document.getElementById("password");
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="show-password">
            <input type="checkbox" onClick={handleShowPassword} />
            Show Password
          </div>
        </div>
        <button type="submit" className="admin-login-button">
          Log In
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
