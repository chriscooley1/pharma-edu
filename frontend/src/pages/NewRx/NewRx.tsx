import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NewRx.css";

interface RxDetails {
  ptName: string;
  dob: string;
  drName: string;
  dateOfRx: string;
  medication: string;
  directions: string;
  quantityWritten: number;
  quantityDispensed: number;
  refills: number;
  techInitials: string;
}

const NewRx: React.FC = () => {
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false); // Start in view mode (not editable)
  const [rxDetails, setRxDetails] = useState<RxDetails>({
    ptName: "",
    dob: "",
    drName: "",
    dateOfRx: "",
    medication: "",
    directions: "",
    quantityWritten: 0,
    quantityDispensed: 0,
    refills: 0,
    techInitials: "",
  });

  useEffect(() => {
    const savedRxDetails = localStorage.getItem("rxDetails");
    if (savedRxDetails) {
      setRxDetails(JSON.parse(savedRxDetails));
    }
  }, []);

  const handleRxChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setRxDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "quantityWritten" || name === "quantityDispensed" || name === "refills" 
        ? value === "" ? 0 : Number(value) 
        : value,
    }));
  };

  const handleSave = () => {
    try {
      // Save to localStorage
      localStorage.setItem("rxDetails", JSON.stringify(rxDetails));
      alert("Rx details saved successfully!");
      setEditMode(false); // Disable edit mode after saving
      navigate("/newrx"); // Redirect to the NewRx page after saving
    } catch (error) {
      console.error("Error saving rx details:", error);
      alert("Failed to save rx details.");
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode); // Toggle edit mode
  };

  return (
    <div className="new-rx-container">
      <div className="new-rx-left-side">
        <div>
          <label htmlFor="rx-pt-name">Patient Last Name</label>
          <input
            type="text"
            name="ptName"
            id="rx-pt-name"
            value={rxDetails.ptName}
            onChange={handleRxChange}
            readOnly={!editMode} // Make input read-only if not in edit mode
          />
        </div>
        <div>
          <label htmlFor="rx-dob">DOB</label>
          <input
            type="text"
            name="dob"
            id="rx-dob"
            value={rxDetails.dob}
            onChange={handleRxChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="rx-dr-name">Dr Name</label>
          <input
            type="text"
            name="drName"
            id="rx-dr-name"
            value={rxDetails.drName}
            onChange={handleRxChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="rx-date-of-rx">Date of Rx</label>
          <input
            type="text"
            name="dateOfRx"
            id="rx-date-of-rx"
            value={rxDetails.dateOfRx}
            onChange={handleRxChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="rx-medication">Medication</label>
          <input
            type="text"
            name="medication"
            id="rx-medication"
            value={rxDetails.medication}
            onChange={handleRxChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="rx-directions">Directions</label>
          <textarea
            name="directions"
            id="rx-directions"
            value={rxDetails.directions}
            onChange={handleRxChange}
            className="directions-textarea"
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="rx-quantity-written">Quantity Written</label>
          <input
            type="number"
            name="quantityWritten"
            id="rx-quantity-written"
            value={rxDetails.quantityWritten === 0 ? "" : rxDetails.quantityWritten}
            onChange={handleRxChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="rx-quantity-dispensed">Quantity Dispensed</label>
          <input
            type="number"
            name="quantityDispensed"
            id="rx-quantity-dispensed"
            value={rxDetails.quantityDispensed === 0 ? "" : rxDetails.quantityDispensed}
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
            value={rxDetails.refills === 0 ? "" : rxDetails.refills}
            onChange={handleRxChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="rx-tech-initials">Tech Initials</label>
          <input
            type="text"
            name="techInitials"
            id="rx-tech-initials"
            value={rxDetails.techInitials}
            onChange={handleRxChange}
            readOnly={!editMode}
          />
        </div>
      </div>

      <div className="separator"></div>

      <div className="scan-image">
        <h3>Scan Image</h3>
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

export default NewRx;
