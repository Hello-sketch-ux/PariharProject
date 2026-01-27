import React from "react";
import "./about.css";

const About: React.FC = () => {
  return (
    <section className="about-wrapper">
      <div className="about-intro">
        <h1>Empowering Health, Enhancing Life</h1>
        <p>
          Parihar India is on a mission to transform the public restroom
          experience with smart, sustainable hygiene solutions. From toilet seat
          covers to real-time restroom tracking, we’re rethinking how hygiene
          works in everyday life..
        </p>
      </div>

      <div className="about-section">
        <h2>What is Parihar?</h2>
        <p>
          <b>Parihar</b> is derived from Sanskrit, meaning 'the removal of
          difficulty.' Inspired by the ancient wisdom of <i>Naga Mudra</i> — a
          gesture that encourages clarity and insight — Parihar India applies
          this philosophy to a very modern challenge: public restroom hygiene..
        </p>
        <p>
          Our eco-friendly toilet seat covers are designed for a universal fit
          and dissolve in water, providing a hygienic, safe, and hassle-free
          experience. Backed by research and driven by sustainability, our
          innovation eliminates the risks of cross-contamination and poor
          sanitation.
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
            <b>Good Health & Well-being</b> – Prevents UTIs, infections, and
            cross-contamination
          </li>
          <li>
            <b>Clean Water & Sanitation</b> – Promotes hygienic practices in
            public restrooms
          </li>
          <li>
            <b>Innovation & Infrastructure</b> – Builds smart solutions in the
            sanitation industry
          </li>
          <li>
            <b>Responsible Consumption</b> – Eco-friendly materials and minimal
            waste
          </li>
          <li>
            <b>Climate Action</b> – Reducing environmental impact through
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
          Parihar India is more than a product — it’s a movement. Towards safer
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
    </section>
  );
};

export default About;
