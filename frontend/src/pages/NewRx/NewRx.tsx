import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./NewRx.css";

interface RxDetails {
  rx_number: number | null;
  patient_id: number | null;
  prescriber_id: number | null;
  prescribed_date: string;
  rx_item_id: number;
  directions: string;
  quantity: number;
  quantity_dispensed: number;
  refills: number;
  status: string;
  tech_initials: string;
}

const NewRx: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // Use id from params to load an existing prescription
  const [editMode, setEditMode] = useState(!id); // Start in edit mode for new prescriptions
  const [rxDetails, setRxDetails] = useState<RxDetails>({
    rx_number: null,
    patient_id: null,
    prescriber_id: null,
    prescribed_date: "",
    rx_item_id: 0,
    directions: "",
    quantity: 0,
    quantity_dispensed: 0,
    refills: 0,
    status: "",
    tech_initials: "",
  });

  useEffect(() => {
    if (id) {
      // Fetch prescription details if an id exists
      axios.get(`http://localhost:8000/prescriptions/${id}`).then((response) => {
        setRxDetails(response.data);
        setEditMode(false); // Set edit mode to false for existing prescriptions
      });
    }
  }, [id]);

  const handleRxChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setRxDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "rx_number" ||
        name === "patient_id" ||
        name === "rx_item_id" ||
        name === "quantity" ||
        name === "quantity_dispensed" ||
        name === "refills"
          ? value === "" ? 0 : Number(value)
          : value || "",
    }));
  };

  const handleSave = async () => {
    try {
      const patientResponse = await axios.get(`http://localhost:8000/patients/${rxDetails.patient_id}`);
      if (!patientResponse.data) {
        alert("Patient does not exist. Please create the patient first.");
        return;
      }

      if (!id) {
        // Create a new prescription if there is no id
        await axios.post("http://localhost:8000/prescriptions", rxDetails);
        alert("Prescription created successfully!");
      } else {
        // Update the existing prescription
        await axios.patch(`http://localhost:8000/prescriptions/${id}`, rxDetails);
        alert("Prescription updated successfully!");
      }
      setEditMode(false); // After saving, switch back to view mode
    } catch (err) {
      console.error("Error saving prescription details:", err);
      alert("Failed to save prescription details.");
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="new-rx-container">
      {/* Header row for title, edit, and save buttons */}
      <div className="rx-header-row">
        <h3>{id ? "Edit Prescription" : "New Prescription"}</h3>
        <div className="rx-header-buttons">
          <button type="button" className="edit-button" onClick={toggleEditMode}>
            {editMode ? "Cancel" : "Edit"}
          </button>
          <button type="button" className="save-button" onClick={handleSave} disabled={!editMode}>
            Save
          </button>
        </div>
      </div>

      {/* Left side for Rx details */}
      <div className="new-rx-content">
        <div className="new-rx-left-side">
          <div>
            <label htmlFor="rx-patient-id">Patient ID</label>
            <input
              type="number"
              name="patient_id"
              id="rx-patient-id"
              value={rxDetails.patient_id !== null ? rxDetails.patient_id : ""}
              onChange={handleRxChange}
              readOnly={!editMode}
            />
          </div>
          <div>
            <label htmlFor="rx-prescriber-id">Prescriber ID</label>
            <input
              type="number"
              name="prescriber_id"
              id="rx-prescriber-id"
              value={rxDetails.prescriber_id !== null ? rxDetails.prescriber_id : ""}
              onChange={handleRxChange}
              readOnly={!editMode}
            />
          </div>
          <div>
            <label htmlFor="rx-prescribed-date">Prescribed Date</label>
            <input
              type="date"
              name="prescribed_date"
              id="rx-prescribed-date"
              value={rxDetails.prescribed_date}
              onChange={handleRxChange}
              readOnly={!editMode}
            />
          </div>
          <div>
            <label htmlFor="rx-item-id">Rx Item ID</label>
            <input
              type="number"
              name="rx_item_id"
              id="rx-item-id"
              value={rxDetails.rx_item_id !== 0 ? rxDetails.rx_item_id : ""}
              onChange={handleRxChange}
              readOnly={!editMode}
            />
          </div>
          <div>
            <label htmlFor="rx-directions">Directions</label>
            <textarea
              name="directions"
              id="rx-directions"
              value={rxDetails.directions || ""}
              onChange={handleRxChange}
              className="directions-textarea"
              readOnly={!editMode}
            />
          </div>
          <div>
            <label htmlFor="rx-quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="rx-quantity"
              value={rxDetails.quantity !== 0 ? rxDetails.quantity : ""}
              onChange={handleRxChange}
              readOnly={!editMode}
            />
          </div>
          <div>
            <label htmlFor="rx-quantity-dispensed">Quantity Dispensed</label>
            <input
              type="number"
              name="quantity_dispensed"
              id="rx-quantity-dispensed"
              value={rxDetails.quantity_dispensed !== 0 ? rxDetails.quantity_dispensed : ""}
              onChange={handleRxChange}
              readOnly={!editMode}
            />
          </div>
          <div>
            <label htmlFor="rx-refills">Refills</label>
            <input
              type="number"
              name="refills"
              id="rx-refills"
              value={rxDetails.refills !== 0 ? rxDetails.refills : ""}
              onChange={handleRxChange}
              readOnly={!editMode}
            />
          </div>
          <div>
            <label htmlFor="rx-status">Status</label>
            <select
              name="status"
              id="rx-status"
              value={rxDetails.status || ""}
              onChange={handleRxChange}
              disabled={!editMode}
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="sold">Sold</option>
            </select>
          </div>
          <div>
            <label htmlFor="rx-tech-initials">Tech Initials</label>
            <input
              type="text"
              name="tech_initials"
              id="rx-tech-initials"
              value={rxDetails.tech_initials || ""}
              onChange={handleRxChange}
              readOnly={!editMode}
            />
          </div>

          {/* Moved Continue To Label button to the right */}
          <button type="button" className="continue-to-label">
            Continue To Label
          </button>
        </div>

        {/* Separator */}
        <div className="separator"></div>

        {/* Right side - scan image */}
        <div className="scan-image">
          <h3>Scan Image</h3>
        </div>
      </div>
    </div>
  );
};

export default NewRx;
