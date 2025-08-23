// client/src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">E-Commerce</h3>
            <p>Your one-stop shop for all your needs.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-400">Home</a></li>
              <li><a href="/products" className="hover:text-gray-400">Products</a></li>
              <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
              <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="/faq" className="hover:text-gray-400">FAQ</a></li>
              <li><a href="/shipping" className="hover:text-gray-400">Shipping</a></li>
              <li><a href="/returns" className="hover:text-gray-400">Returns</a></li>
              <li><a href="/privacy" className="hover:text-gray-400">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact Us</h4>
            <p>Email: support@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} E-Commerce Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;