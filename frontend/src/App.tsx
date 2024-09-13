import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import routes from "./routes";
import { ThemeProvider } from "./ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import "./themes.css";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="App">
        <ThemeToggle />
        <Router basename="/pharma-edu/">
          <Nav />
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
