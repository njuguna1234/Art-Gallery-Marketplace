import React, { useState } from 'react';
import '../styles/Form.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [loginSuccess, setLoginSuccess] = useState(false); // State for successful login
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data for the POST request
    const loginData = {
      email,
      password,
      role,
    };

    // Send POST request to the backend
    fetch('https://art-gallery-backend-2-1.onrender.com/users', { // Correct endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Login failed');
        }
        return res.json();
      })
      .then(data => {
        console.log('Login successful:', data);
        setLoginSuccess(true); // Set success to true
        setErrorMessage(''); // Clear error message on success
        // Handle successful login (e.g., store token, redirect, etc.)
      })
      .catch(err => {
        console.error('Error during login:', err);
        setLoginSuccess(false); // Set success to false if error occurs
        setErrorMessage('Login failed. Please check your credentials.');
      });
  };

  return (
    <div className="login-page"> {/* Apply background style */}
      <div className="form-container">
        {loginSuccess ? ( // Conditionally render success message
          <div className="success-message">
            <h2>Login Successful!</h2>
            <p>Welcome back, {role}!</p>
            {/* You can add redirection logic here if needed */}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form">
            <h2>Login</h2>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label>Role</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="buyer"
                  checked={role === 'buyer'}
                  onChange={(e) => setRole(e.target.value)}
                />
                Buyer
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="artist"
                  checked={role === 'artist'}
                  onChange={(e) => setRole(e.target.value)}
                />
                Artist
              </label>
            </div>

            <button type="submit">Login</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
