import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PatientProfile.css";

interface PatientDetails {
  last: string;
  first: string;
  dob: string;
  address: string;
  primaryDr: string;
  allergies: string;
  rxPrinted: string;
  rxCompleted: string;
  rxSold: string;
}

interface InsuranceInfo {
  bin: string;
  pcn: string;
  personCode: string;
  id: number;
  group: number;
}

const PatientProfile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchQuery = location.state?.query || "";

  const [patientDetails, setPatientDetails] = useState<PatientDetails>({
    last: "",
    first: "",
    dob: "",
    address: "",
    primaryDr: "",
    allergies: "",
    rxPrinted: "",
    rxCompleted: "",
    rxSold: "",
  });

  const [insuranceInfo, setInsuranceInfo] = useState<InsuranceInfo>({
    bin: "",
    pcn: "",
    personCode: "",
    id: 0,
    group: 0,
  });

  useEffect(() => {
    const savedPatientDetails = localStorage.getItem("patientDetails");
    if (savedPatientDetails) {
      setPatientDetails(JSON.parse(savedPatientDetails));
    }

    const savedInsuranceInfo = localStorage.getItem("insuranceInfo");
    if (savedInsuranceInfo) {
      setInsuranceInfo(JSON.parse(savedInsuranceInfo));
    }
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
      [name]: name === "id" || name === "group"
        ? value === "" ? 0 : Number(value) 
        : value,
    }));
  };

  const handleSave = () => {
    try {
      // Save to localStorage
      localStorage.setItem("patientDetails", JSON.stringify(patientDetails));
      localStorage.setItem("insuranceInfo", JSON.stringify(insuranceInfo));
      alert("Patient and insurance details saved successfully!");
      navigate("/patientprofile");
    } catch (error) {
      console.error("Error saving patient and insurance details:", error);
      alert("Failed to save patient and insurance details.");
    }
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
          <label htmlFor="patient-last-name">Last Name</label>
          <input
            type="text"
            name="last"
            id="patient-last-name"
            value={patientDetails.last}
            onChange={handlePatientChange}
          />
        </div>
        <div>
          <label htmlFor="patient-first-name">First Name</label>
          <input
            type="text"
            name="first"
            id="patient-first-name"
            value={patientDetails.first}
            onChange={handlePatientChange}
          />
        </div>
        <div>
          <label htmlFor="patient-dob">DOB</label>
          <input
            type="text"
            name="dob"
            id="patient-dob"
            value={patientDetails.dob}
            onChange={handlePatientChange}
          />
        </div>
        <div>
          <label htmlFor="patient-address">Address</label>
          <input
            type="text"
            name="address"
            id="patient-address"
            value={patientDetails.address}
            onChange={handlePatientChange}
          />
        </div>
        <div>
          <label htmlFor="patient-primary-dr">Primary Dr</label>
          <input
            type="text"
            name="primaryDr"
            id="patient-primary-dr"
            value={patientDetails.primaryDr}
            onChange={handlePatientChange}
          />
        </div>
        <div>
          <label htmlFor="patient-allergies">Allergies</label>
          <input
            type="text"
            name="allergies"
            id="patient-allergies"
            value={patientDetails.allergies}
            onChange={handlePatientChange}
          />
        </div>
        <div>
          <label htmlFor="patient-rx-printed">Rx Printed</label>
          <input
            type="text"
            name="rxPrinted"
            id="patient-rx-printed"
            value={patientDetails.rxPrinted}
            onChange={handlePatientChange}
          />
        </div>
        <div>
          <label htmlFor="patient-rx-completed">Rx Completed</label>
          <input
            type="text"
            name="rxCompleted"
            id="patient-rx-completed"
            value={patientDetails.rxCompleted}
            onChange={handlePatientChange}
          />
        </div>
        <div>
          <label htmlFor="patient-rx-sold">Rx Sold</label>
          <input
            type="text"
            name="rxSold"
            id="patient-rx-sold"
            value={patientDetails.rxSold}
            onChange={handlePatientChange}
          />
        </div>
      </div>

      <div className="separator"></div>

      <div className="pt-profile-right-side">
        <h3>Insurance Info</h3>
        <div>
          <label htmlFor="patient-bin">Bin</label>
          <input
            type="text"
            name="bin"
            id="patient-bin"
            value={insuranceInfo.bin}
            onChange={handleInsuranceChange}
          />
        </div>
        <div>
          <label htmlFor="patient-pcn">PCN</label>
          <input
            type="text"
            name="pcn"
            id="patient-pcn"
            value={insuranceInfo.pcn}
            onChange={handleInsuranceChange}
          />
        </div>
        <div>
          <label htmlFor="patient-person-code">Person Code</label>
          <input
            type="text"
            name="personCode"
            id="patient-person-code"
            value={insuranceInfo.personCode}
            onChange={handleInsuranceChange}
          />
        </div>
        <div>
          <label htmlFor="patient-id">ID #</label>
          <input
            type="number"
            name="id"
            id="patient-id"
            value={insuranceInfo.id === 0 ? "" : insuranceInfo.id}
            onChange={handleInsuranceChange}
          />
        </div>
        <div>
          <label htmlFor="patient-group">Group #</label>
          <input
            type="number"
            name="group"
            id="patient-group"
            value={insuranceInfo.group === 0 ? "" : insuranceInfo.group}
            onChange={handleInsuranceChange}
          />
        </div>
      </div>
      <button type="button" onClick={handleSave}>Save</button>
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
