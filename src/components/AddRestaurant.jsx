import React, { useState } from 'react';
import axios from 'axios';

const AddRestaurant = ({ token }) => {
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleAddRestaurant = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/restaurant/add',
        { name, area, imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Restaurant added successfully!');
      setName('');
      setArea('');
      setImageUrl('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error adding restaurant!');
    }
  };

  return (
    <div>
      <h2>Add Restaurant</h2>
      <form onSubmit={handleAddRestaurant}>
        <input
          type="text"
          placeholder="Restaurant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit">Add Restaurant</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddRestaurant;
