import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

interface RxProps {
  onClose: () => void;
}

const NewRx: React.FC<RxProps> = ({ onClose }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle searching for existing prescriptions
  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/prescription/search?query=${encodeURIComponent(query)}`
      );
      if (response.ok) {
        const prescriptions = await response.json();
        if (prescriptions.length > 0) {
          navigate(`/newrx/${prescriptions[0].rx_number}`);  // Navigate to the first result
          onClose();  // Close modal if a valid prescription is found
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

  // Handle clicking on "Add New Prescription"
  const gotoNewRx = () => {
    navigate("/newrx"); // Navigate to NewRx creation form (this ensures the form is cleared)
    onClose(); // Close modal when navigating to add a new rx
  };

  return (
    <div className="new-rx-container">
      <div className="search-bar">
        <SearchBar
          placeholder="Search for prescription"
          onSearch={handleSearch}
          onSearchComplete={() => setErrorMessage("")} // Reset error message after search
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="button" onClick={gotoNewRx} className="navigate-button">
          Add New Prescription
        </button>
      </div>
    </div>
  );
};

export default NewRx;
