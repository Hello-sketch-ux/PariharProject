import React from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from './context/CartContext';

export default function Header() {
  const { state, dispatch } = useCart();
  const itemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
  };

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 py-4">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-2">

          {/* Search Bar */}
          <div className="relative flex-1">
            <input
              type="text"
              value={state.searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for products"
              className="w-full px-4 py-2 rounded-md text-black bg-white"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="text-gray-400" size={20} />
            </div>
          </div>

          {/* Cart Button */}
          <Link
            to="/checkout"
            className="bg-green-500 text-white px-5 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-green-600 transition-colors md:w-auto w-full"
          >
            <ShoppingCart size={20} />
            <span>Cart</span>
            {itemCount > 0 && (
              <span className="bg-white text-green-500 rounded-full px-2 text-sm">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex justify-around items-center mt-4 border-t border-gray-700 pt-3">
          <Link to="/" className="text-sm hover:text-orange-400">Home</Link>
          <Link to="/shop" className="text-sm hover:text-orange-400">Shop</Link>
          <Link to="/about" className="text-sm hover:text-orange-400">About</Link>
          <Link to="/contact" className="text-sm hover:text-orange-400">
            Contact
          </Link>
        </nav>

      </div>
    </header>
  );
}
