import React from "react";
import SubmitClaim from "../components/SubmitClaim";
import ClaimsList from "../components/ClaimsList";
import { Link } from "react-router-dom";
import "../styles/logout.css";
const ClaimsPage = () => (
  <div className="container">
    <div className="header">
      <h2>Claims Page</h2>
      <Link to="/logout" className="logout-button">
        Logout
      </Link>
    </div>
    <SubmitClaim />
    <ClaimsList />
  </div>
);

export default ClaimsPage;
