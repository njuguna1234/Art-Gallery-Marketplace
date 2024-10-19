// src/components/LoginForm.js

import React, { useState } from 'react';
import '../styles/Form.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      email,
      password,
      role,
    });
  };

  return (
    <div className="login-page"> {/* Apply background style */}
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <h2>Login</h2>

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
      </div>
    </div>
  );
}

export default LoginForm;
