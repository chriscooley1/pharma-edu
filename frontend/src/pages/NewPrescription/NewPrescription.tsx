import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./NewPrescription.css";

interface PrescriptionProps {
  onClose: () => void;
}

const NewPrescription: React.FC<PrescriptionProps> = ({ onClose }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/prescriptions/search?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const prescriptions = await response.json();
        if (prescriptions.length > 0) {
          navigate(`/newrx/${prescriptions[0].id}`);
          onClose(); // Close modal if a valid prescription is found
        } else {
          setErrorMessage("Prescription not found. Please try again.");
        }
      } else {
        setErrorMessage("Prescription not found. Please try again.");
      }
    } catch (error) {
      console.error("Failed to search prescription:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const gotoAddPrescription = () => {
    navigate("/newrx"); // Navigate to the New Rx page to add a new prescription
    onClose(); // Close modal
  };

  return (
    <div className="new-prescription-container">
      <div className="search-bar">
        <SearchBar
          placeholder="Search for a prescription"
          onSearch={handleSearch}
          onSearchComplete={() => setErrorMessage("")} // Reset error message after search
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="button" onClick={gotoAddPrescription} className="navigate-button">
          Add New Prescription
        </button>
      </div>
    </div>
  );
};

export default NewPrescription;
