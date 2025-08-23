// client/src/pages/Products.jsx
import React from 'react';
import { IoMdClose } from "react-icons/io";
import { BsCheckCircleFill } from "react-icons/bs";
import "../styles/products.css";

const Products = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Sample Product",
      category: "Electronics",
      price: 99.99,
      originalPrice: 129.99,
      image: "https://via.placeholder.com/300",
      inStock: true
    },
    // Add more sample products as needed
  ];

  return (
    <div className="products-container">
      <h1>Our Products</h1>
      
      {/* Filters */}
      <div className="products-filters">
        <div className="filter-group">
          <label className="filter-label">Category:</label>
          <select className="filter-select">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            {/* Add more categories */}
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label">Sort By:</label>
          <select className="filter-select">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-image" 
              />
              {product.discount && (
                <span className="product-badge">Sale</span>
              )}
            </div>
            <div className="product-info">
              <span className="product-category">{product.category}</span>
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">
                {product.description || "Product description goes here..."}
              </p>
              <div className="product-price-container">
                <div>
                  <span className="product-price">${product.price.toFixed(2)}</span>
                  {product.originalPrice > product.price && (
                    <span className="product-original-price">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {product.discount && (
                  <span className="product-discount">Save {product.discount}%</span>
                )}
              </div>
              <div className="product-actions">
                <button className="add-to-cart">Add to Cart</button>
                <button className="wishlist-btn">♡</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="products-pagination">
        <button className="page-button">Previous</button>
        <button className="page-button active">1</button>
        <button className="page-button">2</button>
        <button className="page-button">3</button>
        <button className="page-button">Next</button>
      </div>
    </div>
  );
};

export default Products;