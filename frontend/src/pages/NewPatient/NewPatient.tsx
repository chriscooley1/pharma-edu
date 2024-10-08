import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

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
          navigate(`/patientprofile/${patients[0].id}`);
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
    navigate("/addpatient");
    onClose();
  };

  const viewAllPatients = () => {
    navigate("/patients");
    onClose();
  };

  return (
    <div className="new-pt-container">
      <div className="search-bar-container">
        <SearchBar
          placeholder="Search for a patient"
          onSearch={handleSearch}
          onSearchComplete={() => setErrorMessage("")}
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="button-group">
        <button type="button" onClick={viewAllPatients} className="action-button">
          View All Patients
        </button>
        <button type="button" onClick={gotoAddPatient} className="action-button">
          Add New Patient
        </button>
      </div>
    </div>
  );
};

export default NewPatient;
