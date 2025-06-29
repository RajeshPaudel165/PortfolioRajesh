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
      // Only track mouse when apps are open
      if (!hasOpenApps) return;

      const mouseY = e.clientY;
      const windowHeight = window.innerHeight;

      // Show dock when mouse is near the bottom of the screen
      const showThreshold = 100; // pixels from bottom
      const isNearBottom = mouseY > windowHeight - showThreshold;

      if (isNearBottom) {
        setIsVisible(true);

        // Clear any existing hide timeout
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }
      } else {
        // Hide dock when mouse moves away (only when apps are open)
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }

        hideTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 500); // 0.5 seconds delay before hiding
      }
    };

    const handleMouseEnter = () => {
      // Only handle hover when apps are open
      if (!hasOpenApps) return;

      setIsVisible(true);

      // Clear hide timeout when hovering
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };

    const handleMouseLeave = () => {
      // Only handle leave when apps are open
      if (!hasOpenApps) return;

      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 500); // 0.5 seconds delay before hiding
    };

    // Add event listeners only when apps are open
    if (hasOpenApps) {
      document.addEventListener("mousemove", handleMouseMove);

      const dockElement = dockRef.current;
      if (dockElement) {
        dockElement.addEventListener("mouseenter", handleMouseEnter);
        dockElement.addEventListener("mouseleave", handleMouseLeave);
      }
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);

      const dockElement = dockRef.current;
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
