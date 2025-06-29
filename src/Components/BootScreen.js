import React, { useEffect, useRef } from "react";
import { FaApple } from "react-icons/fa";
import "../Styles/BootScreen.css";

const BootScreen = ({ fadeOut, showStartButton, onStart, showProgressBar }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element for startup sound
    if (showProgressBar && !audioRef.current) {
      audioRef.current = new Audio(
        process.env.PUBLIC_URL + "/StartupIntelT2Mac.wav"
      );
      audioRef.current.volume = 0.7; // Set volume to 70%

      // Play startup sound when boot sequence starts
      const playStartupSound = () => {
        audioRef.current.play().catch((error) => {
          console.log("Startup sound could not be played:", error);
        });
      };

      // Play sound after a short delay to match the boot sequence
      const soundTimer = setTimeout(playStartupSound, 1000);

      return () => {
        clearTimeout(soundTimer);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, [showProgressBar]);

  return (
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
};

export default BootScreen;
