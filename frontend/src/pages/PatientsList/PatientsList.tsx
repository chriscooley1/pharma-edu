import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PatientsList: React.FC = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:8000/patients");
        setPatients(response.data);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="patients-list-container">
      <h2>All Patients</h2>
      <ul>
        {patients.map((patient: any) => (
          <li key={patient.id}>
            <Link to={`/patientprofile/${patient.id}`}>
              {patient.first_name} {patient.last_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientsList;
