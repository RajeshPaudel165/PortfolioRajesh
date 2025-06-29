import React, { useState, useEffect } from "react";
import "../Styles/RecycleBin.css";

const RecycleBin = ({ darkMode, onFileDeleted, onFileRestored }) => {
  const [deletedItems, setDeletedItems] = useState([
    {
      id: 1,
      name: "sample-image.png",
      type: "png",
      deletedDate: "2024-01-20",
      size: "2.1 MB",
      originalPath: "/Desktop",
      canRestore: true,
      isImage: true,
      imageData:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
    },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);

  // Listen for file deletion events from other components
  useEffect(() => {
    const handleFileDeleted = (event) => {
      const { file } = event.detail;
      addDeletedFile(file);
    };

    window.addEventListener("fileDeleted", handleFileDeleted);
    return () => window.removeEventListener("fileDeleted", handleFileDeleted);
  }, []);

  const addDeletedFile = (file) => {
    const newItem = {
      id: Date.now(),
      name: file.name,
      type: file.type || "file",
      deletedDate: new Date().toISOString().split("T")[0],
      size: file.size || "Unknown",
      originalPath: file.path || "/Unknown",
      canRestore: true,
      data: file.data,
    };
    setDeletedItems((prev) => [newItem, ...prev]);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "folder":
        return "📁";
      case "image":
        return "🖼️";
      case "heic":
        return "📸";
      case "document":
        return "📄";
      case "video":
        return "🎥";
      case "audio":
        return "🎵";
      case "pdf":
        return "📕";
      case "code":
        return "💻";
      default:
        return "📄";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleItemSelect = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleRestore = () => {
    if (selectedItems.length === 0) return;

    const itemsToRestore = deletedItems.filter((item) =>
      selectedItems.includes(item.id)
    );

    // Emit restore event for other components to handle
    itemsToRestore.forEach((item) => {
      if (item.isImage) {
        // Emit special event for image files to be restored as desktop icons
        window.dispatchEvent(
          new CustomEvent("imageFileRestored", {
            detail: {
              file: item,
              type: "desktop-icon",
              position: {
                x: Math.random() * 200 + 50,
                y: Math.random() * 200 + 50,
              },
            },
          })
        );
      } else {
        // Regular file restore event
        window.dispatchEvent(
          new CustomEvent("fileRestored", {
            detail: { file: item },
          })
        );
      }
    });

    // Remove from trash
    setDeletedItems((prev) =>
      prev.filter((item) => !selectedItems.includes(item.id))
    );
    setSelectedItems([]);

    // Notify parent component
    if (onFileRestored) {
      onFileRestored(itemsToRestore);
    }
  };

  const handleEmptyTrash = () => {
    // Emit permanent deletion event
    deletedItems.forEach((item) => {
      window.dispatchEvent(
        new CustomEvent("filePermanentlyDeleted", {
          detail: { file: item },
        })
      );
    });

    setDeletedItems([]);
    setSelectedItems([]);
  };

  const handleSelectAll = () => {
    if (selectedItems.length === deletedItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(deletedItems.map((item) => item.id));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => {
      const fileItem = {
        name: file.name,
        type: file.type.startsWith("image/")
          ? "image"
          : file.type.startsWith("video/")
          ? "video"
          : file.type.startsWith("audio/")
          ? "audio"
          : file.type.includes("pdf")
          ? "pdf"
          : "document",
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        path: "/Desktop",
        data: file,
      };
      addDeletedFile(fileItem);
    });
  };

  const handleItemDoubleClick = (item) => {
    setPreviewItem(item);
  };

  const closePreview = () => {
    setPreviewItem(null);
  };

  const calculateTotalSize = () => {
    return deletedItems
      .reduce((total, item) => {
        const size = parseFloat(item.size);
        return total + (isNaN(size) ? 0 : size);
      }, 0)
      .toFixed(1);
  };

  return (
    <div
      className={`recycle-bin ${isDragOver ? "drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="recycle-bin-header">
        <div className="recycle-bin-title">
          <span className="trash-icon">🗑️</span>
          <h2>Trash</h2>
        </div>
        <div className="recycle-bin-actions">
          <button
            className={`action-btn ${selectedItems.length > 0 ? "active" : ""}`}
            onClick={handleRestore}
            disabled={selectedItems.length === 0}
          >
            Restore
          </button>
          <button
            className="action-btn danger"
            onClick={handleEmptyTrash}
            disabled={deletedItems.length === 0}
          >
            Empty Trash
          </button>
        </div>
      </div>

      <div className="recycle-bin-toolbar">
        <div className="view-controls">
          <button
            className={`view-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            title="List View"
          >
            📋
          </button>
          <button
            className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
            title="Grid View"
          >
            🔲
          </button>
        </div>
        <div className="selection-controls">
          <button className="select-all-btn" onClick={handleSelectAll}>
            {selectedItems.length === deletedItems.length
              ? "Deselect All"
              : "Select All"}
          </button>
        </div>
      </div>

      <div className="recycle-bin-content">
        {deletedItems.length === 0 ? (
          <div className="empty-trash">
            <div className="empty-icon">🗑️</div>
            <p>Trash is empty</p>
            <span>
              Drag files here to delete them, or items you delete will appear
              here
            </span>
          </div>
        ) : (
          <div className={`items-container ${viewMode}`}>
            {deletedItems.map((item) => (
              <div
                key={item.id}
                className={`item ${
                  selectedItems.includes(item.id) ? "selected" : ""
                }`}
                onClick={() => handleItemSelect(item.id)}
                onDoubleClick={() => handleItemDoubleClick(item)}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", item.id);
                }}
              >
                <div className="item-icon">{getFileIcon(item.type)}</div>
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  <div className="item-meta">
                    <span>{item.size}</span>
                    <span>•</span>
                    <span>Deleted {formatDate(item.deletedDate)}</span>
                    <span>•</span>
                    <span>{item.originalPath}</span>
                  </div>
                </div>
                <div className="item-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleItemSelect(item.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="recycle-bin-footer">
        <div className="trash-info">
          <span>{deletedItems.length} items</span>
          <span>•</span>
          <span>{calculateTotalSize()} MB total</span>
        </div>
      </div>

      {/* File Preview Modal */}
      {previewItem && (
        <div className="preview-modal" onClick={closePreview}>
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
            <div className="preview-header">
              <h3>{previewItem.name}</h3>
              <button className="close-preview" onClick={closePreview}>
                ✕
              </button>
            </div>
            <div className="preview-body">
              <div className="preview-icon">
                {getFileIcon(previewItem.type)}
              </div>
              <div className="preview-details">
                <p>
                  <strong>Type:</strong> {previewItem.type}
                </p>
                <p>
                  <strong>Size:</strong> {previewItem.size}
                </p>
                <p>
                  <strong>Deleted:</strong>{" "}
                  {formatDate(previewItem.deletedDate)}
                </p>
                <p>
                  <strong>Original Path:</strong> {previewItem.originalPath}
                </p>
              </div>
              <div className="preview-actions">
                <button
                  className="action-btn active"
                  onClick={() => {
                    handleItemSelect(previewItem.id);
                    handleRestore();
                    closePreview();
                  }}
                >
                  Restore
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecycleBin;
