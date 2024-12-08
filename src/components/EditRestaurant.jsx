import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditRestaurant = () => {
  const { restaurantId } = useParams(); // Get restaurant ID from URL
  const [formData, setFormData] = useState({ name: '', area: '', imageUrl: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Fetch restaurant details for editing
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/restaurant/${restaurantId}`);
        setFormData({
          name: response.data.name,
          area: response.data.area,
          imageUrl: response.data.imageUrl || '',
        });
      } catch (error) {
        console.error('Error fetching restaurant:', error);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/restaurant/${restaurantId}`,
        formData
      );
      setMessage('Restaurant updated successfully!');
      setTimeout(() => {
        navigate(`/`); // Redirect to the restaurant menu after successful update
      }, 2000);
    } catch (error) {
      setMessage('Error updating restaurant: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Restaurant</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="area"
          placeholder="Restaurant Area"
          value={formData.area}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <button type="submit">Update Restaurant</button>
      </form>
    </div>
  );
};

export default EditRestaurant;
