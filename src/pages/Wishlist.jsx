import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

function Wishlist() {
  const { wishlistItems } = useWishlist();
  const { addToCart } = useCart();

  const handleAddAllToCart = () => {
    wishlistItems.forEach(item => addToCart(item));
  };

  return (
    <div className="face-care-page page-transition">
      <div className="page-hero">
        <h1 className="page-title">YOUR WISHLIST</h1>
        <p className="page-subtitle">Curated favorites just for you.</p>
        
        {wishlistItems.length > 0 && (
          <button 
            className="auth-btn" 
            onClick={handleAddAllToCart}
            style={{ marginTop: '2.5rem', padding: '1rem 3rem', border: '1px solid #F53C44', background: 'rgba(245, 60, 68, 0.1)', cursor: 'pointer', borderRadius: '50px' }}
          >
            Add All to Cart
          </button>
        )}
      </div>

      <div className="product-grid">
        {wishlistItems.length > 0 ? (
          wishlistItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-products">
            <p>Your wishlist is currently empty.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
