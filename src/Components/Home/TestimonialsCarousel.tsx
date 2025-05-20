
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Play, Pause } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Interface for testimonial data
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  comment: string;
}

// You can replace this with your actual data import
export const testimonialData: Testimonial[] = [
  { 
    id: 1, 
    name: "Dr. Nileshma Pandey", 
    role: "Gynaecologist", 
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7", 
    rating: 5, 
    comment: "Various patients and their relatives contact UTIs just by using the public restrooms at hospitals and path labs, through this product clean restrooms can be spotted and such diseases can be prevented" 
  },
  // Add the rest of your testimonials here
  // ...
];

// Testimonial Card Component
const TestimonialCard = ({
  name,
  role,
  image,
  rating,
  comment,
  isActive
}: Testimonial & { isActive: boolean }) => {
  return (
    <div 
      className={`
        bg-white rounded-xl shadow-xl p-4 sm:p-6 h-[300px] sm:h-[320px] group hover:shadow-2xl 
        transition-all duration-300 ${isActive ? 'border-2 border-amber-300' : ''}
      `}
    >
      <div className="relative flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-400 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                // Set a fallback image if loading fails
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=128&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjQ5OTcyOTU0&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=128";
              }}
            />
          </div>
          <div className="ml-3 sm:ml-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-amber-700 transition-colors">
              {name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">{role}</p>
            <div className="flex mt-1">
              {[...Array(rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
          </div>
        </div>
        <div className="relative flex-grow overflow-hidden">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed italic line-clamp-6">
            "{comment}"
          </p>
          <div className="absolute -top-4 -right-4 text-gray-100 opacity-10 rotate-12 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <Quote size={40} className="sm:w-12 sm:h-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Testimonial Carousel Component
const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % testimonialData.length);
    }
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) =>
        prev === 0 ? testimonialData.length - 1 : prev - 1
      );
    }
  }, [isAnimating]);

  const toggleAutoplay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - startX;
    const walk = x * 2; // Adjust sliding speed
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
    setStartX(e.touches[0].pageX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - startX;
    const walk = x * 2;
    if (Math.abs(walk) > 50) {
      if (walk > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
      setIsDragging(false);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAnimating(true);
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col items-center justify-center px-4 py-16">
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
        ref={carouselRef}
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
            const index = (currentIndex + offset + testimonialData.length) % testimonialData.length;
            const testimonial = testimonialData[index];
            const isActive = offset === 0;
            
            // Dynamically calculate position based on screen size
            const getPositionValue = () => {
              if (isMobile === undefined) return offset * 320; // Default while determining size
              if (window.innerWidth >= 1024) return offset * 400;
              if (window.innerWidth >= 768) return offset * 380;
              if (window.innerWidth >= 640) return offset * 340;
              return offset * 320;
            };
            
            const position = getPositionValue();
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
                <TestimonialCard 
                  {...testimonial}
                  isActive={isActive}
                />
              </div>
            );
          })}
        </div>

        {/* Slider range input */}
        <div className="absolute left-0 right-0 bottom-[-3rem] flex justify-center px-4">
          <input
            type="range"
            min={0}
            max={testimonialData.length - 1}
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
          {testimonialData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
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
