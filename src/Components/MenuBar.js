import React, { useState, useEffect } from "react";
import "../Styles/MenuBar.css";
import { FaApple, FaWifi, FaSearch } from "react-icons/fa";
import { BsBatteryFull } from "react-icons/bs";

const MenuBar = ({ darkMode, toggleDarkMode, onAbout }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="menu-bar">
      {/* Left Side */}
      <div className="menu-bar-left">
        <FaApple className="apple-logo" />
        <span className="menu-item-brand">Rajesh</span>

        {/* Socials Dropdown Menu */}
        <div
          className="menu-item-container"
          onMouseEnter={() => setIsViewMenuOpen(true)}
          onMouseLeave={() => setIsViewMenuOpen(false)}
        >
          <span className="menu-item">Socials</span>
          {isViewMenuOpen && (
            <div className="dropdown-menu">
              <a
                href="https://www.linkedin.com/in/rajesh-paudel-822022371/"
                target="_blank"
                rel="noopener noreferrer"
                className="dropdown-item"
              >
                LinkedIn
              </a>
              <a
                href="https://www.facebook.com/rajesh.paudel.568"
                target="_blank"
                rel="noopener noreferrer"
                className="dropdown-item"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/rajesh_paudel_/"
                target="_blank"
                rel="noopener noreferrer"
                className="dropdown-item"
              >
                Instagram
              </a>
            </div>
          )}
        </div>

        {/* Settings Dropdown Menu */}
        <div
          className="menu-item-container"
          onMouseEnter={() => setIsSettingsMenuOpen(true)}
          onMouseLeave={() => setIsSettingsMenuOpen(false)}
        >
          <span className="menu-item">Settings</span>
          {isSettingsMenuOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <span>Dark Mode</span>
                <div className="toggle-switch" onClick={toggleDarkMode}>
                  <div
                    className={`toggle-slider ${darkMode ? "active" : ""}`}
                  ></div>
                </div>
              </div>
              <div className="dropdown-separator"></div>
              <div className="dropdown-item" onClick={onAbout}>
                About
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="menu-bar-right">
        <div className="status-icon">
          <BsBatteryFull size={20} />
        </div>
        <div className="status-icon">
          <FaWifi size={16} />
        </div>
        <div className="status-icon">
          <FaSearch size={15} />
        </div>
        <div className="date-time">
          <span>{formatDate(currentTime)}</span>
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
