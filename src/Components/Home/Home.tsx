import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { User } from "lucide-react";  // Import Lucide User Icon
import Image from "./logo.png";
import Logo from "./Parihar_logo.png";
import Heading from "./Heading";
import ProblemSolutionCard from "./ProblemSolutionCard.jsx";
import crossContamination from "./crossContamination.png";
import healthcare from "./healthcare.png";
import germsAndProtection from "./germsAndProtection.png";
import obsoleteProducts from "./obsoleteProducts.png";
import Button from "./Button";
import newspaperCuttings from "./newspaperCuttings.png";
import ContactUs from "./contactUs.jsx";
import Subscribe from "./subscribe";
import Footer from "./Footer.jsx";
import SustainableGoals from "./SustainableGoals.jsx"


interface HomeProps {
  isLoggedIn: boolean;
}

const Home: React.FC<HomeProps> = ({ isLoggedIn }) => {
  const [scrolling, setScrolling] = useState(false);
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

  return (
    <div className="relative min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center text-center overflow-x-hidden w-full">
      <nav className={`fixed top-0 left-0 w-full flex items-center px-6 lg:px-16 py-4 h-16 transition-all duration-300 z-50 ${
          scrolling ? "bg-black/70 backdrop-blur-md shadow-md" : "bg-transparent"
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
        
        {/* Login Button / Profile Icon */}
        {isLoggedIn ? (
          <button
            onClick={() => navigate('/profile')}
            className="ml-6 text-white hover:bg-white hover:text-black p-2 rounded-full transition"
          >
            <User size={24} />  {/* Lucide User Icon */}
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

      <img src={Image} alt="Parihar India Logo" className="w-full h-screen object-cover" />
      <button className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition">
        💬
      </button>

      <div>
        {/* About section */}
        <div>
          <Heading content="about parihar" color="green" underline={true}></Heading>
          <ProblemSolutionCard heading="Innovative Healthcare and Hygiene Products" imagePosition="left" content="Parihar India offers a practical solution for public restroom hygiene with its custom-designed toilet seat cover. Derived from the Sanskrit word Parihar meaning to remove difficulty, the cover fits securely on any seat, creating a protective barrier for cleanliness and safety. Focused on ease and personal hygiene, Parihar India aims to improve everyday restroom experiences."  imageUrl={healthcare} ></ProblemSolutionCard>
        </div>

        <SustainableGoals/>

        {/* Finding restroom section */}
        <div>
          <Heading content="Find A Clean and Hygienic restroom" color="black" underline={false}/>
          <p className="flex justify-center items-center color-gray-400">Certified By Parihar India</p>
          <Button content="FIND"></Button>
        </div>

        {/* Problems section */}
        <div>
          <Heading content="problems we saw" color="green" underline={true}></Heading>
          <ProblemSolutionCard heading="Hygiene and Germ Protection" imagePosition="left" content="At Parihar India, we believe that true health goes beyond the mere absence of disease—it’s the harmony of complete physical, mental, and social well-being. Our mission is to empower individuals to achieve holistic health through our comprehensive services, innovative wellness programs, and patient education initiatives. By fostering a culture of wellness, we aim to create healthier communities and improve lives, one individual at a time. " imageUrl={germsAndProtection} ></ProblemSolutionCard>
          <ProblemSolutionCard heading="Cross Contamination" imagePosition="right" content="Public restrooms pose a constant risk of cross-contamination, where individuals may unknowingly come into contact with germs left behind by others. At Parihar , we are committed to mitigating this risk by providing innovative hygiene solutions that ensure a cleaner, safer restroom experience for everyone. Our products are designed to minimize exposure to harmful bacteria, promoting health and peace of mind in shared spaces." imageUrl={crossContamination} ></ProblemSolutionCard>
          <ProblemSolutionCard heading="Obsolete Products" imagePosition="left" content="Traditional paper seat covers frequently fail to offer the protection and comfort users expect, often resulting in unsatisfactory and uncomfortable restroom experiences. At Parihar, we recognize the need for a more reliable solution. Our innovative products are designed to provide superior hygiene, comfort, and peace of mind, ensuring that every restroom visit is safe and satisfying." imageUrl={obsoleteProducts} ></ProblemSolutionCard>
        </div>

        {/* Problems Society face section */}
        <div className="flex flex-col jusitfy-center items-center">
          <Heading content="Problems Society face" color="black" underline={true}/>
          <img src={newspaperCuttings} className="w-[90vw] my-[2rem]"></img>
        </div>

        {/* Visit our e-commerce store */}
        <div>
          <Heading content="Visit our e-commerce store" color="black" underline={false}/>
          <p className="flex justify-center items-center color-gray-400">Certified By Parihar India</p>
          <Button content="VISIT"></Button>
        </div>

        {/* Contact us section */}
        <div>
          <ContactUs/>
        </div>
        
        {/* Subscribe */}
        <div>
          <Subscribe/>
        </div>

        {/* Footer section */}
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
