export enum PrescriberType {
  MD = "Doctor of Medicine",
  DO = "Doctor of Osteopathic Medicine",
  DPM = "Doctor of Podiatric Medicine",
  DDS = "Doctor of Dental Surgery",
  DMD = "Doctor of Medicine in Dentistry or Doctor of Dental Medicine",
  OD = "Doctor of Optometry",
  PharmD = "Doctor of Pharmacy",
  DC = "Doctor of Chiropractic",
  ND = "Doctor of Naturopathic Medicine",
  NMD = "Doctor of Naturopathic Medicine",
  DVM = "Doctor of Veterinary Medicine",
  PhD = "Doctor of Philosophy in Medical Field"
}

export const prescriberTypeOptions = Object.entries(PrescriberType).map(([key, value]) => ({
  value: key,
  label: value
}));
