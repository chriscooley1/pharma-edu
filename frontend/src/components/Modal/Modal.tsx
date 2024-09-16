import React, { ReactNode, useEffect, useRef, useContext } from "react";
import { ThemeContext, ThemeContextType } from "../../ThemeContext"; // Import ThemeContextType
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useContext(ThemeContext) as ThemeContextType; // Assert the type

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isDarkMode ? "dark-mode" : ""}`}>
      <div className={`modal-content ${isDarkMode ? "dark-mode" : ""}`} ref={modalRef}>
        <button type="button" className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
