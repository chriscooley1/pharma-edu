import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

import "./RxItem.css";

interface RxProps {
  onClose: () => void; // Add this prop to handle closing the modal
}

const RxItem: React.FC<RxProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    console.log("Searching for rx item", query);
    // Implement search logic here, e.g., fetch patient data

    // Navigate to the PatientProfile page
    navigate("/rxitemprofile", { state: { query } });
  };

  const gotoRxItemProfile = () => {
    navigate("/rxitemprofile");
    onClose();
  };

  return (
    <div className="new-rx-item-container">
      <div className="search-bar">
        <SearchBar placeholder="Search for a rx item" onSearch={handleSearch} />
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
