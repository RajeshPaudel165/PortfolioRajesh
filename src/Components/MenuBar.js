import React, { useState, useEffect } from "react";
import "../Styles/MenuBar.css";
import { FaApple, FaWifi, FaFacebook, FaInstagram } from "react-icons/fa";
import {
  BsBatteryFull,
  BsBatteryHalf,
  BsBatteryCharging,
} from "react-icons/bs";

const MenuBar = ({ darkMode, toggleDarkMode, onAbout }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(85); // Default battery level
  const [isCharging] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate battery level changes (you can replace this with real battery API)
  useEffect(() => {
    const batteryTimer = setInterval(() => {
      setBatteryLevel((prev) => {
        if (isCharging) {
          return Math.min(100, prev + 1);
        } else {
          return Math.max(0, prev - 0.5);
        }
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(batteryTimer);
  }, [isCharging]);

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

  const getBatteryIcon = () => {
    if (isCharging) {
      return <BsBatteryCharging size={20} />;
    } else if (batteryLevel > 50) {
      return <BsBatteryFull size={20} />;
    } else {
      return <BsBatteryHalf size={20} />;
    }
  };

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
                href="https://www.facebook.com/rajesh.paudel.965580"
                target="_blank"
                rel="noopener noreferrer"
                className="dropdown-item"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/_rajeshpaudel_/"
                target="_blank"
                rel="noopener noreferrer"
                className="dropdown-item"
              >
                <FaInstagram />
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
        <div
          className="status-icon battery-status"
          title={`${Math.round(batteryLevel)}% ${isCharging ? "Charging" : ""}`}
        >
          {getBatteryIcon()}
          <span className="battery-percentage">
            {Math.round(batteryLevel)}%
          </span>
        </div>
        <div className="status-icon">
          <FaWifi size={16} />
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
