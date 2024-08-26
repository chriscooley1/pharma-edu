import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./RxItemProfile.css";

interface RxDetails {
  id: number | null;
  name: string;
  strength: string;
  ndc: string;
  expiration: string;
  lot_number: string;
  dea_schedule: string;
  drug_class: string;
}

const RxItemProfile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchQuery = location.state?.query || "";

  const [editMode, setEditMode] = useState(false);
  const [rxDetails, setRxDetails] = useState<RxDetails>({
    id: null,
    name: "",
    strength: "",
    ndc: "",
    expiration: "",
    lot_number: "",
    dea_schedule: "",
    drug_class: "",
  });

  useEffect(() => {
    // Fetch existing RxItem details from backend (if needed)
    // Example: axios.get(`/rx-items/${id}`).then(response => setRxDetails(response.data));
  }, []);

  const handleRxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRxDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value || "", // Ensure no undefined values
    }));
  };

  const handleSave = async () => {
    try {
      if (rxDetails.id === null) {
        // If id is null, create a new RxItem
        const response = await axios.post('http://localhost:8000/rx-items', rxDetails);
        setRxDetails((prevDetails) => ({
          ...prevDetails,
          id: response.data.rx_item_id, // Set the id returned from the backend
        }));
        alert("Rx details saved successfully!");
      } else {
        // If id is set, update the existing RxItem
        await axios.patch(`http://localhost:8000/rx-items/${rxDetails.id}`, rxDetails);
        alert("Rx details updated successfully!");
      }
      setEditMode(false);
      navigate("/rxitemprofile");
    } catch (error) {
      console.error("Error saving rx details:", error);
      alert("Failed to save rx details.");
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="rx-item-profile-container">
      <h3>Doctor Name First/Last</h3>
      <div className="rx-main">
        <div>
          <label htmlFor="rx-name">Name</label>
          <input
            type="text"
            name="name"
            id="rx-name"
            value={rxDetails.name || ""}
            onChange={handleRxChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="rx-strength">Strength</label>
          <input
            type="text"
            name="strength"
            id="rx-strength"
            value={rxDetails.strength || ""}
            onChange={handleRxChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="rx-ndc">NDC</label>
          <input
            type="text"
            name="ndc"
            id="rx-ndc"
            value={rxDetails.ndc || ""}
            onChange={handleRxChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="rx-expiration">Expiration</label>
          <input
            type="date"
            name="expiration"
            id="rx-expiration"
            value={rxDetails.expiration || ""}
            onChange={handleRxChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="rx-lot-number">Lot Number</label>
          <input
            type="text"
            name="lot_number"
            id="rx-lot-number"
            value={rxDetails.lot_number || ""}
            onChange={handleRxChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="rx-dea-schedule">DEA Schedule</label>
          <input
            type="text"
            name="dea_schedule"
            id="rx-dea-schedule"
            value={rxDetails.dea_schedule || ""}
            onChange={handleRxChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="rx-drug-class">Drug Class</label>
          <input
            type="text"
            name="drug_class"
            id="rx-drug-class"
            value={rxDetails.drug_class || ""}
            onChange={handleRxChange}
            readOnly={!editMode}
          />
        </div>
      </div>
      <div className="button-group">
        <button type="button" onClick={toggleEditMode}>
          {editMode ? "Cancel" : "Edit"}
        </button>
        <button type="button" onClick={handleSave} disabled={!editMode}>
          Save
        </button>
      </div>
    </div>
  );
};

export default RxItemProfile;
