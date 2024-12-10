import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  // Check if the logged-in user is an admin
  const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve user data from localStorage
    return user && user.role === 'admin';
  };
  const userDetails= localStorage.getItem('user');
  const parsedUser=JSON.parse(userDetails)

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
        {isAdmin() && (
          <Link to="/addrestaurant" className="nav-button">
            Add Restaurant
          </Link>
        )}
        {userDetails &&(

            <Link to = '/login'>logout</Link>
        )}
        
      </nav>
    </header>
  );
};

export default Header;
