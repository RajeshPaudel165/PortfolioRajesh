import React, { useState, useEffect } from "react";
import "./App.css";
import MenuBar from "./Components/MenuBar";
import Desktop from "./Components/Desktop";
import Launchpad from "./Pages/Launchpad";
import AppStore from "./Pages/AppStore";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [openApps, setOpenApps] = useState([]);
  const [activeApp, setActiveApp] = useState(null);
  const [showLaunchpad, setShowLaunchpad] = useState(false);
  const [showAppStore, setShowAppStore] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);

  // Debug environment variables
  useEffect(() => {
    console.log("App Environment Variables Check:");
    console.log(
      "REACT_APP_GOOGLE_MAPS_API_KEY:",
      process.env.REACT_APP_GOOGLE_MAPS_API_KEY ? "Present" : "Missing"
    );
    console.log(
      "REACT_APP_EMAILJS_SERVICE_ID:",
      process.env.REACT_APP_EMAILJS_SERVICE_ID ? "Present" : "Missing"
    );
    console.log("NODE_ENV:", process.env.NODE_ENV);
  }, []);

  // Check device size on mount and resize
  useEffect(() => {
    const checkDeviceSize = () => {
      const isMobile = window.innerWidth < 768; // iPad width is 768px
      setShowMobileWarning(isMobile);
    };

    checkDeviceSize();
    window.addEventListener("resize", checkDeviceSize);

    return () => window.removeEventListener("resize", checkDeviceSize);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const openApp = (appId) => {
    if (!openApps.find((app) => app.id === appId)) {
      const newApp = {
        id: appId,
        title: getAppTitle(appId),
        icon: getAppIcon(appId),
        zIndex: openApps.length + 1,
      };
      setOpenApps([...openApps, newApp]);
    }
    setActiveApp(appId);
    setShowLaunchpad(false);
    setShowAppStore(false);
  };

  const closeApp = (appId) => {
    setOpenApps(openApps.filter((app) => app.id !== appId));
    if (activeApp === appId) {
      setActiveApp(
        openApps.length > 1 ? openApps[openApps.length - 2].id : null
      );
    }
  };

  const setActiveAppHandler = (appId) => {
    setActiveApp(appId);
    setOpenApps(
      openApps.map((app) => ({
        ...app,
        zIndex: app.id === appId ? openApps.length : app.zIndex,
      }))
    );
  };

  const getAppTitle = (appId) => {
    const titles = {
      calculator: "Calculator",
      notes: "Notes",
      weather: "Weather",
      music: "Music",
      education: "Education",
      projects: "Projects",
      skills: "Skills",
      "flappy-bird": "Flappy Bird",
      "task-master": "Task Master",
      messages: "Messages",
      "recycle-bin": "Trash",
    };
    return titles[appId] || appId;
  };

  const getAppIcon = (appId) => {
    const icons = {
      calculator: "🧮",
      notes: "📝",
      weather: "🌤️",
      music: "🎵",
      education: "🎓",
      projects: "💼",
      skills: "⚡",
      "flappy-bird": "🐦",
      "task-master": "✅",
      messages: "💬",
      "recycle-bin": "🗑️",
    };
    return icons[appId] || "📱";
  };

  const handleAppInstalled = (app) => {
    // Handle app installation from App Store
    console.log("App installed:", app);
  };

  // Mobile warning overlay
  if (showMobileWarning) {
    return (
      <div className="mobile-warning">
        <div className="mobile-warning-content">
          <div className="mobile-warning-icon">💻</div>
          <h2>Desktop Experience Required</h2>
          <p>
            This portfolio works best on larger devices like iPad, laptop, or
            desktop computers.
          </p>
          <p>
            For the best experience, please use a device with a screen width of
            768px or larger.
          </p>
          <button
            className="mobile-warning-button"
            onClick={() => setShowMobileWarning(false)}
          >
            Continue Anyway
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`App ${darkMode ? "dark-mode" : "light-mode"}`}>
      <MenuBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Desktop
        darkMode={darkMode}
        openApp={openApp}
        openApps={openApps}
        activeApp={activeApp}
        setActiveApp={setActiveAppHandler}
        closeApp={closeApp}
        showLaunchpad={showLaunchpad}
        setShowLaunchpad={setShowLaunchpad}
        showAppStore={showAppStore}
        setShowAppStore={setShowAppStore}
      />
      {showLaunchpad && (
        <Launchpad
          darkMode={darkMode}
          onAppLaunch={openApp}
          isVisible={showLaunchpad}
          onClose={() => setShowLaunchpad(false)}
        />
      )}
      {showAppStore && (
        <AppStore darkMode={darkMode} onAppInstalled={handleAppInstalled} />
      )}
    </div>
  );
}

export default App;
