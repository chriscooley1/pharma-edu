import React, { useState } from "react";
import Modal from "../Modal/Modal";
import NewPatient from "../../pages/NewPatient/NewPatient";
import NewDr from "../../pages/NewDr/NewDr";
import RxItem from "../../pages/RxItem/RxItem";
import NewPrescription from "../../pages/NewPrescription/NewPrescription"; // Import NewPrescription

const ModalButtons: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // Store the type of modal content

  const handleClick = (type: string) => {
    setModalType(type);
    setIsModalOpen(true); // Open the modal based on the type (New Patient, New Doctor, etc.)
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setModalType(""); // Clear the modal type
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "patient":
        return <NewPatient onClose={closeModal} />;
      case "doctor":
        return <NewDr onClose={closeModal} />;
      case "rxItem":
        return <RxItem onClose={closeModal} />;
      case "prescription":
        return <NewPrescription onClose={closeModal} />; // Show New Prescription search modal
      default:
        return null;
    }
  };

  return (
    <div className="modal-buttons">
      <button type="button" className="nav-button" onClick={() => handleClick("patient")}>
        New Patient
      </button>
      <button type="button" className="nav-button" onClick={() => handleClick("doctor")}>
        New Doctor
      </button>
      <button type="button" className="nav-button" onClick={() => handleClick("rxItem")}>
        Rx Item
      </button>
      <button type="button" className="nav-button" onClick={() => handleClick("prescription")}>
        New Prescription
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default ModalButtons;
