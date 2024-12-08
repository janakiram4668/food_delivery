import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Restaurants.css';

const Restaurants = ({ role }) => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  // Fetch restaurants from the API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/restaurant');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  // Navigate to the menu page
  const handleMenuClick = (restaurantId) => {
    navigate(`/menu/${restaurantId}`);
  };

  return (
    <div>
      <div className="restaurants-header">
        <h1>Restaurants</h1>
        {role === 'admin' && (
          <button
            className="add-restaurant-button"
            onClick={() => console.log('Navigate to Add Restaurant')}
          >
            Add Restaurant
          </button>
        )}
      </div>

      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <div className="restaurant-card" key={restaurant._id}>
            <img
              src={restaurant.imageUrl || 'https://via.placeholder.com/300x200'}
              alt={restaurant.name}
            />
            <div className="card-content">
              <h3 className="restaurant-name">{restaurant.name}</h3>
              <p className="restaurant-area">{restaurant.area}</p>
              <button
                className="menu-button"
                onClick={() => handleMenuClick(restaurant._id)}
              >
                View Menu
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
