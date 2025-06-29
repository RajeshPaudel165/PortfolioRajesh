import React, { useState, useEffect, useRef } from "react";
import { FaApple, FaMoon } from "react-icons/fa";
import "./../Styles/MenuBar.css";

const getMacIcons = (color) => ({
  wifi: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 15.833a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zm-3.75-2.5a6.25 6.25 0 017.5 0 .833.833 0 01-1.042 1.292 4.583 4.583 0 00-5.416 0A.833.833 0 016.25 13.333zm-2.5-2.5a10 10 0 0112.5 0 .833.833 0 01-1.042 1.292 8.333 8.333 0 00-10.416 0A.833.833 0 013.75 10.833zm-2.5-2.5a13.75 13.75 0 0117.5 0 .833.833 0 01-1.042 1.292 11.667 11.667 0 00-15.416 0A.833.833 0 011.25 8.333z"
        fill={color}
      />
    </svg>
  ),
  sound: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M3.75 7.5v5h3.333L12.5 17.083V2.917L7.083 7.5H3.75zm10.417 2.5a3.333 3.333 0 00-3.334-3.333v6.666a3.333 3.333 0 003.334-3.333zm1.25 0a4.583 4.583 0 01-4.583 4.583v1.25a5.833 5.833 0 005.833-5.833 5.833 5.833 0 00-5.833-5.833v1.25a4.583 4.583 0 014.583 4.583z"
        fill={color}
      />
    </svg>
  ),
  battery: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect
        x="3"
        y="7"
        width="14"
        height="8"
        rx="2"
        fill={color}
        fillOpacity="0.8"
      />
      <rect
        x="17"
        y="10"
        width="2"
        height="2"
        rx="1"
        fill={color}
        fillOpacity="0.8"
      />
    </svg>
  ),
  control: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect
        x="3"
        y="5"
        width="16"
        height="3"
        rx="1.5"
        fill={color}
        fillOpacity="0.8"
      />
      <rect
        x="3"
        y="10"
        width="16"
        height="3"
        rx="1.5"
        fill={color}
        fillOpacity="0.8"
      />
      <rect
        x="3"
        y="15"
        width="16"
        height="3"
        rx="1.5"
        fill={color}
        fillOpacity="0.8"
      />
    </svg>
  ),
});

const MenuBar = ({ darkMode, toggleDarkMode, onAbout, onLogout }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [isCharging] = useState(false);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const appleMenuRef = useRef();
  const socialsMenuRef = useRef();
  const controlCenterRef = useRef();
  const [isAppleMenuOpen, setIsAppleMenuOpen] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);

  // Get dynamic icons based on dark mode
  const macIcons = getMacIcons(darkMode ? "#fff" : "#000");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate battery level changes
  useEffect(() => {
    const batteryTimer = setInterval(() => {
      setBatteryLevel((prev) => {
        if (isCharging) {
          return Math.min(100, prev + 1);
        } else {
          return Math.max(0, prev - 0.5);
        }
      });
    }, 30000);
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

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-item-container")) {
        setIsControlCenterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`menu-bar${darkMode ? " dark-mode" : ""}`}>
      {/* Left Side */}
      <div className="menu-bar-left">
        {/* Apple Logo Dropdown */}
        <div className="apple-menu-container" ref={appleMenuRef}>
          <button
            className="apple-logo-btn"
            onClick={() => setIsAppleMenuOpen((v) => !v)}
            aria-label="Apple menu"
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              margin: 0,
              outline: "none",
              boxShadow: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaApple color={darkMode ? "#fff" : "#000"} size={22} />
          </button>
          {isAppleMenuOpen && (
            <div className="apple-dropdown">
              <div className="apple-dropdown-item" onClick={onAbout}>
                About
              </div>
              <div className="apple-dropdown-item" onClick={onLogout}>
                LogOut
              </div>
            </div>
          )}
        </div>
        <span className="menu-item-brand">Rajesh</span>
        {/* Socials Dropdown Menu (left) */}
        <div className="menu-item-container" ref={socialsMenuRef}>
          <span
            className="menu-item"
            onClick={() => setIsSocialsOpen((v) => !v)}
          >
            Socials
          </span>
          {isSocialsOpen && (
            <div className="dropdown-menu">
              <a
                href="https://www.instagram.com/_rajeshpaudel_/"
                target="_blank"
                rel="noopener noreferrer"
                className="dropdown-item"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/rajesh.paudel.965580/"
                target="_blank"
                rel="noopener noreferrer"
                className="dropdown-item"
              >
                Facebook
              </a>
              <a
                href="https://www.linkedin.com/in/rajesh-paudel-822022371/"
                target="_blank"
                rel="noopener noreferrer"
                className="dropdown-item"
              >
                LinkedIn
              </a>
            </div>
          )}
        </div>
        {/* Settings Dropdown Menu (left) */}
      </div>
      {/* Right Side */}
      <div className="menu-bar-right macos-right-bar">
        {/* Control Center Icon */}
        <div
          className="menu-item-container control-center-container"
          ref={controlCenterRef}
        >
          <div
            className="control-center-button"
            onClick={() => setIsControlCenterOpen((v) => !v)}
            title="Control Center"
          >
            {macIcons.control}
          </div>
          {isControlCenterOpen && (
            <div className="control-center-panel">
              {/* Quick Toggles */}
              <div className="control-section">
                <h4>Quick Toggles</h4>
                <div className="toggle-grid">
                  <div className="toggle-item">
                    <div className="toggle-icon">{macIcons.wifi}</div>
                    <span>WiFi</span>
                    <div
                      className={`toggle-switch ${wifiEnabled ? "active" : ""}`}
                      onClick={() => setWifiEnabled(!wifiEnabled)}
                    >
                      <div className="toggle-slider"></div>
                    </div>
                  </div>
                  <div className="toggle-item">
                    <div className="toggle-icon">
                      <FaMoon color={darkMode ? "#fff" : "#000"} size={18} />
                    </div>
                    <span>Dark Mode</span>
                    <div
                      className={`toggle-switch ${darkMode ? "active" : ""}`}
                      onClick={toggleDarkMode}
                    >
                      <div className="toggle-slider"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* WiFi Icon */}
        <div className="status-icon" title="WiFi">
          {macIcons.wifi}
        </div>
        {/* Sound Icon */}
        <div className="status-icon" title="Sound">
          {macIcons.sound}
        </div>
        {/* Battery Icon and Percentage */}
        <div className="status-icon battery-status" title="Battery">
          {macIcons.battery}
          <span className="battery-percentage">
            {Math.round(batteryLevel)}%
          </span>
        </div>
        {/* Date & Time */}
        <div className="date-time macos-date-time">
          <span>{formatDate(currentTime)}</span>
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
