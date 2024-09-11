import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./PrescriptionsList.css";

const PrescriptionsList: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/prescriptions");
        setPrescriptions(response.data);
      } catch (error) {
        console.error("Failed to fetch prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div className="rx-list-container">
      <h2>All Prescriptions</h2>
      <ul>
        {prescriptions.map((prescription: any) => (
          <li key={prescription.rx_number}>
            <Link to={`/newrx/${prescription.rx_number}`}>
              Prescription #{prescription.rx_number} - {prescription.patient_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrescriptionsList;
