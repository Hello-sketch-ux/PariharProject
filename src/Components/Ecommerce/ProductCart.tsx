import { useState, useEffect } from 'react';
import { useCart } from './context/CartContext';
import { Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  imageUrls: string[];
  description: string;
  category: string;
}

export default function ProductCard({ 
  id, 
  title, 
  price, 
  originalPrice, 
  imageUrls,
  description,
  category 
}: ProductCardProps) {
  const { state, dispatch } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const itemInCart = state.items.find(item => item.id === id);
  const quantity = itemInCart?.quantity || 0;

  // Auto slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [imageUrls.length]);

  const handleIncrement = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id,
        title,
        price,
        imageUrl: imageUrls[0],
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm transition-transform hover:scale-105">
      <div className="relative">
        <img
          src={imageUrls[currentImageIndex]}
          alt={title}
          className="w-full h-56 sm:h-48 object-cover"
        />
        {imageUrls.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {imageUrls.map((_, index) => (
                <div 
                  key={index}
                  className={`w-3 h-3 sm:w-2 sm:h-2 rounded-full ${
                    currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
            {category}
          </span>
        </div>
        <h3 className="text-lg sm:text-base font-semibold mb-2 truncate">{title}</h3>
        <p className="text-gray-600 mb-2 line-clamp-2 text-sm sm:text-xs">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-base font-bold">₹{price}</span>
            <span className="text-gray-400 line-through text-sm">₹{originalPrice}</span>
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
                <span className="w-8 text-center font-semibold text-sm sm:text-xs">{quantity}</span>
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
                className="bg-black text-white px-3 py-2 sm:px-2 sm:py-1 rounded-md flex items-center gap-1 sm:gap-1 hover:bg-gray-800 transition-colors text-sm sm:text-xs"
              >
                <Plus size={16} />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


