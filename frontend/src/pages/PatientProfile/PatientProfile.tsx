import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PatientProfile.css";
import axios from "axios";

interface PatientDetails {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  allergies: string;
  rx_printed: string;
  rx_completed: string;
  rx_sold: string;
}

interface InsuranceInfo {
  insurance_name: string;
  insurance_member_id: string;
  insurance_group_number: string;
  insurance_rx_bin: string;
  insurance_rx_pcn: string;
}

const PatientProfile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false); // Start in view mode (not editable)
  const [patientDetails, setPatientDetails] = useState<PatientDetails>({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    allergies: "",
    rx_printed: "",
    rx_completed: "",
    rx_sold: "",
  });

  const [insuranceInfo, setInsuranceInfo] = useState<InsuranceInfo>({
    insurance_name: "",
    insurance_member_id: "",
    insurance_group_number: "",
    insurance_rx_bin: "",
    insurance_rx_pcn: "",
  });

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const patientId = 1; // Replace with actual patient ID
        const patientResponse = await axios.get(`http://localhost:8000/patients/${patientId}`);
        const patientData = patientResponse.data;
        setPatientDetails(patientData);
  
        // If insurance details are part of the patient data, set them as well
        setInsuranceInfo({
          insurance_name: patientData.insurance_name || "",
          insurance_member_id: patientData.insurance_member_id || "",
          insurance_group_number: patientData.insurance_group_number || "",
          insurance_rx_bin: patientData.insurance_rx_bin || "",
          insurance_rx_pcn: patientData.insurance_rx_pcn || "",
        });
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };
  
    fetchPatientDetails();
  }, []);

  const handlePatientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPatientDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleInsuranceChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInsuranceInfo((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const patientId = 1; // Replace with actual patient ID
      await axios.patch(`http://localhost:8000/patients/${patientId}`, patientDetails);
      await axios.patch(`http://localhost:8000/patients/${patientId}`, insuranceInfo);
  
      alert("Patient and insurance details updated successfully!");
      setEditMode(false); // Disable edit mode after saving
    } catch (error) {
      console.error("Error updating patient and insurance details:", error);
      alert("Failed to update patient and insurance details.");
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode); // Toggle edit mode
  };

  const goToNewRx = () => {
    navigate("/newrx");
  };

  return (
    <div className="patient-profile-container">
      {/* <h2>Search Query: {searchQuery}</h2> */}
      <div className="pt-profile-left-side">
        <h3>Patient Name</h3>
        <h3>General Information</h3>
        <div>
          <label htmlFor="patient-first-name">First Name</label>
          <input
            type="text"
            name="first_name"
            id="patient-first-name"
            value={patientDetails.first_name  || ""}
            onChange={handlePatientChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="patient-last-name">Last Name</label>
          <input
            type="text"
            name="last_name"
            id="patient-last-name"
            value={patientDetails.last_name  || ""}
            onChange={handlePatientChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="patient-date-of-birth">Date Of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            id="patient-date-of-birth"
            value={patientDetails.date_of_birth  || ""}
            onChange={handlePatientChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="patient-street">Street</label>
          <input
            type="text"
            name="street"
            id="patient-street"
            value={patientDetails.street  || ""}
            onChange={handlePatientChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="patient-city">City</label>
          <input
            type="text"
            name="city"
            id="patient-city"
            value={patientDetails.city  || ""}
            onChange={handlePatientChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="patient-state">State</label>
          <input
            type="text"
            name="state"
            id="patient-state"
            value={patientDetails.state  || ""}
            onChange={handlePatientChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="patient-zipcode">Zipcode</label>
          <input
            type="text"
            name="zipcode"
            id="patient-zipcode"
            value={patientDetails.zipcode  || ""}
            onChange={handlePatientChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="patient-allergies">Allergies</label>
          <input
            type="text"
            name="allergies"
            id="patient-allergies"
            value={patientDetails.allergies  || ""}
            onChange={handlePatientChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="patient-rx-printed">Rx Printed</label>
          <input
            type="text"
            name="rx_printed"
            id="patient-rx-printed"
            value={patientDetails.rx_printed  || ""}
            onChange={handlePatientChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="patient-rx-completed">Rx Completed</label>
          <input
            type="text"
            name="rx_completed"
            id="patient-rx-completed"
            value={patientDetails.rx_completed  || ""}
            onChange={handlePatientChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="patient-rx-sold">Rx Sold</label>
          <input
            type="text"
            name="rx_sold"
            id="patient-rx-sold"
            value={patientDetails.rx_sold  || ""}
            onChange={handlePatientChange}
            readOnly={!editMode}
          />
        </div>
      </div>

      <div className="separator"></div>

      <div className="pt-profile-right-side">
        <h3>Insurance Info</h3>
        <div>
          <label htmlFor="patient-insurance-name">Insurance Name</label>
          <input
            type="text"
            name="insurance_name"
            id="patient-insurance-name"
            value={insuranceInfo.insurance_name  || ""}
            onChange={handleInsuranceChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="patient-insurance-member-id">Insurance Member ID</label>
          <input
            type="text"
            name="insurance_member_id"
            id="patient-insurance-member-id"
            value={insuranceInfo.insurance_member_id  || ""}
            onChange={handleInsuranceChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="patient-insurance-group-number">Insurance Group Number</label>
          <input
            type="text"
            name="insurance_group_number"
            id="patient-insurance-group-number"
            value={insuranceInfo.insurance_group_number  || ""}
            onChange={handleInsuranceChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="patient-insurance-rx-bin">Insurance Rx Bin</label>
          <input
            type="text"
            name="insurance_rx_bin"
            id="patient-insurance-rx-bin"
            value={insuranceInfo.insurance_rx_bin  || ""}
            onChange={handleInsuranceChange}
            readOnly={!editMode}
          />
        </div>
        <div>
          <label htmlFor="patient-insurance-rx-pcn">Insurance Rx Pcn</label>
          <input
            type="text"
            name="insurance_rx_pcn"
            id="patient-insurance-rx-pcn"
            value={insuranceInfo.insurance_rx_pcn  || ""}
            onChange={handleInsuranceChange}
            readOnly={!editMode}
          />
        </div>
      </div>
      <div className="button-group">
        <button type="button" onClick={toggleEditMode}>
          {editMode ? "Cancel" : "Edit"}
        </button>
        <button type="button" onClick={handleSave} disabled={!editMode}>
          Save
        </button>
      </div>
      <button 
        type="button"
        onClick={goToNewRx}
        className="navigate-button"
      >
        New Rx
      </button>
    </div>
  );
};

export default PatientProfile;
