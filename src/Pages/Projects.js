import React, { useState } from "react";
import "../Styles/Projects.css";

const Projects = ({ darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Flappy Bird Game",
      description:
        "A Python-based Flappy Bird clone built with Pygame. Features progressive difficulty, sound effects, and collision detection.",
      category: "games",
      technologies: ["Python", "Pygame"],
      github: "https://github.com/RajeshPaudel165/Pygame",
      live: null,
      image: "🎮",
      features: [
        "Progressive difficulty system",
        "Sound effects and audio",
        "Collision detection",
        "Score tracking",
        "High score persistence",
      ],
    },
    {
      id: 2,
      title: "CougarExpress API",
      description:
        "Backend API for a university shuttle tracking system. Built with Express.js and MongoDB for real-time shuttle location tracking.",
      category: "web",
      technologies: ["Node.js", "Express.js", "MongoDB", "JWT"],
      github: "https://github.com/RajeshPaudel165/Express",
      live: null,
      image: "🚌",
      features: [
        "RESTful API endpoints",
        "User authentication",
        "Real-time tracking",
        "MongoDB integration",
        "JWT token system",
      ],
    },
    {
      id: 3,
      title: "AuraEd Nepal",
      description:
        "Educational platform website for AuraEd Nepal, providing educational resources and services.",
      category: "web",
      technologies: ["HTML", "CSS", "JavaScript"],
      github: null,
      live: "https://auraednepal.org",
      image: "🎓",
      features: [
        "Educational resources",
        "Responsive design",
        "User-friendly interface",
        "Content management",
      ],
    },
    {
      id: 4,
      title: "Charak Institute of Health Science",
      description:
        "Website for Charak Institute of Health Science, showcasing educational programs and institutional information.",
      category: "web",
      technologies: ["HTML", "CSS", "JavaScript"],
      github: null,
      live: "https://cihs.edu.np",
      image: "🏥",
      features: [
        "Institutional information",
        "Program details",
        "Contact information",
        "Professional design",
      ],
    },
  ];

  const categories = [
    { id: "all", name: "All Projects", count: projects.length },
    {
      id: "games",
      name: "Games",
      count: projects.filter((p) => p.category === "games").length,
    },
    {
      id: "web",
      name: "Web Development",
      count: projects.filter((p) => p.category === "web").length,
    },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className={`projects-app ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="projects-header">
        <div className="projects-title">
          <div className="projects-icon">💼</div>
          <h1>Projects</h1>
        </div>
        <div className="projects-stats">
          <span className="stat-item">
            <span className="stat-number">{projects.length}</span>
            <span className="stat-label">Total</span>
          </span>
          <span className="stat-item">
            <span className="stat-number">
              {projects.filter((p) => p.github).length}
            </span>
            <span className="stat-label">GitHub</span>
          </span>
          <span className="stat-item">
            <span className="stat-number">
              {projects.filter((p) => p.live).length}
            </span>
            <span className="stat-label">Live</span>
          </span>
        </div>
      </div>

      <div className="projects-content">
        {/* Category Filter */}
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${
                selectedCategory === category.id ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
              <span className="category-count">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <div className="project-icon">{project.image}</div>
                <div className="project-title">
                  <h3>{project.title}</h3>
                  <div className="project-category">{project.category}</div>
                </div>
              </div>

              <div className="project-description">
                <p>{project.description}</p>
              </div>

              <div className="project-technologies">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-features">
                <h4>Key Features:</h4>
                <ul>
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="project-links">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link github"
                  >
                    <span className="link-icon">📁</span>
                    GitHub
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link live"
                  >
                    <span className="link-icon">🌐</span>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <h3>No projects found</h3>
            <p>
              Try selecting a different category or check back later for new
              projects.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
