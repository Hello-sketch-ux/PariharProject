import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react"; // Import Lucide User Icon
import { X as CloseIcon, MessageSquare, Send } from 'lucide-react';
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

interface HomeProps {
  isLoggedIn: boolean;
}

const predefinedQA: { [key: string]: string } = {
  "What are your products made of?": "Our toilet seat covers are made from non-porous, oxo-biodegradable, and 100% recyclable materials, ensuring hygiene and sustainability.",
  "How do I use the product?": "Simply place the cover on the toilet seat, use it, and dispose of it in a dry waste bin after use. It provides a protective barrier against germs.",
  "Are products eco-friendly?": "Yes! Our products are oxo-biodegradable and 100% recyclable, reducing environmental impact while promoting public hygiene.",
  "How does restroom locator work?": "Our app helps you find clean, Parihar-certified restrooms near you using real-time location tracking and user reviews.",
};

const Home: React.FC<HomeProps> = ({ isLoggedIn }) => {
  const [scrolling, setScrolling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputMessage, isBot: false }]);

    // Find response
    let botResponse =
      predefinedQA[inputMessage] ||
      "I apologize, but I don't have specific information about that. Please contact our customer support for more details.";

    // Add bot response with a slight delay
    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 500);

    setInputMessage("");
  };

  return (
    <div className="relative min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center text-center overflow-x-hidden w-full">
      <nav
        className={`fixed top-0 left-0 w-full flex items-center px-6 lg:px-16 py-4 h-16 transition-all duration-300 z-50 ${scrolling ? "bg-black/70 backdrop-blur-md shadow-md" : "bg-transparent"
          }`}
      >
        <img src={Logo} alt="Parihar India" className="h-7 w-auto" />
        <div className="ml-auto flex space-x-8">
          <Link to="/" className="text-white text-sm font-semibold hover:text-gray-300 transition">
            HOME
          </Link>
          <Link to="/shop" className="text-white text-sm font-semibold hover:text-gray-300 transition">
            SHOP
          </Link>
          <Link to="/about" className="text-white text-sm font-semibold hover:text-gray-300 transition">
            ABOUT
          </Link>
          <Link to="/contact" className="text-white text-sm font-semibold hover:text-gray-300 transition">
            CONTACT US
          </Link>
          <Link to="/restroom-finder" className="text-white text-sm font-semibold hover:text-gray-300 transition">
            RESTROOM FINDER
          </Link>
          <div className="text-white">|</div>
        </div>

        {isLoggedIn ? (
          <button
            onClick={() => navigate("/profile")}
            className="ml-6 text-white hover:bg-white hover:text-black p-2 rounded-full transition"
          >
            <User size={24} /> {/* Lucide User Icon */}
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="ml-6 border-2 text-white hover:bg-white hover:text-black px-4 py-2 rounded-lg font-semibold transition"
          >
            LOGIN
          </button>
        )}
      </nav>

      <img src={Image} alt="Parihar India Logo" className="w-full h-screen object-cover" />

      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition z-50"
      >
        <MessageSquare size={24} />
      </button>

      {/* ChatBot Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl z-50">
          <div className="flex items-center justify-between bg-green-500 p-4 rounded-t-lg">
            <h3 className="text-white font-semibold">Parihar India Support</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center text-white p-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <CloseIcon size={20} className="text-white" />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${message.isBot ? "bg-gray-100 text-gray-800" : "bg-green-500 text-white"
                    }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSend}
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
              >
                <Send size={20} />
              </button>

            </div>

            <div className="mt-2 space-y-1">
              {Object.keys(predefinedQA).map((question) => (
                <button
                  key={question}
                  onClick={() => {
                    setInputMessage(question);
                    handleSend();
                  }}
                  className="text-left text-sm text-gray-600 hover:text-green-500 block"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
      <div>
        <Heading content="about parihar" color="green" underline={true} />
        <ProblemSolutionCard
          heading="Innovative Healthcare and Hygiene Products"
          imagePosition="left"
          content="Parihar India offers a practical solution for public restroom hygiene with its custom-designed toilet seat cover. Derived from the Sanskrit word Parihar meaning to remove difficulty, the cover fits securely on any seat, creating a protective barrier for cleanliness and safety. Focused on ease and personal hygiene, Parihar India aims to improve everyday restroom experiences."
          imageUrl={healthcare}
        />
      </div>

      {/* Vision and Mission Section */}
      <div className="mb-[6rem] my-[2rem]">
        <Heading content="about Parihar India" color="green" underline={true} />
        <div className="flex justify-center gap-[2rem] items-center">
          <Cards image={vision} heading="Our Vision" paragraph="Our mission is to empower individuals to achieve holistic health through innovative wellness programs, and patient education initiatives." />
          <Cards image={mission} heading="Our Mission" paragraph="At Parihar, we are committed to enhancing hygiene and comfort through innovative toilet seat covers." />
        </div>
      </div>

      {/* Sustainable Goals Section */}
      <SustainableGoals />

      {/* Restroom Finder Section */}
      <div>
        <Heading content="Find A Clean and Hygienic Restroom" color="black" underline={false} />
        <p className="flex justify-center items-center color-gray-400">Certified By Parihar India</p>
        <Button content="FIND" />
      </div>

      {/* Problems Section */}
      <div>
        <Heading content="Problems We Saw" color="green" underline={true} />
        <ProblemSolutionCard
          heading="Hygiene and Germ Protection"
          imagePosition="left"
          content="Our products are designed to protect against harmful germs, ensuring a safer restroom experience."
          imageUrl={germsAndProtection}
        />
        <ProblemSolutionCard
          heading="Cross Contamination"
          imagePosition="right"
          content="We minimize the risk of cross-contamination in public restrooms with our advanced products."
          imageUrl={crossContamination}
        />
        <ProblemSolutionCard
          heading="Obsolete Products"
          imagePosition="left"
          content="Traditional products fail to provide the necessary protection and comfort."
          imageUrl={obsoleteProducts}
        />
      </div>

      {/* Problems Society Faces Section */}
      <div className="flex flex-col justify-center items-center">
        <Heading content="Problems Society Faces" color="black" underline={true} />
        <img src={newspaperCuttings} className="w-[90vw] my-[2rem]" alt="Newspaper Cuttings" />
      </div>

      {/* E-commerce Store Section */}
      <div>
        <Heading content="Visit Our E-commerce Store" color="black" underline={false} />
        <p className="flex justify-center items-center color-gray-400">Certified By Parihar India</p>
        <Button content="VISIT" />
      </div>

      {/* Contact Us Section */}
      <div>
        <ContactUs />
      </div>

      {/* Subscribe Section */}
      <div>
        <Subscribe />
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;
