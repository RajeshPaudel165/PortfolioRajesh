import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "../Styles/BootScreen.css";
import wallpaperLight from "../assets/macOS.jpg";
import wallpaperDark from "../assets/macOSdark.png";

const LockScreen = ({ darkMode }) => {
  const wallpaperImg = darkMode ? wallpaperDark : wallpaperLight;

  return (
    <div
      className="lockscreen-bg"
      style={{ backgroundImage: `url(${wallpaperImg})` }}
    >
      <div className="lockscreen-blur" />
      <div className="lockscreen-content lockscreen-content-lower">
        <FaUserCircle className="lockscreen-avatar lockscreen-avatar-icon" />
        <div className="lockscreen-name">Rajesh Paudel</div>
        <div className="lock-message">Press any key or click to unlock</div>
      </div>
    </div>
  );
};

export default LockScreen;
