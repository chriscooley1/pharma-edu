INSERT INTO Prescription (patient_id, prescriber_id, prescribed_date, rx_item_id, directions, quantity, quantity_dispensed, refills, status, tech_initials)
VALUES
(1, 1, '2024-09-01', 1, 'Take 1 tablet by mouth daily', 30, 30, 3, 'PENDING', 'JD'),
(2, 2, '2024-09-02', 2, 'Take 2 tablets by mouth every 4-6 hours', 60, 60, 0, 'PENDING', 'AS'),
(3, 3, '2024-09-03', 3, 'Take 1 capsule by mouth 3 times daily', 90, 90, 1, 'PENDING', 'MH'),
(4, 4, '2024-09-04', 4, 'Take 1 tablet by mouth twice daily', 60, 60, 2, 'PENDING', 'CB'),
(5, 5, '2024-09-05', 5, 'Take 1 tablet by mouth every morning', 30, 30, 1, 'PENDING', 'DJ'),
(6, 6, '2024-09-06', 6, 'Take 1 tablet by mouth at bedtime', 30, 30, 0, 'PENDING', 'JW'),
(1, 2, '2024-09-07', 1, 'Take 1 tablet by mouth daily', 30, 30, 3, 'PENDING', 'JD'),
(2, 3, '2024-09-08', 2, 'Take 2 tablets by mouth as needed for pain', 40, 40, 0, 'PENDING', 'AS'),
(3, 4, '2024-09-09', 3, 'Take 1 capsule by mouth 3 times daily', 90, 45, 1, 'PENDING', 'MH'),
(4, 5, '2024-09-10', 4, 'Take 1 tablet by mouth every morning', 30, 30, 2, 'PENDING', 'CB'),
(5, 6, '2024-09-11', 6, 'Take 1 tablet by mouth every night', 30, 30, 1, 'PENDING', 'DJ'),
(6, 1, '2024-09-12', 1, 'Take 1 tablet by mouth every 6 hours', 60, 60, 2, 'PENDING', 'JD'),
(1, 2, '2024-09-13', 2, 'Take 2 tablets by mouth 3 times daily', 90, 90, 1, 'PENDING', 'AS'),
(2, 3, '2024-09-14', 3, 'Take 1 tablet by mouth every morning with water', 30, 30, 3, 'PENDING', 'MH'),
(3, 4, '2024-09-15', 4, 'Take 1 capsule by mouth daily', 30, 30, 0, 'PENDING', 'CB'),
(4, 5, '2024-09-16', 5, 'Take 1 tablet by mouth before bedtime', 30, 30, 1, 'PENDING', 'DJ'),
(5, 6, '2024-09-17', 6, 'Take 2 tablets by mouth every morning', 60, 60, 2, 'PENDING', 'JW'),
(6, 1, '2024-09-18', 1, 'Take 1 tablet by mouth once a day', 30, 30, 3, 'PENDING', 'JD'),
(1, 2, '2024-09-19', 2, 'Take 2 capsules by mouth every 4 hours', 60, 60, 0, 'PENDING', 'AS'),
(2, 3, '2024-09-20', 3, 'Take 1 capsule by mouth twice daily', 60, 60, 2, 'PENDING', 'MH'),
(3, 4, '2024-09-21', 4, 'Take 1 tablet by mouth daily with food', 30, 30, 1, 'PENDING', 'CB'),
(4, 5, '2024-09-22', 5, 'Take 1 tablet by mouth every 8 hours', 90, 90, 0, 'PENDING', 'DJ'),
(5, 6, '2024-09-23', 6, 'Take 2 capsules by mouth daily', 60, 60, 2, 'PENDING', 'JW'),
(6, 1, '2024-09-24', 1, 'Take 1 tablet by mouth once in the morning', 30, 30, 3, 'PENDING', 'JD'),
(1, 2, '2024-09-25', 2, 'Take 1 tablet by mouth daily', 30, 30, 1, 'PENDING', 'AS'),
(2, 3, '2024-09-26', 3, 'Take 1 capsule by mouth before meals', 60, 60, 2, 'PENDING', 'MH'),
(3, 4, '2024-09-27', 4, 'Take 1 capsule by mouth at bedtime', 30, 30, 1, 'PENDING', 'CB'),
(4, 5, '2024-09-28', 5, 'Take 2 tablets by mouth every morning', 60, 60, 2, 'PENDING', 'DJ'),
(5, 6, '2024-09-29', 6, 'Take 1 tablet by mouth 3 times daily', 90, 90, 1, 'PENDING', 'JW'),
(6, 1, '2024-09-30', 1, 'Take 1 tablet by mouth with water every night', 30, 30, 3, 'PENDING', 'JD'),
(2, 4, '2024-10-01', 2, 'Take 1 tablet by mouth every 12 hours', 60, 60, 1, 'PENDING', 'AS'),
(3, 5, '2024-10-02', 3, 'Take 1 capsule by mouth every 4 hours as needed', 40, 40, 0, 'PENDING', 'MH'),
(4, 6, '2024-10-03', 4, 'Take 1 tablet by mouth daily', 30, 30, 2, 'PENDING', 'CB'),
(5, 1, '2024-10-04', 5, 'Take 1 tablet by mouth every morning', 30, 30, 3, 'PENDING', 'DJ'),
(6, 2, '2024-10-05', 6, 'Take 1 capsule by mouth 2 times daily', 60, 60, 1, 'PENDING', 'JW'),
(1, 3, '2024-10-06', 1, 'Take 1 tablet by mouth every night', 30, 30, 0, 'PENDING', 'JD'),
(2, 4, '2024-10-07', 2, 'Take 2 tablets by mouth as needed for pain', 20, 20, 0, 'PENDING', 'AS'),
(3, 5, '2024-10-08', 3, 'Take 1 tablet by mouth every 8 hours', 90, 90, 2, 'PENDING', 'MH'),
(4, 6, '2024-10-09', 4, 'Take 1 capsule by mouth every morning', 30, 30, 1, 'PENDING', 'CB'),
(5, 1, '2024-10-10', 5, 'Take 1 tablet by mouth daily with water', 30, 30, 3, 'PENDING', 'DJ'),
(6, 2, '2024-10-11', 6, 'Take 1 tablet by mouth every night before sleep', 30, 30, 0, 'PENDING', 'JW'),
(1, 3, '2024-10-12', 1, 'Take 2 tablets by mouth after meals', 60, 60, 1, 'PENDING', 'JD'),
(2, 4, '2024-10-13', 2, 'Take 1 capsule by mouth 3 times daily', 90, 90, 2, 'PENDING', 'AS'),
(3, 5, '2024-10-14', 3, 'Take 1 tablet by mouth every morning', 30, 30, 1, 'PENDING', 'MH'),
(4, 6, '2024-10-15', 4, 'Take 1 capsule by mouth every 4 hours', 40, 40, 0, 'PENDING', 'CB'),
(5, 1, '2024-10-16', 5, 'Take 1 tablet by mouth daily with food', 30, 30, 3, 'PENDING', 'DJ'),
(6, 2, '2024-10-17', 6, 'Take 1 tablet by mouth before meals', 30, 30, 2, 'PENDING', 'JW'),
(1, 3, '2024-10-18', 1, 'Take 2 tablets by mouth every 6 hours', 60, 60, 0, 'PENDING', 'JD'),
(2, 4, '2024-10-19', 2, 'Take 1 capsule by mouth every 4 hours', 30, 30, 1, 'PENDING', 'AS'),
(3, 5, '2024-10-20', 3, 'Take 1 tablet by mouth daily with water', 30, 30, 2, 'PENDING', 'MH'),
(4, 6, '2024-10-21', 4, 'Take 1 capsule by mouth every 6 hours', 40, 40, 0, 'PENDING', 'CB'),
(5, 1, '2024-10-22', 5, 'Take 1 tablet by mouth daily with water', 30, 30, 1, 'PENDING', 'DJ'),
(6, 2, '2024-10-23', 6, 'Take 1 tablet by mouth every night before sleep', 30, 30, 0, 'PENDING', 'JW'),
(1, 3, '2024-10-24', 1, 'Take 2 tablets by mouth after meals', 60, 60, 1, 'PENDING', 'JD'),
(2, 4, '2024-10-25', 2, 'Take 1 capsule by mouth 3 times daily', 90, 90, 2, 'PENDING', 'AS'),
(3, 5, '2024-10-26', 3, 'Take 1 tablet by mouth every morning', 30, 30, 1, 'PENDING', 'MH'),
(4, 6, '2024-10-27', 4, 'Take 1 capsule by mouth every 4 hours', 40, 40, 0, 'PENDING', 'CB'),
(5, 1, '2024-10-28', 5, 'Take 1 tablet by mouth daily with food', 30, 30, 3, 'PENDING', 'DJ'),
(6, 2, '2024-10-29', 6, 'Take 1 tablet by mouth before meals', 30, 30, 2, 'PENDING', 'JW'),
(1, 3, '2024-10-30', 1, 'Take 2 tablets by mouth every 6 hours', 60, 60, 0, 'PENDING', 'JD'),
(2, 4, '2024-10-31', 2, 'Take 1 capsule by mouth every 4 hours', 30, 30, 1, 'PENDING', 'AS'),
(3, 5, '2024-11-01', 3, 'Take 1 tablet by mouth daily with water', 30, 30, 2, 'PENDING', 'MH'),
(4, 6, '2024-11-02', 4, 'Take 1 capsule by mouth daily', 30, 30, 1, 'PENDING', 'CB'),
(5, 1, '2024-11-03', 5, 'Take 1 tablet by mouth every 12 hours', 60, 60, 2, 'PENDING', 'DJ'),
(6, 2, '2024-11-04', 6, 'Take 2 tablets by mouth every 6 hours', 60, 60, 0, 'PENDING', 'JW'),
(1, 3, '2024-11-05', 1, 'Take 1 tablet by mouth daily with food', 30, 30, 1, 'PENDING', 'JD'),
(2, 4, '2024-11-06', 2, 'Take 1 capsule by mouth twice daily', 60, 60, 1, 'PENDING', 'AS'),
(3, 5, '2024-11-07', 3, 'Take 1 tablet by mouth 3 times daily', 90, 90, 2, 'PENDING', 'MH'),
(4, 6, '2024-11-08', 4, 'Take 2 capsules by mouth before bedtime', 60, 60, 1, 'PENDING', 'CB'),
(5, 1, '2024-11-09', 5, 'Take 1 tablet by mouth every morning with water', 30, 30, 3, 'PENDING', 'DJ'),
(1, 2, '2024-11-10', 2, 'Take 1 tablet by mouth daily with food', 30, 30, 1, 'PENDING', 'JD'),
(2, 24, '2024-11-11', 3, 'Take 1 capsule by mouth twice daily', 60, 60, 1, 'PENDING', 'AS'),
(3, 29, '2024-11-12', 4, 'Take 1 tablet by mouth every morning', 30, 30, 2, 'PENDING', 'MH'),
(4, 35, '2024-11-13', 5, 'Take 2 tablets by mouth as needed for pain', 40, 40, 0, 'PENDING', 'CB'),
(5, 2, '2024-11-14', 1, 'Take 1 tablet by mouth before bedtime', 30, 30, 1, 'PENDING', 'DJ'),
(6, 24, '2024-11-15', 6, 'Take 1 capsule by mouth every night', 30, 30, 0, 'PENDING', 'JW'),
(1, 29, '2024-11-16', 2, 'Take 1 tablet by mouth every morning with water', 30, 30, 3, 'PENDING', 'JD'),
(2, 35, '2024-11-17', 3, 'Take 2 capsules by mouth daily', 60, 60, 2, 'PENDING', 'AS'),
(3, 24, '2024-11-18', 4, 'Take 1 tablet by mouth twice daily', 30, 30, 1, 'PENDING', 'MH'),
(4, 2, '2024-11-19', 5, 'Take 1 tablet by mouth every night', 30, 30, 0, 'PENDING', 'CB'),
(5, 5, '2024-11-20', 1, 'Take 1 tablet by mouth twice daily', 60, 60, 1, 'PENDING', 'DJ'),
(6, 32, '2024-11-21', 2, 'Take 1 capsule by mouth every 4 hours', 40, 40, 0, 'PENDING', 'JW'),
(1, 5, '2024-11-22', 3, 'Take 1 tablet by mouth every 6 hours', 60, 60, 2, 'PENDING', 'JD'),
(2, 32, '2024-11-23', 4, 'Take 2 tablets by mouth daily with food', 90, 90, 1, 'PENDING', 'AS'),
(3, 5, '2024-11-24', 5, 'Take 1 capsule by mouth before bedtime', 30, 30, 3, 'PENDING', 'MH');
