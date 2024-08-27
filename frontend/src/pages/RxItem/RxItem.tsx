import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./RxItem.css";

const RxItem: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/rx-items/search`, {
        params: { query }
      });
      const rxData = response.data;

      if (rxData) {
        navigate("/rxitemprofile", { state: { rxData } });
      } else {
        alert("Rx item not found");
      }
    } catch (error) {
      console.error("Error searching for Rx item:", error);
      alert("Failed to search for Rx item.");
    }
  };

  const goToNewRx = () => {
    navigate("/newrx");
  };

  return (
    <div className="rx-item-container">
      <div className="search-bar">
        <SearchBar placeholder="Search for an Rx item" onSearch={handleSearch} />
      </div>
      <button 
        type="button" 
        onClick={goToNewRx} 
        className="navigate-button"
      >
        Add New Rx
      </button>
    </div>
  );
};

export default RxItem;
