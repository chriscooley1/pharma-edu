import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./PatientsList.css";

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
}

const PatientsList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get<Patient[]>("http://localhost:8000/patients");
        setPatients(response.data);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="pt-list-container">
      <h2 className="pt-list-title">All Patients</h2>
      <div className="pt-list-cards">
        {patients.map((patient) => (
          <Link key={patient.id} to={`/patientprofile/${patient.id}`} className="pt-card">
            <h3>{`${patient.first_name} ${patient.last_name}`}</h3>
            <p>Date of Birth: {new Date(patient.date_of_birth).toLocaleDateString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PatientsList;
