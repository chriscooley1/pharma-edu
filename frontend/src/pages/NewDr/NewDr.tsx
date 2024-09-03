import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

import "./NewDr.css";

interface DrProps {
  onClose: () => void; // Add this prop to handle closing the modal
}

const NewDr: React.FC<DrProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/prescribers/search?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const prescribers = await response.json();
        navigate("/doctorprofile", { state: { prescribers } });
      } else {
        console.error("Prescriber not found");
      }
    } catch (error) {
      console.error("Failed to search prescriber:", error);
    }
  };

  const gotoDoctorProfile = () => {
    navigate("/doctorprofile");
    onClose();
  };

  return (
    <div className="new-dr-container">
      <div className="search-bar">
        <SearchBar placeholder="Search for a doctor" onSearch={handleSearch} />
        <button 
          type="button" 
          onClick={gotoDoctorProfile} 
          className="navigate-button"
        >
          Add New Doctor
        </button>
      </div>
    </div>
  );
};

export default NewDr;
