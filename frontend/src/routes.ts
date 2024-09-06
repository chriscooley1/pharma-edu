import Home from "./pages/Home/Home";
import NewRx from "./pages/NewRx/NewRx";
import DoctorProfile from "./pages/DoctorProfile/DoctorProfile";
import PatientProfile from "./pages/PatientProfile/PatientProfile";
import RxItemProfile from "./pages/RxItemProfile/RxItemProfile";
import AddPatient from "./pages/AddPatient/AddPatient";

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
    component: NewRx,
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
];

export default routes;
