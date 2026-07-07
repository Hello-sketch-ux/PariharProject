import React from "react";
import "./about.css";
import ceo from "./assets/ceo.jpeg";
import core2 from "./assets/core2.jpeg";
import core3 from "./assets/core3.jpeg";
import core1 from "./assets/core1.png";

const About: React.FC = () => {
  return (
    <section className="about-wrapper">
      <div className="about-intro">
        <h1>Empowering Health, Enhancing Life</h1>
        <p>
          Parihar India is on a mission to transform the public restroom
          experience with smart, sustainable hygiene solutions. From toilet seat
          covers to real-time restroom tracking, we're rethinking how hygiene
          works in everyday life..
        </p>
      </div>

      <div className="about-section">
        <h2>What is Parihar?</h2>
        <p>
          <b>Parihar</b> is derived from Sanskrit, meaning 'the removal of
          difficulty.' Inspired by the ancient wisdom of <i>Naga Mudra</i> - a
          gesture that encourages clarity and insight - Parihar India applies
          this philosophy to a very modern challenge: public restroom hygiene...
        </p>
        <p>
          Our eco-friendly toilet seat covers are designed for a universal fit, ensuring easy usability across different restroom setups. Made with high-quality, sustainable materials, they provide a hygienic, safe, and hassle-free experience. Backed by research and driven by sustainability, our innovation helps reduce the risks of cross-contamination while promoting better public sanitation standards.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Vision</h2>
        <p>
          We envision a world where access to a clean, safe restroom is a basic
          right—not a privilege. By combining smart design with intuitive
          technology, we strive to make hygiene accessible, eco-friendly, and
          effective for everyone.
        </p>
      </div>

      <div className="about-section">
        <h2>Sustainable Development Goals</h2>
        <p>Parihar India proudly aligns with multiple UN Sustainable Development Goals:</p>
        <ul>
          <li>
            <b>Good Health & Well-being</b> - Prevents UTIs, infections, and
            cross-contamination
          </li>
          <li>
            <b>Clean Water & Sanitation</b> - Promotes hygienic practices in
            public restrooms
          </li>
          <li>
            <b>Innovation & Infrastructure</b> - Builds smart solutions in the
            sanitation industry
          </li>
          <li>
            <b>Responsible Consumption</b> - Eco-friendly materials and minimal
            waste
          </li>
          <li>
            <b>Climate Action</b> - Reducing environmental impact through
            sustainable design
          </li>
        </ul>
      </div>

      <div className="about-section">
        <h2>Who We Serve</h2>
        <p>
          From bustling malls and transit hubs to office complexes and
          educational institutions, our products are designed for:
        </p>
        <ul>
          <li>Malls, Hotels & Restaurants</li>
          <li>Hospitals & Clinics</li>
          <li>Offices & Co-working Spaces</li>
          <li>Airports, Trains & Public Transit</li>
          <li>Colleges & Schools</li>
        </ul>
      </div>

      <div className="about-footer">
        <h3>Join the Hygiene Revolution</h3>
        <p>
          Parihar India is more than a product - it's a movement. Towards safer
          restrooms, smarter hygiene, and a cleaner planet.
        </p>
        <a
          href="https://pariharindia.com"
          rel="noopener noreferrer"
          className="about-button"
        >
          Explore More
        </a>
      </div>
      <div >

      </div>
      {/* ACHIEVEMENTS SECTION */}
      <div className="achievements-section">
        <h2>Our Achievements</h2>
        <p className="achievements-subtitle">
          Recognized & Backed By India's Innovation Leaders.
        </p>
        <div className="achievements-grid">
          <div className="achievement-card">
            <div className="achievement-icon"></div>
            <span className="achievement-tag">Funding</span>
            <h3>Startup India Seed Fund</h3>
            <p>
              Recognized under the Startup India Seed Fund Scheme, Parihar India's non-porous hygiene barrier was rigorously evaluated and backed by a government initiative a strong signal that the market urgently needs a genuine, scalable solution to public restroom hygiene.
            </p>
          </div>
          <div className="achievement-card">
            <div className="achievement-icon"></div>
            <span className="achievement-tag">Funding</span>
            <h3>NASSCOM Foundation Recognition</h3>
            <p>
              Supported by the NASSCOM Foundation, this recognition reflects industry validation of our tech-integrated approach reinforcing our belief that safe, uncompromising hygiene can become the national standard through automated manufacturing and a connected digital ecosystem.
            </p>
          </div>
        </div>
      </div>
      {/* OUR TEAM SECTION */}
      <div className="team-section">
        <h2>Our Team</h2>
        <p className="team-subtitle">
          The people building the hygiene revolution.
        </p>

        <div className="founder-card">
          <img
            src={ceo}
            alt="Founder & CEO"
            className="founder-photo"
          />
          <div className="founder-details">
            <h3>Aryan Tiwari</h3>
            <span className="founder-role">Founder & CEO</span>
            <p className="founder-contact">
              aryantiwari13455@gmail.com
            </p>
            <p className="founder-contact">
              <a href="tel:+91 70119 89792">+91 70119 89792</a>
            </p>
          </div>
        </div>

        <div className="team-grid">
          <div className="team-card">
            <img
              src={core2}
              alt="Tech Team Member 1"
              className="team-photo"
            />
            <h4>Mohit Morya</h4>
            <span className="team-role">Core Intern</span>
          </div>
          <div className="team-card">
            <img
              src={core1}
              alt="Core Member"
              className="team-photo"
            />
            <h4>Aaditya Aggarwal</h4>
            <span className="team-role">Core Intern</span>
          </div>
          <div className="team-card">
            <img
              src={core3}
              alt="Core Member"
              className="team-photo"
            />
            <h4>Anushka Choudhary</h4>
            <span className="team-role">Core Intern</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
