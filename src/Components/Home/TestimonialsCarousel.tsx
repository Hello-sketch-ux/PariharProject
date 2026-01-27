import React from 'react';
import { Star, Quote } from 'lucide-react';

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

const testimonials = [
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
  return (
    <div className="bg-gray-50 py-12 px-4 md:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Customers Love Us</h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Hear directly from the people who use our hygiene solutions every day.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex space-x-6 pb-4 px-2 snap-x snap-mandatory scroll-smooth">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="min-w-[300px] max-w-sm bg-white rounded-xl shadow-md p-5 flex-shrink-0 snap-center"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-md font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <div className="flex mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative">
                <p className="text-gray-700 text-sm italic leading-relaxed line-clamp-5">
                  "{testimonial.comment}"
                </p>
                <Quote className="absolute bottom-1 right-1 text-gray-100 opacity-10 rotate-12 w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
