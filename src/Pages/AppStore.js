import React, { useState, useEffect } from "react";
import "../Styles/AppStore.css";
import {
  FaStore,
  FaSearch,
  FaStar,
  FaCalculator,
  FaCheck,
  FaMusic,
  FaCode,
  FaGlobe,
  FaCamera,
  FaUsers,
  FaPuzzlePiece,
  FaBolt,
  FaWrench,
  FaGraduationCap,
  FaGamepad,
  FaMobile,
  FaLaptop,
  FaClock,
} from "react-icons/fa";

const AppStore = ({ darkMode, onAppInstalled }) => {
  const [selectedCategory, setSelectedCategory] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [installedApps, setInstalledApps] = useState([]);
  const [downloadingApps, setDownloadingApps] = useState({});
  const [selectedApp, setSelectedApp] = useState(null);

  const categories = [
    { id: "featured", name: "Featured", icon: <FaStar /> },
    { id: "productivity", name: "Productivity", icon: <FaBolt /> },
    { id: "entertainment", name: "Entertainment", icon: <FaMusic /> },
    { id: "utilities", name: "Utilities", icon: <FaWrench /> },
    { id: "education", name: "Education", icon: <FaGraduationCap /> },
    { id: "games", name: "Games", icon: <FaGamepad /> },
    { id: "social", name: "Social Networking", icon: <FaUsers /> },
    { id: "photo", name: "Photo & Video", icon: <FaCamera /> },
  ];

  const apps = [
    {
      id: "calculator-pro",
      name: "Calculator Pro",
      developer: "MathWorks Inc.",
      category: "utilities",
      rating: 4.8,
      reviews: 1247,
      price: "$4.99",
      icon: <FaCalculator />,
      description:
        "Advanced calculator with scientific functions, graphing capabilities, and unit conversions. Perfect for students, engineers, and professionals.",
      screenshots: ["📱", "📱", "📱", "📱"],
      featured: true,
      size: "15.2 MB",
      version: "2.1.0",
      requirements: "macOS 10.15+",
      downloadUrl: "https://example.com/calculator-pro.dmg",
      ageRating: "4+",
      languages: ["English", "Spanish", "French"],
      compatibility: "macOS 10.15 or later",
      developerWebsite: "https://mathworks.com",
      privacyPolicy: "https://mathworks.com/privacy",
    },
    {
      id: "task-master",
      name: "Task Master",
      developer: "Productivity Labs",
      category: "productivity",
      rating: 4.6,
      reviews: 892,
      price: "Free",
      icon: <FaCheck />,
      description:
        "Organize your tasks and boost productivity with smart reminders and project management. Sync across all your devices.",
      screenshots: ["📱", "📱", "📱", "📱"],
      featured: true,
      size: "8.7 MB",
      version: "1.5.2",
      requirements: "macOS 11.0+",
      downloadUrl: "https://example.com/task-master.dmg",
      ageRating: "4+",
      languages: ["English"],
      compatibility: "macOS 11.0 or later",
      developerWebsite: "https://productivitylabs.com",
      privacyPolicy: "https://productivitylabs.com/privacy",
    },
    {
      id: "music-studio",
      name: "Music Studio",
      developer: "AudioTech",
      category: "entertainment",
      rating: 4.9,
      reviews: 2156,
      price: "$12.99",
      icon: <FaMusic />,
      description:
        "Professional music creation and editing with virtual instruments and effects. Create, record, and produce your own music.",
      screenshots: ["📱", "📱", "📱", "📱"],
      featured: true,
      size: "245.3 MB",
      version: "3.0.1",
      requirements: "macOS 12.0+",
      downloadUrl: "https://example.com/music-studio.dmg",
      ageRating: "4+",
      languages: ["English", "German", "Japanese"],
      compatibility: "macOS 12.0 or later",
      developerWebsite: "https://audiotech.com",
      privacyPolicy: "https://audiotech.com/privacy",
    },
    {
      id: "code-editor",
      name: "Code Editor",
      developer: "DevTools",
      category: "utilities",
      rating: 4.7,
      reviews: 1567,
      price: "$9.99",
      icon: <FaCode />,
      description:
        "Advanced code editor with syntax highlighting, debugging, and Git integration. Support for 50+ programming languages.",
      screenshots: ["📱", "📱", "📱", "📱"],
      featured: false,
      size: "89.1 MB",
      version: "1.8.3",
      requirements: "macOS 10.15+",
      downloadUrl: "https://example.com/code-editor.dmg",
      ageRating: "4+",
      languages: ["English"],
      compatibility: "macOS 10.15 or later",
      developerWebsite: "https://devtools.com",
      privacyPolicy: "https://devtools.com/privacy",
    },
    {
      id: "language-learner",
      name: "Language Learner",
      developer: "EduTech",
      category: "education",
      rating: 4.5,
      reviews: 743,
      price: "Free",
      icon: <FaGlobe />,
      description:
        "Learn new languages with interactive lessons, speech recognition, and progress tracking. Available in 20+ languages.",
      screenshots: ["📱", "📱", "📱", "📱"],
      featured: false,
      size: "156.8 MB",
      version: "2.0.0",
      requirements: "macOS 11.0+",
      downloadUrl: "https://example.com/language-learner.dmg",
      ageRating: "4+",
      languages: ["English", "Spanish", "French", "German", "Chinese"],
      compatibility: "macOS 11.0 or later",
      developerWebsite: "https://edutech.com",
      privacyPolicy: "https://edutech.com/privacy",
    },
    {
      id: "photo-editor",
      name: "Photo Editor Pro",
      developer: "ImageWorks",
      category: "photo",
      rating: 4.4,
      reviews: 1892,
      price: "$7.99",
      icon: <FaCamera />,
      description:
        "Professional photo editing and filters with AI-powered enhancement tools. Perfect for photographers and designers.",
      screenshots: ["📱", "📱", "📱", "📱"],
      featured: false,
      size: "203.5 MB",
      version: "1.9.4",
      requirements: "macOS 12.0+",
      downloadUrl: "https://example.com/photo-editor.dmg",
      ageRating: "4+",
      languages: ["English", "Spanish"],
      compatibility: "macOS 12.0 or later",
      developerWebsite: "https://imageworks.com",
      privacyPolicy: "https://imageworks.com/privacy",
    },
    {
      id: "social-connect",
      name: "Social Connect",
      developer: "SocialTech",
      category: "social",
      rating: 4.3,
      reviews: 3421,
      price: "Free",
      icon: <FaUsers />,
      description:
        "Connect with friends and family through messaging, video calls, and social networking features.",
      screenshots: ["📱", "📱", "📱", "📱"],
      featured: false,
      size: "67.2 MB",
      version: "1.2.1",
      requirements: "macOS 11.0+",
      downloadUrl: "https://example.com/social-connect.dmg",
      ageRating: "12+",
      languages: ["English", "Spanish", "French", "German"],
      compatibility: "macOS 11.0 or later",
      developerWebsite: "https://socialtech.com",
      privacyPolicy: "https://socialtech.com/privacy",
    },
    {
      id: "puzzle-master",
      name: "Puzzle Master",
      developer: "GameStudio",
      category: "games",
      rating: 4.6,
      reviews: 892,
      price: "$2.99",
      icon: <FaPuzzlePiece />,
      description:
        "Challenge your mind with hundreds of puzzles, brain teasers, and logic games. Perfect for all ages.",
      screenshots: ["📱", "📱", "📱", "📱"],
      featured: false,
      size: "45.8 MB",
      version: "1.1.5",
      requirements: "macOS 10.15+",
      downloadUrl: "https://example.com/puzzle-master.dmg",
      ageRating: "4+",
      languages: ["English"],
      compatibility: "macOS 10.15 or later",
      developerWebsite: "https://gamestudio.com",
      privacyPolicy: "https://gamestudio.com/privacy",
    },
  ];

  // Load installed apps from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("installedApps");
    if (saved) {
      setInstalledApps(JSON.parse(saved));
    }
  }, []);

  // Save installed apps to localStorage
  useEffect(() => {
    localStorage.setItem("installedApps", JSON.stringify(installedApps));
  }, [installedApps]);

  const filteredApps = apps.filter((app) => {
    const matchesCategory =
      selectedCategory === "featured"
        ? app.featured
        : app.category === selectedCategory;
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.developer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} style={{ color: "#FFD700" }} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" style={{ color: "#FFD700" }} />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} style={{ color: "#E0E0E0" }} />);
    }
    return stars;
  };

  const isAppInstalled = (appId) => {
    return installedApps.some((app) => app.id === appId);
  };

  const isAppDownloading = (appId) => {
    return downloadingApps[appId];
  };

  const downloadApp = async (app) => {
    if (isAppInstalled(app.id) || isAppDownloading(app.id)) return;

    setDownloadingApps((prev) => ({ ...prev, [app.id]: 0 }));

    // Simulate download progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setDownloadingApps((prev) => ({ ...prev, [app.id]: progress }));
    }

    // Install the app
    const installedApp = {
      id: app.id,
      name: app.name,
      developer: app.developer,
      icon: typeof app.icon === "function" ? app.icon() : app.icon,
      version: app.version,
      installDate: new Date().toISOString(),
      size: app.size,
    };

    setInstalledApps((prev) => [...prev, installedApp]);
    setDownloadingApps((prev) => {
      const newState = { ...prev };
      delete newState[app.id];
      return newState;
    });

    // Notify parent component
    if (onAppInstalled) {
      onAppInstalled(installedApp);
    }

    // Show success notification
    showNotification(`${app.name} has been installed successfully!`);
  };

  const uninstallApp = (appId) => {
    setInstalledApps((prev) => prev.filter((app) => app.id !== appId));
    showNotification("App has been uninstalled.");
  };

  const showNotification = (message) => {
    const notification = document.createElement("div");
    notification.className = "app-notification";
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #007AFF;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 10000;
      animation: slideIn 0.3s ease;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease";
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };

  const closeAppDetails = () => {
    setSelectedApp(null);
  };

  return (
    <div className={`app-store ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Top Navigation Bar */}
      <div className="app-store-navbar">
        <div className="navbar-left">
          <div className="store-logo">
            <span className="store-icon">
              <FaStore />
            </span>
            <span className="store-text">App Store</span>
          </div>
        </div>

        <div className="navbar-center">
          <div className="search-container">
            <div className="search-icon">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search the App Store"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="navbar-right">
          <button className="account-btn">Sign In</button>
        </div>
      </div>

      <div className="app-store-content">
        {/* Sidebar */}
        <div className="app-store-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Categories</h3>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`sidebar-item ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="sidebar-icon">{category.icon}</span>
                <span className="sidebar-label">{category.name}</span>
              </button>
            ))}
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">Quick Links</h3>
            <button className="sidebar-item">
              <span className="sidebar-icon">
                <FaMobile />
              </span>
              <span className="sidebar-label">iPhone Apps</span>
            </button>
            <button className="sidebar-item">
              <span className="sidebar-icon">
                <FaLaptop />
              </span>
              <span className="sidebar-label">Mac Apps</span>
            </button>
            <button className="sidebar-item">
              <span className="sidebar-icon">
                <FaClock />
              </span>
              <span className="sidebar-label">Apple Watch</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="app-store-main">
          <div className="main-header">
            <div className="header-content">
              <h1 className="main-title">
                {selectedCategory === "featured"
                  ? "Featured"
                  : categories.find((c) => c.id === selectedCategory)?.name}
              </h1>
              <p className="main-subtitle">
                {selectedCategory === "featured"
                  ? "Discover amazing apps and games"
                  : `Great ${categories
                      .find((c) => c.id === selectedCategory)
                      ?.name.toLowerCase()} apps`}
              </p>
            </div>
          </div>

          <div className="apps-container">
            {filteredApps.length > 0 ? (
              <div className="apps-grid">
                {filteredApps.map((app) => (
                  <div key={app.id} className="app-tile">
                    <div className="app-tile-image">
                      <div className="app-icon-large">
                        {typeof app.icon === "function" ? app.icon() : app.icon}
                      </div>
                    </div>

                    <div className="app-tile-content">
                      <div className="app-tile-header">
                        <h3 className="app-tile-name">{app.name}</h3>
                        <div className="app-tile-price">{app.price}</div>
                      </div>

                      <p className="app-tile-developer">{app.developer}</p>

                      <div className="app-tile-rating">
                        <div className="rating-stars">
                          {renderStars(app.rating)}
                        </div>
                        <span className="rating-count">({app.reviews})</span>
                      </div>

                      <div className="app-tile-actions">
                        {isAppInstalled(app.id) ? (
                          <div className="installed-state">
                            <button className="installed-button">
                              ✓ Installed
                            </button>
                            <button
                              className="uninstall-button"
                              onClick={() => uninstallApp(app.id)}
                            >
                              Uninstall
                            </button>
                          </div>
                        ) : (
                          <button
                            className={`get-button ${
                              isAppDownloading(app.id) ? "downloading" : ""
                            }`}
                            onClick={() => downloadApp(app)}
                            disabled={isAppDownloading(app.id)}
                          >
                            {isAppDownloading(app.id) ? (
                              <div className="download-progress">
                                <div
                                  className="progress-fill"
                                  style={{
                                    width: `${downloadingApps[app.id]}%`,
                                  }}
                                ></div>
                                <span className="progress-text">
                                  {downloadingApps[app.id]}%
                                </span>
                              </div>
                            ) : app.price === "Free" ? (
                              "Get"
                            ) : (
                              app.price
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No apps found</h3>
                <p>Try adjusting your search or browse different categories</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* App Details Modal */}
      {selectedApp && (
        <div className="app-details-overlay" onClick={closeAppDetails}>
          <div
            className="app-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-app-info">
                <div className="modal-app-icon">
                  {typeof selectedApp.icon === "function"
                    ? selectedApp.icon()
                    : selectedApp.icon}
                </div>
                <div className="modal-app-details">
                  <h2 className="modal-app-name">{selectedApp.name}</h2>
                  <p className="modal-app-developer">{selectedApp.developer}</p>
                  <div className="modal-app-rating">
                    <span className="modal-stars">
                      {renderStars(selectedApp.rating)}
                    </span>
                    <span className="modal-rating-text">
                      {selectedApp.rating} • {selectedApp.reviews} Ratings
                    </span>
                  </div>
                </div>
              </div>
              <button className="modal-close" onClick={closeAppDetails}>
                ✕
              </button>
            </div>

            <div className="modal-content">
              <div className="modal-screenshots">
                {selectedApp.screenshots.map((screenshot, index) => (
                  <div key={index} className="modal-screenshot">
                    {screenshot}
                  </div>
                ))}
              </div>

              <div className="modal-info">
                <div className="modal-description">
                  <h3>Description</h3>
                  <p>{selectedApp.description}</p>
                </div>

                <div className="modal-details">
                  <div className="detail-row">
                    <span className="detail-label">Developer</span>
                    <span className="detail-value">
                      {selectedApp.developer}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Size</span>
                    <span className="detail-value">{selectedApp.size}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Version</span>
                    <span className="detail-value">{selectedApp.version}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Compatibility</span>
                    <span className="detail-value">
                      {selectedApp.compatibility}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Languages</span>
                    <span className="detail-value">
                      {selectedApp.languages.join(", ")}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Age Rating</span>
                    <span className="detail-value">
                      {selectedApp.ageRating}
                    </span>
                  </div>
                </div>

                <div className="modal-actions">
                  {isAppInstalled(selectedApp.id) ? (
                    <button
                      className="modal-uninstall-btn"
                      onClick={() => {
                        uninstallApp(selectedApp.id);
                        closeAppDetails();
                      }}
                    >
                      Uninstall
                    </button>
                  ) : (
                    <button
                      className={`modal-get-btn ${
                        isAppDownloading(selectedApp.id) ? "downloading" : ""
                      }`}
                      onClick={() => downloadApp(selectedApp)}
                      disabled={isAppDownloading(selectedApp.id)}
                    >
                      {isAppDownloading(selectedApp.id) ? (
                        <div className="modal-download-progress">
                          <div
                            className="modal-progress-fill"
                            style={{
                              width: `${downloadingApps[selectedApp.id]}%`,
                            }}
                          ></div>
                          <span>{downloadingApps[selectedApp.id]}%</span>
                        </div>
                      ) : selectedApp.price === "Free" ? (
                        "Get"
                      ) : (
                        `Buy ${selectedApp.price}`
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppStore;
