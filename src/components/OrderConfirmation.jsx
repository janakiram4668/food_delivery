// OrderConfirmation.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <div className="order-confirmation">
      <h1>Your order has been placed!</h1>
      <Link to="/">Go to Home</Link> {/* Ensure this points to the correct route */}
    </div>
  );
};

export default OrderConfirmation;
