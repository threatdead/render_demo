import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ClaimsPage from "./pages/ClaimsPage";
import Logout from "./components/Logout.jsx";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/claims" element={<ClaimsPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default App;
