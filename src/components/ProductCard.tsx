import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus, Minus } from 'lucide-react';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  description: string;
  category: string;
}

export default function ProductCard({ 
  id, 
  title, 
  price, 
  originalPrice, 
  imageUrl,
  description,
  category 
}: ProductCardProps) {
  const { state, dispatch } = useCart();
  
  const itemInCart = state.items.find(item => item.id === id);
  const quantity = itemInCart?.quantity || 0;

  const handleIncrement = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id,
        title,
        price,
        imageUrl,
        quantity: 1
      }
    });
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: {
          id,
          quantity: quantity - 1
        }
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
            {category}
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-2 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">₹{price}</span>
            <span className="text-gray-400 line-through">₹{originalPrice}</span>
          </div>
          <div className="flex items-center gap-2">
            {quantity > 0 ? (
              <>
                <button 
                  onClick={handleDecrement}
                  className="bg-black text-white p-1 rounded-md hover:bg-gray-800 transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <button 
                  onClick={handleIncrement}
                  className="bg-black text-white p-1 rounded-md hover:bg-gray-800 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </>
            ) : (
              <button 
                onClick={handleIncrement}
                className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <Plus size={20} />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}