import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Feedback from './Pages/Feedback';
import ContactUs from './Pages/ContactUs';
import Profile from './Pages/Profile';
import Navbar from './Components/Navbar';
import About from './Components/Home/About';
import RestroomFinder from './Pages/RestroomFinder';
import { ToastContainer } from 'react-toastify';
import { CartProvider } from './Components/Ecommerce/context/CartContext';
import EcommerceHome from './Components/Ecommerce/pages/Home';
import Checkout from './Components/Ecommerce/pages/Checkout';
import Header from './Components/Ecommerce/Header';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUser));
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = (data: { firstName: string; lastName: string; email: string; mobile: string }) => {
    setUserData(data);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserData({ firstName: '', lastName: '', email: '', mobile: '' });
  };

  const NavbarWrapper: React.FC = () => {
    const location = useLocation();
    if (location.pathname === '/') return null;
    return isLoggedIn ? <Navbar onLogout={handleLogout} userData={userData} /> : null;
  };

  return (
    <Router>
      <NavbarWrapper />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* General App Routes */}
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard userData={userData} /> : <Navigate to="/login" />} />
          <Route path="/feedback" element={isLoggedIn ? <Feedback /> : <Navigate to="/login" />} />
          <Route path="/contact" element={isLoggedIn ? <ContactUs /> : <Navigate to="/login" />} />
          <Route path="/restroom-finder" element={<RestroomFinder/>} />
          <Route path="/profile" element={isLoggedIn ? <Profile userData={userData} /> : <Navigate to="/login" />} />

          {/* Shop Routes (wrapped in CartProvider) */}
          <Route
            path="/shop"
            element={
              <CartProvider>
                <>
                  <Header />
                  <EcommerceHome />
                </>
              </CartProvider>
            }
          />
          <Route
            path="/checkout"
            element={
              <CartProvider>
                <>
                  <Header />
                  <Checkout />
                </>
              </CartProvider>
            }
          />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
