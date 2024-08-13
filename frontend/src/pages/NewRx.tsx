import React, { useState } from "react";

interface RxDetails {
  ptName: string;
  dob: string;
  drName: string;
  dateOfRx: string;
  medication: string;
  sigCode: string;
  instructions: string;
  quantityWritten: string;
  quantityDispensed: string;
  refills: string;
  techInitials: string;
}

const NewRx: React.FC = () => {
  const [rxDetails, setRxDetails] = useState<RxDetails>({
    ptName: "",
    dob: "",
    drName: "",
    dateOfRx: "",
    medication: "",
    sigCode: "",
    instructions: "",
    quantityWritten: "",
    quantityDispensed: "",
    refills: "",
    techInitials: "",
  });

  const handleRxChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRxDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="new-rx-container">
      <h3>New Rx</h3>
      <div>
        <label htmlFor="rx-pt-name">Patient Last Name</label>
        <input
          type="text"
          name="ptName"
          id="rx-pt-name"
          value={rxDetails.ptName}
          onChange={handleRxChange}
        />
      </div>
      <div>
        <label htmlFor="rx-dob">DOB</label>
        <input
          type="text"
          name="dob"
          id="rx-dob"
          value={rxDetails.dob}
          onChange={handleRxChange}
        />
      </div>
      <div>
        <label htmlFor="rx-dr-name">Dr Name</label>
        <input
          type="text"
          name="drName"
          id="rx-dr-name"
          value={rxDetails.drName}
          onChange={handleRxChange}
        />
      </div>
      <div>
        <label htmlFor="rx-date-of-rx">Date of Rx</label>
        <input
          type="text"
          name="dateOfRx"
          id="rx-date-of-rx"
          value={rxDetails.dateOfRx}
          onChange={handleRxChange}
        />
      </div>
      <div>
        <label htmlFor="rx-medication">Medication</label>
        <input
          type="text"
          name="medication"
          id="rx-medication"
          value={rxDetails.medication}
          onChange={handleRxChange}
        />
      </div>
      <div>
        <label htmlFor="rx-sig-code">Sig Code</label>
        <input
          type="text"
          name="sigCode"
          id="rx-sig-code"
          value={rxDetails.sigCode}
          onChange={handleRxChange}
        />
      </div>
      <div>
        <label htmlFor="rx-instructions">Instructions</label>
        <input
          type="text"
          name="instructions"
          id="rx-instructions"
          value={rxDetails.instructions}
          onChange={handleRxChange}
        />
      </div>
      <div>
        <label htmlFor="rx-quantity-written">Quantity Written</label>
        <input
          type="text"
          name="quantityWritten"
          id="rx-quantity-written"
          value={rxDetails.quantityWritten}
          onChange={handleRxChange}
        />
      </div>
      <div>
        <label htmlFor="rx-quantity-dispensed">Quantity Dispensed</label>
        <input
          type="text"
          name="quantityDispensed"
          id="rx-quantity-dispensed"
          value={rxDetails.quantityDispensed}
          onChange={handleRxChange}
        />
      </div>
      <div>
        <label htmlFor="rx-refills">Refills</label>
        <input
          type="text"
          name="refills"
          id="rx-refills"
          value={rxDetails.refills}
          onChange={handleRxChange}
        />
      </div>
      <div>
        <label htmlFor="rx-tech-initials">Tech Initials</label>
        <input
          type="text"
          name="techInitials"
          id="rx-tech-initials"
          value={rxDetails.techInitials}
          onChange={handleRxChange}
        />
      </div>
    </div>
  );
};

export default NewRx;
