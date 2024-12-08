import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Menu.css';

const Menu = () => {
  const { restaurantId } = useParams(); // Get the restaurant ID from the URL
  const [menu, setMenu] = useState([]);

  // Fetch menu for the selected restaurant
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/restaurants/${restaurantId}/menu`
        );
        setMenu(
          response.data.map((item) => ({
            ...item,
            quantity: 0, // Initialize quantity for each item
          }))
        );
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenu();
  }, [restaurantId]);

  // Handle increasing/decreasing item quantity
  const handleQuantityChange = (itemId, operation) => {
    setMenu((prevMenu) =>
      prevMenu.map((item) =>
        item._id === itemId
          ? {
              ...item,
              quantity:
                operation === 'increase'
                  ? (item.quantity || 0) + 1
                  : Math.max((item.quantity || 0) - 1, 0),
            }
          : item
      )
    );
  };

  // Handle "Add to Cart" button click
  const handleAddToCart = async (item) => {
    try {
      const user = JSON.parse(localStorage.getItem('user')); // Get user from localStorage
      const userId = user?.id; // Extract userId
  
      if (!userId) {
        alert('User not logged in. Please login to add items to cart.');
        return;
      }
  
      const cartItem = {
        itemId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1, // Default to 1 if not set
        userId, // Include userId in the request
        restaurantId, // Include restaurantId
      };
      console.log('Cart Item:', cartItem);
      const response = await axios.post('http://localhost:5000/api/cart/add', cartItem);
      alert(response.data.message); // Display success message
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Failed to add item to cart');
    }
  };
  

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>Menu</h1>
      </div>
      <ul className="menu-list">
        {menu.length === 0 ? (
          <p>No menu items available</p>
        ) : (
          menu.map((item) => (
            <li key={item._id} className="menu-item">
              <div>
                <strong>{item.name}</strong>
                <div className="menu-item-price">${item.price}</div>
              </div>
              <div className="quantity-controls">
                <button
                  onClick={() => handleQuantityChange(item._id, 'decrease')}
                  className="quantity-button"
                >
                  -
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item._id, 'increase')}
                  className="quantity-button"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleAddToCart(item)}
                className="add-to-cart-button"
                disabled={item.quantity === 0}
              >
                Add to Cart
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Menu;
