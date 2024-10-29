// frontend/src/components/SubmitClaim.js
import React, { useState } from "react";
import api from "../api";
import "../styles/submit.css"; // Import the new stylesheet

const SubmitClaim = () => {
  const [formData, setFormData] = useState({
    claimType: "Medical",
    description: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/claims", formData);
      setMessage({ text: "Claim submitted successfully!", type: "success" });
    } catch (error) {
      setMessage({ text: "Failed to submit claim.", type: "error" });
    }
  };

  return (
    <div className="submit-claim-container">
      <h2>Submit a Claim</h2>
      <form onSubmit={handleSubmit} className="submit-claim-form">
        <div className="form-group">
          <label htmlFor="claimType">Claim Type</label>
          <select
            name="claimType"
            value={formData.claimType}
            onChange={handleChange}
            required
          >
            <option value="Medical">Medical</option>
            <option value="Dental">Dental</option>
            <option value="Vision">Vision</option>
            <option value="Prescription">Prescription</option>
            <option value="Wellness">Wellness</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            placeholder="Enter claim details"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Submit Claim
        </button>
      </form>
      {message && (
        <p
          className={`message ${
            message.type === "error" ? "error" : "success"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
};

export default SubmitClaim;
