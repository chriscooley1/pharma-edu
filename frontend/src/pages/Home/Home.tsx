import React from "react";
import DixieTechLogo from "../../assets/DixieTechLogo.png";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div>
        <img src={DixieTechLogo} alt="Dixie Tech Logo" className="logo-image" />
      </div>
      <div className="auth-buttons-container">
        <button type="button" className="auth-button">Register</button>
        <button type="button" className="auth-button">Login</button>
      </div>
    </div>
  );
};

export default Home;
