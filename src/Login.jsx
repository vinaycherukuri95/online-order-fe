import { useState } from "react";
import axios from "axios";
import "./App.css";
import bg from "./assets/login.webp";

function Login({ onSwitch, onLoginSuccess, onLoginSuccessadmin }) {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); //

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = async () => {
    if (user.email === "vinay1@gmail.com" && user.password === "123456") {
      setMessage("Login successful!");
      setType("success");
      setTimeout(() => {
        onLoginSuccessadmin();
      }, 1000);
      return;
    }
    try {

      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        user,
        { headers: { "Content-Type": "application/json" } }
      );

       setMessage(res.data);
      setType("success");

      // ✅ Go to Home page
      setTimeout(() => {
        onLoginSuccess();
      }, 1000);

    } catch (error) {
      setMessage("Invalid Credentials");
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
        <h2>Login</h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button onClick={login}>Login</button>

        {message && (
          <div className={`message ${type}`}>
            {message}
          </div>
        )}

        {/* ✅ New User Link */}
        {type !== "success" && (
          <div className="switch-link">
            New user? <span onClick={onSwitch}>Register here</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
