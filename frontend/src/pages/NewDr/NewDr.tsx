import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import axios from "axios";
import "./NewDr.css";

const NewDr: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/prescribers/search`, { params: { query } }); // Updated the URL
      const doctorData = response.data;

      if (doctorData) {
        navigate("/doctorprofile", { state: { doctorData } }); // Updated to pass the doctorData
      } else {
        alert("Doctor not found");
      }
    } catch (error) {
      console.error("Error searching for doctor:", error);
      alert("Failed to search for doctor.");
    }
  };

  const gotoDoctorProfile = () => {
    navigate("/doctorprofile");
  };

  return (
    <div className="new-dr-container">
      <div className="search-bar">
        <SearchBar placeholder="Search for doctor by last name" onSearch={handleSearch} />
        <button 
          type="button" 
          onClick={gotoDoctorProfile} 
          className="navigate-button"
        >
          Add Doctor
        </button>
      </div>
    </div>
  );
};

export default NewDr;
