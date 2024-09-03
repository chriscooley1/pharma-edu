import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

import "./RxItem.css";

interface RxProps {
  onClose: () => void;
}

const RxItem: React.FC<RxProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/rx-items/search?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const rxItems = await response.json();
        navigate("/rxitemprofile", { state: { rxItems } });
      } else {
        console.error("Rx item not found");
      }
    } catch (error) {
      console.error("Failed to search rx item:", error);
    }
  };

  const gotoRxItemProfile = () => {
    navigate("/rxitemprofile");
    onClose();
  };

  return (
    <div className="new-rx-item-container">
      <div className="search-bar">
        <SearchBar placeholder="Search for an Rx item" onSearch={handleSearch} />
        <button 
          type="button" 
          onClick={gotoRxItemProfile} 
          className="navigate-button"
        >
          Add New Rx Item
        </button>
      </div>
    </div>
  );
};

export default RxItem;
