import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, MessageSquare } from "lucide-react";
import "./Home.css";
// import Fuse from "fuse.js";
import Image from "./logo.png";
import Logo from "./Parihar_logo.png";
import Heading from "./Heading.js";
import ProblemSolutionCard from "./ProblemSolutionCard.js";
import crossContamination from "./crossContamination.png";
import healthcare from "./healthcare.png";
import germsAndProtection from "./germsAndProtection.png";
import obsoleteProducts from "./obsoleteProducts.png";
import Button from "./Button.js";
import newspaperCuttings from "./newspaperCuttings.png";
import ContactUs from "./contactUs.js";
import Subscribe from "./Subscribe.js";
import Footer from "./Footer.js";
import SustainableGoals from "./SustainableGoals.js";
import Cards from "./Card.js";
import vision from "./vision.png";
import mission from "./mission.png";
import TestimonialsCarousel from "./TestimonialsCarousel.js";
import Chatbot from "./Chatbot.js";

type HomeProps = {
  isLoggedIn: boolean;
};

const Home: React.FC<HomeProps> = ({ isLoggedIn }) => {
  {
    const [scrolling, setScrolling] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const handleScroll = () => setScrolling(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <div className="relative min-h-screen bg-[#f5f5f5] flex flex-col items-center text-center overflow-x-hidden w-full">
        {/* Navbar */}
        <nav
          className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 py-4 h-16 transition-all duration-300 z-50 ${scrolling ? "bg-black/70 backdrop-blur-md shadow-md" : "bg-transparent"}`}
        >
          {/* Logo */}
          <Link to="/">
          <img src={Logo} alt="Parihar India" className="h-6 md:h-8 w-auto" />
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            ☰
          </button>

          {/* Desktop Nav Links (Right Aligned) */}
          <div className="hidden md:flex items-center ml-auto space-x-6">
            {["HOME", "SHOP", "ABOUT", "CONTACT", "RESTROOM FINDER"].map((item, index) => (
              <Link
                key={index}
                to={item === "HOME" ? "/" : `/${item.toLowerCase().replace(/\s/g, "-")}`}
                className="text-white text-sm font-semibold hover:text-gray-300 transition"
              >
                {item}
              </Link>
            ))}

            {/* Profile or Login Button */}
            {isLoggedIn ? (
              <button
                onClick={() => navigate("/profile")}
                className="text-white hover:bg-white hover:text-black p-2 rounded-full transition"
              >
                <User size={24} />
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="border-2 text-white hover:bg-white hover:text-black px-4 py-2 rounded-lg font-semibold transition"
              >
                LOGIN
              </button>
            )}
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="absolute top-16 left-0 w-full bg-black bg-opacity-80 flex flex-col items-center space-y-4 py-4 md:hidden">
              {["HOME", "SHOP", "ABOUT", "CONTACT", "RESTROOM FINDER"].map((item, index) => (
                <Link
                  key={index}
                  to={item === "HOME" ? "/" : `/${item.toLowerCase().replace(/\s/g, "-")}`}
                  className="text-white text-sm font-semibold"
                >
                  {item}
                </Link>
              ))}

              {isLoggedIn ? (
                <button
                  onClick={() => navigate("/profile")}
                  className="text-white hover:bg-white hover:text-black p-2 rounded-full transition"
                >
                  <User size={24} />
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="border-2 text-white hover:bg-white hover:text-black px-4 py-2 rounded-lg font-semibold transition"
                >
                  LOGIN
                </button>
              )}
            </div>
          )}
        </nav>



        {/* Hero Image */}
        <div className="w-[100vw] h-[100vh] bg-black flex justify-center items-center">
            <img src={Image} alt="Parihar India Logo" className="max-md:h-[60vh] max-md:w-[100vw] h-[90vh] w-[90vw]" />
        </div>
        

        {/* Chatbot Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition z-50">
          <MessageSquare size={24} />
        </button>

        {/* ChatBot Component */}
        <Chatbot isOpen={isOpen} onClose={() => setIsOpen(false)} />

        {/* About Section */}
        <Heading content="about parihar" color="green" underline={true} />
        <ProblemSolutionCard
          heading="Innovative Healthcare and Hygiene Products"
          imagePosition="left"
          content="Parihar India offers a practical solution for public restroom hygiene with its custom-designed toilet seat cover."
          imageUrl={healthcare}
        />

        {/* Vision and Mission Section */}
        <Heading content="about Parihar India" color="green" underline={true} />
        <div className="MV">
          <Cards image={vision} heading="Our Vision" paragraph="Empowering individuals with innovative wellness programs." />
          <Cards image={mission} heading="Our Mission" paragraph="Enhancing hygiene and comfort through innovative toilet seat covers." />
        </div>

        {/* Sustainable Goals Section */}
        <SustainableGoals />

        {/* Restroom Finder Section */}
        <Heading content="Find A Clean and Hygienic Restroom" color="black" underline={false} />
        <p className="flex justify-center items-center color-gray-400">Certified By Parihar India</p>
        
        <Button content="FIND" />

        {/* Problems Section */}
        <Heading content="Problems We Saw" color="green" underline={true} />
        <ProblemSolutionCard heading="Hygiene and Germ Protection" imagePosition="left" content="Our products protect against harmful germs." imageUrl={germsAndProtection} />
        <ProblemSolutionCard heading="Cross Contamination" imagePosition="right" content="Minimizing the risk in public restrooms." imageUrl={crossContamination} />
        <ProblemSolutionCard heading="Obsolete Products" imagePosition="left" content="Traditional products fail to provide necessary protection." imageUrl={obsoleteProducts} />

        {/* Problems Society Faces Section */}
        <Heading content="Problems Society Faces" color="black" underline={true} />
        <img src={newspaperCuttings} className="w-[90vw] my-[2rem]" alt="Newspaper Cuttings" />

        {/* E-commerce Store Section */}
        <Heading content="Visit Our E-commerce Store" color="black" underline={false} />
        <p className="flex justify-center items-center color-gray-400">Certified By Parihar India</p>
        <Button content="VISIT" />

        {/* Contact Us & Testimonials */}
        <TestimonialsCarousel />
        <ContactUs />

        {/* Subscribe Section */}
        <Subscribe />

        {/* Footer */}
        <Footer />
      </div>
    );
  };
}

export default Home;
