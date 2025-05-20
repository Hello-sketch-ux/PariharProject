import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Play, Pause } from 'lucide-react';

// Images
import nileshma from '../../Components/Home/assets/nileshma.jpg';
import aishwarya from '../../Components/Home/assets/aishwarya.jpg';
import priyanka from '../../Components/Home/assets/priyanka.jpg';
import rashmi from '../../Components/Home/assets/rashmi.jpg';
import meenakshi from '../../Components/Home/assets/meenakshi.jpg';
import ananya from '../../Components/Home/assets/ananya.png';
import gurmeet from '../../Components/Home/assets/gurmeet.jpg';
import nupur from '../../Components/Home/assets/nupur.jpg';
import nitu from '../../Components/Home/assets/nitu.jpg';
import sanmati from '../../Components/Home/assets/sanmati.jpg';
import riddhi from '../../Components/Home/assets/ridhi.jpg';
import shubhangi from '../../Components/Home/assets/subhangi.jpg';
import kalpana from '../../Components/Home/assets/kalpana.jpg';
import purva from '../../Components/Home/assets/purva.jpg';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  comment: string;
}

const testimonials: Testimonial[] = [
  { id: 1, name: "Dr. Nileshma Pandey", role: "Gynaecologist", image: nileshma, rating: 5, comment: "Various patients and their relatives contact UTIs..." },
  { id: 2, name: "Dr. Aishwarya", role: "Gynaecologist, RML", image: aishwarya, rating: 5, comment: "Product is great for personal use..." },
  { id: 3, name: "Ms. Priyanka", role: "Teacher", image: priyanka, rating: 5, comment: "Budget friendly and easily accessible" },
  { id: 4, name: "Ms. Rashmi", role: "Teacher", image: rashmi, rating: 5, comment: "Highly recommending..." },
  { id: 5, name: "Ms. Meenakshi", role: "Teacher", image: meenakshi, rating: 5, comment: "Compact size, easy to use." },
  { id: 6, name: "Ms. Ananya", role: "College Student", image: ananya, rating: 5, comment: "Game changer..." },
  { id: 7, name: "Ms. Gurmeet", role: "Teacher", image: gurmeet, rating: 5, comment: "Use this for better hygiene..." },
  { id: 8, name: "Ms. Nupur", role: "Teacher", image: nupur, rating: 5, comment: "Keeps safe from allergies..." },
  { id: 9, name: "Ms. Nitu", role: "Teacher", image: nitu, rating: 5, comment: "Every female must try it..." },
  { id: 10, name: "Ms. Sanmati", role: "Teacher", image: sanmati, rating: 5, comment: "Easy to carry and use..." },
  { id: 11, name: "Ms. Riddhi", role: "College Student", image: riddhi, rating: 5, comment: "Amazing solution..." },
  { id: 12, name: "Ms. Shubhangi", role: "Lawyer", image: shubhangi, rating: 5, comment: "Better than others..." },
  { id: 13, name: "Ms. Kalpana", role: "Teacher", image: kalpana, rating: 5, comment: "Perfect solution..." },
  { id: 14, name: "Ms. Purva", role: "College Student", image: purva, rating: 5, comment: "Issues resolved..." }
];

const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
    }
  }, [isAnimating]);

  const toggleAutoplay = () => setIsPlaying(prev => !prev);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const x = e.pageX - startX;
    if (Math.abs(x) > 50) {
      x > 0 ? prevSlide() : nextSlide();
      setIsDragging(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - startX;
    if (Math.abs(x) > 50) {
      x > 0 ? prevSlide() : nextSlide();
      setIsDragging(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    let autoplayTimer: number;
    if (isPlaying && !isDragging) {
      autoplayTimer = window.setInterval(nextSlide, 5000);
    }
    return () => clearInterval(autoplayTimer);
  }, [isPlaying, isDragging, nextSlide]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="relative mb-12 text-center">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <Quote size={200} className="text-amber-800 rotate-6" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-3 relative z-10">
          Our Customers Love Us
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto relative z-10">
          Discover why people trust our products to improve their everyday hygiene
        </p>
      </div>

      <div
        className="relative w-full max-w-7xl overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsDragging(false)}
      >
        <div className="relative flex justify-center items-center min-h-[420px]">
          {[-1, 0, 1].map(offset => {
            const index = (currentIndex + offset + testimonials.length) % testimonials.length;
            const testimonial = testimonials[index];
            const isActive = offset === 0;
            const position = offset * 360;
            const scale = isActive ? 1 : 0.9;
            const opacity = isActive ? 1 : 0.6;

            return (
              <div
                key={testimonial.id}
                className="absolute transition-all duration-500"
                style={{
                  transform: `translateX(${position}px) scale(${scale})`,
                  opacity,
                  zIndex: isActive ? 30 : 20
                }}
              >
                <div className="bg-blue-50 rounded-xl shadow-lg p-6 w-80 h-96 flex flex-col justify-between">
                  <div>
                    <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-center">{testimonial.name}</h3>
                    <p className="text-sm text-center text-gray-500">{testimonial.role}</p>
                    <div className="flex justify-center mt-2 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 text-center text-sm italic mt-2">“{testimonial.comment}”</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-40">
          <button onClick={prevSlide} className="bg-white rounded-full shadow p-2 hover:bg-gray-200 transition">
            <ChevronLeft />
          </button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-40">
          <button onClick={nextSlide} className="bg-white rounded-full shadow p-2 hover:bg-gray-200 transition">
            <ChevronRight />
          </button>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40">
          <button onClick={toggleAutoplay} className="bg-white rounded-full shadow p-2 hover:bg-gray-200 transition">
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
