import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditMenuItem = () => {
  const { itemId } = useParams(); // Get itemId from URL params
  const { state } = useLocation(); // Get restaurantId from state
  const { restaurantId } = state || {}; // Extract restaurantId from state
  const [menuItem, setMenuItem] = useState({
    name: '',
    price: '',
  });
  const navigate = useNavigate();

  // Fetch menu item details to populate the form
  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/restaurants/${restaurantId}/menu/${itemId}`
        );
        setMenuItem(response.data);
      } catch (error) {
        console.error('Error fetching menu item:', error);
      }
    };

    if (restaurantId && itemId) {
      fetchMenuItem();
    }
  }, [restaurantId, itemId]);

  // Handle input changes
  const handleChange = (e) => {
    setMenuItem({
      ...menuItem,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit to update the menu item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/restaurants/menu/${itemId}`,
        menuItem
      );
      alert('Menu item updated successfully');
      navigate(`/menu/${restaurantId}`);
    } catch (error) {
      console.error('Error updating menu item:', error);
      alert('Failed to update menu item');
    }
  };

  return (
    <div className="edit-menu-item-container">
      <h2>Edit Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={menuItem.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={menuItem.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditMenuItem;
