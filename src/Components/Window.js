import React, { useState, useRef } from "react";
import "../Styles/Window.css";

const Window = ({
  id,
  title,
  isActive,
  style,
  onClose,
  onDragStart,
  bringToFront,
  children,
  onResize,
  onMinimize,
  isMinimized,
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
  const [originalPosition, setOriginalPosition] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleClose = () => {
    console.log("🔴 CLOSE button clicked for window:", id);
    if (onClose) {
      onClose();
    }
  };

  const handleMinimize = () => {
    console.log("🟡 MINIMIZE button clicked for window:", id);
    if (onMinimize) {
      onMinimize(id);
    }
  };

  const handleMaximize = () => {
    console.log("🟢 MAXIMIZE button clicked for window:", id);

    if (!isMaximized) {
      // Store original size and position
      setOriginalSize({
        width: parseInt(style.width),
        height: parseInt(style.height),
      });
      setOriginalPosition({
        x: parseInt(style.left),
        y: parseInt(style.top),
      });
      setIsMaximized(true);

      // Maximize to full page (entire viewport)
      if (onResize) {
        onResize(id, {
          width: window.innerWidth,
          height: window.innerHeight,
          left: 0,
          top: 0,
        });
      }
    } else {
      // Restore original size and position
      setIsMaximized(false);
      if (onResize) {
        onResize(id, {
          width: originalSize.width,
          height: originalSize.height,
          left: originalPosition.x,
          top: originalPosition.y,
        });
      }
    }
  };

  const handleResizeStart = (e) => {
    e.stopPropagation();
    setIsResizing(true);
    bringToFront();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = parseInt(style.width);
    const startHeight = parseInt(style.height);

    const handleMouseMove = (e) => {
      if (!isResizing) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      const newWidth = Math.max(300, startWidth + deltaX);
      const newHeight = Math.max(200, startHeight + deltaY);

      if (onResize) {
        onResize(id, {
          width: newWidth,
          height: newHeight,
          left: parseInt(style.left),
          top: parseInt(style.top),
        });
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={windowRef}
      className={`app-window ${!isActive ? "inactive" : ""} ${
        isMaximized ? "maximized" : ""
      } ${isMinimized ? "minimized" : ""}`}
      style={style}
      onClick={bringToFront}
    >
      <div className="window-header" onMouseDown={(e) => onDragStart(e, id)}>
        {/* Control buttons as separate divs with inline styles */}
        <div
          style={{
            position: "absolute",
            left: "12px",
            display: "flex",
            gap: "12px",
            zIndex: 1000,
            pointerEvents: "auto",
          }}
        >
          {/* Close Button */}
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              handleClose();
            }}
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: "#ff5f57",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 1001,
              padding: "8px",
              boxSizing: "border-box",
              "&::after": {
                content: '""',
                position: "absolute",
                top: "-8px",
                left: "-8px",
                right: "-8px",
                bottom: "-8px",
                background: "transparent",
                zIndex: 1002,
              },
            }}
            title="Close"
          >
            <span
              style={{
                width: "100%",
                height: "100%",
                background:
                  'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\"><path d=\\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\\"/></svg>") no-repeat center',
                backgroundSize: "65%",
                opacity: 0,
                transition: "opacity 0.1s ease",
              }}
            ></span>
            <div
              style={{
                position: "absolute",
                top: "-8px",
                left: "-8px",
                right: "-8px",
                bottom: "-8px",
                background: "transparent",
                zIndex: 1002,
              }}
            ></div>
          </div>

          {/* Minimize Button */}
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              handleMinimize();
            }}
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: "#febc2e",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 1001,
              padding: "8px",
              boxSizing: "border-box",
            }}
            title="Minimize"
          >
            <span
              style={{
                width: "100%",
                height: "100%",
                background:
                  'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\"><path d=\\"M19 13H5v-2h14v2z\\"/></svg>") no-repeat center',
                backgroundSize: "65%",
                opacity: 0,
                transition: "opacity 0.1s ease",
              }}
            ></span>
            <div
              style={{
                position: "absolute",
                top: "-8px",
                left: "-8px",
                right: "-8px",
                bottom: "-8px",
                background: "transparent",
                zIndex: 1002,
              }}
            ></div>
          </div>

          {/* Maximize Button */}
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              handleMaximize();
            }}
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: "#28c840",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 1001,
              padding: "8px",
              boxSizing: "border-box",
            }}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            <span
              style={{
                width: "100%",
                height: "100%",
                background: isMaximized
                  ? 'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\"><path d=\\"M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z\\"/></svg>") no-repeat center'
                  : 'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\"><path d=\\"M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z\\"/></svg>") no-repeat center',
                backgroundSize: "65%",
                opacity: 0,
                transition: "opacity 0.1s ease",
              }}
            ></span>
            <div
              style={{
                position: "absolute",
                top: "-8px",
                left: "-8px",
                right: "-8px",
                bottom: "-8px",
                background: "transparent",
                zIndex: 1002,
              }}
            ></div>
          </div>
        </div>
        <div className="window-title">{title}</div>
      </div>
      <div className="window-content">{children}</div>
      <div
        className="window-resize-handle"
        onMouseDown={handleResizeStart}
      ></div>
    </div>
  );
};

export default Window;
