import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import MenuBar from "./Components/MenuBar";
import Desktop from "./Components/Desktop";
import Launchpad from "./Pages/Launchpad";
import AppStore from "./Pages/AppStore";
import BootScreen from "./Components/BootScreen";
import LockScreen from "./Components/LockScreen";
import About from "./Pages/About";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : true;
  });

  const [openApps, setOpenApps] = useState([]);
  const [activeApp, setActiveApp] = useState(null);
  const [showLaunchpad, setShowLaunchpad] = useState(false);
  const [showAppStore, setShowAppStore] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [bootPhase, setBootPhase] = useState("start"); // start, booting, lock, desktop
  const [bootFade, setBootFade] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  // Debug environment variables
  useEffect(() => {}, []);

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

  // Start boot when user clicks start
  const handleStartBoot = useCallback(() => {
    setBootPhase("booting");
    setTimeout(() => setBootFade(true), 5000);
    setTimeout(() => {
      setBootPhase("lock");
      setBootFade(false);
    }, 5800);
  }, []);

  // Unlock on any key or click
  useEffect(() => {
    if (bootPhase !== "lock") return;
    const unlock = () => setBootPhase("desktop");
    window.addEventListener("keydown", unlock);
    window.addEventListener("mousedown", unlock);
    window.addEventListener("touchstart", unlock);
    return () => {
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("mousedown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, [bootPhase]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const openApp = (appId) => {
    if (!openApps.find((app) => app.id === appId)) {
      const newApp = {
        id: appId,
        title: getAppTitle(appId),
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

  const handleAppInstalled = (app) => {
    // Handle app installation from App Store
  };

  const handleLogout = () => {
    setBootPhase("lock");
  };

  if (bootPhase === "start") {
    return <BootScreen showStartButton onStart={handleStartBoot} />;
  }
  if (bootPhase === "booting") {
    return <BootScreen showProgressBar fadeOut={bootFade} />;
  }
  if (bootPhase === "lock") {
    return <LockScreen darkMode={darkMode} />;
  }

  // Mobile warning overlay
  if (showMobileWarning) {
    return (
      <div className="mobile-warning" style={{ background: "#000" }}>
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
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <div
              style={{
                color: "#fff",
                fontWeight: 500,
                marginBottom: 10,
                fontSize: 18,
              }}
            >
              Connect with me:
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 24,
                marginBottom: 10,
              }}
            >
              <a
                href="https://www.linkedin.com/in/rajesh-paudel-822022371/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0077b5", fontSize: 32 }}
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com/_rajeshpaudel_/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#e4405f", fontSize: 32 }}
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/rajesh.paudel.965580/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1877f2", fontSize: 32 }}
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`App ${darkMode ? "dark-mode" : "light-mode"}`}>
      <MenuBar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onAbout={() => setAboutOpen(true)}
        onLogout={handleLogout}
      />
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
        <AppStore
          darkMode={darkMode}
          onAppInstalled={handleAppInstalled}
          onClose={() => setShowAppStore(false)}
        />
      )}
      {aboutOpen && (
        <About
          open={aboutOpen}
          darkMode={darkMode}
          onClose={() => setAboutOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
