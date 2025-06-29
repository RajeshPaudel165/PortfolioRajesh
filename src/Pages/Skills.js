import React from "react";
import "../Styles/Skills.css";
import {
  FaPython,
  FaHtml5,
  FaReact,
  FaJs,
  FaFigma,
  FaC,
} from "react-icons/fa6";
import { SiTypescript } from "react-icons/si";
import { VscCode } from "react-icons/vsc";

const Skills = () => {
  const languages = ["Python", "C"];
  const webDevelopment = ["HTML/CSS", "JavaScript", "ReactJS", "TypeScript"];
  const tools = ["Visual Studio", "Figma"];

  const iconMap = {
    Python: <FaPython style={{ color: "#3776AB" }} />,
    C: <FaC style={{ color: "#A8B9CC" }} />,
    "HTML/CSS": <FaHtml5 style={{ color: "#E34F26" }} />,
    JavaScript: <FaJs style={{ color: "#F7DF1E" }} />,
    ReactJS: <FaReact style={{ color: "#61DAFB" }} />,
    TypeScript: <SiTypescript style={{ color: "#007ACC" }} />,
    "Visual Studio": <VscCode style={{ color: "#007ACC" }} />,
    Figma: <FaFigma style={{ color: "#F24E1E" }} />,
  };

  return (
    <div className="skills-page-container">
      <div className="skills-header">
        <h1>Skills & Competencies</h1>
        <p>A summary of my technical abilities and tools I use.</p>
      </div>

      <div className="skills-layout-grid">
        {/* --- Main Skills Column --- */}
        <div className="skills-main-column">
          <div className="skills-category-card">
            <h2>Languages</h2>
            <div className="skills-list">
              {languages.map((skill) => (
                <div key={skill} className="skill-tag">
                  {iconMap[skill]}
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="skills-category-card">
            <h2>Web Development</h2>
            <div className="skills-list">
              {webDevelopment.map((skill) => (
                <div key={skill} className="skill-tag">
                  {iconMap[skill]}
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="skills-category-card">
            <h2>Tools & Applications</h2>
            <div className="skills-list">
              {tools.map((skill) => (
                <div key={skill} className="skill-tag">
                  {iconMap[skill]}
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Sidebar / Highlights Column --- */}
        <div className="skills-sidebar">
          <div className="skills-category-card">
            <h2>Key Highlights</h2>
            <ul className="highlights-list">
              <li>Building dynamic front-ends with React.</li>
              <li>Object-Oriented Programming in Python.</li>
              <li>Creating responsive layouts with modern CSS.</li>
              <li>Prototyping and design with Figma.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
