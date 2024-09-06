import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

interface DrProps {
  onClose: () => void;
}

const NewDr: React.FC<DrProps> = ({ onClose }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/prescribers/search?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const prescribers = await response.json();
        if (prescribers.length > 0) {
          navigate(`/doctorprofile/${prescribers[0].id}`);
          onClose(); // Close modal if a valid doctor is found
        } else {
          setErrorMessage("Prescriber not found. Please try again.");
        }
      } else {
        setErrorMessage("Prescriber not found. Please try again.");
      }
    } catch (error) {
      console.error("Failed to search prescriber:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const gotoDoctorProfile = () => {
    navigate("/doctorprofile");
    onClose(); // Close modal when navigating to add a doctor
  };

  return (
    <div className="new-dr-container">
      <div className="search-bar">
        <SearchBar
          placeholder="Search for a doctor"
          onSearch={handleSearch}
          onSearchComplete={() => setErrorMessage("")} // Reset error message after search
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="button" onClick={gotoDoctorProfile} className="navigate-button">
          Add New Doctor
        </button>
      </div>
    </div>
  );
};

export default NewDr;
