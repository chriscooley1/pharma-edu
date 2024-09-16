import React, { useState, useContext } from "react";
import { ThemeContext, ThemeContextType } from "../../ThemeContext"; // Import ThemeContextType
import "./SearchBar.css";

interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => Promise<void>;
  onSearchComplete: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch, onSearchComplete }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useContext(ThemeContext) as ThemeContextType; // Type assertion

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await onSearch(searchQuery);
      onSearchComplete();
    }
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      await handleSearch();
    }
  };

  return (
    <div className={`search-bar ${isDarkMode ? "dark-mode" : ""}`}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="search-input"
      />
      <button type="button" onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
