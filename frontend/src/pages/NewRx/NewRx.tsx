import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

interface RxProps {
  onClose: () => void;
}

const NewRx: React.FC<RxProps> = ({ onClose }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/prescription/search?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const prescriptions = await response.json();
        if (prescriptions.length > 0) {
          navigate(`/newrx/${prescriptions[0].rx_number}`);
          onClose(); 
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

  const gotoNewRx = () => {
    navigate("/newrx");
    onClose();
  };

  const viewAllPrescriptions = () => {
    navigate("/prescriptions");
    onClose();
  };

  return (
    <div className="new-rx-container">
      <div className="search-bar-container">
        <SearchBar
          placeholder="Search for prescription"
          onSearch={handleSearch}
          onSearchComplete={() => setErrorMessage("")}
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="button-group">
        <button type="button" onClick={viewAllPrescriptions} className="action-button">
          View All Prescriptions
        </button>
        <button type="button" onClick={gotoNewRx} className="action-button">
          Add New Prescription
        </button>
      </div>
    </div>
  );
};

export default NewRx;
