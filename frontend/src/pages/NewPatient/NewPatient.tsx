import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./NewPatient.css";

interface PatientProps {
  onClose: () => void;
}

const NewPatient: React.FC<PatientProps> = ({ onClose }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/patients/search?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const patients = await response.json();
        if (patients.length > 0) {
          navigate(`/patientprofile/${patients[0].id}`); // Navigate to PatientProfile for found patient
          onClose(); // Close modal if a valid patient is found
        } else {
          setErrorMessage("Patient not found. Please try again.");
        }
      } else {
        setErrorMessage("Patient not found. Please try again.");
      }
    } catch (error) {
      console.error("Failed to search patient:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const gotoAddPatient = () => {
    navigate("/addpatient"); // Ensure this route matches the path for AddPatient.tsx
    onClose(); // Close modal when navigating to add a patient
  };

  return (
    <div className="new-pt-container">
      <div className="search-bar">
        <SearchBar
          placeholder="Search for a patient"
          onSearch={handleSearch}
          onSearchComplete={() => setErrorMessage("")} // Reset error message after search
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="button" onClick={gotoAddPatient} className="navigate-button">
          Add New Patient
        </button>
      </div>
    </div>
  );
};

export default NewPatient;
