import Home from "./pages/Home/Home";
import NewRx from "./pages/NewRx/NewRx";
import AddPatient from "./pages/AddPatient/AddPatient";
import DoctorProfile from "./pages/DoctorProfile/DoctorProfile";
import PatientProfile from "./pages/PatientProfile/PatientProfile";
import RxItemProfile from "./pages/RxItemProfile/RxItemProfile";

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
    path: "/newrx",
    component: NewRx,
  },
  {
    name: "Add Patient",
    path: "/addpatient",
    component: AddPatient,
  },
  {
    name: "Doctor Profile",
    path: "/doctorprofile",
    component: DoctorProfile,
  },
  {
    name: "Patient Profile",
    path: "/patientprofile",
    component: PatientProfile,
  },
  {
    name: "Rx Item Profile",
    path: "/rxitemprofile",
    component: RxItemProfile,
  },
];

export default routes;
