import React from "react";
import "../Styles/Education.css";

const Education = ({ darkMode }) => {
  const educationData = [
    {
      id: 1,
      institution: "Caldwell University",
      degree: "Bachelor's Degree",
      field: "Computer Science",
      gpa: "3.90",
      period: "August 2024 - May 2028",
      location: "Caldwell, NJ, USA",
      achievements: [
        "Current GPA: 3.90",
        "Dean's List",
        "Academic Excellence Award",
      ],
      icon: <span style={{ fontSize: "24px" }}>🎓</span>,
      isCurrent: true,
    },
    {
      id: 2,
      institution: "High School",
      degree: "High School Diploma",
      field: "Management",
      gpa: "3.96",
      period: "2021 - 2023",
      location: "Nepal",
      achievements: [
        "GPA: 3.96",
        "Nepal Topper Management 2023",
        "Academic Excellence",
      ],
      icon: <span style={{ fontSize: "24px" }}>🏆</span>,
      isCurrent: false,
    },
  ];

  return (
    <div className={`education-app ${darkMode ? "dark-mode" : ""}`}>
      <div className="education-header">
        <h2>Education</h2>
        <div className="education-subtitle">Academic Journey</div>
      </div>

      <div className="education-content">
        {educationData.map((education, index) => (
          <div
            key={education.id}
            className={`education-card ${education.isCurrent ? "current" : ""}`}
          >
            <div className="education-card-header">
              <div className="education-icon">{education.icon}</div>
              <div className="education-badge">
                {education.isCurrent ? "Current" : "Completed"}
              </div>
            </div>

            <div className="education-details">
              <h3 className="institution-name">{education.institution}</h3>
              <p className="degree-info">
                {education.degree} • {education.field}
              </p>

              <div className="education-meta">
                <div className="meta-item">
                  <span style={{ fontSize: "16px" }}>📅</span>
                  <span>{education.period}</span>
                </div>
                <div className="meta-item">
                  <span style={{ fontSize: "16px" }}>📍</span>
                  <span>{education.location}</span>
                </div>
                <div className="meta-item gpa">
                  <span style={{ fontSize: "16px" }}>🌟</span>
                  <span>GPA: {education.gpa}</span>
                </div>
              </div>

              <div className="achievements">
                <h4>Achievements</h4>
                <ul>
                  {education.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="education-footer">
        <div className="education-stats">
          <div className="stat-item">
            <span className="stat-number">3.90</span>
            <span className="stat-label">Current GPA</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">3.96</span>
            <span className="stat-label">High School GPA</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2023</span>
            <span className="stat-label">Nepal Topper</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
