import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DoctorProfile.css";

interface DoctorDetails {
  first_name: string;
  last_name: string;
  prescriber_type: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  contact_number: string;
  dea: string;
  npi: string;
}

const DoctorProfile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false); // Start in view mode (not editable)
  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails>({
    first_name: "",
    last_name: "",
    prescriber_type: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    contact_number: "",
    dea: "",
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

  const handleSave = async () => {
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
          <label htmlFor="doctor-first-name">First Name</label>
          <input
            type="text"
            name="first_name"
            id="doctor-first-name"
            value={doctorDetails.first_name  || ""}
            onChange={handleDoctorChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="doctor-last-name">Last Name</label>
          <input
            type="text"
            name="last_name"
            id="doctor-last-name"
            value={doctorDetails.last_name  || ""}
            onChange={handleDoctorChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="doctor-prescriber-type">Prescriber Type</label>
          <input
            type="text"
            name="prescriber_type"
            id="doctor-prescriber-type"
            value={doctorDetails.prescriber_type  || ""}
            onChange={handleDoctorChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="doctor-street">Street</label>
          <input
            type="text"
            name="street"
            id="doctor-street"
            value={doctorDetails.street  || ""}
            onChange={handleDoctorChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="doctor-city">City</label>
          <input
            type="text"
            name="city"
            id="doctor-city"
            value={doctorDetails.city  || ""}
            onChange={handleDoctorChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="doctor-state">State</label>
          <input
            type="text"
            name="state"
            id="doctor-state"
            value={doctorDetails.state  || ""}
            onChange={handleDoctorChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="doctor-zipcode">Zipcode</label>
          <input
            type="text"
            name="zipcode"
            id="doctor-zipcode"
            value={doctorDetails.zipcode  || ""}
            onChange={handleDoctorChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="doctor-contact-number">Contact Number</label>
          <input
            type="text"
            name="contact_number"
            id="doctor-contact-number"
            value={doctorDetails.contact_number  || ""}
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
            value={doctorDetails.dea  || ""}
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
            value={doctorDetails.npi  || ""}
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
