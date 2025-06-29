import React, { useState, useEffect, useRef } from "react";
import "../Styles/Dock.css"; // We will create this file next

const Dock = ({ apps, openWindows, onIconClick, darkMode, showLaunchpad }) => {
  const [isVisible, setIsVisible] = useState(true);
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

  // macOS-style mouse tracking for auto-hide
  useEffect(() => {
    // Always show dock if no apps are open
    if (!hasOpenApps) {
      setIsVisible(true);
      return;
    }

    // Only track mouse when apps are open
    const handleMouseMove = (e) => {
      const mouseY = e.clientY;
      const windowHeight = window.innerHeight;
      const showThreshold = 80;
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
      setIsVisible(true);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };

    const handleMouseLeave = () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 500);
    };

    document.addEventListener("mousemove", handleMouseMove);
    const dockElement = dockRef.current;
    if (dockElement) {
      dockElement.addEventListener("mouseenter", handleMouseEnter);
      dockElement.addEventListener("mouseleave", handleMouseLeave);
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
              {typeof app.icon === "function" ? app.icon() : app.icon}
            </button>

            {isRunning(app.id) && <div className="active-dot" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dock;
