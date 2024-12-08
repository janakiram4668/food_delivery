import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AddMenu = () => {
  const location = useLocation();
  const { restaurantId } = location.state || {}; // Safely retrieve restaurantId

  const [formData, setFormData] = useState({ name: '', price: '' });
  const [message, setMessage] = useState('');

  if (!restaurantId) {
    return <p>Error: Restaurant ID is missing. Please navigate back and try again.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/restaurants/${restaurantId}/menu`,
        formData
      );
      setMessage('Menu item added successfully!');
      setFormData({ name: '', price: '' }); // Clear the form
    } catch (error) {
      setMessage('Error adding menu item: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="form-container">
      <h2>Add Menu Item</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Menu Item</button>
      </form>
    </div>
  );
};

export default AddMenu;
