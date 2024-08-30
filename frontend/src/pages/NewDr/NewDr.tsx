import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

import "./NewDr.css";

interface DrProps {
  onClose: () => void; // Add this prop to handle closing the modal
}

const NewDr: React.FC<DrProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    console.log("Searching for doctor", query);
    // Implement search logic here, e.g., fetch patient data

    // Navigate to the PatientProfile page
    navigate("/doctorprofile", { state: { query } });
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
