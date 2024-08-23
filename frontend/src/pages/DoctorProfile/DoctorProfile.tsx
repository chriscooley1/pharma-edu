import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DoctorProfile.css";

interface DoctorDetails {
  last: string;
  first: string;
  drType: string;
  address: string;
  dea: string;
  phone: string;
  npi: string;
}

const DoctorProfile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false); // Start in view mode (not editable)
  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails>({
    last: "",
    first: "",
    drType: "",
    address: "",
    dea: "",
    phone: "",
    npi: "",
  });

  useEffect(() => {
    const savedDetails = localStorage.getItem("doctorDetails");
    if (savedDetails) {
      setDoctorDetails(JSON.parse(savedDetails));
    }
  }, []);

  const handleDoctorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDoctorDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = () => {
    try {
      // Save to localStorage
      localStorage.setItem("doctorDetails", JSON.stringify(doctorDetails));
      alert("Doctor details saved successfully!");
      setEditMode(false); // Disable edit mode after saving
      navigate("/doctorprofile");
    } catch (error) {
      console.error("Error saving doctor details:", error);
      alert("Failed to save doctor details.");
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode); // Toggle edit mode
  };

  return (
    <div className="doctor-profile-container">
      <div className="dr-main">
        <h3>Doctor Name First/Last</h3>
        <div>
          <label htmlFor="doctor-last-name">Last Name</label>
          <input
            type="text"
            name="last"
            id="doctor-last-name"
            value={doctorDetails.last}
            onChange={handleDoctorChange}
            readOnly={!editMode} // Make input read-only if not in edit mode
          />
        </div>
        <div>
          <label htmlFor="doctor-first-name">First Name</label>
          <input
            type="text"
            name="first"
            id="doctor-first-name"
            value={doctorDetails.first}
            onChange={handleDoctorChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="doctor-dr-type">Dr Type</label>
          <input
            type="text"
            name="drType"
            id="doctor-dr-type"
            value={doctorDetails.drType}
            onChange={handleDoctorChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="doctor-address">Address</label>
          <input
            type="text"
            name="address"
            id="doctor-address"
            value={doctorDetails.address}
            onChange={handleDoctorChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="doctor-dea">DEA</label>
          <input
            type="text"
            name="dea"
            id="doctor-dea"
            value={doctorDetails.dea}
            onChange={handleDoctorChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="doctor-phone">Phone</label>
          <input
            type="text"
            name="phone"
            id="doctor-phone"
            value={doctorDetails.phone}
            onChange={handleDoctorChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="doctor-npi">NPI</label>
          <input
            type="text"
            name="npi"
            id="doctor-npi"
            value={doctorDetails.npi}
            onChange={handleDoctorChange}
            readOnly={!editMode}
          />
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
    </div>
  );
};

export default DoctorProfile;
