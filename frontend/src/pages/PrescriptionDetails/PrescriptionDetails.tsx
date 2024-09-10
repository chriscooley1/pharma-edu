import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PrescriptionDetails.css";

interface PrescriptionDetailsState {
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
  const [editMode, setEditMode] = useState(!id); // Start in edit mode if there is no id
  const [prescriptionDetails, setPrescriptionDetails] = useState<PrescriptionDetailsState>({
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
        setEditMode(false); // Disable edit mode if an existing prescription is being viewed
      });
    } else {
      // Reset form for new prescriptions
      resetForm();
    }
  }, [id]);

  // Reset form for a new prescription
  const resetForm = () => {
    setPrescriptionDetails({
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
    setEditMode(true); // Enable edit mode when resetting for a new prescription
  };

  // Handle form changes
  const handlePrescriptionDetailsChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setPrescriptionDetails((prevDetails) => ({
      ...prevDetails,
      [name]:
        name === "rx_number" ||
        name === "patient_id" ||
        name === "rx_item_id" ||
        name === "quantity" ||
        name === "quantity_dispensed" ||
        name === "refills"
          ? value === "" ? 0 : Number(value)
          : value || "",
    }));
  };

  // Save or update the prescription
  const handleSave = async () => {
    try {
      const patientResponse = await axios.get(`http://localhost:8000/patients/${prescriptionDetails.patient_id}`);
      if (!patientResponse.data) {
        alert("Patient does not exist. Please create the patient first.");
        return;
      }

      if (!id) {
        // Create a new prescription if there is no id
        await axios.post("http://localhost:8000/prescriptions", prescriptionDetails);
        alert("Prescription created successfully!");
      } else {
        // Update the existing prescription
        await axios.patch(`http://localhost:8000/prescriptions/${id}`, prescriptionDetails);
        alert("Prescription updated successfully!");
      }
      setEditMode(false); // Switch back to view mode after saving
    } catch (err) {
      console.error("Error saving prescription details:", err);
      alert("Failed to save prescription details.");
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const prescriptionTitle = prescriptionDetails.rx_number
    ? `Prescription: ${prescriptionDetails.rx_number}`
    : "New Prescription";

  return (
    <div className="prescription-details-container">
      <div className="prescription-header-row">
        <h3>{prescriptionTitle}</h3> {/* Display Rx Number or 'New Prescription' */}
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
          {/* Patient ID */}
          <div>
            <label htmlFor="prescription-patient-id">Patient ID</label>
            <input
              type="number"
              name="patient_id"
              id="prescription-patient-id"
              value={prescriptionDetails.patient_id !== null ? prescriptionDetails.patient_id : ""}
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
              value={prescriptionDetails.prescriber_id !== null ? prescriptionDetails.prescriber_id : ""}
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
              value={prescriptionDetails.prescribed_date}
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
              value={prescriptionDetails.rx_item_id !== 0 ? prescriptionDetails.rx_item_id : ""}
              onChange={handlePrescriptionDetailsChange}
              readOnly={!editMode}
            />
          </div>
          <div>
            <label htmlFor="prescription-directions">Directions</label>
            <textarea
              name="directions"
              id="prescription-directions"
              value={prescriptionDetails.directions || ""}
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
              value={prescriptionDetails.quantity !== 0 ? prescriptionDetails.quantity : ""}
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
              value={prescriptionDetails.quantity_dispensed !== 0 ? prescriptionDetails.quantity_dispensed : ""}
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
              value={prescriptionDetails.refills !== 0 ? prescriptionDetails.refills : ""}
              onChange={handlePrescriptionDetailsChange}
              readOnly={!editMode}
            />
          </div>
          <div>
            <label htmlFor="prescription-status">Status</label>
            <select
              name="status"
              id="prescription-status"
              value={prescriptionDetails.status || ""}
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
              value={prescriptionDetails.tech_initials || ""}
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
