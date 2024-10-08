DELETE FROM Prescription;
DELETE FROM Patient;
DELETE FROM Prescriber;
DELETE FROM RxItem;

-- Reset the sequences
ALTER SEQUENCE patient_id_seq RESTART WITH 1;
ALTER SEQUENCE prescriber_id_seq RESTART WITH 1;
ALTER SEQUENCE rxitem_id_seq RESTART WITH 1;
ALTER SEQUENCE prescription_rx_number_seq RESTART WITH 1;
