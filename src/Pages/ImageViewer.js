import React, { useState, useEffect } from "react";
import "../Styles/ImageViewer.css";
import {
  FaCamera,
  FaSearchMinus,
  FaSearchPlus,
  FaRedo,
  FaUndo,
} from "react-icons/fa";

const ImageViewer = ({ darkMode, imageData, imageName }) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  // Check if the image is HEIC format
  const isHEIC =
    imageName?.toLowerCase().includes(".heic") ||
    imageData?.includes("heic") ||
    imageData?.includes("placeholder_for_heic_image");

  useEffect(() => {
    // If it's a HEIC image, show placeholder immediately
    if (isHEIC) {
      setShowPlaceholder(true);
    }
  }, [isHEIC]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.25));
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleImageError = (e) => {
    e.target.style.display = "none";
    setShowPlaceholder(true);
  };

  return (
    <div className={`image-viewer ${darkMode ? "dark-mode" : ""}`}>
      <div className="image-viewer-header">
        <div className="image-viewer-title">
          <span className="image-icon">
            <FaCamera size={20} />
          </span>
          <h2>{imageName}</h2>
        </div>
        <div className="image-viewer-toolbar">
          <button
            className="toolbar-btn"
            onClick={handleZoomOut}
            title="Zoom Out"
            disabled={showPlaceholder}
          >
            <FaSearchMinus size={16} />
          </button>
          <button
            className="toolbar-btn"
            onClick={handleZoomIn}
            title="Zoom In"
            disabled={showPlaceholder}
          >
            <FaSearchPlus size={16} />
          </button>
          <button
            className="toolbar-btn"
            onClick={handleRotate}
            title="Rotate"
            disabled={showPlaceholder}
          >
            <FaRedo size={16} />
          </button>
          <button
            className="toolbar-btn"
            onClick={handleReset}
            title="Reset"
            disabled={showPlaceholder}
          >
            <FaUndo size={16} />
          </button>
        </div>
      </div>

      <div className="image-viewer-content">
        <div className="image-container">
          {!showPlaceholder && (
            <img
              src={imageData}
              alt={imageName}
              className="displayed-image"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                transition: "transform 0.3s ease",
              }}
              onError={handleImageError}
            />
          )}
          {showPlaceholder && (
            <div className="image-placeholder">
              <div className="placeholder-icon">
                <FaCamera size={48} />
              </div>
              <p>HEIC Image Preview</p>
              <span>{imageName}</span>
              <div className="heic-info">
                <p>
                  HEIC format images are not directly supported in web browsers.
                </p>
                <p>This is a preview of the image file.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="image-viewer-footer">
        <div className="image-info">
          {!showPlaceholder && (
            <>
              <span>Zoom: {Math.round(zoom * 100)}%</span>
              <span>•</span>
              <span>Rotation: {rotation}°</span>
              <span>•</span>
            </>
          )}
          <span>{isHEIC ? "HEIC Image" : "Image"}</span>
          {isHEIC && (
            <>
              <span>•</span>
              <span>Preview Mode</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
