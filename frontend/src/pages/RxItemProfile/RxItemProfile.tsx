import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { deaScheduleOptions } from "../../utils/deaSchedules";
import "./RxItemProfile.css";

const RxItemProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNewItem = id === undefined;

  const [editMode, setEditMode] = useState(isNewItem);
  const [rxDetails, setRxDetails] = useState({
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
    if (isNewItem) {
      resetForm();
    } else {
      axios.get(`http://localhost:8000/rx-items/${id}`)
        .then((response) => {
          setRxDetails(response.data);
          setEditMode(false);
        })
        .catch(error => {
          console.error("Error fetching Rx item:", error);
          alert("Failed to fetch Rx item details.");
          navigate("/rx-items"); // Redirect to the list page if there's an error
        });
    }
  }, [id, isNewItem, navigate]);

  const title = isNewItem ? "Add New Rx Item" : `Edit Rx Item: ${rxDetails.name}`; // Conditional title

  // Reset the form for a new Rx item
  const resetForm = () => {
    setRxDetails({
      id: null,
      name: "",
      strength: "",
      ndc: "",
      expiration: "",
      lot_number: "",
      dea_schedule: "",
      dosage_form: "",
    });
    setEditMode(true); // Enable edit mode when resetting for a new Rx item
  };

  const handleRxChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setRxDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (isNewItem) {
        await axios.post("http://localhost:8000/rx-items", rxDetails);
        alert("Rx item added successfully!");
      } else {
        await axios.patch(`http://localhost:8000/rx-items/${id}`, rxDetails);
        alert("Rx item updated successfully!");
      }
      setEditMode(false);
      if (isNewItem) navigate(`/rxitemprofile/${rxDetails.id}`);
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
      <div className="header-row">
        <h3>{title}</h3> {/* Conditionally display "Add New Rx Item" or "Rx Item ID: ..." */}
        <div className="header-buttons">
          <button type="button" className="edit-button" onClick={toggleEditMode}>
            {editMode ? "Cancel" : "Edit"}
          </button>
          <button type="button" className="save-button" onClick={handleSave} disabled={!editMode}>
            Save
          </button>
        </div>
      </div>

      <div className="content">
        <div className="form-section">
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
            <select
              name="dea_schedule"
              id="rx-dea-schedule"
              value={rxDetails.dea_schedule || ""}
              onChange={handleRxChange}
              disabled={!editMode}
            >
              <option value="">Select DEA Schedule</option>
              {deaScheduleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
    </div>
  );
};

export default RxItemProfile;
