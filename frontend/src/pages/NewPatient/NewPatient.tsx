import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import axios from "axios";
import "./NewPatient.css";

const NewPatient: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/patients/search`, { params: { query } });
      const patientData = response.data;

      if (patientData) {
        navigate("/patientprofile", { state: { patientData } });
      } else {
        alert("Patient not found");
      }
    } catch (error) {
      console.error("Error searching for patient:", error);
      alert("Failed to search for patient.");
    }
  };

  const goToAddPatient = () => {
    navigate("/addpatient");
  };

  return (
    <div className="new-patient-container">
      <div className="search-bar">
        <SearchBar placeholder="Search for patient by last name" onSearch={handleSearch} />
      </div>
      <button
        type="button"
        onClick={goToAddPatient}
        className="navigate-button"
      >
        Add Patient
      </button>
    </div>
  );
};

export default NewPatient;
