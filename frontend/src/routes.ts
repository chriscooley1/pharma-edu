import Home from "./pages/Home/Home";
import PrescriptionDetails from "./pages/PrescriptionDetails/PrescriptionDetails";
import DoctorProfile from "./pages/DoctorProfile/DoctorProfile";
import PatientProfile from "./pages/PatientProfile/PatientProfile";
import RxItemProfile from "./pages/RxItemProfile/RxItemProfile";
import AddPatient from "./pages/AddPatient/AddPatient";
import PatientsList from "./pages/PatientsList/PatientsList";
import DoctorsList from "./pages/DoctorsList/DoctorsList";
import PrescriptionsList from "./pages/PrescriptionsList/PrescriptionsList";
import RxItemsList from "./pages/RxItemsList/RxItemsList";

interface PharmacyRoutes {
  name: string;
  path: string;
  component: React.FC;
}

const routes: PharmacyRoutes[] = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "New Rx",
    path: "/newrx/:id?",
    component: PrescriptionDetails,
  },
  {
    name: "Doctor Profile",
    path: "/doctorprofile/:id?",
    component: DoctorProfile,
  },
  {
    name: "Patient Profile",
    path: "/patientprofile/:id?",
    component: PatientProfile,
  },
  {
    name: "Rx Item Profile",
    path: "/rxitemprofile/:id?",
    component: RxItemProfile,
  },
  {
    name: "Add Patient",
    path: "/addpatient",
    component: AddPatient,
  },
  { name: "All Patients", path: "/patients", component: PatientsList },
  { name: "All Doctors", path: "/doctors", component: DoctorsList },
  { name: "All Prescriptions", path: "/prescriptions", component: PrescriptionsList },
  { name: "All Rx Items", path: "/rx-items", component: RxItemsList },
];

export default routes;
