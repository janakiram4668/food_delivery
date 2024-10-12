import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Menu.css'; // Optional for styling

const Menu = ({ addToCart, menus }) => {
  const { restaurantId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({}); // Manage quantities for items

  useEffect(() => {
    setMenuItems(menus[restaurantId] || []);
  }, [restaurantId, menus]);

  const handleQuantityChange = (itemId, change) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change), // Ensure quantity does not go below 0
    }));
  };

  const handleAddToCart = (itemName, quantity) => {
    const item = menuItems.find(item => item.name === itemName);
    if (quantity > 0 && item) {
      addToCart(`Restaurant ${restaurantId}`, item.name, quantity, item.price);
      setQuantities((prev) => ({ ...prev, [itemName]: 0 })); // Reset quantity after adding to cart
    }
  };

  return (
    <div className="menu-container">
      <h1>Menu for Restaurant {restaurantId}</h1>
      <div className="menu-card">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            <h3>{item.name} - ${item.price}</h3>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
              <span>{quantities[item.id] || 0}</span>
              <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
              <button onClick={() => handleAddToCart(item.name, quantities[item.id] || 0)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
