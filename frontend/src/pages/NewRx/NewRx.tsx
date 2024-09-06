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

  const gotoNewRx = () => {
    navigate("/newrx"); // Navigate to NewRx creation form
    onClose(); // Close modal when navigating to add a new rx
  };

  return (
    <div className="new-rx-container">
      <div className="search-bar">
        <SearchBar
          placeholder="Search for a rx"
          onSearch={handleSearch}
          onSearchComplete={() => setErrorMessage("")}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="button" onClick={gotoNewRx} className="navigate-button">
          Add New Rx
        </button>
      </div>
    </div>
  );
};

export default NewRx;
