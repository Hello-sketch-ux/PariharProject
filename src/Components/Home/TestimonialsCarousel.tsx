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
    setIsPlaying((prev) => !prev);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - startX;
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

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    let autoplayTimer: number | undefined;
    if (isPlaying && !isDragging) {
      autoplayTimer = window.setInterval(nextSlide, 5000);
    }
    return () => {
      if (autoplayTimer) clearInterval(autoplayTimer);
    };
  }, [isPlaying, isDragging, nextSlide]);

  return (
    <div className="min-h-screen min-w-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
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
        <div className="flex justify-center items-stretch min-h-[500px] sm:min-h-[420px] md:min-h-[380px] relative">
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

            // Responsive calculation for position
            const position =
              window.innerWidth >= 1024
                ? xOffset.lg
                : window.inner
