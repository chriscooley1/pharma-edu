import React from "react";
import routes from "../../routes";
import NavItem from "../NavItem/NavItem";
import DixieTechLogo from "../../assets/DixieTechLogo.png";
import ModalButtons from "../ModalButtons/ModalButtons";
import ThemeToggle from "../ThemeToggle";
import "./Nav.css";

// Define a set of route names you want to exclude for readability
const excludedRoutes = [
  "Add Patient",
  "Patient Profile",
  "Doctor Profile",
  "Rx Item Profile",
  "New Rx",
  "All Patients",
  "All Doctors",
  "All Prescriptions",
  "All Rx Items"
];

const Nav: React.FC = () => {
  const navRoutes = routes.filter(route => !excludedRoutes.includes(route.name));

  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <img src={DixieTechLogo} alt="Dixie Tech Logo" className="small-logo" />
      </div>
      <ul className="nav-items">
        {navRoutes.map(route => (
          <NavItem key={route.path} name={route.name} path={route.path} />
        ))}
      </ul>
      <div className="modal-buttons-container">
        <ModalButtons />
      </div>
      <div className="theme-toggle-container">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Nav;
