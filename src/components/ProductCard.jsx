import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (isAdding) return;
    
    setIsAdding(true);
    addToCart(product);
    
    // Simulate robust feedback for 1 second
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        {product.badge && <span className={`product-badge badge-${product.badge.toLowerCase()}`}>{product.badge}</span>}
        <button className="wishlist-btn" onClick={handleToggleWishlist}>
            {isInWishlist(product.id) ? '♥' : '♡'}
          </button>
          <img src={product.image} alt={product.name} className="product-image" />
          
          <div className={`quick-add-container ${isHovered ? 'visible' : ''}`}>
            <button 
              className={`quick-add-btn ${isAdding ? 'adding' : ''}`} 
              onClick={handleAddToCart}
            >
              {isAdding ? 'Added! ✓' : 'Quick Add'}
            </button>
          </div>
        </div>

        <div className="product-info">
          <p className="product-category">{product.category}</p>
          <h3 className="product-name">{product.name}</h3>
          
          {product.description && <p className="product-description">{product.description}</p>}
          {product.details && <p className="product-details-short">{product.details}</p>}
          
          <div className="product-rating">
            <span className="stars">★ {product.rating}</span>
            <span className="reviews-count">({product.reviews})</span>
          </div>

          <div className="product-price">
            {product.oldPrice && <span className="old-price">${product.oldPrice.toFixed(2)}</span>}
            <span className="current-price">${product.price.toFixed(2)}</span>
          </div>
        </div>
    </div>
  );
}

export default ProductCard;
