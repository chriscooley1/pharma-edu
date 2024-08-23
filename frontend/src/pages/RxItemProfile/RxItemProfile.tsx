import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RxItemProfile.css";

interface RxDetails {
  medicationName: string;
  medicationStrength: string;
  ndc: string;
  expiration: string;
  lotNumber: string;
  deaSchedule: string;
  drugClass: string;
}

const RxItemProfile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchQuery = location.state?.query || "";

  const [rxDetails, setRxDetails] = useState<RxDetails>({
    medicationName: "",
    medicationStrength: "",
    ndc: "",
    expiration: "",
    lotNumber: "",
    deaSchedule: "",
    drugClass: "",
  });

  useEffect(() => {
    const savedRxDetails = localStorage.getItem("rxDetails");
    if (savedRxDetails) {
      setRxDetails(JSON.parse(savedRxDetails));
    }
  }, []);

  const handleRxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRxDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = () => {
    try {
      //Save to localStorage
      localStorage.setItem("rxDetails", JSON.stringify(rxDetails));
      alert("Rx details saved successfully!");
      navigate("/rxitemprofile");
    } catch (error) {
      console.error("Error saving rx details:", error);
      alert("Failed to save rx details.");
    }
  };

  return (
    <div className="rx-item-profile-container">
      {/* {searchQuery && <h2>Search Query: {searchQuery}</h2>} */}
      <h3>Doctor Name First/Last</h3>
      <div className="rx-main">
        <div>
          <label htmlFor="rx-medication-name">Name</label>
          <input
            type="text"
            name="medicationName"
            id="rx-medication-name"
            value={rxDetails.medicationName}
            onChange={handleRxChange}
          />
        </div>
        <div>
          <label htmlFor="rx-medication-strength">Strength</label>
          <input
            type="text"
            name="medicationStrength"
            id="rx-medication-strength"
            value={rxDetails.medicationStrength}
            onChange={handleRxChange}
          />
        </div>
        <div>
          <label htmlFor="rx-ndc">NDC</label>
          <input
            type="text"
            name="ndc"
            id="rx-ndc"
            value={rxDetails.ndc}
            onChange={handleRxChange}
          />
        </div>
        <div>
          <label htmlFor="rx-expiration">Expiration</label>
          <input
            type="text"
            name="expiration"
            id="rx-expiration"
            value={rxDetails.expiration}
            onChange={handleRxChange}
          />
        </div>
        <div>
          <label htmlFor="rx-lot-number">Lot Number</label>
          <input
            type="text"
            name="lotNumber"
            id="rx-lot-number"
            value={rxDetails.lotNumber}
            onChange={handleRxChange}
          />
        </div>
        <div>
          <label htmlFor="rx-dea-schedule">DEA Schedule</label>
          <input
            type="text"
            name="deaSchedule"
            id="rx-dea-schedule"
            value={rxDetails.deaSchedule}
            onChange={handleRxChange}
          />
        </div>
        <div>
          <label htmlFor="rx-drug-class">Drug Class</label>
          <input
            type="text"
            name="drugClass"
            id="rx-drug-class"
            value={rxDetails.drugClass}
            onChange={handleRxChange}
          />
        </div>
      </div>
      <button type="button" onClick={handleSave}>Save</button>
    </div>
  );
};

export default RxItemProfile;
