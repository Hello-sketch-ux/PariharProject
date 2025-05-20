import React from 'react';
import { Star, Quote } from 'lucide-react';

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
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Customers Love Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover why people trust our products to improve their everyday hygiene
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col h-full hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400">
                <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
                <div className="flex mt-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-grow relative">
              <p className="text-gray-700 text-sm italic leading-relaxed line-clamp-6">"{testimonial.comment}"</p>
              <Quote className="absolute bottom-2 right-2 text-gray-100 opacity-10 rotate-12 w-8 h-8" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
