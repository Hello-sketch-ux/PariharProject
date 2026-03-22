// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, Home, MessageSquare, Phone, LogOut, User } from 'lucide-react';
// import Logo from "./Home/Parihar_logo.png";

// interface UserData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   mobile: string;
// }

// interface NavbarProps {
//   onLogout: () => void;
//   userData: UserData;
// }

// const Navbar: React.FC<NavbarProps> = ({ onLogout, userData }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [profileDropdown, setProfileDropdown] = useState(false);
//   const location = useLocation();
  
//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };
  
//   const isActive = (path: string) => {
//     return location.pathname === path;
//   };

//   return (
//     <nav className="bg-black shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex">
//             <div className="flex-shrink-0 flex items-center">
//               <Link to="/">
//             <img src={Logo} alt="Parihar India" className="h-7 w-auto" />
//               </Link>
//             </div>
//             <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//             <Link
//                 to="/"
//                 className={`${
//                   isActive('/')
//                     ? 'border-green-500 text-green-500'
//                     : 'border-transparent text-white hover:border-green-500 hover:text-green-500'
//                 } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
//               >
//                 <Home className="mr-1 h-4 w-4 text white" />
//                 Home
//               </Link>
//               <Link
//                 to="/dashboard"
//                 className={`${
//                   isActive('/dashboard')
//                     ? 'border-green-500 text-green-500'
//                     : 'border-transparent text-white hover:border-green-500 hover:text-green-500'
//                 } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
//               >
//                 <Home className="mr-1 h-4 w-4" />
//                 Dashboard
//               </Link>
//               <Link
//                 to="/feedback"
//                 className={`${
//                   isActive('/feedback')
//                     ? 'border-green-500 text-green-500'
//                     : 'border-transparent text-white hover:border-green-500 hover:text-green-500'
//                 } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
//               >
//                 <MessageSquare className="mr-1 h-4 w-4" />
//                 Feedback
//               </Link>
//               <Link
//                 to="/contact"
//                 className={`${
//                   isActive('/contact')
//                     ? 'border-green-500 text-green-500'
//                     : 'border-transparent text-white hover:border-green-500 hover:text-green-500'
//                 } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
//               >
//                 <Phone className="mr-1 h-4 w-4" />
//                 Contact Us
//               </Link>
//             </div>
//           </div>
//           <div className="hidden sm:ml-6 sm:flex sm:items-center">
//             <div className="relative">
//               <button
//                 onClick={() => setProfileDropdown(!profileDropdown)}
//                 className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-4"
//               >
//                 <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold mr-2">
//                   {userData.firstName ? userData.firstName.charAt(0).toUpperCase() : 'U'}
//                 </div>
//                 <span className='text-green-500'>{userData.firstName || 'User'}</span>
//               </button>
              
//               {profileDropdown && (
//                 <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
//                   <Link
//                     to="/profile"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     onClick={() => setProfileDropdown(false)}
//                   >
//                     <div className="flex items-center">
//                       <User className="mr-2 h-4 w-4" />
//                       Your Profile
//                     </div>
//                   </Link>
//                   <button
//                     onClick={() => {
//                       setProfileDropdown(false);
//                       onLogout();
//                     }}
//                     className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                   >
//                     <div className="flex items-center">
//                       <LogOut className="mr-2 h-4 w-4" />
//                       Logout
//                     </div>
//                   </button>
//                 </div>
//               )}
//             </div>
            
//             <button
//               onClick={onLogout}
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//             >
//               <LogOut className="mr-1 h-4 w-4" />
//               Logout
//             </button>
//           </div>
//           <div className="-mr-2 flex items-center sm:hidden">
//             <button
//               onClick={toggleMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
//             >
//               <span className="sr-only">Open main menu</span>
//               {isOpen ? (
//                 <X className="block h-6 w-6" aria-hidden="true" />
//               ) : (
//                 <Menu className="block h-6 w-6" aria-hidden="true" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {isOpen && (
//         <div className="sm:hidden">
//           <div className="pt-2 pb-3 space-y-1">
          
//             <Link
//               to="/"
//               className={`${
//                 isActive('/')
//                   ? 'bg-green-50 border-green-500 text-green-700'
//                   : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
//               } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
//               onClick={() => setIsOpen(false)}
//             >
//               <div className="flex items-center">
//                 <Home className="mr-2 h-5 w-5" />
//                 Home
//               </div>
//               </Link>
//             <Link
//               to="/dashboard"
//               className={`${
//                 isActive('/dashboard')
//                   ? 'bg-green-50 border-green-500 text-green-700'
//                   : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
//               } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
//               onClick={() => setIsOpen(false)}
//             >
//               <div className="flex items-center">
//                 <Home className="mr-2 h-5 w-5" />
//                 Dashboard
//               </div>
//             </Link>
//             <Link
//               to="/feedback"
//               className={`${
//                 isActive('/feedback')
//                   ? 'bg-green-50 border-green-500 text-green-700'
//                   : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
//               } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
//               onClick={() => setIsOpen(false)}
//             >
//               <div className="flex items-center">
//                 <MessageSquare className="mr-2 h-5 w-5" />
//                 Feedback
//               </div>
//             </Link>
//             <Link
//               to="/contact"
//               className={`${
//                 isActive('/contact')
//                   ? 'bg-green-50 border-green-500 text-green-700'
//                   : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
//               } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
//               onClick={() => setIsOpen(false)}
//             >
//               <div className="flex items-center">
//                 <Phone className="mr-2 h-5 w-5" />
//                 Contact Us
//               </div>
//             </Link>
//             <Link
//               to="/profile"
//               className={`${
//                 isActive('/profile')
//                   ? 'bg-green-50 border-green-500 text-green-700'
//                   : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
//               } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
//               onClick={() => setIsOpen(false)}
//             >
//               <div className="flex items-center">
//                 <User className="mr-2 h-5 w-5" />
//                 Profile
//               </div>
//             </Link>
//             <button
//               onClick={() => {
//                 setIsOpen(false);
//                 onLogout();
//               }}
//               className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-600 hover:bg-gray-50 hover:border-gray-300"
//             >
//               <div className="flex items-center">
//                 <LogOut className="mr-2 h-5 w-5" />
//                 Logout
//               </div>
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  MessageSquare,
  Phone,
  LogOut,
  User,
} from "lucide-react";
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

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Parihar India" className="h-7 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" label="Home" icon={<Home size={16} />} active={isActive("/")} />
            <NavLink
              to="/dashboard"
              label="Dashboard"
              icon={<Home size={16} />}
              active={isActive("/dashboard")}
            />
            <NavLink
              to="/feedback"
              label="Feedback"
              icon={<MessageSquare size={16} />}
              active={isActive("/feedback")}
            />
            <NavLink
              to="/contact"
              label="Contact"
              icon={<Phone size={16} />}
              active={isActive("/contact")}
            />

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center gap-2 text-green-500"
              >
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center font-bold">
                  {userData.firstName?.charAt(0).toUpperCase() || "U"}
                </div>
                <span>{userData.firstName || "User"}</span>
              </button>

              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-44 rounded-md bg-white shadow-lg">
                  <Link
                    to="/profile"
                    onClick={() => setProfileDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <User size={16} /> Profile
                  </Link>
                  <button
                    onClick={onLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black px-4 pb-4 space-y-2">
          <MobileLink to="/" label="Home" icon={<Home />} onClick={() => setIsOpen(false)} />
          <MobileLink
            to="/dashboard"
            label="Dashboard"
            icon={<Home />}
            onClick={() => setIsOpen(false)}
          />
          <MobileLink
            to="/feedback"
            label="Feedback"
            icon={<MessageSquare />}
            onClick={() => setIsOpen(false)}
          />
          <MobileLink
            to="/contact"
            label="Contact"
            icon={<Phone />}
            onClick={() => setIsOpen(false)}
          />
          <MobileLink
            to="/profile"
            label="Profile"
            icon={<User />}
            onClick={() => setIsOpen(false)}
          />

          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-red-500 px-3 py-2"
          >
            <LogOut /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

/* ---------- Helpers ---------- */

const NavLink = ({
  to,
  label,
  icon,
  active,
}: any) => (
  <Link
    to={to}
    className={`flex items-center gap-1 border-b-2 pb-1 text-sm ${
      active
        ? "border-green-500 text-green-500"
        : "border-transparent text-white hover:text-green-500 hover:border-green-500"
    }`}
  >
    {icon}
    {label}
  </Link>
);

const MobileLink = ({ to, label, icon, onClick }: any) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-2 text-white px-3 py-2 rounded hover:bg-gray-800"
  >
    {icon}
    {label}
  </Link>
);
