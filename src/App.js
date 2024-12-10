import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Restaurants from './components/Restaurants';
import Menu from './components/Menu';
import Cart from './components/Cart';
import AddRestaurant from './components/AddRestaurant';
import AddMenu from './components/AddMenu';
import EditRestaurant from './components/EditRestaurant';
import EditMenuItem from './components/EditMenuItem';
import About from './components/About'

const App = () => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState('user');
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />} />
          <Route path="/" element={token ? <Restaurants role={role} /> : <Navigate to="/login" />} />
          <Route path="/menu/:restaurantId" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/addrestaurant" element={<AddRestaurant />} />
          <Route path="/addmenu" element={<AddMenu />} />
          <Route path="/edit-restaurant/:restaurantId" element={<EditRestaurant />} />
          <Route path="/edit-menu-item/:itemId" element={<EditMenuItem />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
