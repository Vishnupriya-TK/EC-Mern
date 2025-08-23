import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSun, FiMoon, FiMapPin, FiCalendar, FiUsers, FiGlobe, FiStar } from 'react-icons/fi';
import '../styles/home.css';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    travelers: 1,
    includeEssentials: true
  });
  const [bookingComplete, setBookingComplete] = useState(false);
  const [busSchedule, setBusSchedule] = useState(null);

  // Toggle dark/light theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [darkMode]);

  // Auto-rotate featured destinations
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featuredDestinations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const featuredDestinations = [
    {
      id: 1,
      name: 'Bali, Indonesia',
      price: '$1,299',
      originalPrice: '$1,599',
      discount: '20% OFF',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      rating: 4.8,
      days: '7 Days / 6 Nights',
      essentials: [
        { id: 1, name: 'Sunscreen SPF 50+', price: 15, category: 'toiletries' },
        { id: 2, name: 'Beach Towel', price: 25, category: 'beach' },
        { id: 3, name: 'Waterproof Phone Case', price: 20, category: 'electronics' },
      ],
      busSchedule: {
        departure: '08:00 AM',
        arrival: '10:30 AM',
        duration: '2h 30m',
        busType: 'Luxury AC'
      }
    },
    {
      id: 2,
      name: 'Santorini, Greece',
      price: '$1,799',
      originalPrice: '$1,999',
      discount: '15% OFF',
      image: 'https://images.unsplash.com/photo-1533305956505-016c3eefd2b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      rating: 4.9,
      days: '8 Days / 7 Nights',
      essentials: [
        { id: 4, name: 'Comfortable Walking Shoes', price: 45, category: 'clothing' },
        { id: 5, name: 'Travel Adapter', price: 12, category: 'electronics' },
        { id: 6, name: 'Light Jacket', price: 35, category: 'clothing' },
      ],
      busSchedule: {
        departure: '09:30 AM',
        arrival: '01:15 PM',
        duration: '3h 45m',
        busType: 'First Class'
      }
    },
    {
      id: 3,
      name: 'Kyoto, Japan',
      price: '$2,199',
      originalPrice: '$2,499',
      discount: '12% OFF',
      image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      rating: 4.7,
      days: '10 Days / 9 Nights',
      essentials: [
        { id: 7, name: 'Portable WiFi', price: 30, category: 'electronics' },
        { id: 8, name: 'Travel Guide Book', price: 18, category: 'accessories' },
        { id: 9, name: 'Umbrella', price: 15, category: 'accessories' },
      ],
      busSchedule: {
        departure: '10:00 AM',
        arrival: '03:30 PM',
        duration: '5h 30m',
        busType: 'Sleeper Bus'
      }
    }
  ];

  const categories = [
    {
      id: 1,
      name: 'Clothing',
      description: 'Comfortable and stylish apparel for your journey',
      icon: '👕',
      image: 'https://images.unsplash.com/photo-1485967705509-251e2a80c0c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      count: 42
    },
    {
      id: 2,
      name: 'Luggage',
      description: 'Durable and spacious travel bags',
      icon: '🧳',
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      count: 28
    },
    {
      id: 3,
      name: 'Electronics',
      description: 'Essential gadgets for modern travelers',
      icon: '📱',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      count: 36
    },
    {
      id: 4,
      name: 'Snacks',
      description: 'Delicious treats for your journey',
      icon: '🍫',
      image: 'https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      count: 19
    },
    {
      id: 5,
      name: 'Accessories',
      description: 'Must-have travel companions',
      icon: '🧢',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      count: 31
    }
  ];

  const handleBookNow = (destination) => {
    setSelectedDestination(destination);
    setShowBookingForm(true);
    setBookingComplete(false);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Booking submitted:', { ...bookingDetails, destination: selectedDestination.name });
    setBusSchedule(selectedDestination.busSchedule);
    setBookingComplete(true);
  };

  const calculateTotal = () => {
    if (!selectedDestination) return 0;
    let total = parseFloat(selectedDestination.price.replace(/[^0-9.-]+/g, ""));
    if (bookingDetails.includeEssentials) {
      const essentialsTotal = selectedDestination.essentials.reduce(
        (sum, item) => sum + item.price, 0
      );
      total += essentialsTotal;
    }
    return total.toFixed(2);
  };

  const travelFeatures = [
    {
      icon: <FiMapPin className="feature-icon" />,
      title: "Best Destinations",
      description: "Handpicked destinations for the best travel experiences"
    },
    {
      icon: <FiCalendar className="feature-icon" />,
      title: "Easy Booking",
      description: "Simple and fast booking process for your convenience"
    },
    {
      icon: <FiUsers className="feature-icon" />,
      title: "Group Tours",
      description: "Join amazing group tours with fellow travelers"
    },
    {
      icon: <FiGlobe className="feature-icon" />,
      title: "Worldwide Coverage",
      description: "Explore destinations all around the globe"
    }
  ];

  // Destination-based Essentials
  const destinationEssentials = {
    beach: {
      name: 'Beach Vacation',
      items: ['Sunscreen SPF 50+', 'Beach Towel', 'Sunglasses', 'Swimwear', 'Waterproof Phone Case'],
      icon: '🏖️'
    },
    mountain: {
      name: 'Mountain Trek',
      items: ['Hiking Boots', 'Thermal Wear', 'Water Bottle', 'First Aid Kit', 'Energy Bars'],
      icon: '⛰️'
    },
    city: {
      name: 'City Break',
      items: ['Comfortable Shoes', 'Power Bank', 'City Map', 'Travel Adapter', 'Crossbody Bag'],
      icon: '🏙️'
    },
    winter: {
      name: 'Winter Getaway',
      items: ['Thermal Socks', 'Gloves', 'Lip Balm', 'Moisturizer', 'Hand Warmers'],
      icon: '❄️'
    }
  };

  // Snack Categories
  const snackCategories = [
    {
      id: 'healthy',
      name: 'Healthy Bites',
      items: [
        { name: 'Mixed Nuts', price: '$3.99', image: 'https://example.com/nuts.jpg' },
        { name: 'Dried Fruits', price: '$2.99', image: 'https://example.com/fruits.jpg' },
        { name: 'Granola Bars', price: '$1.99', image: 'https://example.com/granola.jpg' },
      ]
    },
    {
      id: 'energy',
      name: 'Energy Boosters',
      items: [
        { name: 'Protein Bars', price: '$2.49', image: 'https://example.com/protein.jpg' },
        { name: 'Trail Mix', price: '$3.49', image: 'https://example.com/trailmix.jpg' },
        { name: 'Energy Gels', price: '$1.99', image: 'https://example.com/gels.jpg' },
      ]
    },
    {
      id: 'treats',
      name: 'Sweet Treats',
      items: [
        { name: 'Chocolate Bars', price: '$1.99', image: 'https://example.com/chocolate.jpg' },
        { name: 'Cookies', price: '$2.49', image: 'https://example.com/cookies.jpg' },
        { name: 'Candy', price: '$1.49', image: 'https://example.com/candy.jpg' },
      ]
    }
  ];

  return (
    <div className={`app ${darkMode ? 'dark-theme' : ''}`}>
      {/* Header with Theme Toggle */}
      <header className="header">
        <div className="logo">Wanderlust</div>
        <nav className="nav-links">
          <Link to="/" className="active">Home</Link>
          <Link to="/about">About</Link>
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

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="glow-text">Discover Your Next Adventure</h1>
          <p>Explore the world's most beautiful destinations with our expert guides</p>
          <div className="search-box">
            <input type="text" placeholder="Where do you want to go?" />
            <button className="btn">Search</button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Destinations</span>
            </div>
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Happy Travelers</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Tour Guides</span>
            </div>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* Featured Destinations */}
      <section className="featured-destinations">
        <div className="section-header">
          <h2>Featured Destinations</h2>
          <p>Explore our most popular travel destinations with exclusive offers</p>
        </div>
        <div className="destination-slider">
          {featuredDestinations.map((destination, index) => (
            <div 
              key={destination.id} 
              className={`destination-card ${index === activeSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${destination.image})` }}
            >
              <div className="discount-badge">{destination.discount}</div>
              <div className="destination-overlay">
                <div className="destination-info">
                  <div className="destination-rating">
                    <FiStar className="star-icon" />
                    <span>{destination.rating}</span>
                  </div>
                  <h3>{destination.name}</h3>
                  <div className="price-container">
                    <span className="original-price">{destination.originalPrice}</span>
                    <span className="discounted-price">{destination.price}</span>
                  </div>
                  <div className="destination-meta">
                    <span>{destination.days}</span>
                  </div>
                  <div className="essentials-preview">
                    <span>Includes: </span>
                    {destination.essentials.slice(0, 3).map(item => (
                      <span key={item.id} className="essential-tag">{item.name}</span>
                    ))}
                  </div>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => handleBookNow(destination)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Find everything you need for your journey in one place</p>
        </div>
        
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <div 
                className="category-image"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="category-overlay"></div>
                <div className="category-icon">
                  {category.icon}
                </div>
              </div>
              <div className="category-content">
                <h3>{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <div className="category-meta">
                  <span className="item-count">{category.count} items</span>
                  <a href="#" className="category-link">
                    Shop Now <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Destination-Based Essentials */}
      <section className="destination-essentials">
        <h2>Essentials by Destination</h2>
        <div className="destination-grid">
          {Object.entries(destinationEssentials).map(([key, dest]) => (
            <div key={key} className="destination-card">
              <div className="destination-header">
                <span className="destination-icon">{dest.icon}</span>
                <h3>{dest.name}</h3>
              </div>
              <ul className="essentials-list">
                {dest.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <button className="btn btn-primary">Shop Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Snack Categories */}
      <section className="snack-categories">
        <h2>Travel Snacks & Drinks</h2>
        {snackCategories.map(category => (
          <div key={category.id} className="snack-category">
            <h3>{category.name}</h3>
            <div className="snack-grid">
              {category.items.map((item, index) => (
                <div key={index} className="snack-card">
                  <div className="snack-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                  <h4>{item.name}</h4>
                  <div className="snack-price">{item.price}</div>
                  <button className="btn btn-outline">Add to Cart</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <h2>Why Travel With Us</h2>
          <p>Experience the difference with our exceptional services</p>
        </div>
        <div className="feature-grid">
          {travelFeatures.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-container">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="section-header">
          <h2>Traveler's Stories</h2>
          <p>What our customers say about their experiences</p>
        </div>
        <div className="testimonial-slider">
          <div className="testimonial">
            <div className="testimonial-content">
              <p>"The best travel experience I've ever had! The guides were knowledgeable and the itinerary was perfect."</p>
              <div className="testimonial-author">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Johnson" />
                <div>
                  <h4>Sarah Johnson</h4>
                  <p>Traveled to Bali</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Get Travel Deals & Updates</h2>
          <p>Subscribe to our newsletter for the latest offers and travel tips</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit" className="btn">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Wanderlust</h3>
            <p>Making travel dreams come true since 2015. Explore the world with confidence.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/destinations">Destinations</Link></li>
              <li><Link to="/tours">Tours</Link></li>
              <li><Link to="/blog">Travel Blog</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: info@wanderlust.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">FB</a>
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="Twitter">TW</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Wanderlust. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
