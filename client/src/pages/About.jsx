import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi';
import '../styles/about.css';

const About = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark/light theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className={`app ${darkMode ? 'dark-theme' : ''}`}>
      {/* Header with Theme Toggle */}
      <header className="header">
        <div className="logo">Wanderlust</div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about" className="active">About</Link>
          <Link to="/products">Products</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/register" className="btn btn-outline">Register</Link>
          <button 
            className="theme-toggle" 
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </nav>
      </header>

      <div className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="container">
            <h1>About Wanderlust</h1>
            <p className="subtitle">Your Journey Begins Here</p>
          </div>
        </section>

        {/* Main Content */}
        <section className="about-main">
          <div className="container">
            <div className="about-content">
              <div className="about-text">
                <h2>Our Story</h2>
                <p>
                  Founded in 2020, Wanderlust was born from a simple idea: to make travel planning 
                  easier and more enjoyable. Our team of travel enthusiasts has explored every corner 
                  of the globe, and we're passionate about sharing our knowledge and expertise with you.
                </p>
                <p>
                  We believe that travel should be accessible to everyone, which is why we've curated 
                  a selection of the best travel essentials and experiences at prices that won't break 
                  the bank.
                </p>
                
                <div className="about-features">
                  <div className="feature">
                    <div className="feature-icon">✈️</div>
                    <h4>Travel Planning</h4>
                    <p>Expertly curated travel experiences tailored to your preferences.</p>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">🛒</div>
                    <h4>Travel Essentials</h4>
                    <p>Everything you need for your journey in one place.</p>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">🌟</div>
                    <h4>Best Deals</h4>
                    <p>Exclusive offers and discounts for our members.</p>
                  </div>
                </div>
                
                <div className="about-cta">
                  <Link to="/contact" className="btn btn-primary">Contact Us</Link>
                  <Link to="/products" className="btn btn-outline">Explore Products</Link>
                </div>
              </div>
              
              <div className="about-image">
                <img 
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Travel Experience"
                  className="about-img"
                />
                <div className="experience-badge">
                  <span className="years">5+</span>
                  <span className="text">Years of Experience</span>
                </div>
              </div>
            </div>
            
            {/* Team Section */}
            <div className="team-section">
              <h2>Meet Our Team</h2>
              <div className="team-grid">
                {[
                  { name: 'Alex Johnson', role: 'CEO & Founder', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
                  { name: 'Sarah Williams', role: 'Travel Expert', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
                  { name: 'Michael Chen', role: 'Product Manager', image: 'https://randomuser.me/api/portraits/men/75.jpg' },
                  { name: 'Emma Davis', role: 'Customer Support', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
                ].map((member, index) => (
                  <div key={index} className="team-member">
                    <div className="member-image">
                      <img src={member.image} alt={member.name} />
                      <div className="social-links">
                        <a href="#" aria-label="Twitter">🐦</a>
                        <a href="#" aria-label="LinkedIn">💼</a>
                        <a href="#" aria-label="Instagram">📷</a>
                      </div>
                    </div>
                    <h3>{member.name}</h3>
                    <p className="role">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
