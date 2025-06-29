import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "../Styles/BootScreen.css";
import wallpaper from "../assets/macOS.png";

const LockScreen = () => {
  return (
    <div
      className="lockscreen-bg"
      style={{ backgroundImage: `url(${wallpaper})` }}
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
