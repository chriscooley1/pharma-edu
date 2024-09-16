import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { stateOptions } from "../../utils/stateOptions";
import { prescriberTypeOptions } from "../../utils/prescriberTypes";
import "./DoctorProfile.css";

const DoctorProfile: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const isNewDoctor = !id;

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

  const [doctorDetails, setDoctorDetails] = useState(initialDoctorDetails);
  const [editMode, setEditMode] = useState(isNewDoctor);

  useEffect(() => {
    if (!isNewDoctor && id) {
      const fetchDoctorDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/prescribers/${id}`);
          setDoctorDetails(response.data);
        } catch (error) {
          console.error("Failed to fetch doctor details:", error);
        }
      };
      fetchDoctorDetails();
    } else {
      setDoctorDetails(initialDoctorDetails);
      setEditMode(true);
    }
  }, [id, isNewDoctor]);

  const fullName = `${doctorDetails.first_name} ${doctorDetails.last_name}`;
  const title = !isNewDoctor && doctorDetails.id ? `Doctor ID: ${doctorDetails.id} - ${fullName}` : "New Doctor";

  const handleDoctorChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setDoctorDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!isNewDoctor) {
        await axios.patch(`http://localhost:8000/prescribers/${id}`, doctorDetails);
        alert("Doctor details updated successfully!");
      } else {
        await axios.post("http://localhost:8000/prescribers", doctorDetails);
        alert("Doctor added successfully!");
      }
      setEditMode(false);
    } catch (error) {
      console.error("Error saving doctor details:", error);
      alert("Failed to save doctor details.");
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="doctor-profile-container">
      <div className="doctor-header-row">
        <h3>{title}</h3>
        <div className="doctor-header-buttons">
          <button type="button" onClick={toggleEditMode}>
            {editMode ? "Cancel" : "Edit"}
          </button>
          <button type="button" className="save-button" onClick={handleSave} disabled={!editMode}>
            Save
          </button>
        </div>
      </div>

      <div className="doctor-content">
        <div className="doctor-form-section">
          <div>
            <label htmlFor="doctor-first-name">First Name</label>
            <input
              type="text"
              name="first_name"
              id="doctor-first-name"
              value={doctorDetails.first_name}
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
            <select
              name="prescriber_type"
              id="doctor-prescriber-type"
              className="prescriber-type-dropdown"
              value={doctorDetails.prescriber_type || ""}
              onChange={handleDoctorChange}
              disabled={!editMode}
            >
              <option value="">Select a prescriber type</option>
              {prescriberTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
            <select
              name="state"
              id="doctor-state"
              className="state-dropdown"
              value={doctorDetails.state || ""}
              onChange={handleDoctorChange}
              disabled={!editMode}
            >
              <option value="">Select a state</option>
              {stateOptions.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
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
    </div>
  );
};

export default DoctorProfile;
