import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Add validation checks
    if (!username || !email || !password) {
      setError('All fields are required.');
      setSuccess('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/user/register', {
        username,
        email,
        password,
      });

      setSuccess(response.data.message);  // Show success message
      setError('');  // Reset any error messages
    } catch (error) {
      setError(error.response?.data?.message || 'Error during registration');
      setSuccess('');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Register</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          className="form-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="form-button">Register</button>
      </form>
      <a href="/login" className="toggle-link">Already have an account? Login</a>
    </div>
  );
};

export default Register;
