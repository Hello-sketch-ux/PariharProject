import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { User } from "lucide-react";  // Import Lucide User Icon
import Image from "./logo.png";
import Logo from "./Parihar_logo.png";

interface HomeProps {
  isLoggedIn: boolean;
}

const Home: React.FC<HomeProps> = ({ isLoggedIn }) => {
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center text-center">
      <nav className={`fixed top-0 left-0 w-full flex items-center px-6 lg:px-16 py-4 h-16 transition-all duration-300 z-50 ${
          scrolling ? "bg-black/70 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <img src={Logo} alt="Parihar India" className="h-7 w-auto" />
        <div className="ml-auto flex space-x-8">
          <Link to="/" className="text-white text-sm font-semibold hover:text-gray-300 transition">
            HOME
          </Link>
          <Link to="/shop" className="text-white text-sm font-semibold hover:text-gray-300 transition">
            SHOP
          </Link>
          <Link to="/about" className="text-white text-sm font-semibold hover:text-gray-300 transition">
            ABOUT
          </Link>
          <Link to="/contact" className="text-white text-sm font-semibold hover:text-gray-300 transition">
            CONTACT US
          </Link>
          <Link to="/restroom-finder" className="text-white text-sm font-semibold hover:text-gray-300 transition">
            RESTROOM FINDER
          </Link>
          <div className="text-white">|</div>
        </div>
        
        {/* Login Button / Profile Icon */}
        {isLoggedIn ? (
          <button
            onClick={() => navigate('/profile')}
            className="ml-6 text-white hover:bg-white hover:text-black p-2 rounded-full transition"
          >
            <User size={24} />  {/* Lucide User Icon */}
          </button>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="ml-6 border-2 text-white hover:bg-white hover:text-black px-4 py-2 rounded-lg font-semibold transition"
          >
            LOGIN
          </button>
        )}
      </nav>

      <img src={Image} alt="Parihar India Logo" className="w-full h-screen object-cover" />
      <button className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition">
        💬
      </button>
    </div>
  );
};

export default Home;
