import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';
import Header from './Header';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?.id;

        if (!userId) {
          setError('User not logged in. Please login to view cart.');
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('Failed to fetch cart items. Please try again later.');
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (cartItemId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/cart/remove/${cartItemId}`);
      // Remove item from the local state after successful removal
      setCartItems(cartItems.filter(item => item._id !== cartItemId));
    } catch (error) {
      console.error('Error removing item:', error);
      setError('Failed to remove item. Please try again later.');
    }
  };

  return (
    <>
    <Header/>
    <div className="cart-container">
      <h1>Your Cart</h1>
      {error && <p className="error-message">{error}</p>}
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item-card">
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-restaurant">Restaurant: {item.restaurantId.name}</p> {/* Display restaurant name */}
                <p className="cart-item-price">Price: ${item.price}</p>
                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
              </div>
              <button className="remove-btn" onClick={() => handleRemoveItem(item._id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default Cart;
