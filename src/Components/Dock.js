import React, { useState, useEffect, useRef } from "react";
import "../Styles/Dock.css"; // We will create this file next

const Dock = ({ apps, openWindows, onIconClick, darkMode, showLaunchpad }) => {
  const [isVisible, setIsVisible] = useState(true); // Start visible by default
  const dockRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  // A helper to check if a window is currently open
  const isRunning = (appId) => {
    // Special handling for Launchpad
    if (appId === "launchpad") {
      return showLaunchpad;
    }
    return openWindows.some((win) => win.id === appId);
  };

  // Check if any apps are currently open
  const hasOpenApps = openWindows.length > 0 || showLaunchpad;

  // Mouse tracking for auto-hide (only when apps are open)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!hasOpenApps) return;
      const mouseY = e.clientY;
      const windowHeight = window.innerHeight;
      const showThreshold = 100;
      const isNearBottom = mouseY > windowHeight - showThreshold;
      if (isNearBottom) {
        setIsVisible(true);
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }
      } else {
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
        hideTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 500);
      }
    };
    const handleMouseEnter = () => {
      if (!hasOpenApps) return;
      setIsVisible(true);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };
    const handleMouseLeave = () => {
      if (!hasOpenApps) return;
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 500);
    };
    let dockElement = null;
    if (hasOpenApps) {
      document.addEventListener("mousemove", handleMouseMove);
      dockElement = dockRef.current;
      if (dockElement) {
        dockElement.addEventListener("mouseenter", handleMouseEnter);
        dockElement.addEventListener("mouseleave", handleMouseLeave);
      }
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (dockElement) {
        dockElement.removeEventListener("mouseenter", handleMouseEnter);
        dockElement.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [hasOpenApps]);

  // Hide dock when apps are open, show when no apps
  useEffect(() => {
    if (hasOpenApps) {
      setIsVisible(false);
    } else {
      // Always show dock when no apps are open
      setIsVisible(true);
    }
  }, [hasOpenApps]);

  return (
    <div
      ref={dockRef}
      className={`dock-container ${isVisible ? "visible" : "hidden"}`}
    >
      <div className="dock">
        {apps.map((app) => (
          <div key={app.id} className="dock-item">
            <button
              className="dock-icon-button"
              onClick={() => onIconClick(app.id)}
              title={app.label}
            >
              {app.icon}
            </button>

            {isRunning(app.id) && <div className="active-dot" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dock;
