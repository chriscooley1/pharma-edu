import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

import "./NewPatient.css";

interface PatientProps {
  onClose: () => void; // Add this prop to handle closing the modal
}

const NewPatient: React.FC<PatientProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/patients/search?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const patients = await response.json();
        navigate("/patientprofile", { state: { patients } });
      } else {
        console.error("Patient not found");
      }
    } catch (error) {
      console.error("Failed to search patient:", error);
    }
  };

  const gotoPatientProfile = () => {
    navigate("/patientprofile");
    onClose();
  };

  return (
    <div className="new-pt-container">
      <div className="search-bar">
        <SearchBar placeholder="Search for a patient" onSearch={handleSearch} />
        <button 
          type="button" 
          onClick={gotoPatientProfile} 
          className="navigate-button"
        >
          Add New Patient
        </button>
      </div>
    </div>
  );
};

export default NewPatient;
