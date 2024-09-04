import React, { useState } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => Promise<void>; // onSearch should be asynchronous
  onSearchComplete: () => void; // Prop to notify when search is complete
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch, onSearchComplete }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await onSearch(searchQuery); // Execute the search
      onSearchComplete(); // Notify parent that search is complete
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
