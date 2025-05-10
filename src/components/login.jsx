import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    const loginData = { student_email: email, student_password: password, role };

    axios
      .post("https://api.uncodecart.com/students/login", loginData)
      .then((response) => {
        console.log("Response Data:", response.data);
        if (
          response.status === 200 &&
          response.data &&
          Array.isArray(response.data.message) &&
          response.data.message.length > 0 &&
          response.data.error === ""
        ) {
          const userData = { ...response.data.message[0], role };
          localStorage.setItem("userData", JSON.stringify(userData));
          switch (role) {
            case "admin":
              navigate("/admin-dashboard");
              break;
            case "trainer":
              navigate("/trainer-dashboard");
              break;
            case "student":
              navigate("/dashboard");
              break;
            default:
              navigate("/dashboard");
          }
        } else {
          setErrorMessage(response.data.error || "Invalid credentials or role.");
          localStorage.removeItem("userData");
        }
      })
      .catch((err) => {
        console.log("Login Error:", err.response?.data || err.message);
        setErrorMessage(err.response?.data?.error || "Login failed. Try again.");
        localStorage.removeItem("userData");
      });
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="role">User</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="role-dropdown"
            >
              <option value="" disabled>Select User</option>
              <option value="admin">Admin</option>
              <option value="trainer">Trainer</option>
              <option value="student">Student</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          <p className="forgot-password">
            <a href="/forgot-password">Forgot your password?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;