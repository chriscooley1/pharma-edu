import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddPatient.css";
import axios from "axios";

interface PatientDetails {
  id: number | null;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone_number: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  allergies: string;
}

interface InsuranceInfo {
  insurance_name: string;
  insurance_member_id: string;
  insurance_group_number: string;
  insurance_rx_bin: string;
  insurance_rx_pcn: string;
  insurance_person_code: string;
}

const AddPatient: React.FC = () => {
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false); // Start in view mode (not editable)
  const [patientDetails, setPatientDetails] = useState<PatientDetails>({
    id: null,
    first_name: "",
    last_name: "",
    date_of_birth: "",
    phone_number: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    allergies: "",
  });

  const [insuranceInfo, setInsuranceInfo] = useState<InsuranceInfo>({
    insurance_name: "",
    insurance_member_id: "",
    insurance_group_number: "",
    insurance_rx_bin: "",
    insurance_rx_pcn: "",
    insurance_person_code: "",
  });

  useEffect(() => {
    // Fetch existing AddPatient details from backend (if needed)
  }, []);

  const handlePatientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPatientDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value || "",
    }));
  };

  const handleInsuranceChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInsuranceInfo((prevDetails) => ({
      ...prevDetails,
      [name]: value || "",
    }));
  };

  const handleSave = async () => {
    try {
      const patientResponse = await axios.post("http://localhost:8000/patients", patientDetails);
      
      // Assuming you just want to save the insurance info and don't need the response:
      await axios.patch(
        `http://localhost:8000/patients/${patientResponse.data.patient_id}`,
        {
          insurance_name: insuranceInfo.insurance_name,
          insurance_member_id: insuranceInfo.insurance_member_id,
          insurance_group_number: insuranceInfo.insurance_group_number,
          insurance_rx_bin: insuranceInfo.insurance_rx_bin,
          insurance_rx_pcn: insuranceInfo.insurance_rx_pcn,
          insurance_person_code: insuranceInfo.insurance_person_code,
        }
      );
      
      alert("Patient and insurance details saved successfully!");
      setEditMode(false); // Disable edit mode after saving
      navigate("/patientprofile"); // Redirect to the PatientProfile page after saving
    } catch (error) {
      console.error("Error saving patient and insurance details:", error);
      alert("Failed to save patient and insurance details.");
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode); // Toggle edit mode
  };

  return (
    <div className="add-new-patient-container">
      <div className="pt-left-side">
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
          <label htmlFor="patient-phone-number">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            id="patient-phone-number"
            value={patientDetails.phone_number  || ""}
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
      </div>

      <div className="separator"></div>

      <div className="pt-right-side">
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
        <div>
          <label htmlFor="patient-insurance-person-code">Person Code</label>
          <input
            type="text"
            name="insurance_person_code"
            id="patient-insurance-person-code"
            value={insuranceInfo.insurance_person_code  || ""}
            onChange={handleInsuranceChange}
            readOnly={!editMode}
          />
        </div>
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

export default AddPatient;
