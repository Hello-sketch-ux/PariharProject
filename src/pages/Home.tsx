import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { MapPin, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 12, seconds: 45 });
  const { state } = useCart();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  const slides = [
    {
      title: "Discover Our Newly Launched Products",
      buttonText: "Shop Now",
      buttonLink: "/shop"
    },
    {
      title: "Special Festival Collection",
      buttonText: "Explore",
      buttonLink: "/festival"
    },
    {
      title: "Traditional Wear Sale",
      buttonText: "View Offers",
      buttonLink: "/offers"
    },
    {
      title: "New Arrivals",
      buttonText: "Check Now",
      buttonLink: "/new"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop View */}
      <div className="hidden md:block">
        <main className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>
        </main>
      </div>

      {/* Mobile View (< 650px) */}
      <div className="md:hidden">
        {/* Header */}
        <div className="bg-white px-4 py-3 border border-black">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span className="text-sm">New Delhi, India</span>
            </div>
            <User size={20} />
          </div>
        </div>

        {/* Carousel */}
        <div className="relative bg-gray-100 p-4 mb-4 border border-black">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">{slides[currentSlide].title}</h3>
            <Link
              to={slides[currentSlide].buttonLink}
              className="inline-block bg-green-500 text-white px-6 py-2 rounded-full text-sm"
            >
              {slides[currentSlide].buttonText}
            </Link>
          </div>
          <div className="flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === index ? 'bg-black' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Flash Sale */}
        <div className="px-4 mb-6 py-3 border border-black bg-white">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Flash Sale</h3>
            <div className="flex gap-2 text-sm">
              <span>Closing in:</span>
              <span className="font-mono">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Featured Products Grid */}
        <div className="px-4">
          <h3 className="text-lg font-semibold mb-4">FEATURED PRODUCTS</h3>
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden border border-black">
                <div className="aspect-square">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <h4 className="text-sm truncate">{product.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold">₹{product.price}</span>
                    <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                  </div>
                  <ProductCard {...product} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}