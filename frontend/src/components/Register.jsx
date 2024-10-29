// frontend/src/components/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/register.css"; // Ensure this imports the CSS file containing the new styles

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", formData);
      setMessage({ text: response.data.message, type: "success" });
      navigate("/claims");
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Registration failed.",
        type: "error",
      });
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        {message && (
          <p
            className={
              message.type === "error" ? "error-message" : "success-message"
            }
          >
            {message.text}
          </p>
        )}
        <div className="login-link">
          Already have an account? <a href="/">Login here</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
