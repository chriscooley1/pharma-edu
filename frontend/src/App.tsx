import { useEffect } from "react";
import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";
import routes from "./routes";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Home";
        metaDescription = "Welcome to the Home Page";
        break;
        case "/newpatient":
          title = "New Patient";
          metaDescription = "Add details for a new patient.";
          break;
      case "/addpatient":
        title = "Add Patient";
        metaDescription = "Add a new patient to the system.";
        break;
        case "/patientprofile":
          title = "Patient Profile";
          metaDescription = "View and manage patient profile details.";
          break;
      case "/newdr":
        title = "New Doctor";
        metaDescription = "Add details for a new doctor.";
        break;
      case "/doctorprofile":
        title = "Doctor Profile";
        metaDescription = "View and manage doctor profile details.";
        break;
      case "/rxitem":
        title = "Rx Item";
        metaDescription = "View and manage Rx item details.";
      break;
      case "/newrx":
        title = "New Rx";
        metaDescription = "Create a new prescription.";
        break;
      case "/rxitemprofile":
        title = "Rx Item Profile";
        metaDescription = "View and manage Rx profile details.";
        break;
      default:
        title = "App";
        metaDescription = "Application";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.component />} />
      ))}
    </Routes>
  );
}

export default App;
