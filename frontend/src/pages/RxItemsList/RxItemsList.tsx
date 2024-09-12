import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./RxItemsList.css";

interface RxItem {
  rx_item_id: number;
  name: string;
  strength: string;
  dosage_form: string;
}

const RxItemsList: React.FC = () => {
  const [rxItems, setRxItems] = useState<RxItem[]>([]);

  useEffect(() => {
    const fetchRxItems = async () => {
      try {
        const response = await axios.get<RxItem[]>("http://localhost:8000/rx-items");
        setRxItems(response.data);
      } catch (error) {
        console.error("Failed to fetch Rx items:", error);
      }
    };

    fetchRxItems();
  }, []);

  return (
    <div className="rx-items-list-container">
      <h2 className="rx-items-list-title">All Rx Items</h2>
      <ul className="rx-items-list-items">
        {rxItems.map((rxItem) => (
          <li key={rxItem.rx_item_id}>
            <Link to={`/rxitemprofile/${rxItem.rx_item_id}`} className="rx-item-link">
              <div className="rx-item-name">{rxItem.name}</div>
              <div className="rx-item-details">
                <span>Strength: {rxItem.strength}</span>
                <span>Dosage Form: {rxItem.dosage_form}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="rx-items-pagination-buttons">
        <Link to="/rxitemprofile" className="rx-items-pagination-button">
          Add New Rx Item
        </Link>
      </div>
    </div>
  );
};

export default RxItemsList;
