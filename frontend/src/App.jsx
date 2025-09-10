import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Intro from "./pages/Intro";
import AuthPage from "./pages/AuthPage";
import NGODashboard from "./pages/NGODashboard";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/ngo-dashboard" element={<NGODashboard />} />
        <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
        <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
