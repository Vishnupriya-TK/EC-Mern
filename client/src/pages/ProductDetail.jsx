import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStar, FaRegStar, FaChevronLeft, FaChevronRight, FaShare, FaTruck, FaShieldAlt, FaExchangeAlt } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/product-detail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [inWishlist, setInWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const [productRes, relatedRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/products/${id}`),
          axios.get(`http://localhost:5000/api/products/related/${id}`)
        ]);
        
        setProduct(productRes.data);
        setRelatedProducts(relatedRes.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle quantity changes
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= (product?.stock || 10)) {
      setQuantity(value);
    }
  };

  // Handle quantity increment/decrement
  const updateQuantity = (increment) => {
    const newQuantity = increment ? quantity + 1 : quantity - 1;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  // Add to cart function
  const handleAddToCart = () => {
    if (!user) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }
    
    // TODO: Implement add to cart functionality
    console.log('Added to cart:', { productId: id, quantity });
    setAddedToCart(true);
    
    // Reset the added to cart message after 3 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  // Toggle wishlist
  const toggleWishlist = () => {
    if (!user) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }
    
    // TODO: Implement wishlist functionality
    setInWishlist(!inWishlist);
    console.log(inWishlist ? 'Removed from wishlist' : 'Added to wishlist', id);
  };

  // Render star rating
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="half" />);
      } else {
        stars.push(<FaRegStar key={i} className="empty" />);
      }
    }
    
    return <div className="rating-stars">{stars}</div>;
  };

  // Format price
  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  // Calculate discount percentage
  const calculateDiscount = (originalPrice, discountPrice) => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
  };

  // Share product
  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: `Check out ${product?.name} on our store`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <p className="error-message">{error || 'Product not found'}</p>
        <button 
          className="retry-btn"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
        <button 
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft /> Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft /> Back
        </button>
        <div className="breadcrumb-links">
          <span onClick={() => navigate('/')}>Home</span>
          <span>/</span>
          <span onClick={() => navigate('/products')}>Shop</span>
          <span>/</span>
          <span className="current">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="product-main">
        {/* Product Images */}
        <div className="product-gallery">
          <div className="main-image">
            <img 
              src={product.images?.[selectedImage] || '/placeholder-product.jpg'} 
              alt={product.name} 
            />
            {product.discount && (
              <span className="discount-badge">-{calculateDiscount(product.price, product.discount)}% OFF</span>
            )}
          </div>
          
          {product.images && product.images.length > 1 && (
            <div className="thumbnail-container">
              <button 
                className="nav-arrow left"
                onClick={() => setSelectedImage(prev => (prev > 0 ? prev - 1 : product.images.length - 1))}
              >
                <FaChevronLeft />
              </button>
              
              <div className="thumbnails">
                {product.images.map((img, index) => (
                  <div 
                    key={index} 
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`${product.name} - ${index + 1}`} />
                  </div>
                ))}
              </div>
              
              <button 
                className="nav-arrow right"
                onClick={() => setSelectedImage(prev => (prev < product.images.length - 1 ? prev + 1 : 0))}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-meta">
              <div className="product-rating">
                {renderRating(product.rating || 0)}
                <span className="review-count">({product.reviewCount || 0} reviews)</span>
              </div>
              <span className="product-sku">SKU: {product.sku || 'N/A'}</span>
              <span className="availability">
                {product.stock > 0 ? (
                  <span className="in-stock">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="out-of-stock">Out of Stock</span>
                )}
              </span>
            </div>
          </div>

          <div className="product-pricing">
            {product.discount && product.discount < product.price ? (
              <div className="price-container">
                <span className="current-price">${formatPrice(product.discount)}</span>
                <span className="original-price">${formatPrice(product.price)}</span>
                <span className="discount-percent">
                  Save {calculateDiscount(product.price, product.discount)}%
                </span>
              </div>
            ) : (
              <div className="price-container">
                <span className="current-price">${formatPrice(product.price)}</span>
              </div>
            )}
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description || 'No description available.'}</p>
          </div>

          {product.specifications && (
            <div className="product-specs">
              <h3>Specifications</h3>
              <div className="specs-grid">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <span className="spec-name">{key}:</span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="product-actions">
            <div className="quantity-selector">
              <button 
                className="quantity-btn" 
                onClick={() => updateQuantity(false)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input 
                type="number" 
                min="1" 
                max={product.stock || 10}
                value={quantity}
                onChange={handleQuantityChange}
                className="quantity-input"
              />
              <button 
                className="quantity-btn"
                onClick={() => updateQuantity(true)}
                disabled={quantity >= (product.stock || 10)}
              >
                +
              </button>
            </div>

            <div className="action-buttons">
              <button 
                className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {addedToCart ? (
                  <>
                    <BsCheckCircleFill /> Added to Cart
                  </>
                ) : (
                  <>
                    <FaShoppingCart /> Add to Cart
                  </>
                )}
              </button>
              
              <button 
                className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
                onClick={toggleWishlist}
              >
                <FaHeart /> {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
              
              <button 
                className="share-btn"
                onClick={shareProduct}
              >
                <FaShare /> Share
              </button>
            </div>
          </div>

          <div className="product-meta-footer">
            <div className="meta-item">
              <FaTruck className="meta-icon" />
              <div>
                <h4>Free Shipping</h4>
                <p>On all orders over $50</p>
              </div>
            </div>
            <div className="meta-item">
              <FaExchangeAlt className="meta-icon" />
              <div>
                <h4>Easy Returns</h4>
                <p>30-day return policy</p>
              </div>
            </div>
            <div className="meta-item">
              <FaShieldAlt className="meta-icon" />
              <div>
                <h4>Secure Payment</h4>
                <p>100% secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="product-tabs">
        <div className="tabs-header">
          <button className="tab active">Description</button>
          <button className="tab">Additional Information</button>
          <button className="tab">Reviews ({product.reviewCount || 0})</button>
        </div>
        
        <div className="tab-content">
          <div className="tab-pane active">
            <h3>Product Description</h3>
            <p>{product.detailedDescription || product.description || 'No detailed description available.'}</p>
            
            <h3>Features</h3>
            <ul className="features-list">
              {product.features?.length > 0 ? (
                product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))
              ) : (
                <li>No features listed.</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h2>You May Also Like</h2>
          <div className="related-products-grid">
            {relatedProducts.slice(0, 4).map(relatedProduct => (
              <div 
                key={relatedProduct._id} 
                className="related-product-card"
                onClick={() => navigate(`/product/${relatedProduct._id}`)}
              >
                <div className="related-product-image">
                  <img 
                    src={relatedProduct.images?.[0] || '/placeholder-product.jpg'} 
                    alt={relatedProduct.name} 
                  />
                  {relatedProduct.discount && (
                    <span className="discount-badge">-{calculateDiscount(relatedProduct.price, relatedProduct.discount)}%</span>
                  )}
                </div>
                <div className="related-product-info">
                  <h3>{relatedProduct.name}</h3>
                  <div className="related-product-price">
                    {relatedProduct.discount ? (
                      <>
                        <span className="current">${formatPrice(relatedProduct.discount)}</span>
                        <span className="original">${formatPrice(relatedProduct.price)}</span>
                      </>
                    ) : (
                      <span className="current">${formatPrice(relatedProduct.price)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
