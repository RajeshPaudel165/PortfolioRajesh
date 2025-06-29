import React, { useState, useEffect } from "react";
import "../Styles/Launchpad.css";
import flappyBirdIcon from "../assets/flappybird.png";
import calculatorIcon from "../assets/calculator-icon.png";
import notesIcon from "../assets/notes-icon.png";
import weatherIcon from "../assets/weather-icon.png";
import musicIcon from "../assets/music-icon.png";
import educationIcon from "../assets/education-icon.png";
import docsIcon from "../assets/docs-icon.png";
import vscodeIcon from "../assets/vscode-icon.png";
import launchpadIcon from "../assets/launchpad.webp";
import appstoreIcon from "../assets/appstore.webp";

const Launchpad = ({ darkMode, onAppLaunch, isVisible, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [installedApps, setInstalledApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

  // Built-in apps that are always available
  const builtInApps = [
    {
      id: "launchpad",
      name: "Launchpad",
      icon: (
        <img
          src={launchpadIcon}
          alt="Launchpad"
          style={{ width: "64px", height: "64px" }}
        />
      ),
      category: "Utilities",
      builtIn: true,
    },
    {
      id: "flappy-bird",
      name: "Flappy Bird",
      icon: (
        <img
          src={flappyBirdIcon}
          alt="Flappy Bird"
          style={{ width: "64px", height: "64px" }}
        />
      ),
      category: "Games",
      builtIn: true,
    },
    {
      id: "calculator",
      name: "Calculator",
      icon: (
        <img
          src={calculatorIcon}
          alt="Calculator"
          style={{ width: "64px", height: "64px" }}
        />
      ),
      category: "Utilities",
      builtIn: true,
    },
    {
      id: "notes",
      name: "Notes",
      icon: (
        <img
          src={notesIcon}
          alt="Notes"
          style={{ width: "64px", height: "64px" }}
        />
      ),
      category: "Productivity",
      builtIn: true,
    },
    {
      id: "weather",
      name: "Weather",
      icon: (
        <img
          src={weatherIcon}
          alt="Weather"
          style={{ width: "64px", height: "64px" }}
        />
      ),
      category: "Utilities",
      builtIn: true,
    },
    {
      id: "music",
      name: "Music",
      icon: (
        <img
          src={musicIcon}
          alt="Music"
          style={{ width: "64px", height: "64px" }}
        />
      ),
      category: "Entertainment",
      builtIn: true,
    },
    {
      id: "education",
      name: "Education",
      icon: (
        <img
          src={educationIcon}
          alt="Education"
          style={{ width: "64px", height: "64px" }}
        />
      ),
      category: "Education",
      builtIn: true,
    },
    {
      id: "skills",
      name: "Skills",
      icon: (
        <img
          src={docsIcon}
          alt="Skills"
          style={{ width: "64px", height: "64px" }}
        />
      ),
      category: "Productivity",
      builtIn: true,
    },
    {
      id: "projects",
      name: "Projects",
      icon: (
        <img
          src={vscodeIcon}
          alt="Projects"
          style={{ width: "64px", height: "64px" }}
        />
      ),
      category: "Development",
      builtIn: true,
    },
    {
      id: "task-master",
      name: "Task Master",
      icon: (
        <div
          style={{
            width: "64px",
            height: "64px",
            background: "linear-gradient(135deg, #007AFF, #5856D6)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            color: "white",
            boxShadow: "0 4px 20px rgba(0, 122, 255, 0.3)",
          }}
        >
          📋
        </div>
      ),
      category: "Productivity",
      builtIn: true,
    },
    {
      id: "recycle-bin",
      name: "Trash",
      icon: (
        <div
          style={{
            width: "64px",
            height: "64px",
            fontSize: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          🗑️
        </div>
      ),
      category: "Utilities",
      builtIn: true,
    },
    {
      id: "app-store",
      name: "App Store",
      icon: (
        <img
          src={appstoreIcon}
          alt="App Store"
          style={{ width: "64px", height: "64px" }}
        />
      ),
      category: "Utilities",
      builtIn: true,
    },
  ];

  // Load installed apps from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("installedApps");
    if (saved) {
      setInstalledApps(JSON.parse(saved));
    }
  }, []);

  // Listen for app installation events
  useEffect(() => {
    const handleAppInstalled = (event) => {
      const { app } = event.detail;
      setInstalledApps((prev) => {
        const exists = prev.some((existing) => existing.id === app.id);
        if (!exists) {
          return [...prev, app];
        }
        return prev;
      });
    };

    window.addEventListener("appInstalled", handleAppInstalled);
    return () => window.removeEventListener("appInstalled", handleAppInstalled);
  }, []);

  // Reset search when Launchpad opens
  useEffect(() => {
    if (isVisible) {
      setSearchQuery("");
    }
  }, [isVisible]);

  // Combine built-in and installed apps
  const allApps = [...builtInApps, ...installedApps];

  // Filter apps based on search query
  const filteredApps = allApps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAppClick = (app) => {
    if (onAppLaunch) {
      onAppLaunch(app.id);
    }

    // Emit app launch event
    window.dispatchEvent(
      new CustomEvent("appLaunched", {
        detail: { app },
      })
    );
  };

  const handleAppLongPress = (app) => {
    setSelectedApp(app);
  };

  const closeAppDetails = () => {
    setSelectedApp(null);
  };

  const uninstallApp = (appId) => {
    if (builtInApps.some((app) => app.id === appId)) {
      return; // Can't uninstall built-in apps
    }

    setInstalledApps((prev) => prev.filter((app) => app.id !== appId));
    localStorage.setItem(
      "installedApps",
      JSON.stringify(installedApps.filter((app) => app.id !== appId))
    );

    closeAppDetails();
    showNotification("App has been uninstalled.");
  };

  const showNotification = (message) => {
    const notification = document.createElement("div");
    notification.className = "launchpad-notification";
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #007AFF;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 10000;
      animation: slideIn 0.3s ease;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease";
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };

  const formatInstallDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div
      className={`launchpad ${isVisible ? "visible" : ""} ${
        darkMode ? "dark-mode" : "light-mode"
      }`}
    >
      {/* Background Blur Effect */}
      <div className="launchpad-background" onClick={onClose}></div>

      {/* Main Launchpad Container */}
      <div className="launchpad-container">
        {/* Top Bar */}
        <div className="launchpad-topbar">
          <div className="search-container">
            <div className="search-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              autoFocus={isVisible}
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
                title="Clear search"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
          <button className="close-button" onClick={onClose}>
            <span className="close-icon">×</span>
          </button>
        </div>

        {/* Apps Grid */}
        <div className="launchpad-content">
          {searchQuery ? (
            // Search Results View
            <div className="search-results">
              <div className="search-header">
                <h2>Search Results</h2>
                <span className="result-count">{filteredApps.length} apps</span>
              </div>
              <div className="apps-grid search-grid">
                {filteredApps.map((app) => (
                  <div
                    key={app.id}
                    className="app-item"
                    data-name={app.name}
                    onClick={() => handleAppClick(app)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      handleAppLongPress(app);
                    }}
                  >
                    <div className="app-icon">{app.icon}</div>
                    <div className="app-name">{app.name}</div>
                  </div>
                ))}
              </div>
              {filteredApps.length === 0 && (
                <div className="no-results">
                  <div className="no-results-icon">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3>No apps found</h3>
                  <p>Try adjusting your search</p>
                </div>
              )}
            </div>
          ) : (
            // Normal Grid View
            <div className="apps-grid">
              {allApps.map((app) => (
                <div
                  key={app.id}
                  className="app-item"
                  data-name={app.name}
                  onClick={() => handleAppClick(app)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleAppLongPress(app);
                  }}
                >
                  <div className="app-icon">{app.icon}</div>
                  <div className="app-name">{app.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Page Indicators */}
        <div className="page-indicators">
          <div className="page-dot active"></div>
          <div className="page-dot"></div>
          <div className="page-dot"></div>
        </div>
      </div>

      {/* App Details Modal */}
      {selectedApp && (
        <div className="app-details-overlay" onClick={closeAppDetails}>
          <div
            className="app-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-app-info">
                <div className="modal-app-icon">{selectedApp.icon}</div>
                <div className="modal-app-details">
                  <h2 className="modal-app-name">{selectedApp.name}</h2>
                  <p className="modal-app-category">{selectedApp.category}</p>
                </div>
              </div>
              <button className="modal-close" onClick={closeAppDetails}>
                ×
              </button>
            </div>

            <div className="modal-content">
              <div className="modal-description">
                <h3>About {selectedApp.name}</h3>
                <p>
                  {selectedApp.description ||
                    `${
                      selectedApp.name
                    } is a ${selectedApp.category.toLowerCase()} application that helps you ${
                      selectedApp.category === "Productivity"
                        ? "stay organized and efficient"
                        : selectedApp.category === "Entertainment"
                        ? "enjoy your favorite content"
                        : selectedApp.category === "Utilities"
                        ? "complete everyday tasks"
                        : selectedApp.category === "Education"
                        ? "learn and grow"
                        : selectedApp.category === "Development"
                        ? "build amazing things"
                        : selectedApp.category === "Games"
                        ? "have fun and relax"
                        : "get things done"
                    }.`}
                </p>
              </div>

              <div className="modal-details">
                <div className="detail-row">
                  <span className="detail-label">Category</span>
                  <span className="detail-value">{selectedApp.category}</span>
                </div>
                {selectedApp.version && (
                  <div className="detail-row">
                    <span className="detail-label">Version</span>
                    <span className="detail-value">{selectedApp.version}</span>
                  </div>
                )}
                {selectedApp.size && (
                  <div className="detail-row">
                    <span className="detail-label">Size</span>
                    <span className="detail-value">{selectedApp.size}</span>
                  </div>
                )}
                {selectedApp.installDate && (
                  <div className="detail-row">
                    <span className="detail-label">Installed</span>
                    <span className="detail-value">
                      {formatInstallDate(selectedApp.installDate)}
                    </span>
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button
                  className="launch-app-btn"
                  onClick={() => {
                    handleAppClick(selectedApp);
                    closeAppDetails();
                  }}
                >
                  Launch App
                </button>

                {!selectedApp.builtIn && (
                  <button
                    className="uninstall-btn"
                    onClick={() => uninstallApp(selectedApp.id)}
                  >
                    Uninstall
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Launchpad;
