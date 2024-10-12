import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import Menu from './components/Menu';
import About from './components/About';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import AddRestaurant from './components/AddRestaurant';
import OrderConfirmation from './components/OrderConfirmation';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: 'Royal restaurant', area: 'lingampally', imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/ca/ac/b3/fine-dining-restaurant.jpg?w=1200&h=-1&s=1' },
    { id: 2, name: 'Hyderabad shahi', area: 'chandhanagar', imageUrl: 'https://menu.restaurantguru.com/m0/menu-Hyderabad-Shahi-Restaurant.jpg' },
    { id: 3, name: 'sha sha veg & Non-veg', area: 'beeramguda', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_yek4Zc0BC5OvhBVsvAr4yG51bqMOS9Namg&s' },
    { id: 4, name: 'Nalla Bheema', area: 'RC puram', imageUrl: 'https://static.wanderon.in/wp-content/uploads/2024/06/hyderabad-1.jpg' },
    { id: 5, name: 'Sweet Heart Restaurant', area: 'Patencheruvu', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 6, name: 'Sitara', area: 'Madhinaguda', imageUrl: 'https://img.freepik.com/premium-photo/restaurant-with-green-leaf-ceiling_763111-305022.jpg' },
    { id: 7, name: ' Lucky Restaurant', area: 'Miyapur', imageUrl: 'https://cdn.pixabay.com/photo/2015/05/31/11/23/table-791167_640.jpg' },
    { id: 8, name: 'Akka Biryani', area: 'DLF', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdtfVeXniJ_NY4ZLvnAHlDgqI2RzNAJUK2sw&s' },
  ]);

  const [menus, setMenus] = useState({
    1: [
      { id: 1, name: 'Biryani', price: 100 },
      { id: 2, name: 'Kebab', price: 150 },
      { id: 3, name: 'Dosa', price: 150 },
      { id: 4, name: 'Noodles', price: 150 },
      { id: 5, name: 'Fried Rice', price: 150 },
      { id: 6, name: 'EGG Rice', price: 150 },
      { id: 7, name: 'Mutton biryani', price: 150 },
      { id: 8, name: 'Mixed Biryani', price: 150 },
    ],
    2: [
      { id: 1, name: 'Biryani', price: 100 },
      { id: 2, name: 'Kebab', price: 150 },
      { id: 3, name: 'Dosa', price: 150 },
      { id: 4, name: 'Noodles', price: 150 },
      { id: 5, name: 'Fried Rice', price: 150 },
      { id: 6, name: 'EGG Rice', price: 150 },
      { id: 7, name: 'Mutton biryani', price: 150 },
      { id: 8, name: 'Mixed Biryani', price: 150 },
    ],
    3: [
      { id: 1, name: 'Biryani', price: 100 },
      { id: 2, name: 'Kebab', price: 150 },
      { id: 3, name: 'Dosa', price: 150 },
      { id: 4, name: 'Noodles', price: 150 },
      { id: 5, name: 'Fried Rice', price: 150 },
      { id: 6, name: 'EGG Rice', price: 150 },
      { id: 7, name: 'Mutton biryani', price: 150 },
      { id: 8, name: 'Mixed Biryani', price: 150 },
    ],
    4: [
      { id: 1, name: 'Biryani', price: 100 },
      { id: 2, name: 'Kebab', price: 150 },
      { id: 3, name: 'Dosa', price: 150 },
      { id: 4, name: 'Noodles', price: 150 },
      { id: 5, name: 'Fried Rice', price: 150 },
      { id: 6, name: 'EGG Rice', price: 150 },
      { id: 7, name: 'Mutton biryani', price: 150 },
      { id: 8, name: 'Mixed Biryani', price: 150 },
    ],
    5: [
      { id: 1, name: 'Biryani', price: 100 },
      { id: 2, name: 'Kebab', price: 150 },
      { id: 3, name: 'Dosa', price: 150 },
      { id: 4, name: 'Noodles', price: 150 },
      { id: 5, name: 'Fried Rice', price: 150 },
      { id: 6, name: 'EGG Rice', price: 150 },
      { id: 7, name: 'Mutton biryani', price: 150 },
      { id: 8, name: 'Mixed Biryani', price: 150 },
    ],
    6: [
      { id: 1, name: 'Biryani', price: 100 },
      { id: 2, name: 'Kebab', price: 150 },
      { id: 3, name: 'Dosa', price: 150 },
      { id: 4, name: 'Noodles', price: 150 },
      { id: 5, name: 'Fried Rice', price: 150 },
      { id: 6, name: 'EGG Rice', price: 150 },
      { id: 7, name: 'Mutton biryani', price: 150 },
      { id: 8, name: 'Mixed Biryani', price: 150 },
    ],
    7: [
      { id: 1, name: 'Biryani', price: 100 },
      { id: 2, name: 'Kebab', price: 150 },
      { id: 3, name: 'Dosa', price: 150 },
      { id: 4, name: 'Noodles', price: 150 },
      { id: 5, name: 'Fried Rice', price: 150 },
      { id: 6, name: 'EGG Rice', price: 150 },
      { id: 7, name: 'Mutton biryani', price: 150 },
      { id: 8, name: 'Mixed Biryani', price: 150 },
    ],
    8: [
      { id: 1, name: 'Biryani', price: 100 },
      { id: 2, name: 'Kebab', price: 150 },
      { id: 3, name: 'Dosa', price: 150 },
      { id: 4, name: 'Noodles', price: 150 },
      { id: 5, name: 'Fried Rice', price: 150 },
      { id: 6, name: 'EGG Rice', price: 150 },
      { id: 7, name: 'Mutton biryani', price: 150 },
      { id: 8, name: 'Mixed Biryani', price: 150 },
    ],
    // Add more menus for other restaurants...
  });

  const addToCart = (restaurantName, itemName, quantity, price) => {
    const item = { restaurantName, itemName, quantity, price };
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const handleRegister = (username, password) => {
    setUsers([...users, { username, password }]);
  };

  const handleLogin = (username, password) => {
    const userExists = users.some(
      (user) => user.username === username && user.password === password
    );
    if (userExists) setIsAuthenticated(true);
    return userExists;
  };

  const addRestaurant = (newRestaurant, menuItems) => {
    const id = restaurants.length + 1; // Simple ID assignment
    setRestaurants((prevRestaurants) => [...prevRestaurants, { id, ...newRestaurant }]);
    setMenus((prevMenus) => ({
      ...prevMenus,
      [id]: menuItems, // Add the menu for the new restaurant
    }));
  };

  return (
    <Router>
      <div className="App">
        <div className="header-section">
          <Header cartItems={cart} removeFromCart={removeFromCart} />
        </div>

        <div className="main-section">
          <main>
            <Routes>
              <Route 
                path="/" 
                element={
                  users.length === 0 ? <Navigate to="/register" replace /> : 
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Home restaurants={restaurants} /> {/* Pass restaurants to Home */}
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/menu/:restaurantId" 
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Menu addToCart={addToCart} menus={menus} />
                  </ProtectedRoute>
                } 
              />  
              
              <Route 
                path="/cart" 
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Cart cartItems={cart} removeFromCart={removeFromCart} />
                  </ProtectedRoute>
                } 
              />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register onRegister={handleRegister} />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/add-restaurant" element={<AddRestaurant addRestaurant={addRestaurant} />} />
            </Routes>
          </main>
        </div>
        
        <div className="footer-section">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
