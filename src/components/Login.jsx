import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Login.css';

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', formData);
      // console.log(response);
      const user_details = response.data.user;
      // console.log(user_details);
      // console.log(user_details.id);
      localStorage.setItem('user', JSON.stringify(user_details));
      setToken(response.data.token); // Save token to parent state
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="login-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="form-input"
          required
        />
        <button type="submit" className="form-button">
          Login
        </button>
      </form>

      {/* Display registration link below the form */}
      <div className="register-link">
        <p>Don't have an account? <Link to="/register">Register here</Link></p> {/* Link to the Register page */}
      </div>

      {message && <p className={message.includes('success') ? 'success-message' : 'error-message'}>{message}</p>}
    </div>
  );
};

export default Login;
