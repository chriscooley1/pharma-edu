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
          navigate(`/doctorprofile/${prescribers[0].prescriber_id}`);
          onClose();
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

  const gotoAddDoctor = () => {
    navigate("/doctorprofile");
    onClose();
  };

  const viewAllDoctors = () => {
    navigate("/doctors");
    onClose();
  };

  return (
    <div className="new-dr-container">
      <div className="search-bar-container">
        <SearchBar
          placeholder="Search for a doctor"
          onSearch={handleSearch}
          onSearchComplete={() => setErrorMessage("")}
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="button-group">
        <button type="button" onClick={viewAllDoctors} className="action-button">
          View All Doctors
        </button>
        <button type="button" onClick={gotoAddDoctor} className="action-button">
          Add New Doctor
        </button>
      </div>
    </div>
  );
};

export default NewDr;
