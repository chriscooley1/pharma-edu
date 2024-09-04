import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DoctorProfile.css";

interface DoctorDetails {
  id: number | null;
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
  const { id } = useParams<{ id?: string }>(); // id is optional for "add" mode
  const navigate = useNavigate();
  const isEditMode = Boolean(id); // Determine mode based on presence of id

  // Initial state for an empty doctor profile
  const initialDoctorDetails = {
    id: null,
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
  };

  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails>(initialDoctorDetails);
  // Set initial editMode to true to enable editing by default
  const [editMode, setEditMode] = useState(true); 

  useEffect(() => {
    if (isEditMode && id) {
      // Fetch doctor details if in edit mode (i.e., id is present)
      const fetchDoctorDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/prescribers/${id}`);
          setDoctorDetails(response.data);
        } catch (error) {
          console.error("Failed to fetch doctor details:", error);
          navigate("/doctorlist"); // Navigate back to the doctor list on error
        }
      };
      fetchDoctorDetails();
    } else {
      // Reset the form if adding a new doctor (no id present)
      setDoctorDetails(initialDoctorDetails);
    }
  }, [id, isEditMode, navigate]);

  const handleDoctorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDoctorDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (isEditMode) {
        await axios.patch(`http://localhost:8000/prescribers/${id}`, doctorDetails);
        alert("Doctor details updated successfully!");
      } else {
        await axios.post("http://localhost:8000/prescribers", doctorDetails);
        alert("Doctor added successfully!");
      }
      navigate("/doctorlist");
    } catch (error) {
      console.error("Error saving doctor details:", error);
      alert("Failed to save doctor details.");
    }
  };

  const toggleEditMode = () => {
    setEditMode((prevMode) => !prevMode);
  };

  return (
    <div className="doctor-profile-container">
      <h3>{isEditMode ? "Edit Doctor" : "Add New Doctor"}</h3>
      <div className="button-group">
        <button type="button" className="doctor-edit-button" onClick={toggleEditMode}>
          {editMode ? "Cancel" : "Edit"}
        </button>
        <button type="button" className="doctor-save-button" onClick={handleSave} disabled={!editMode}>
          Save
        </button>
      </div>
      <div className="dr-main">
        <div>
          <label htmlFor="doctor-first-name">First Name</label>
          <input
            type="text"
            name="first_name"
            id="doctor-first-name"
            value={doctorDetails.first_name || ""}
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
            value={doctorDetails.last_name || ""}
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
            value={doctorDetails.prescriber_type || ""}
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
            value={doctorDetails.street || ""}
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
            value={doctorDetails.city || ""}
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
            value={doctorDetails.state || ""}
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
            value={doctorDetails.zipcode || ""}
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
            value={doctorDetails.contact_number || ""}
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
            value={doctorDetails.dea || ""}
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
            value={doctorDetails.npi || ""}
            onChange={handleDoctorChange}
            readOnly={!editMode}
          />
        </div>
      </div>
    </div>
  );  
};

export default DoctorProfile;
