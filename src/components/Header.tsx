import React from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { state, dispatch } = useCart();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
  };

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-4xl font-serif tracking-wider">
            <span className="bg-gradient-to-r from-[#FF9933] via-white to-[#138808] text-transparent bg-clip-text">
              Parihar India
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-orange-400 transition-colors">Shop</Link>
            <Link to="/about" className="hover:text-orange-400 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-orange-400 transition-colors">Contact Us</Link>
          </nav>
        </div>
        
        <div className="mt-4 flex gap-2">
          {/* Desktop Search Bar */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={state.searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for products"
              className="w-full px-4 py-2 rounded-md text-black"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="text-gray-400" size={20} />
            </div>
          </div>

          <Link 
            to="/checkout" 
            className="bg-green-500 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-green-600 transition-colors"
          >
            <ShoppingCart size={20} />
            Cart {itemCount > 0 && <span className="bg-white text-green-500 rounded-full px-2">{itemCount}</span>}
          </Link>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex justify-between items-center mt-4">
          <Link to="/" className="text-white hover:text-orange-400 transition-colors text-sm">Home</Link>
          <Link to="/shop" className="text-white hover:text-orange-400 transition-colors text-sm">Shop</Link>
          <Link to="/about" className="text-white hover:text-orange-400 transition-colors text-sm">About</Link>
          <Link to="/contact" className="text-white hover:text-orange-400 transition-colors text-sm">Contact Us</Link>
        </nav>
      </div>
    </header>
  );
}