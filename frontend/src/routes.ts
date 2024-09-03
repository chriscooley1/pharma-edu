import Home from "./pages/Home/Home";
import NewRx from "./pages/NewRx/NewRx";
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
    path: "/newrx",  // This will handle adding a new Rx Item
    component: NewRx,
  },
  {
    name: "Doctor Profile",
    path: "/doctorprofile/:id?",  // Handles both viewing/editing and adding a new doctor
    component: DoctorProfile,
  },
  {
    name: "Patient Profile",
    path: "/patientprofile/:id?",  // Handles both viewing/editing and adding a new patient
    component: PatientProfile,
  },
  {
    name: "Rx Item Profile",
    path: "/rxitemprofile/:id?",  // Handles both viewing/editing and adding a new Rx item
    component: RxItemProfile,
  },
];

export default routes;
