import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PatientProfile.css";

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
  insurance_person_code: string;
}

const PatientProfile: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const initialPatientDetails = {
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
    rx_printed: "",
    rx_completed: "",
    rx_sold: "",
  };

  const initialInsuranceInfo = {
    insurance_name: "",
    insurance_member_id: "",
    insurance_group_number: "",
    insurance_rx_bin: "",
    insurance_rx_pcn: "",
    insurance_person_code: "",
  };

  const [patientDetails, setPatientDetails] = useState<PatientDetails>(initialPatientDetails);
  const [insuranceInfo, setInsuranceInfo] = useState<InsuranceInfo>(initialInsuranceInfo);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      if (isEditMode) {
        try {
          const response = await axios.get(`http://localhost:8000/patients/${id}`);
          const patientData = response.data;

          setPatientDetails(patientData);
          setInsuranceInfo({
            insurance_name: patientData.insurance_name || "",
            insurance_member_id: patientData.insurance_member_id || "",
            insurance_group_number: patientData.insurance_group_number || "",
            insurance_rx_bin: patientData.insurance_rx_bin || "",
            insurance_rx_pcn: patientData.insurance_rx_pcn || "",
            insurance_person_code: patientData.insurance_person_code || "",
          });
        } catch (error) {
          console.error("Failed to fetch patient details:", error);
          navigate("/patientsearch"); // Redirect if patient not found
        }
      } else {
        // Reset form for new patient
        setPatientDetails(initialPatientDetails);
        setInsuranceInfo(initialInsuranceInfo);
      }
    };

    fetchPatientDetails();
  }, [id, isEditMode, navigate]);

  const handlePatientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPatientDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value || "",
    }));
  };

  const handleInsuranceChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setInsuranceInfo((prevDetails) => ({
      ...prevDetails,
      [name]: value || "",
    }));
  };

  const handleSave = async () => {
    try {
      if (isEditMode) {
        await axios.patch(`http://localhost:8000/patients/${id}`, {
          ...patientDetails,
          ...insuranceInfo,
        });
        alert("Patient details updated successfully!");
      } else {
        await axios.post("http://localhost:8000/patients", {
          ...patientDetails,
          ...insuranceInfo,
        });
        alert("Patient added successfully!");
      }
      navigate("/patientprofile");
    } catch (error) {
      console.error("Error saving patient details:", error);
      alert("Failed to save patient details.");
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const goToNewRx = () => {
    navigate("/newrx");
  };

  return (
    <div className="patient-profile-container">
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
          <label htmlFor="patient-insurance-name">Name</label>
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
          <label htmlFor="patient-insurance-member-id">Member ID</label>
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
          <label htmlFor="patient-insurance-group-number">Group Number</label>
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
          <label htmlFor="patient-insurance-rx-bin">Rx Bin</label>
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
          <label htmlFor="patient-insurance-rx-pcn">Rx Pcn</label>
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
