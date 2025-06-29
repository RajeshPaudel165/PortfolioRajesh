import React from "react";
import { FaApple, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import "../Styles/About.css";

const About = ({ open, onClose, darkMode }) => {
  if (!open) return null;
  return (
    <div className="about-modal-overlay" onClick={onClose}>
      <div
        className={`about-modal-macos${darkMode ? " dark" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="about-close-btn-macos"
          onClick={onClose}
          aria-label="Close About"
        >
          &#10005;
        </button>
        <div className="about-apple-logo">
          <FaApple />
        </div>
        <div className="about-title-macos">Rajesh's macOS Portfolio</div>
        <div className="about-version-macos">v1.0.0</div>
        <div className="about-desc-macos">
          A fully interactive macOS-inspired portfolio built with React.
        </div>
        <div className="about-info-macos">
          <div className="about-name">Rajesh Paudel</div>
          <div className="about-role">Developer & Designer</div>
          <div className="about-location">New Jersey, USA</div>
          <a
            href="mailto:mailrajeshpaudel@gmail.com"
            className="about-link-macos"
          >
            mailrajeshpaudel@gmail.com
          </a>
          <div className="about-phone">+1 (443) 805-1890</div>
        </div>
        <div className="about-socials-macos">
          <a
            href="https://www.linkedin.com/in/rajesh-paudel-822022371/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/RajeshPaudel165"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/_rajeshpaudel_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
        <div className="about-tech-macos">
          Built with: React, CSS, EmailJS, Google Maps API
        </div>
        <div className="about-credits-macos">
          Credits: Apple for design inspiration, react-icons, etc.
        </div>
        <div className="about-copyright-macos">
          © 2025 Rajesh Paudel. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default About;
