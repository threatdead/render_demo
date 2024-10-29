// frontend/src/components/ClaimsList.js
import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/claims.css"; // Import the stylesheet for styling

const ClaimsList = () => {
  const [claims, setClaims] = useState([]);
  const [error, setError] = useState("");
  const [editingClaim, setEditingClaim] = useState(null); // Track which claim is being edited

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await api.get("/claims");
        setClaims(response.data); // Only user's claims are now set
      } catch (error) {
        setError("Failed to fetch claims.");
      }
    };

    fetchClaims();
  }, []);

  const handleEditClick = (claim) => {
    setEditingClaim({ ...claim }); // Set the selected claim in editing mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingClaim((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    try {
      const response = await api.put(
        `/claims/${editingClaim.claimId}`,
        editingClaim
      );
      setClaims((prevClaims) =>
        prevClaims.map((claim) =>
          claim.claimId === editingClaim.claimId ? response.data.claim : claim
        )
      );
      setEditingClaim(null); // Exit editing mode
    } catch (error) {
      setError("Failed to update claim.");
    }
  };

  const handleCancelClick = () => {
    setEditingClaim(null); // Cancel editing mode without saving
  };

  return (
    <div className="claims-container">
      <h2>Your Claims</h2>
      {error && <p className="error-message">{error}</p>}
      {claims.length > 0 ? (
        <ul className="claims-list">
          {claims.map((claim) => (
            <li key={claim.claimId} className="claim-item">
              {editingClaim && editingClaim.claimId === claim.claimId ? (
                // Edit Mode
                <div className="claim-edit">
                  <label>
                    Type:
                    <select
                      name="claimType"
                      value={editingClaim.claimType}
                      onChange={handleInputChange}
                    >
                      <option value="Medical">Medical</option>
                      <option value="Dental">Dental</option>
                      <option value="Vision">Vision</option>
                      <option value="Prescription">Prescription</option>
                      <option value="Wellness">Wellness</option>
                    </select>
                  </label>
                  <label>
                    Description:
                    <input
                      type="text"
                      name="description"
                      value={editingClaim.description}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Status:
                    <select
                      name="status"
                      value={editingClaim.status}
                      onChange={handleInputChange}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </label>
                  <button onClick={handleSaveClick} className="save-button">
                    Save
                  </button>
                  <button onClick={handleCancelClick} className="cancel-button">
                    Cancel
                  </button>
                </div>
              ) : (
                // View Mode
                <div className="claim-details">
                  <p>Type: {claim.claimType}</p>
                  <p>Description: {claim.description}</p>
                  <p>Status: {claim.status}</p>
                  <p>Date: {new Date(claim.timestamp).toLocaleDateString()}</p>
                  <button
                    onClick={() => handleEditClick(claim)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No claims found for your account.</p>
      )}
    </div>
  );
};

export default ClaimsList;
