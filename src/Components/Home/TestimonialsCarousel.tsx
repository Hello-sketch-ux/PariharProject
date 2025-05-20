import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Product Manager",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    comment:
      "The service was absolutely phenomenal. They went above and beyond to deliver what we needed. Highly recommended!",
  },
  {
    id: 2,
    name: "Brian Lee",
    role: "Developer",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    comment:
      "Really happy with the collaboration. The quality of work and professionalism was top-notch.",
  },
  {
    id: 3,
    name: "Cynthia Moore",
    role: "Designer",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    comment:
      "Creative, responsive, and reliable. Would definitely work with them again!",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Marketing Head",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    comment:
      "Great understanding of our needs. The communication was excellent throughout the project timeline.",
  },
];

const CARD_WIDTH = 340;
const CARD_MARGIN = 24;

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getCardStyles = (index: number) => {
    const offset = index - activeIndex;
    const isActive = index === activeIndex;
    const position = offset * (CARD_WIDTH + CARD_MARGIN);
    const scale = isActive ? 1 : 0.9;
    const opacity = isActive ? 1 : 0.7;
    const zIndex = 20 - Math.abs(offset);
    return { position, scale, opacity, zIndex };
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#f8fafc] to-[#e0f2fe] py-16 px-4 md:px-20 overflow-x-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
        What Our Clients Say
      </h2>

      <div className="relative flex items-center justify-center h-[450px] md:h-[480px]">
        <div className="relative flex items-center justify-center w-full max-w-7xl">
          {testimonials.map((testimonial, index) => {
            const { position, scale, opacity, zIndex } = getCardStyles(index);
            const isActive = index === activeIndex;

            return (
              <div
                key={testimonial.id}
                className="absolute transition-all duration-500 ease-in-out"
                style={{
                  transform: `translateX(${position}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  width: "280px",
                  maxWidth: "90vw",
                }}
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col h-[400px] justify-between border border-blue-100">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-blue-400"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-5">
                    {testimonial.comment}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
