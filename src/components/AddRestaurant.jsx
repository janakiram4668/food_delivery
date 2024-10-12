import React, { useState } from 'react';

const AddRestaurant = ({ addRestaurant }) => {
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [menuItems, setMenuItems] = useState([{ id: 1, name: '', price: '' }]); // Initialize with one item

  const handleMenuChange = (index, field, value) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems[index][field] = value;
    setMenuItems(updatedMenuItems);
  };

  const handleAddMenuItem = () => {
    setMenuItems((prev) => [...prev, { id: prev.length + 1, name: '', price: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRestaurant({ name, area, imageUrl }, menuItems);
    // Reset form fields
    setName('');
    setArea('');
    setImageUrl('');
    setMenuItems([{ id: 1, name: '', price: '' }]); // Reset menu
  };

  return (
    <div>
      <h2>Add New Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Restaurant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          // required
        />
        
        <h3>Menu Items</h3>
        {menuItems.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Menu Item Name"
              value={item.name}
              onChange={(e) => handleMenuChange(index, 'name', e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleMenuChange(index, 'price', e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddMenuItem}>Add Menu Item</button>
        <button type="submit">Add Restaurant</button>
      </form>
    </div>
  );
};

export default AddRestaurant;
