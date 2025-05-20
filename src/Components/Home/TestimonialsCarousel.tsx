import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Play, Pause } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  comment: string;
}

const testimonials: Testimonial[] = [
  { 
    id: 1, 
    name: "Dr. Nileshma Pandey", 
    role: "Gynaecologist", 
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", 
    rating: 5, 
    comment: "Various patients and their relatives contact UTIs frequently. This product has been a game-changer for maintaining hygiene and preventing infections." 
  },
  { 
    id: 2, 
    name: "Dr. Aishwarya", 
    role: "Gynaecologist, RML", 
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", 
    rating: 5, 
    comment: "Product is great for personal use. I've recommended it to many patients, and the feedback has been overwhelmingly positive." 
  },
  { 
    id: 3, 
    name: "Ms. Priyanka", 
    role: "Teacher", 
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", 
    rating: 5, 
    comment: "Budget friendly and easily accessible. It's made a significant difference in my daily routine, especially during long teaching days." 
  },
  { 
    id: 4, 
    name: "Ms. Rashmi", 
    role: "Teacher", 
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", 
    rating: 5, 
    comment: "Highly recommending this to all my colleagues. The convenience and hygiene benefits are truly remarkable for busy professionals." 
  },
  { 
    id: 5, 
    name: "Ms. Meenakshi", 
    role: "Teacher", 
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", 
    rating: 5, 
    comment: "Compact size, easy to use. I can carry it in my bag without any hassle, making it perfect for everyday use at work and while traveling." 
  },
  { 
    id: 6, 
    name: "Ms. Ananya", 
    role: "College Student", 
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", 
    rating: 5, 
    comment: "Game changer for college life! The convenience and hygiene benefits have transformed my experience using public facilities on campus." 
  },
  { 
    id: 7, 
    name: "Ms. Gurmeet", 
    role: "Teacher", 
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", 
    rating: 5, 
    comment: "Use this for better hygiene. Since incorporating this product, I've noticed a significant decrease in UTI occurrences and improved overall comfort." 
  },
  { 
    id: 8, 
    name: "Ms. Nupur", 
    role: "Teacher", 
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", 
    rating: 5, 
    comment: "Keeps safe from allergies and infections. I used to struggle with recurrent issues, but this product has been a true solution for maintaining health." 
  },
  { 
    id: 9, 
    name: "Ms. Nitu", 
    role: "Teacher", 
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", 
    rating: 5, 
    comment: "Every female must try it at least once. The difference it makes is remarkable, and I can't imagine going back to traditional methods now." 
  },
  { 
    id: 10, 
    name: "Ms. Sanmati", 
    role: "Teacher", 
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", 
    rating: 5, 
    comment: "Easy to carry and use anywhere. The thoughtful design makes it discreet and convenient, perfect for busy professionals always on the move." 
  },
  { 
    id: 11, 
    name: "Ms. Riddhi", 
    role: "College Student", 
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", 
    rating: 5, 
    comment: "Amazing solution for hygiene concerns. As a student with a hectic schedule, this product has been invaluable for maintaining personal hygiene." 
  },
  { 
    id: 12, 
    name: "Ms. Shubhangi", 
    role: "Lawyer", 
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", 
    rating: 5, 
    comment: "Better than other alternatives I've tried. The quality and effectiveness are unmatched, making it worth every penny for professional women." 
  },
  { 
    id: 13, 
    name: "Ms. Kalpana", 
    role: "Teacher", 
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", 
    rating: 5, 
    comment: "Perfect solution for daily hygiene maintenance. I appreciate how it's made such a positive impact on my comfort and confidence throughout the day." 
  },
  { 
    id: 14, 
    name: "Ms. Purva", 
    role: "College Student", 
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", 
    rating: 5, 
    comment: "Issues resolved that I've struggled with for years. This innovative product addresses problems that many women face but rarely discuss publicly." 
  }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial; isActive: boolean }> = ({ testimonial, isActive }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-[320px] h-[380px] flex flex-col">
      <div className="flex-1">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-blue-100">
            <img 
              src={testimonial.image} 
              alt={testimonial.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h3 className="text-xl font-semibold text-center text-gray-800">{testimonial.name}</h3>
          <p className="text-sm text-center text-gray-500 mt-1">{testimonial.role}</p>
          
          <div className="flex justify-center mt-3 mb-4">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} size={18} className="text-yellow-400 fill-yellow-400 mx-0.5" />
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex-grow">
          <p className="text-gray-700 text-center text-sm leading-relaxed">
            "{testimonial.comment}"
          </p>
        </div>
      </div>
    </div>
  );
};

const CarouselControls: React.FC<{
  onPrev: () => void;
  onNext: () => void;
  isPlaying: boolean;
  toggleAutoplay: () => void;
}> = ({ onPrev, onNext, isPlaying, toggleAutoplay }) => {
  return (
    <>
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-40 sm:left-8">
        <button 
          onClick={onPrev} 
          className="bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="text-blue-600" />
        </button>
      </div>
      
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-40 sm:right-8">
        <button 
          onClick={onNext} 
          className="bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          aria-label="Next testimonial"
        >
          <ChevronRight className="text-blue-600" />
        </button>
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40">
        <button 
          onClick={toggleAutoplay} 
          className="bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
        >
          {isPlaying ? 
            <Pause className="text-blue-600" size={18} /> : 
            <Play className="text-blue-600" size={18} />
          }
        </button>
      </div>
    </>
  );
};

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(1);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const getVisibleIndexes = () => {
    const indexes = [];
    const totalSlides = testimonials.length;
    
    if (visibleCount === 1) {
      indexes.push(0);
    } else {
      for (let i = -Math.floor(visibleCount / 2); i <= Math.floor(visibleCount / 2); i++) {
        indexes.push(i);
      }
    }
    
    return indexes;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative mb-16 text-center">
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <Quote size={200} className="text-blue-800 rotate-6" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-3 relative z-10">
              Our Customers Love Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto relative z-10">
              Discover why people trust our products to improve their everyday hygiene
            </p>
          </div>

          <div
            className="relative overflow-hidden mx-auto"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setIsDragging(false)}
          >
            <div className="relative flex justify-center items-center min-h-[440px]">
              {getVisibleIndexes().map(offset => {
                const index = (currentIndex + offset + testimonials.length) % testimonials.length;
                const testimonial = testimonials[index];
                const isActive = offset === 0;
                
                let position;
                if (window.innerWidth < 640) {
                  position = offset * 260;
                } else {
                  position = offset * 340;
                }
                
                const scale = isActive ? 1 : 0.85;
                const opacity = isActive ? 1 : 0.6;
                const zIndex = isActive ? 30 : 20;

                return (
                  <div
                    key={testimonial.id}
                    className="absolute transition-all duration-500 p-4"
                    style={{
                      transform: `translateX(${position}px) scale(${scale})`,
                      opacity,
                      zIndex
                    }}
                  >
                    <TestimonialCard testimonial={testimonial} isActive={isActive} />
                  </div>
                );
              })}
            </div>

            <CarouselControls
              onPrev={prevSlide}
              onNext={nextSlide}
              isPlaying={isPlaying}
              toggleAutoplay={toggleAutoplay}
            />
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAnimating(true);
                  setCurrentIndex(index);
                }}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-blue-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
