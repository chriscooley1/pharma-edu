import React from "react";
import { useTheme } from "../ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme() || {};

  return (
    <button type="button" onClick={toggleTheme}>
      {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

export default ThemeToggle;
