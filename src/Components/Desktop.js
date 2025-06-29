import React, { useState, useRef, useEffect } from "react";
import Window from "./Window";
import Dock from "./Dock";
import DesktopIcon from "./DesktopIcon";
import FlappyBirdClassic from "../Pages/FlappyBirdClassic";
import Skills from "../Pages/Skills";
import Calculator from "../Pages/Calculator";
import Notes from "../Pages/Notes";
import Weather from "../Pages/Weather";
import MusicPlayer from "../Pages/MusicPlayer";
import Education from "../Pages/Education";
import Projects from "../Pages/Projects";
import RecycleBin from "../Pages/RecycleBin";
import AppStore from "../Pages/AppStore";
import Launchpad from "../Pages/Launchpad";
import TaskMaster from "../Pages/TaskMaster";
import ImageViewer from "../Pages/ImageViewer";
import Messages from "../Pages/Messages";
import wallpaper from "../assets/macOS.png";
import macOSdark from "../assets/macOSdark.jpg";
import flappyBirdIcon from "../assets/flappybird.png";
import calculatorIcon from "../assets/calculator-icon.png";
import notesIcon from "../assets/notes-icon.png";
import weatherIcon from "../assets/weather-icon.png";
import musicIcon from "../assets/music-icon.png";
import educationIcon from "../assets/education-icon.png";
import vscodeIcon from "../assets/vscode-icon.png";
import docsIcon from "../assets/docs-icon.png";
import launchpadIcon from "../assets/launchpad.webp";
import appstoreIcon from "../assets/appstore.webp";
import trashIcon from "../assets/trash.png";
import messageIcon from "../assets/message.png";

const allApps = [
  {
    id: "flappy-bird",
    label: "Flappy Bird",
    component: FlappyBirdClassic,
    icon: (
      <img src={flappyBirdIcon} alt="Flappy Bird" style={{ width: "52px" }} />
    ),
    windowSize: { width: 400, height: 640 },
  },
  {
    id: "calculator",
    label: "Calculator",
    component: Calculator,
    icon: (
      <img
        src={calculatorIcon}
        alt="Calculator"
        style={{ width: "48px", height: "48px" }}
      />
    ),
    windowSize: { width: 320, height: 500 },
  },
  {
    id: "notes",
    label: "Notes",
    component: Notes,
    icon: (
      <img
        src={notesIcon}
        alt="Notes"
        style={{ width: "48px", height: "48px" }}
      />
    ),
    windowSize: { width: 800, height: 600 },
  },
  {
    id: "weather",
    label: "Weather",
    component: Weather,
    icon: (
      <img
        src={weatherIcon}
        alt="Weather"
        style={{ width: "48px", height: "48px" }}
      />
    ),
    windowSize: { width: 400, height: 500 },
  },
  {
    id: "music",
    label: "Music",
    component: MusicPlayer,
    icon: (
      <img
        src={musicIcon}
        alt="Music"
        style={{ width: "48px", height: "48px" }}
      />
    ),
    windowSize: { width: 700, height: 500 },
  },
  {
    id: "messages",
    label: "Messages",
    component: Messages,
    icon: (
      <img
        src={messageIcon}
        alt="Messages"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "0",
          background: "transparent",
        }}
      />
    ),
    windowSize: { width: 900, height: 700 },
  },
  {
    id: "projects",
    label: "Projects",
    component: Projects,
    icon: (
      <img
        src={vscodeIcon}
        alt="Projects"
        style={{ width: "48px", height: "48px" }}
      />
    ),
    windowSize: { width: 1000, height: 700 },
  },
  {
    id: "skills",
    label: "Skills",
    component: Skills,
    icon: (
      <img
        src={docsIcon}
        alt="Skills"
        style={{ width: "48px", height: "48px" }}
      />
    ),
    windowSize: { width: 550, height: 450 },
  },
  {
    id: "education",
    label: "Education",
    component: Education,
    icon: (
      <img
        src={educationIcon}
        alt="Education"
        style={{ width: "48px", height: "48px" }}
      />
    ),
    windowSize: { width: 600, height: 500 },
  },
  {
    id: "task-master",
    label: "Task Master",
    component: TaskMaster,
    icon: (
      <div
        style={{
          width: "48px",
          height: "48px",
          background: "linear-gradient(135deg, #007AFF, #5856D6)",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          color: "white",
          boxShadow: "0 4px 16px rgba(0, 122, 255, 0.3)",
        }}
      >
        📋
      </div>
    ),
    windowSize: { width: 600, height: 700 },
  },
  {
    id: "recycle-bin",
    label: "Trash",
    component: RecycleBin,
    icon: (
      <img
        src={trashIcon}
        alt="Trash"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "0",
          background: "transparent",
        }}
      />
    ),
    windowSize: { width: 800, height: 600 },
  },
  {
    id: "app-store",
    label: "App Store",
    component: AppStore,
    icon: (
      <img
        src={appstoreIcon}
        alt="App Store"
        style={{ width: "48px", height: "48px" }}
      />
    ),
    windowSize: { width: 1000, height: 700 },
  },
  {
    id: "launchpad",
    label: "Launchpad",
    component: Launchpad,
    icon: (
      <img
        src={launchpadIcon}
        alt="Launchpad"
        style={{ width: "48px", height: "48px" }}
      />
    ),
    windowSize: { width: 1200, height: 800 },
  },
];

// --- Define what shows up where ---
const desktopAppIds = ["flappy-bird", "calculator", "notes", "recycle-bin"];
const dockAppIds = [
  "projects",
  "skills",
  "education",
  "weather",
  "music",
  "messages",
  "app-store",
  "launchpad",
];

const Desktop = ({ darkMode }) => {
  const [openWindows, setOpenWindows] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [showLaunchpad, setShowLaunchpad] = useState(false);
  const [desktopFiles, setDesktopFiles] = useState([]);
  const desktopRef = useRef(null);
  const dragData = useRef(null);

  const desktopItems = allApps.filter((app) => desktopAppIds.includes(app.id));
  const dockItems = allApps.filter((app) => dockAppIds.includes(app.id));

  // Listen for restored image files
  useEffect(() => {
    const handleImageFileRestored = (event) => {
      const { file, position } = event.detail;

      // Create a new desktop file icon
      const newFileIcon = {
        id: `file-${Date.now()}`,
        name: file.name,
        type: file.type,
        position: position || {
          x: Math.random() * 200 + 50,
          y: Math.random() * 200 + 50,
        },
        data: file.data,
        imageData: file.imageData,
        isImage: file.isImage,
      };

      setDesktopFiles((prev) => [...prev, newFileIcon]);
    };

    window.addEventListener("imageFileRestored", handleImageFileRestored);
    return () =>
      window.removeEventListener("imageFileRestored", handleImageFileRestored);
  }, []);

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+Q to quit (close all windows)
      if ((e.metaKey || e.ctrlKey) && e.key === "q") {
        e.preventDefault();
        setOpenWindows([]);
      }

      // Cmd+W to close active window
      if ((e.metaKey || e.ctrlKey) && e.key === "w") {
        e.preventDefault();
        const activeWindow = openWindows.find(
          (win) =>
            win.zIndex === Math.max(...openWindows.map((w) => w.zIndex || 0))
        );
        if (activeWindow) {
          closeWindow(activeWindow.id);
        }
      }

      // Cmd+M to minimize active window
      if ((e.metaKey || e.ctrlKey) && e.key === "m") {
        e.preventDefault();
        const activeWindow = openWindows.find(
          (win) =>
            win.zIndex === Math.max(...openWindows.map((w) => w.zIndex || 0))
        );
        if (activeWindow) {
          minimizeWindow(activeWindow.id);
        }
      }

      // F4 or Cmd+Space to show/hide Launchpad
      if (e.key === "F4" || ((e.metaKey || e.ctrlKey) && e.key === " ")) {
        e.preventDefault();
        setShowLaunchpad(!showLaunchpad);
      }

      // Escape to close Launchpad
      if (e.key === "Escape" && showLaunchpad) {
        e.preventDefault();
        setShowLaunchpad(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openWindows, showLaunchpad]);

  // Handle app launch from Launchpad
  const handleAppLaunch = (appId) => {
    setShowLaunchpad(false);
    handleIconOpen(appId);
  };

  // Handle app installation from App Store
  const handleAppInstalled = (app) => {
    // Emit event for Launchpad to listen to
    window.dispatchEvent(
      new CustomEvent("appInstalled", {
        detail: { app },
      })
    );
  };

  const handleIconOpen = (appId) => {
    // Special handling for Launchpad - toggle full-screen overlay
    if (appId === "launchpad") {
      setShowLaunchpad(!showLaunchpad);
      return;
    }

    const existingWindow = openWindows.find((win) => win.id === appId);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        minimizeWindow(appId);
      } else {
        bringWindowToFront(appId);
      }
      return;
    }
    const appConfig = allApps.find((app) => app.id === appId);
    if (appConfig && desktopRef.current) {
      const desktopRect = desktopRef.current.getBoundingClientRect();
      const newWindow = {
        id: appConfig.id,
        title: appConfig.label,
        component: appConfig.component,
        size: appConfig.windowSize,
        position: {
          x: (desktopRect.width - appConfig.windowSize.width) / 2,
          y: (desktopRect.height - appConfig.windowSize.height) / 2,
        },
        isMinimized: false,
        zIndex: openWindows.length + 1,
      };
      setOpenWindows((prev) => [...prev, newWindow]);
    }
  };

  const handleFileIconOpen = (fileIcon) => {
    // Open image viewer for image files
    if (fileIcon.isImage) {
      const newWindow = {
        id: `image-viewer-${fileIcon.id}`,
        title: fileIcon.name,
        component: () => (
          <ImageViewer
            darkMode={darkMode}
            imageData={
              fileIcon.imageData ||
              fileIcon.data ||
              "data:image/heic;base64,placeholder_for_heic_image"
            }
            imageName={fileIcon.name}
          />
        ),
        size: { width: 800, height: 600 },
        position: {
          x: Math.random() * 200 + 100,
          y: Math.random() * 200 + 100,
        },
        isMinimized: false,
        zIndex: openWindows.length + 1,
      };
      setOpenWindows((prev) => [...prev, newWindow]);
    }
  };

  const closeWindow = (windowId) => {
    console.log("Desktop: closeWindow called with ID:", windowId);
    setOpenWindows((prev) => {
      const newWindows = prev.filter((win) => win.id !== windowId);
      console.log("Desktop: Windows after close:", newWindows.length);
      return newWindows;
    });
  };

  const minimizeWindow = (windowId) => {
    setOpenWindows((prev) =>
      prev.map((win) =>
        win.id === windowId ? { ...win, isMinimized: !win.isMinimized } : win
      )
    );
  };

  const bringWindowToFront = (windowId) => {
    setOpenWindows((prev) => {
      const maxZ = Math.max(0, ...prev.map((w) => w.zIndex || 0));
      return prev.map((win) => ({
        ...win,
        zIndex: win.id === windowId ? maxZ + 1 : win.zIndex,
      }));
    });
  };

  const handleResize = (windowId, newSize) => {
    setOpenWindows((prev) =>
      prev.map((win) =>
        win.id === windowId
          ? {
              ...win,
              size: { width: newSize.width, height: newSize.height },
              position: { x: newSize.left, y: newSize.top },
            }
          : win
      )
    );
  };

  const handleDragStart = (e, windowId) => {
    e.preventDefault();
    bringWindowToFront(windowId);
    const winEl = e.target.closest(".app-window");
    const deskEl = desktopRef.current;
    if (!winEl || !deskEl) return;
    const winRect = winEl.getBoundingClientRect();
    const deskRect = deskEl.getBoundingClientRect();
    dragData.current = {
      id: windowId,
      offsetX: e.clientX - winRect.left,
      offsetY: e.clientY - winRect.top,
      desktopLeft: deskRect.left,
      desktopTop: deskRect.top,
    };
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd, { once: true });
  };
  const handleDragMove = (e) => {
    if (!dragData.current) return;
    const { id, offsetX, offsetY, desktopLeft, desktopTop } = dragData.current;
    setOpenWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              position: {
                x: e.clientX - offsetX - desktopLeft,
                y: e.clientY - offsetY - desktopTop,
              },
            }
          : w
      )
    );
  };
  const handleDragEnd = () => {
    document.removeEventListener("mousemove", handleDragMove);
  };

  return (
    <div
      ref={desktopRef}
      className="desktop"
      style={{ backgroundImage: `url(${darkMode ? macOSdark : wallpaper})` }}
      onClick={() => setSelectedIcon(null)}
    >
      <div className="desktop-icons">
        {desktopItems.map((app) => (
          <DesktopIcon
            key={app.id}
            label={app.label}
            isSelected={selectedIcon === app.id}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIcon(app.id);
            }}
            onDoubleClick={() => handleIconOpen(app.id)}
          >
            {app.icon}
          </DesktopIcon>
        ))}

        {/* Desktop File Icons */}
        {desktopFiles.map((fileIcon) => (
          <DesktopIcon
            key={fileIcon.id}
            label={fileIcon.name}
            isSelected={selectedIcon === fileIcon.id}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIcon(fileIcon.id);
            }}
            onDoubleClick={() => handleFileIconOpen(fileIcon)}
            style={{
              position: "absolute",
              left: `${fileIcon.position.x}px`,
              top: `${fileIcon.position.y}px`,
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "linear-gradient(135deg, #FF6B6B, #4ECDC4)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                color: "white",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              📸
            </div>
          </DesktopIcon>
        ))}
      </div>

      {openWindows.map((win) => {
        // Don't render minimized windows
        if (win.isMinimized) {
          return null;
        }

        const WindowContent = win.component;
        const maxZ = Math.max(0, ...openWindows.map((w) => w.zIndex || 0));
        return (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            isMinimized={win.isMinimized}
            isActive={win.zIndex === maxZ}
            style={{
              width: `${win.size.width}px`,
              height: `${win.size.height}px`,
              left: `${win.position.x}px`,
              top: `${win.position.y}px`,
              zIndex: win.zIndex,
            }}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onDragStart={handleDragStart}
            bringToFront={() => bringWindowToFront(win.id)}
            onResize={handleResize}
          >
            <WindowContent
              darkMode={darkMode}
              onAppInstalled={handleAppInstalled}
            />
          </Window>
        );
      })}

      <Dock
        apps={dockItems}
        openWindows={openWindows}
        onIconClick={handleIconOpen}
        darkMode={darkMode}
        showLaunchpad={showLaunchpad}
      />

      {/* Launchpad */}
      <Launchpad
        darkMode={darkMode}
        onAppLaunch={handleAppLaunch}
        isVisible={showLaunchpad}
        onClose={() => setShowLaunchpad(false)}
      />

      {/* Launchpad Trigger - Invisible button for gesture support */}
      <div
        className="launchpad-trigger"
        onClick={() => setShowLaunchpad(true)}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100px",
          height: "100px",
          opacity: 0,
          cursor: "pointer",
          zIndex: 1,
        }}
        title="Click or press F4 to open Launchpad"
      />
    </div>
  );
};

export default Desktop;
