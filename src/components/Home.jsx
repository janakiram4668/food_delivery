import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ restaurants }) => { // Accept restaurants as a prop
  return (
    <div className="home-container">
      <h1>Restaurants near me</h1>
      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
            <img
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className="restaurant-image"
            />
            <h3>{restaurant.name}</h3>
            <p>{restaurant.area}</p>
            <Link to={`/menu/${restaurant.id}`}>
              <button className="view-menu-btn">View Menu</button>
            </Link>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
