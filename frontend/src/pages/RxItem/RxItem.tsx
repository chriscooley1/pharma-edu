import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./RxItem.css";

interface RxProps {
  onClose: () => void;
}

const RxItem: React.FC<RxProps> = ({ onClose }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/rx-items/search?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const rxItems = await response.json();
        if (rxItems.length > 0) {
          navigate(`/rxitemprofile/${rxItems[0].id}`);
          onClose(); // Close modal if a valid Rx item is found
        } else {
          setErrorMessage("Rx item not found. Please try again.");
        }
      } else {
        setErrorMessage("Rx item not found. Please try again.");
      }
    } catch (error) {
      console.error("Failed to search Rx item:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const gotoRxItemProfile = () => {
    navigate("/newrx");
    onClose(); // Close modal when navigating to add Rx item
  };

  return (
    <div className="new-rx-item-container">
      <div className="search-bar">
        <SearchBar
          placeholder="Search for an Rx item"
          onSearch={handleSearch}
          onSearchComplete={() => setErrorMessage("")} // Reset error message after search
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Error message */}
        <button type="button" onClick={gotoRxItemProfile} className="navigate-button">
          Add New Rx Item
        </button>
      </div>
    </div>
  );
};

export default RxItem;
