import React, { useState } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
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
