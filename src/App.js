import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Restaurants from './components/Restaurants';
import Menu from './components/Menu';
import Cart from './components/Cart';

const App = () => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState('user');
  return (
    <Router>
      <div>
        {token && <Header />} {/* Show Header only when logged in */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />} />
          <Route path="/" element={token ? <Restaurants role={role} /> : <Navigate to="/login" />} />
          <Route path="/menu/:restaurantId" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
