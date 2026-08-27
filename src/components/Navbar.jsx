import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState('login');
  const { currentUser, logout } = useAuth();
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistItems } = useWishlist();

  const openModal = (view) => {
    setAuthView(view);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <header className="navbar">
        <div className="logo-container">
          <Link to="/">
            <img src="/bella-removebg-preview.png" alt="Bella Logo" className="logo" />
          </Link>
        </div>

        <nav className="center-nav">
          <ul className="nav-links">
            <li><Link to="/face-care">Face Care</Link></li>
            <li><Link to="/sun-care">Sun Care</Link></li>
            <li><Link to="/body-care">Body Care</Link></li>
            <li><Link to="/hair-care">Hair Care</Link></li>
            <li><Link to="/quiz" style={{ color: '#F53C44', fontWeight: 600 }}>Quiz</Link></li>
          </ul>
        </nav>

        <div className="right-nav">
          {currentUser ? (
            <>
              <span className="auth-link">Hi, {currentUser.firstName || 'User'}</span>
              <button onClick={logout} className="icon-btn" aria-label="Logout" title="Logout">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              </button>
            </>
          ) : (
            <>
              <a href="#login" className="auth-link" onClick={(e) => { e.preventDefault(); openModal('login'); }}>Login</a>
              <a href="#register" className="auth-btn" onClick={(e) => { e.preventDefault(); openModal('register'); }}>Register</a>
            </>
          )}
        <Link to="/wishlist" className="icon-btn wishlist-icon-btn" aria-label="Wishlist">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          {wishlistItems.length > 0 && <span className="cart-badge">{wishlistItems.length}</span>}
        </Link>
        <button className="icon-btn" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
        <button 
          className="icon-btn cart-icon-btn" 
          aria-label="Cart" 
          onClick={(e) => { e.preventDefault(); setIsCartOpen(true); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>
      </div>
    </header>
    
    <AuthModal 
      isOpen={isAuthModalOpen} 
      onClose={() => setIsAuthModalOpen(false)} 
      initialView={authView} 
    />
  </>
  );
}

export default Navbar;
