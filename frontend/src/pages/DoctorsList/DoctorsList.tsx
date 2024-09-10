import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DoctorsList: React.FC = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8000/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="doctors-list-container">
      <h2>All Doctors</h2>
      <ul>
        {doctors.map((doctor: any) => (
          <li key={doctor.id}>
            <Link to={`/doctorprofile/${doctor.id}`}>
              {doctor.first_name} {doctor.last_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorsList;
