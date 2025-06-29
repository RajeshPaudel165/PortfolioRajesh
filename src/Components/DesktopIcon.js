import React from "react";
import "../Styles/DesktopIcon.css";

const DesktopIcon = ({
  label,
  onDoubleClick,
  onClick,
  isSelected,
  children,
  style,
}) => {
  return (
    <div
      className={`desktop-icon ${isSelected ? "selected" : ""}`}
      onDoubleClick={onDoubleClick}
      onClick={onClick}
      style={style}
    >
      <div className="icon-container">{children}</div>
      <span className="icon-label">{label}</span>
    </div>
  );
};

export default DesktopIcon;
