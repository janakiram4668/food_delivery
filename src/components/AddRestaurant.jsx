import React, { useState } from 'react';
import axios from 'axios';
// import './AddRestaurant.css';

const AddRestaurant = () => {
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    imageUrl: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/restaurant/add', formData);
      setMessage('Restaurant added successfully!');
      setFormData({ name: '', area: '', imageUrl: '' }); // Clear form
    } catch (error) {
      setMessage('Error adding restaurant: ' + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Restaurant</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          required
        />
        <input
          type="text"
          name="area"
          placeholder="Area"
          value={formData.area}
          onChange={handleChange}
          className="form-input"
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          className="form-input"
        />
        <button type="submit" className="form-button">Add Restaurant</button>
      </form>
    </div>
  );
};

export default AddRestaurant;
