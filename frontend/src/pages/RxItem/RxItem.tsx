import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

interface RxItemProps {
  onClose: () => void;
}

const RxItem: React.FC<RxItemProps> = ({ onClose }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/rx-items/search?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const rxItems = await response.json();
        if (rxItems.length > 0) {
          navigate(`/rxitemprofile/${rxItems[0].id}`);
          onClose(); 
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

  const gotoNewRxItem = () => {
    navigate("/rxitemprofile");
    onClose();
  };

  const viewAllRxItems = () => {
    navigate("/rx-items");
    onClose();
  };

  return (
    <div className="new-rx-item-container">
      <div className="search-bar-container">
        <SearchBar
          placeholder="Search for Rx item"
          onSearch={handleSearch}
          onSearchComplete={() => setErrorMessage("")}
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="button-group">
        <button type="button" onClick={viewAllRxItems} className="action-button">
          View All Rx Items
        </button>
        <button type="button" onClick={gotoNewRxItem} className="action-button">
          Add New Rx Item
        </button>
      </div>
    </div>
  );
};

export default RxItem;
