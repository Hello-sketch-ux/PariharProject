import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Play, Pause } from 'lucide-react';

// Importing images
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
  { id: 1, name: "Dr. Nileshma Pandey", role: "Gynaecologist", image: nileshma, rating: 5, comment: "Various patients and their relatives contact UTIs just by using the public restrooms at hospitals and path labs, through this product clean restrooms can be spotted and such diseases can be prevented" },
  { id: 2, name: "Dr. Aishwarya", role: "Gynaecologist, RML", image: aishwarya, rating: 5, comment: "Product is great for our personal use as using washrooms in hospitals can lead to various infections and UTIs and this can prevent those." },
  { id: 3, name: "Ms. Priyanka", role: "Teacher", image: priyanka, rating: 5, comment: "Budget friendly and easily accessible" },
  { id: 4, name: "Ms. Rashmi", role: "Teacher", image: rashmi, rating: 5, comment: "Highly recommending, find clean restroom will be absolute help during travelling" },
  { id: 5, name: "Ms. Meenakshi", role: "Teacher", image: meenakshi, rating: 5, comment: "Compact size, easy to use." },
  { id: 6, name: "Ms. Ananya", role: "College Student", image: ananya, rating: 5, comment: "Game changer, helped preventing UTIs and other issues" },
  { id: 7, name: "Ms. Gurmeet", role: "Teacher", image: gurmeet, rating: 5, comment: "Use this for better hygiene, loved the product" },
  { id: 8, name: "Ms. Nupur", role: "Teacher", image: nupur, rating: 5, comment: "Keeps safe from allergies and gives the satisfaction of using a clean washroom." },
  { id: 9, name: "Ms. Nitu", role: "Teacher", image: nitu, rating: 5, comment: "Every female must try it once and they will use it again and again." },
  { id: 10, name: "Ms. Sanmati", role: "Teacher", image: sanmati, rating: 5, comment: "Easy to carry and use, highly recommended being a working woman." },
  { id: 11, name: "Ms. Riddhi", role: "College Student", image: riddhi, rating: 5, comment: "Amazing solution for all the hygiene issues." },
  { id: 12, name: "Ms. Shubhangi", role: "Lawyer", image: shubhangi, rating: 5, comment: "Better than other products available in the market." },
  { id: 13, name: "Ms. Kalpana", role: "Teacher", image: kalpana, rating: 5, comment: "Perfect solution to prevent UTIs and related problems." },
  { id: 14, name: "Ms. Purva", role: "College Student", image: purva, rating: 5, comment: "All the issues related to a public washroom are resolved, really liked the product." }
];

const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  // const [scrollLeft, setScrollLeft] = useState(0);

  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
    }
  }, [isAnimating]);

  const toggleAutoplay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX );
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - startX;
    const walk = (x ) * 2; // Adjust sliding speed
    if (Math.abs(walk) > 50) { // Threshold for slide change
      if (walk > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX );
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - startX;
    const walk = (x ) * 2;
    if (Math.abs(walk) > 50) {
      if (walk > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
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
    <div className="min-h-screen min-w-screen bg-gradient-to-b from-amber-50 to-white flex flex-col items-center justify-center px-4 py-16">
      <div className="relative mb-12 text-center">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <Quote size={200} className="text-amber-800 transform rotate-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 relative">
          Our Customers Love Us
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto relative">
          Discover why people trust our products to improve their everyday hygiene
        </p>
      </div>

      <div 
        className="relative w-full max-w-7xl overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <div className="flex justify-center items-stretch min-h-[500px] sm:min-h-[420px] md:min-h-[380px]">
          {[-1, 0, 1].map((offset) => {
            const index = (currentIndex + offset + testimonials.length) % testimonials.length;
            const testimonial = testimonials[index];
            const isActive = offset === 0;
            
            const xOffset = {
              base: offset * 320,
              sm: offset * 340,
              md: offset * 380,
              lg: offset * 400
            };
            
            const position = window.innerWidth >= 1024 ? xOffset.lg :
                           window.innerWidth >= 768 ? xOffset.md :
                           window.innerWidth >= 640 ? xOffset.sm :
                           xOffset.base;

            const scale = isActive ? 1 : 0.85;
            const opacity = isActive ? 1 : 0.7;
            const zIndex = isActive ? 30 : 20 - Math.abs(offset);

            return (
              <div
                key={testimonial.id}
                className={`
                  absolute w-[280px] sm:w-[320px] md:w-[340px] lg:w-[360px]
                  transition-all duration-500 ease-out
                  ${isActive ? 'z-30' : 'z-20'}
                `}
                style={{
                  transform: `translateX(${position}px) scale(${scale})`,
                  opacity,
                  zIndex
                }}
              >
                <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 h-full group hover:shadow-2xl transition-all duration-300">
                  <div className="relative flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-400 overflow-hidden">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-amber-700 transition-colors">
                          {testimonial.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
                        <div className="flex mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="relative flex-grow">
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed italic line-clamp-6">
                        "{testimonial.comment}"
                      </p>
                      <div className="absolute -top-4 -right-4 text-gray-100 opacity-10 rotate-12 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <Quote size={40} className="sm:w-12 sm:h-12" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Slider range input */}
        <div className="absolute left-0 right-0 bottom-[-3rem] flex justify-center px-4">
          <input
            type="range"
            min={0}
            max={testimonials.length - 1}
            value={currentIndex}
            onChange={(e) => setCurrentIndex(parseInt(e.target.value))}
            className="w-full max-w-md h-2 rounded-lg appearance-none cursor-pointer bg-amber-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-amber-500 [&::-moz-range-thumb]:border-0"
          />
        </div>

        {/* Controls */}
        <div className="absolute left-0 right-0 bottom-[-6rem] flex justify-center items-center gap-4">
          <button
            onClick={prevSlide}
            className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:bg-amber-50 focus:ring-2 focus:ring-amber-200 transition-all duration-300 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700 group-hover:text-amber-900" />
          </button>

          <button
            onClick={toggleAutoplay}
            className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:bg-amber-50 focus:ring-2 focus:ring-amber-200 transition-all duration-300 group"
            aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700 group-hover:text-amber-900" />
            ) : (
              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700 group-hover:text-amber-900" />
            )}
          </button>

          <button
            onClick={nextSlide}
            className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:bg-amber-50 focus:ring-2 focus:ring-amber-200 transition-all duration-300 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700 group-hover:text-amber-900" />
          </button>
        </div>

        {/* Progress indicators */}
        <div className="absolute left-0 right-0 bottom-[-8.5rem] flex justify-center gap-1 sm:gap-2 overflow-x-auto px-4">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 focus:outline-none ${
                currentIndex === idx ? "w-6 sm:w-8 bg-amber-500" : "w-1.5 sm:w-2 bg-amber-200 hover:bg-amber-300"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;