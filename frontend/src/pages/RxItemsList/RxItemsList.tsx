import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RxItemsList: React.FC = () => {
  const [rxItems, setRxItems] = useState([]);

  useEffect(() => {
    const fetchRxItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/rx-items");
        setRxItems(response.data);
      } catch (error) {
        console.error("Failed to fetch Rx items:", error);
      }
    };

    fetchRxItems();
  }, []);

  return (
    <div className="rx-items-list-container">
      <h2>All Rx Items</h2>
      <ul>
        {rxItems.map((rxItem: any) => (
          <li key={rxItem.id}>
            <Link to={`/rxitemprofile/${rxItem.id}`}>
              {rxItem.name} - {rxItem.strength}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RxItemsList;
