import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img
          src="https://png.pngtree.com/png-vector/20220430/ourmid/pngtree-food-delivery-logo-with-lettering-on-white-background-vector-png-image_45374574.jpg"
          alt="App Logo"
          className="logo"
        />
        <h1 className="app-name">MyApp</h1>
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-button">
          Home
        </Link>
        <Link to="/about" className="nav-button">
          About
        </Link>
        <Link to="/cart" className="nav-button">
          Cart
        </Link>
      </nav>
    </header>
  );
};

export default Header;
