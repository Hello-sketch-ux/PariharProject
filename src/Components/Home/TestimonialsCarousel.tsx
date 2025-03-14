import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

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
    image: "src/assets/nileshma.jpg",
    rating: 5,
    comment: "Various patients and their relatives contact UTIs just by using the public restrooms at hospitals and path labs, through this product clean restrooms can be spotted and such diseases can be prevented"
  },
  {
    id: 2,
    name: "Dr. Aishwarya",
    role: "Gynaecologist, RML",
    image: "src/assets/aishwarya.jpg",
    rating: 5,
    comment: "Product is great for our personal use as using washrooms in hospitals can lead to various infections and UTIs and this can prevent those."
  },
  {
    id: 3,
    name: "Ms. Priyanka",
    role: "Teacher",
    image: "src/assets/priyanka.jpg",
    rating: 5,
    comment: "Budget friendly and easily accessible"
  },
  {
    id: 4,
    name: "Ms. Rashmi",
    role: "Teacher",
    image: "src/assets/rashmi.jpg",
    rating: 5,
    comment: "Highly recommending, find clean restroom will be absolute help during travelling"
  },
  {
    id: 5,
    name: "Ms. Meenakshi",
    role: "Teacher",
    image: "src/assets/meenakshi.jpg",
    rating: 5,
    comment: "Compact size, easy to use."
  },
  {
    id: 6,
    name: "Ms. Ananya",
    role: "College Student",
    image: "src/assets/ananya.jpg",
    rating: 5,
    comment: "Game changer, helped preventing UTIs and other issues"
  },
  {
    id: 7,
    name: "Ms. Gurmeet",
    role: "Teacher",
    image: "src/assets/gurmeet.jpg",
    rating: 5,
    comment: "Use this for better hygiene, loved the product"
  },
  {
    id: 8,
    name: "Ms. Nupur",
    role: "Teacher",
    image: "src/assets/nupur.jpg",
    rating: 5,
    comment: "Keeps safe from allergies and gives the satisfaction of using a clean washroom."
  },
  {
    id: 9,
    name: "Ms. Nitu",
    role: "Teacher",
    image: "src/assets/nitu.jpg",
    rating: 5,
    comment: "Every female must try it once and they will use it again and again."
  },
  {
    id: 10,
    name: "Ms. Sanmati",
    role: "Teacher",
    image: "src/assets/sanmati.jpg",
    rating: 5,
    comment: "Easy to carry and use, highly recommended being a working woman."
  },
  {
    id: 11,
    name: "Ms. Riddhi",
    role: "College Student",
    image: "src/assets/ridhi.jpg",
    rating: 5,
    comment: "Amazing solution for all the hygiene issues."
  },
  {
    id: 12,
    name: "Ms. Shubhangi",
    role: "Lawyer",
    image: "src/assets/subhangi.jpg",
    rating: 5,
    comment: "Better than other products available in the market."
  },
  {
    id: 13,
    name: "Ms. Kalpana",
    role: "Teacher",
    image: "src/assets/kalpana.jpg",
    rating: 5,
    comment: "Perfect solution to prevent UTIs and related problems."
  },
  {
    id: 14,
    name: "Ms. Purva",
    role: "College Student",
    image: "src/assets/purva.jpg",
    rating: 5,
    comment: "All the issues related to a public washroom are resolved, really liked the product."
  }
];

const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center px-4 py-16">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-20 text-center tracking-wide">
        HEAR FROM OUR CUSTOMERS
      </h1>

      <div className="relative w-full max-w-7xl">
        <div className="flex justify-center gap-8 overflow-hidden">
          {[-1, 0, 1].map((offset) => {
            const index = (currentIndex + offset + testimonials.length) % testimonials.length;
            const testimonial = testimonials[index];

            return (
              <div
                key={testimonial.id}
                className={`w-full max-w-sm transform transition-all duration-500 ${
                  offset === 0 ? 'scale-100 opacity-100' : 'scale-90 opacity-50'
                }`}
              >
                <div className="bg-white rounded-lg p-8 shadow-xl text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-6 h-6 text-yellow-400 fill-current" 
                          fill="#FACC15"
                        />
                      ))}
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg">{testimonial.role}</p>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      "{testimonial.comment}"
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          <ChevronLeft className="w-8 h-8 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          <ChevronRight className="w-8 h-8 text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
