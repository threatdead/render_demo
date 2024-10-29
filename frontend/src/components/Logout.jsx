// frontend/src/components/Logout.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/");
  }, [navigate]);

  return null; // No UI needed for logout component
};

export default Logout;
