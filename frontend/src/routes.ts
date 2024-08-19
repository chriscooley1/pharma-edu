import Home from "./pages/HomePage";
import NewDr from "./pages/NewDr";
import NewPatient from "./pages/NewPatient";
import NewRx from "./components/NewRx";
import RxItem from "./pages/RxItem";
import AddPatient from "./pages/AddPatient";
import DoctorProfile from "./pages/DoctorProfile";
import PatientProfile from "./pages/PatientProfile";
import RxItemProfile from "./pages/RxItemProfile";

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
    name: "New Patient",
    path: "/newpatient",
    component: NewPatient,
  },
  {
    name: "New Dr",
    path: "/newdr",
    component: NewDr,
  },
  {
    name: "Rx Item",
    path: "/rxitem",
    component: RxItem,
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
