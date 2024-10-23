import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formError, setFormError] = useState({ username: "", password: "" });

  const validateForm = () => {
    let valid = true;
    let errors = { username: "", password: "" };

    // Check if username is empty
    if (!username) {
      errors.username = "Username is required";
      valid = false;
    }

    // Check if password is empty
    if (!password) {
      errors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      // Check if password length is less than 6 characters
      errors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setFormError(errors);
    return valid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform client-side validation
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.get("https://art-gallery-backend-2-1.onrender.com/users", {
        params: {
          username,
          password
        }
      });

      const user = response.data.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        alert("Login successful!");
        // Save user data in localStorage or context for session management
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        {formError.username && <p style={{ color: "red" }}>{formError.username}</p>}
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {formError.password && <p style={{ color: "red" }}>{formError.password}</p>}

        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
