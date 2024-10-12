import React, { useState, useEffect } from 'react';

const AddRestaurant = ({ addRestaurant, editingRestaurant, setEditingRestaurant, restaurants }) => {
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [menu, setMenu] = useState([{ id: 1, name: '', price: '' }]);

  useEffect(() => {
    if (editingRestaurant) {
      setName(editingRestaurant.name);
      setArea(editingRestaurant.area);
      setImageUrl(editingRestaurant.imageUrl);
      setMenu(editingRestaurant.menu || [{ id: 1, name: '', price: '' }]);
    } else {
      // Reset the form when not editing
      setName('');
      setArea('');
      setImageUrl('');
      setMenu([{ id: 1, name: '', price: '' }]);
    }
  }, [editingRestaurant]);

  const handleAddMenuItem = () => {
    setMenu([...menu, { id: Date.now(), name: '', price: '' }]);
  };

  const handleChangeMenuItem = (index, field, value) => {
    const updatedMenu = [...menu];
    updatedMenu[index][field] = value;
    setMenu(updatedMenu);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const restaurant = {
      id: editingRestaurant ? editingRestaurant.id : Date.now(),
      name,
      area,
      imageUrl,
      menu,
    };
    addRestaurant(restaurant, editingRestaurant ? editingRestaurant.id : null);
    // Clear the form after submission
    setName('');
    setArea('');
    setImageUrl('');
    setMenu([{ id: 1, name: '', price: '' }]);
  };

  return (
    <div>
      <h1>{editingRestaurant ? 'Edit Restaurant' : 'Add Restaurant'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Restaurant Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Area:</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            // required
          />
        </div>
        <h3>Menu</h3>
        {menu.map((menuItem, index) => (
          <div key={menuItem.id}>
            <label>Menu Item Name:</label>
            <input
              type="text"
              value={menuItem.name}
              onChange={(e) => handleChangeMenuItem(index, 'name', e.target.value)}
              required
            />
            <label>Price:</label>
            <input
              type="number"
              value={menuItem.price}
              onChange={(e) => handleChangeMenuItem(index, 'price', e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddMenuItem}>
          Add Menu Item
        </button>
        <button type="submit">
          {editingRestaurant ? 'Update' : 'Add Restaurant'}
        </button>
      </form>

      <h2>Added Restaurants</h2>
      {Array.isArray(restaurants) && restaurants.length > 0 ? ( // Ensure restaurants is an array
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>
              {restaurant.name} - {restaurant.area}
              <button onClick={() => setEditingRestaurant(restaurant)}>Edit</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No restaurants added yet.</p>
      )}
    </div>
  );
};

export default AddRestaurant;
