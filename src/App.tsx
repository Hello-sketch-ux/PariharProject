import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Home from "./Components/Home/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Feedback from "./Pages/Feedback";
import ContactUs from "./Pages/ContactUs";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";
import About from "./Components/Home/About";
import RestroomFinder from "./Pages/RestroomFinder";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartProvider } from "./Components/Ecommerce/context/CartContext";
import EcommerceHome from "./Components/Ecommerce/pages/Home";
import Checkout from "./Components/Ecommerce/pages/Checkout";
import Header from "./Components/Ecommerce/Header";

const NavbarWrapper = ({
  isLoggedIn,
  handleLogout,
  userData,
}: any) => {
  const location = useLocation();

  if (location.pathname === "/") return null;
  if (!isLoggedIn) return null;

  return <Navbar onLogout={handleLogout} userData={userData} />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUser));
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = (data: any) => {
    setUserData(data);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
    });
  };


  return (
    <Router>
      <NavbarWrapper
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        userData={userData}
      />

      <div className="min-h-screen bg-gray-50 overflow-x-hidden px-2 sm:px-4 md:px-0">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route
            path="/login"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/restroom-finder" element={<RestroomFinder />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard userData={userData} />
              ) : (
                <Navigate to="/login" />
              )
            }
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
            element={
              isLoggedIn ? (
                <Profile userData={userData} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Ecommerce */}
          <Route
            path="/shop"
            element={
              <CartProvider>
                <Header />
                <EcommerceHome />
              </CartProvider>
            }
          />
          <Route
            path="/checkout"
            element={
              <CartProvider>
                <Header />
                <Checkout />
              </CartProvider>
            }
          />
        </Routes>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
