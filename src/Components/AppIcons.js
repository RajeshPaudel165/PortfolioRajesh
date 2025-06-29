import React from "react";

// SVG Icons for dock apps
export const ProjectsIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 3H21V5H3V3ZM3 7H21V9H3V7ZM3 11H21V13H3V11ZM3 15H21V17H3V15ZM3 19H21V21H3V19Z"
      fill="currentColor"
    />
  </svg>
);

export const SkillsIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
      fill="currentColor"
    />
  </svg>
);

export const EducationIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"
      fill="currentColor"
    />
  </svg>
);

export const WeatherIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2A5 5 0 0 0 7 7A5 5 0 0 0 8.11 8.34L8.34 8.11A5 5 0 0 0 7 7A5 5 0 0 0 2 12A5 5 0 0 0 7 17A5 5 0 0 0 8.11 16.66L8.34 16.89A5 5 0 0 0 7 17A5 5 0 0 0 12 22A5 5 0 0 0 17 17A5 5 0 0 0 15.89 16.66L15.66 16.89A5 5 0 0 0 17 17A5 5 0 0 0 22 12A5 5 0 0 0 17 7A5 5 0 0 0 15.89 7.34L15.66 7.11A5 5 0 0 0 17 7A5 5 0 0 0 12 2M12 4A3 3 0 0 1 15 7A3 3 0 0 1 12 10A3 3 0 0 1 9 7A3 3 0 0 1 12 4M12 12A3 3 0 0 1 15 15A3 3 0 0 1 12 18A3 3 0 0 1 9 15A3 3 0 0 1 12 12Z"
      fill="currentColor"
    />
  </svg>
);

export const MusicIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12M10 19C8.9 19 8 18.1 8 17S8.9 15 10 15 12 15.9 12 17 11.1 19 10 19Z"
      fill="currentColor"
    />
  </svg>
);

export const MessagesIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2M20 16H6L4 18V4H20V16Z"
      fill="currentColor"
    />
  </svg>
);

export const AppStoreIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
      fill="currentColor"
    />
    <path d="M19 15L18 16L19 17L20 16L19 15Z" fill="currentColor" />
    <path d="M5 15L4 16L5 17L6 16L5 15Z" fill="currentColor" />
  </svg>
);

export const LaunchpadIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
      fill="currentColor"
    />
    <path d="M19 15L18 16L19 17L20 16L19 15Z" fill="currentColor" />
    <path d="M5 15L4 16L5 17L6 16L5 15Z" fill="currentColor" />
    <path d="M12 18L11 19L12 20L13 19L12 18Z" fill="currentColor" />
  </svg>
);

export const TrashIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 4H15.5L14.5 3H9.5L8.5 4H5V6H19M6 19A2 2 0 0 0 8 21H16A2 2 0 0 0 18 19V7H6V19Z"
      fill="currentColor"
    />
  </svg>
);

// Icon mapping function
export const getAppIcon = (appId) => {
  const iconMap = {
    projects: <ProjectsIcon />,
    skills: <SkillsIcon />,
    education: <EducationIcon />,
    weather: <WeatherIcon />,
    music: <MusicIcon />,
    messages: <MessagesIcon />,
    "app-store": <AppStoreIcon />,
    launchpad: <LaunchpadIcon />,
    trash: <TrashIcon />,
  };

  // Return SVG icon if available, otherwise return emoji fallback
  if (iconMap[appId]) {
    return iconMap[appId];
  }

  // Fallback emoji icons for apps without SVG icons
  const emojiMap = {
    calculator: "🧮",
    notes: "📝",
    "flappy-bird": "🐦",
    "task-master": "✅",
    "recycle-bin": "🗑️",
  };

  return emojiMap[appId] || "📱";
};
