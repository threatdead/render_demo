// frontend/src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/login.css"; // Ensure this imports the CSS file containing the new styles

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", formData);
      localStorage.setItem("token", response.data.token); // Store token
      navigate("/claims"); // Redirect to claims page on successful login
    } catch (error) {
      setMessage("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        {message && <p className="error-message">{message}</p>}
        <div className="register-link">
          Don't have an account? <a href="/register">Register here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
