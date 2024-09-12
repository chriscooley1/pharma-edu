import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./PrescriptionsList.css";

interface Prescription {
  rx_number: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
}

const PrescriptionsList: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get<Prescription[]>("http://localhost:8000/prescriptions");
        setPrescriptions(response.data);
      } catch (error) {
        console.error("Failed to fetch prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div className="rx-list-container">
      <h2 className="rx-list-title">All Prescriptions</h2>
      <ul className="rx-list-items">
        {prescriptions.map((prescription) => (
          <li key={prescription.rx_number}>
            <Link to={`/newrx/${prescription.rx_number}`}>
              Rx #{prescription.rx_number} - {prescription.last_name}, {prescription.first_name}
              <span className="rx-dob">DOB: {new Date(prescription.date_of_birth).toLocaleDateString()}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrescriptionsList;
