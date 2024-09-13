import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./DoctorsList.css";

interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  prescriber_type: string;
}

const DoctorsList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get<Doctor[]>("http://localhost:8000/prescribers");
        setDoctors(response.data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="dr-list-container">
      <h2 className="dr-list-title">All Doctors</h2>
      <ul className="dr-list-items">
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            <Link to={`/doctorprofile/${doctor.id}`}>
              {doctor.last_name}, {doctor.first_name}
              <span className="dr-type">{doctor.prescriber_type}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorsList;
