// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Menu.css';

// const Menu = () => {
//   const { restaurantId } = useParams(); // Get the restaurant ID from the URL
//   const [menu, setMenu] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(false); // Admin state
//   const navigate = useNavigate(); // To navigate to EditMenuItem page

//   useEffect(() => {
//     // Fetch menu for the selected restaurant
//     const fetchMenu = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/restaurants/${restaurantId}/menu`
//         );
//         setMenu(
//           response.data.map((item) => ({
//             ...item,
//             quantity: 0, // Initialize quantity for each item
//           }))
//         );
//       } catch (error) {
//         console.error('Error fetching menu:', error);
//       }
//     };

//     fetchMenu();

//     // Check if the user is an admin (from localStorage or API)
//     const user = JSON.parse(localStorage.getItem('user')); // Adjust based on your authentication logic
//     if (user?.role === 'admin') {
//       setIsAdmin(true);
//     }
//   }, [restaurantId]);

//   // Handle increasing/decreasing item quantity
//   const handleQuantityChange = (itemId, operation) => {
//     setMenu((prevMenu) =>
//       prevMenu.map((item) =>
//         item._id === itemId
//           ? {
//               ...item,
//               quantity:
//                 operation === 'increase'
//                   ? (item.quantity || 0) + 1
//                   : Math.max((item.quantity || 0) - 1, 0),
//             }
//           : item
//       )
//     );
//   };

//   // Handle "Add to Cart" button click
//   const handleAddToCart = async (item) => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user')); // Get user from localStorage
//       const userId = user?.id; // Extract userId

//       if (!userId) {
//         alert('User not logged in. Please login to add items to cart.');
//         return;
//       }

//       const cartItem = {
//         itemId: item._id,
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity || 1, // Default to 1 if not set
//         userId, // Include userId in the request
//         restaurantId, // Include restaurantId
//       };
//       console.log('Cart Item:', cartItem);
//       const response = await axios.post('http://localhost:5000/api/cart/add', cartItem);
//       alert(response.data.message); // Display success message
//     } catch (error) {
//       console.error('Error adding item to cart:', error);
//       alert('Failed to add item to cart');
//     }
//   };

//   // Redirect to EditMenuItem page
//   const handleEditMenuRedirect = (itemId) => {
//     navigate(`/edit-menu-item/${itemId}`, { state: { restaurantId } });
//   };

//   return (
//     <div className="menu-container">
//       <div className="menu-header">
//         <h1>Menu</h1>
//         {isAdmin && (
//           <button onClick={() => navigate('/addmenu', { state: { restaurantId } })} className="add-menu-button">
//             Add Menu
//           </button>
//         )}
//       </div>
//       <ul className="menu-list">
//         {menu.length === 0 ? (
//           <p>No menu items available</p>
//         ) : (
//           menu.map((item) => (
//             <li key={item._id} className="menu-item">
//               <div>
//                 <strong>{item.name}</strong>
//                 <div className="menu-item-price">${item.price}</div>
//               </div>
//               <div className="quantity-controls">
//                 <button onClick={() => handleQuantityChange(item._id, 'decrease')} className="quantity-button">
//                   -
//                 </button>
//                 <span className="quantity-display">{item.quantity}</span>
//                 <button onClick={() => handleQuantityChange(item._id, 'increase')} className="quantity-button">
//                   +
//                 </button>
//               </div>
//               <button onClick={() => handleAddToCart(item)} className="add-to-cart-button" disabled={item.quantity === 0}>
//                 Add to Cart
//               </button>

//               {isAdmin && (
//                 <button onClick={() => handleEditMenuRedirect(item._id)} className="edit-button">
//                   Edit
//                 </button>
//               )}
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Menu;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Menu.css';
import Header from './Header';

const Menu = () => {
  const { restaurantId } = useParams(); // Get the restaurant ID from the URL
  const [menu, setMenu] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Admin state
  const navigate = useNavigate(); // To navigate to EditMenuItem page

  useEffect(() => {
    // Fetch menu for the selected restaurant
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/restaurants/${restaurantId}/menu`
        );
        setMenu(
          response.data.map((item) => ({
            ...item,
            quantity: 0, // Initialize quantity for each item
          }))
        );
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenu();

    // Check if the user is an admin (from localStorage or API)
    const user = JSON.parse(localStorage.getItem('user')); // Adjust based on your authentication logic
    if (user?.role === 'admin') {
      setIsAdmin(true);
    }
  }, [restaurantId]);

  // Handle increasing/decreasing item quantity
  const handleQuantityChange = (itemId, operation) => {
    setMenu((prevMenu) =>
      prevMenu.map((item) =>
        item._id === itemId
          ? {
              ...item,
              quantity:
                operation === 'increase'
                  ? (item.quantity || 0) + 1
                  : Math.max((item.quantity || 0) - 1, 0),
            }
          : item
      )
    );
  };

  // Handle "Add to Cart" button click
  const handleAddToCart = async (item) => {
    try {
      const user = JSON.parse(localStorage.getItem('user')); // Get user from localStorage
      const userId = user?.id; // Extract userId

      if (!userId) {
        alert('User not logged in. Please login to add items to cart.');
        return;
      }

      const cartItem = {
        itemId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1, // Default to 1 if not set
        userId, // Include userId in the request
        restaurantId, // Include restaurantId
      };
      console.log('Cart Item:', cartItem);
      const response = await axios.post('http://localhost:5000/api/cart/add', cartItem);
      alert(response.data.message); // Display success message
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Failed to add item to cart');
    }
  };

  // Redirect to EditMenuItem page
  const handleEditMenuRedirect = (itemId) => {
    navigate(`/edit-menu-item/${itemId}`, { state: { restaurantId } });
  };

  // Handle item deletion
  const handleDeleteMenuItem = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/restaurants/menu/${itemId}`);
      alert(response.data.message); // Display success message
      setMenu(menu.filter((item) => item._id !== itemId)); // Remove deleted item from the state
    } catch (error) {
      console.error('Error deleting menu item:', error);
      alert('Failed to delete menu item');
    }
  };

  return (
    <>
    <Header/>
    <div className="menu-container">
      <div className="menu-header">
        <h1>Menu</h1>
        {isAdmin && (
          <button onClick={() => navigate('/addmenu', { state: { restaurantId } })} className="add-menu-button">
            Add Menu
          </button>
        )}
      </div>
      <ul className="menu-list">
        {menu.length === 0 ? (
          <p>No menu items available</p>
        ) : (
          menu.map((item) => (
            <li key={item._id} className="menu-item">
              <div>
                <strong>{item.name}</strong>
                <div className="menu-item-price">${item.price}</div>
              </div>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(item._id, 'decrease')} className="quantity-button">
                  -
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item._id, 'increase')} className="quantity-button">
                  +
                </button>
              </div>
              <button onClick={() => handleAddToCart(item)} className="add-to-cart-button" disabled={item.quantity === 0}>
                Add to Cart
              </button>

              {isAdmin && (
                <>
                  <button onClick={() => handleEditMenuRedirect(item._id)} className="edit-button">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteMenuItem(item._id)} className="delete-button">
                    Delete
                  </button>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
    </>
  );
};

export default Menu;
