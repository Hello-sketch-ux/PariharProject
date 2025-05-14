import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

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

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="min-h-screen bg-[#FFF9F4] flex flex-col items-center justify-center px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-[#333] mb-16 text-center tracking-wide">
        HEAR FROM OUR CUSTOMERS
      </h1>

      <div className="relative w-full max-w-7xl">
        <div className="flex justify-center items-stretch gap-6 transition-transform ease-in-out duration-500">
          {[-1, 0, 1].map((offset) => {
            const index = (currentIndex + offset + testimonials.length) % testimonials.length;
            const testimonial = testimonials[index];
            const isActive = offset === 0;

            return (
              <div
                key={testimonial.id}
                className={`w-full max-w-md transform transition-all duration-500 ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-50'}`}
              >
                <div className="bg-white rounded-2xl p-6 shadow-xl h-full flex flex-col items-center text-center">
                  <div className="w-28 h-28 mb-4 overflow-hidden rounded-full border-4 border-yellow-300">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{testimonial.role}</p>
                  <p className="text-gray-700 italic text-base px-2">"{testimonial.comment}"</p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white p-2 md:p-3 rounded-full shadow-md hover:bg-gray-200 transition"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-[#444]" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white p-2 md:p-3 rounded-full shadow-md hover:bg-gray-200 transition"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-[#444]" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
