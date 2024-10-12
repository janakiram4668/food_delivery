// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ cartItems, removeFromCart }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-title">
          <Link to="/"> {/* Wrap the logo with Link */}
            <img
              src="https://png.pngtree.com/png-vector/20220430/ourmid/pngtree-food-delivery-logo-with-lettering-on-white-background-vector-png-image_45374574.jpg"
              alt="Food Delivery Logo"
              className="logo"
            />
          </Link>
          <h1>Hungry Hound</h1>
          
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">Cart ({cartItems.length})</Link> {/* Display number of items in cart */}
            </li>
            <li className="nav-item">
              <Link to="/add-restaurant" className="nav-link">AddRestaurant</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
