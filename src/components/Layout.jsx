import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Nav, Container } from "react-bootstrap";
import {
  FaHome, FaTasks, FaChartBar, FaBullseye, FaUsers, 
  FaBell, FaTrophy, FaCog, FaSun, FaMoon, FaBook
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/layout.css"; // Import CSS

const Layout = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flex: 1 }}>
        
        {/* 🔹 Sidebar - Fixed */}
        <div className={`sidebar ${darkMode ? "bg-secondary text-white" : "bg-light text-dark"}`}>
          <Nav className="flex-column">
            <Link to="/dashboard" className="sidebar-link"><FaHome /> Dashboard</Link>
            <Link to="/my-habits" className="sidebar-link"><FaTasks /> My Habits</Link>
            <Link to="/track-progress" className="sidebar-link"><FaChartBar /> Track Progress</Link>
            <Link to="/challenges-goals" className="sidebar-link"><FaBullseye /> Challenges & Goals</Link>
            <Link to="/community" className="sidebar-link"><FaUsers /> Community & Friends</Link>
            <Link to="/notifications" className="sidebar-link"><FaBell /> Reminders & Notifications</Link>
            <Link to="/rewards" className="sidebar-link"><FaTrophy /> Rewards & Achievements</Link>
           
            <Link to="/journal" className="sidebar-link"><FaBook /> Journal</Link> {/* ✅ Journal Option Added */}
            <Link to="/goal" className="sidebar-link"><FaBook /> Goals</Link>
            <Link to="/settings" className="sidebar-link"><FaCog /> Settings</Link>
          </Nav>
        </div>

        {/* 🔹 Main Content */}
        <div className="main-content">
          <Container className="p-4">
            <Outlet /> {/* Loads the respective page content */}
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Layout;
