// src/components/Cart.jsx
import React, { useState } from 'react';
import './Cart.css'; // Make sure to create this CSS file for styling
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, removeFromCart }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleCheckout = () => {
    setIsCheckout(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  const handlePayment = (event) => {
    event.preventDefault();

    // Basic logic for payment processing
    const { cardNumber, expiryDate, cvv } = cardDetails;
    if (cardNumber && expiryDate && cvv) {
      // Simulate payment processing
      setTimeout(() => {
        navigate('/order-confirmation'); // Redirect to order confirmation page
      }, 1000); // Simulate delay for payment processing
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item-card">
              <h3>{item.restaurantName}</h3>
              <p>{item.itemName}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </div>
          ))}
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}

      {isCheckout && (
        <form onSubmit={handlePayment} className="checkout-form">
          <h2>Checkout</h2>
          <label>
            Card Number:
            <input
              type="text"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Expiry Date (MM/YY):
            <input
              type="text"
              name="expiryDate"
              value={cardDetails.expiryDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            CVV:
            <input
              type="text"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Pay</button>
        </form>
      )}
    </div>
  );
};

export default Cart;
