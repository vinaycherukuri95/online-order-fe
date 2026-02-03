import { useState } from "react";
import axios from "axios";
import "./register.css";
import bg from "./assets/login.webp";

function Register({ onSwitch }) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // success | error
  const [errors, setErrors] = useState({
    email: "",
    phonenumber: "",
    password: ""
  });

  // Handle generic input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Email Validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, email: value });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  // Phone Validation
  const handlePhoneChange = (e) => {
    const value = e.target.value;

    // Allow only digits
    if (!/^\d*$/.test(value)) return;

    setUser({ ...user, phonenumber: value });

    if (!/^[6-9]\d{9}$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        phonenumber: "Phone number must be 10 digits"
      }));
    } else {
      setErrors((prev) => ({ ...prev, phonenumber: "" }));
    }
  };

  // Password Validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, password: value });

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  // Register function
  const register = async () => {
    setMessage("");

    // Stop submit if validation errors exist
    if (errors.email || errors.phonenumber || errors.password) {
      setMessage("Please fix validation errors");
      setType("error");
      return;
    }

    // Extra safety check
    if (!user.username || !user.email || !user.phonenumber || !user.password) {
      setMessage("All fields are required");
      setType("error");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/register",
        user
      );
      setMessage(res.data);
      setType("success");

      // Navigate to login page after success
      setTimeout(() => {
        onSwitch(); // switches page to login
      }, 1500);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage("Server not responding");
      }
      setType("error");
    }
  };

  return (
    <div
      className="auth-container"
      style={{
        height: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="auth-box">
        <h2>Register</h2>

        <input
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleEmailChange}
        />
        {errors.email && (
          <p style={{ color: "red", fontSize: "12px" }}>{errors.email}</p>
        )}

        <input
          name="phonenumber"
          placeholder="Phone Number"
          value={user.phonenumber}
          onChange={handlePhoneChange}
        />
        {errors.phonenumber && (
          <p style={{ color: "red", fontSize: "12px" }}>{errors.phonenumber}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handlePasswordChange}
        />
        {errors.password && (
          <p style={{ color: "red", fontSize: "12px" }}>{errors.password}</p>
        )}

        <button onClick={register}>Register</button>

        {message && <div className={`message ${type}`}>{message}</div>}
      </div>
    </div>
  );
}

export default Register;
