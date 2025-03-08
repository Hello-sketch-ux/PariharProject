import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Feedback from './Pages/Feedback';
import ContactUs from './Pages/ContactUs';
import Profile from './Pages/Profile';
import Navbar from './Components/Navbar';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: ''
  });

  const handleLogin = (data: { firstName: string; lastName: string; email: string; mobile: string }) => {
    setUserData(data);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavbarWrapper isLoggedIn={isLoggedIn} onLogout={handleLogout} userData={userData} />
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route 
            path="/login" 
            element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/dashboard" 
            element={isLoggedIn ? <Dashboard userData={userData} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/feedback" 
            element={isLoggedIn ? <Feedback /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/contact" 
            element={isLoggedIn ? <ContactUs /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={isLoggedIn ? <Profile userData={userData} /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

// Helper component to control which navbar to show
const NavbarWrapper: React.FC<{ isLoggedIn: boolean; onLogout: () => void; userData: any }> = ({ isLoggedIn, onLogout, userData }) => {
  const location = useLocation();
  
  if (location.pathname === "/") {
    return null; // Don't render the white navbar on Home page
  }
  
  return isLoggedIn ? <Navbar onLogout={onLogout} userData={userData} /> : null;
};

export default App;
