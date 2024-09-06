import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PrescriptionDetails.css";

interface PrescriptionDetails {
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

const PrescriptionDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // Use id from params to load an existing prescription
  const [editMode, setEditMode] = useState(!id); // Start in edit mode for prescription detail
  const [PrescriptionDetails, setPrescriptionDetails] = useState<PrescriptionDetails>({
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
        setPrescriptionDetails(response.data);
        setEditMode(false); // Set edit mode to false for existing prescriptions
      });
    }
  }, [id]);

  const handlePrescriptionDetailsChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setPrescriptionDetails((prevDetails) => ({
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
      const patientResponse = await axios.get(`http://localhost:8000/patients/${PrescriptionDetails.patient_id}`);
      if (!patientResponse.data) {
        alert("Patient does not exist. Please create the patient first.");
        return;
      }

      if (!id) {
        // Create a new prescription if there is no id
        await axios.post("http://localhost:8000/prescriptions", PrescriptionDetails);
        alert("Prescription created successfully!");
      } else {
        // Update the existing prescription
        await axios.patch(`http://localhost:8000/prescriptions/${id}`, PrescriptionDetails);
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
    <div className="prescription-details-container">
      {/* Header row for title, edit, and save buttons */}
      <div className="prescription-header-row">
        <h3>{id ? "Edit Prescription" : "New Prescription"}</h3>
        <div className="prescription-header-buttons">
          <button type="button" className="edit-button" onClick={toggleEditMode}>
            {editMode ? "Cancel" : "Edit"}
          </button>
          <button type="button" className="save-button" onClick={handleSave} disabled={!editMode}>
            Save
          </button>
        </div>
      </div>

      {/* Left side for Prescription details */}
      <div className="prescription-details-content">
        <div className="prescription-details-left-side">
          <div>
            <label htmlFor="prescription-patient-id">Patient ID</label>
            <input
              type="number"
              name="patient_id"
              id="prescription-patient-id"
              value={PrescriptionDetails.patient_id !== null ? PrescriptionDetails.patient_id : ""}
              onChange={handlePrescriptionDetailsChange}
              readOnly={!editMode}
            />
          </div>
          <div>
            <label htmlFor="prescription-prescriber-id">Prescriber ID</label>
            <input
              type="number"
              name="prescriber_id"
              id="prescription-prescriber-id"
              value={PrescriptionDetails.prescriber_id !== null ? PrescriptionDetails.prescriber_id : ""}
              onChange={handlePrescriptionDetailsChange}
              readOnly={!editMode}
            />
          </div>
          <div>
            <label htmlFor="prescription-prescribed-date">Prescribed Date</label>
            <input
              type="date"
              name="prescribed_date"
              id="prescription-prescribed-date"
              value={PrescriptionDetails.prescribed_date}
              onChange={handlePrescriptionDetailsChange}
              readOnly={!editMode}
            />
          </div>
          <div>
            <label htmlFor="rx-item-id">Rx Item ID</label>
            <input
              type="number"
              name="rx_item_id"
              id="rx-item-id"
              value={PrescriptionDetails.rx_item_id !== 0 ? PrescriptionDetails.rx_item_id : ""}
              onChange={handlePrescriptionDetailsChange}
              readOnly={!editMode}
            />
          </div>
          <div>
            <label htmlFor="prescription-directions">Directions</label>
            <textarea
              name="directions"
              id="prescription-directions"
              value={PrescriptionDetails.directions || ""}
              onChange={handlePrescriptionDetailsChange}
              className="directions-textarea"
              readOnly={!editMode}
            />
          </div>
          <div>
            <label htmlFor="prescription-quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="prescription-quantity"
              value={PrescriptionDetails.quantity !== 0 ? PrescriptionDetails.quantity : ""}
              onChange={handlePrescriptionDetailsChange}
              readOnly={!editMode}
            />
          </div>
          <div>
            <label htmlFor="prescription-quantity-dispensed">Quantity Dispensed</label>
            <input
              type="number"
              name="quantity_dispensed"
              id="prescription-quantity-dispensed"
              value={PrescriptionDetails.quantity_dispensed !== 0 ? PrescriptionDetails.quantity_dispensed : ""}
              onChange={handlePrescriptionDetailsChange}
              readOnly={!editMode}
            />
          </div>
          <div>
            <label htmlFor="prescription-refills">Refills</label>
            <input
              type="number"
              name="refills"
              id="prescription-refills"
              value={PrescriptionDetails.refills !== 0 ? PrescriptionDetails.refills : ""}
              onChange={handlePrescriptionDetailsChange}
              readOnly={!editMode}
            />
          </div>
          <div>
            <label htmlFor="prescription-status">Status</label>
            <select
              name="status"
              id="prescription-status"
              value={PrescriptionDetails.status || ""}
              onChange={handlePrescriptionDetailsChange}
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
            <label htmlFor="prescription-tech-initials">Tech Initials</label>
            <input
              type="text"
              name="tech_initials"
              id="prescription-tech-initials"
              value={PrescriptionDetails.tech_initials || ""}
              onChange={handlePrescriptionDetailsChange}
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

export default PrescriptionDetails;
