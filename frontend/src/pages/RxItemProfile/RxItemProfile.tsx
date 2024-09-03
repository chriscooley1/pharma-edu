import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RxItemProfile.css";

interface RxDetails {
  id: number | null;
  name: string;
  strength: string;
  ndc: string;
  expiration: string;
  lot_number: string;
  dea_schedule: string;
  dosage_form: string;
}

const RxItemProfile: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [editMode, setEditMode] = useState(false);
  const [rxDetails, setRxDetails] = useState<RxDetails>({
    id: null,
    name: "",
    strength: "",
    ndc: "",
    expiration: "",
    lot_number: "",
    dea_schedule: "",
    dosage_form: "",
  });

  useEffect(() => {
    const fetchRxDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/rx-items/${id}`);
        setRxDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch rx details:", error);
        // Handle error
      }
    };

    if (id) {
      fetchRxDetails();
    }
  }, [id]);

  const handleRxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRxDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value || "", // Ensure no undefined values
    }));
  };

  const handleSave = async () => {
    try {
      if (isEditMode) {
        await axios.patch(`http://localhost:8000/rx-items/${id}`, rxDetails);
        alert("Rx details updated successfully!");
      } else {
        await axios.post("http://localhost:8000/rx-items", rxDetails);
        alert("Rx item added successfully!");
      }
      navigate("/rxitemprofile"); // Redirect as needed
    } catch (error) {
      console.error("Error saving Rx details:", error);
      alert("Failed to save Rx details.");
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="rx-item-profile-container">
      <h3>Rx Name</h3>
      <div className="button-group">
        <button type="button" className="edit-button" onClick={toggleEditMode}>
          {editMode ? "Cancel" : "Edit"}
        </button>
        <button type="button" className="save-button" onClick={handleSave} disabled={!editMode}>
          Save
        </button>
      </div>
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
          <label htmlFor="rx-dosage-form">Dosage Form</label>
          <input
            type="text"
            name="dosage_form"
            id="rx-dosage-form"
            value={rxDetails.dosage_form || ""}
            onChange={handleRxChange}
            readOnly={!editMode}
          />
        </div>
      </div>
    </div>
  );
};

export default RxItemProfile;
