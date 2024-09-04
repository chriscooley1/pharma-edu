import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false); // Start in view mode (not editable)
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
    status: "pending",  // Default status to pending
    tech_initials: "",
  });

  useEffect(() => {
    // Fetch existing RxItem details from backend (if needed)
    // Example: axios.get(`/prescriptions/${rx_number}`).then(response => setRxDetails(response.data));
  }, []);

  const handleRxChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        : name === "status"
        ? value.toLowerCase() // Ensure status is in lowercase
        : value || "",
    }));
  };

  const handleSave = async () => {
    try {
      // Ensure the patient exists
      const patientResponse = await axios.get(`http://localhost:8000/patients/${rxDetails.patient_id}`);
      if (!patientResponse.data) {
        alert("Patient does not exist. Please create the patient first.");
        return;
      }
  
      if (rxDetails.rx_number === null) {
        // If rx_number is null, create a new Prescription
        const response = await axios.post("http://localhost:8000/prescriptions", rxDetails);
        setRxDetails((prevDetails) => ({
          ...prevDetails,
          rx_number: response.data.rx_number, // Set the rx_number returned from the backend
        }));
        alert("Prescription details saved successfully!");
      } else {
        // If rx_number is set, update the existing Prescription
        await axios.patch(`http://localhost:8000/prescriptions/${rxDetails.rx_number}`, rxDetails);
        alert("Prescription details updated successfully!");
      }
      setEditMode(false);
      navigate("/newrx");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Error saving prescription details:", err.message);
        if (err.response) {
          console.error("Response status:", err.response.status);
          console.error("Response data:", err.response.data); // Log the error response
          if (err.response.data.detail) {
            console.error("Validation details:", err.response.data.detail);
          }
        }
      } else {
        console.error("Unexpected error:", err);
      }
      alert("Failed to save prescription details.");
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="new-rx-container">
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
          <input
            type="text"
            name="status"
            id="rx-status"
            value={rxDetails.status || ""}
            onChange={handleRxChange}
            readOnly={!editMode}
          />
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
        <button type="button" className="continue-to-label">Continue To Label</button>
      </div>

      <div className="separator"></div>

      <div className="scan-image">
        <h3>Scan Image</h3>
      </div>
      <div className="button-group">
        <button type="button" className="edit-button" onClick={toggleEditMode}>
          {editMode ? "Cancel" : "Edit"}
        </button>
        <button type="button" className="save-button" onClick={handleSave} disabled={!editMode}>
          Save
        </button>
      </div>
    </div>
  );
};

export default NewRx;
