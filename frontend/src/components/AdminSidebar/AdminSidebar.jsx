import React, { useState } from "react";
import "./AdminSidebar.css"; // Add your CSS styles here

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="menu">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>  
      </div>
    </header>
  );
};

export default AdminSidebar;
