import React from "react";
import { FaApple } from "react-icons/fa";
import "../Styles/BootScreen.css";

const BootScreen = ({ fadeOut, showStartButton, onStart, showProgressBar }) => (
  <div className={`boot-screen${fadeOut ? " fade-out" : ""}`}>
    <div className="boot-content">
      <FaApple className="boot-apple-logo" />
      {showStartButton && (
        <button className="boot-start-btn" onClick={onStart}>
          Start
        </button>
      )}
      {showProgressBar && (
        <div className="boot-progress-bar">
          <div className="boot-progress-fill" />
        </div>
      )}
    </div>
  </div>
);

export default BootScreen;
