import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, MessageSquare, Phone, LogOut, User } from 'lucide-react';
import Logo from "./Home/Parihar_logo.png";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
}

interface NavbarProps {
  onLogout: () => void;
  userData: UserData;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout, userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
            <img src={Logo} alt="Parihar India" className="h-7 w-auto" />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
                to="/"
                className={`${
                  isActive('/')
                    ? 'border-green-500 text-green-500'
                    : 'border-transparent text-white hover:border-green-500 hover:text-green-500'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                <Home className="mr-1 h-4 w-4 text white" />
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`${
                  isActive('/dashboard')
                    ? 'border-green-500 text-green-500'
                    : 'border-transparent text-white hover:border-green-500 hover:text-green-500'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                <Home className="mr-1 h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/feedback"
                className={`${
                  isActive('/feedback')
                    ? 'border-green-500 text-green-500'
                    : 'border-transparent text-white hover:border-green-500 hover:text-green-500'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                <MessageSquare className="mr-1 h-4 w-4" />
                Feedback
              </Link>
              <Link
                to="/contact"
                className={`${
                  isActive('/contact')
                    ? 'border-green-500 text-green-500'
                    : 'border-transparent text-white hover:border-green-500 hover:text-green-500'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                <Phone className="mr-1 h-4 w-4" />
                Contact Us
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-4"
              >
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold mr-2">
                  {userData.firstName ? userData.firstName.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className='text-green-500'>{userData.firstName || 'User'}</span>
              </button>
              
              {profileDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileDropdown(false)}
                  >
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Your Profile
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      setProfileDropdown(false);
                      onLogout();
                    }}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </div>
                  </button>
                </div>
              )}
            </div>
            
            <button
              onClick={onLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="mr-1 h-4 w-4" />
              Logout
            </button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              className={`${
                isActive('/dashboard')
                  ? 'bg-green-50 border-green-500 text-green-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <Home className="mr-2 h-5 w-5" />
                Dashboard
              </div>
            </Link>
            <Link
              to="/feedback"
              className={`${
                isActive('/feedback')
                  ? 'bg-green-50 border-green-500 text-green-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Feedback
              </div>
            </Link>
            <Link
              to="/contact"
              className={`${
                isActive('/contact')
                  ? 'bg-green-50 border-green-500 text-green-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Contact Us
              </div>
            </Link>
            <Link
              to="/profile"
              className={`${
                isActive('/profile')
                  ? 'bg-green-50 border-green-500 text-green-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Profile
              </div>
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-600 hover:bg-gray-50 hover:border-gray-300"
            >
              <div className="flex items-center">
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </div>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;