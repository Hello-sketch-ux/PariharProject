import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, X, Send, MessageSquare } from "lucide-react"; // Import Lucide Icons
import Image from "./logo.png";
import Logo from "./Parihar_logo.png";

interface HomeProps {
  isLoggedIn: boolean;
}

interface Message {
  text: string;
  isBot: boolean;
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
  const [messages, setMessages] = useState<Message[]>([
    { text: "Welcome to Parihar India\nProviding innovative hygiene solutions for a cleaner, safer world.", isBot: true },
    { text: "Hello! How can I help you with Parihar India's products and services?", isBot: true }
  ]);
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
    let botResponse = predefinedQA[inputMessage] || 
      "I apologize, but I don't have specific information about that. Please contact our customer support for more details.";

    // Add bot response with a slight delay
    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 500);

    setInputMessage("");
  };

  return (
    <div className="relative min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center text-center">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full flex items-center px-6 lg:px-16 py-4 h-16 transition-all duration-300 z-50 ${
          scrolling ? "bg-black/70 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <img src={Logo} alt="Parihar India" className="h-7 w-auto" />
        <div className="ml-auto flex space-x-8">
          <Link to="/" className="text-white text-sm font-semibold hover:text-gray-300 transition">HOME</Link>
          <Link to="/shop" className="text-white text-sm font-semibold hover:text-gray-300 transition">SHOP</Link>
          <Link to="/about" className="text-white text-sm font-semibold hover:text-gray-300 transition">ABOUT</Link>
          <Link to="/contact" className="text-white text-sm font-semibold hover:text-gray-300 transition">CONTACT US</Link>
          <Link to="/restroom-finder" className="text-white text-sm font-semibold hover:text-gray-300 transition">RESTROOM FINDER</Link>
          <div className="text-white">|</div>
        </div>

        {/* Login Button / Profile Icon */}
        {isLoggedIn ? (
          <button
            onClick={() => navigate('/profile')}
            className="ml-6 text-white hover:bg-white hover:text-black p-2 rounded-full transition"
          >
            <User size={24} />
          </button>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="ml-6 border-2 text-white hover:bg-white hover:text-black px-4 py-2 rounded-lg font-semibold transition"
          >
            LOGIN
          </button>
        )}
      </nav>

      {/* Main Image */}
      <img src={Image} alt="Parihar India Logo" className="w-full h-screen object-cover" />

      {/* ChatBot Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition z-50"
      >
        <MessageSquare size={24} />
      </button>

      {/* ChatBot Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl z-50">
          {/* Chat Header */}
          <div className="flex items-center justify-between bg-green-500 p-4 rounded-t-lg">
            <h3 className="text-white font-semibold">Parihar India Support</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}

              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
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

            {/* Suggested Questions */}
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
    </div>
  );
};

export default Home;