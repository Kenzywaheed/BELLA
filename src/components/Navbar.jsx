import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useProtectedAction } from '../hooks/useProtectedAction';

function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const { currentUser, logout } = useAuth();
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistItems } = useWishlist();
  const { resumePendingAction } = useProtectedAction();

  const openModal = (view) => {
    setAuthView(view);
    setIsAuthModalOpen(true);
  };

  useEffect(() => {
    const handleOpenAuthModal = (e) => {
      const view = e.detail || 'login';
      openModal(view);
    };

    window.addEventListener('open-auth-modal', handleOpenAuthModal);
    return () => window.removeEventListener('open-auth-modal', handleOpenAuthModal);
  }, []);

  // Use the new hook to resume actions on login
  useEffect(() => {
    if (currentUser) {
      resumePendingAction();
    }
  }, [currentUser]);

  return (
    <>
      <header className="navbar">
        <div className="logo-container">
          <button className="icon-btn hamburger-menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Menu">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
             </svg>
          </button>
          <Link to="/">
            <img src="/bella-removebg-preview.png" alt="Bella Logo" className="logo" />
          </Link>
        </div>

        <nav className="center-nav">
          <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
            <li><Link to="/face-care" onClick={closeMobileMenu}>Face Care</Link></li>
            <li><Link to="/sun-care" onClick={closeMobileMenu}>Sun Care</Link></li>
            <li><Link to="/body-care" onClick={closeMobileMenu}>Body Care</Link></li>
            <li><Link to="/hair-care" onClick={closeMobileMenu}>Hair Care</Link></li>
            <li><Link to="/quiz" onClick={closeMobileMenu}>Quiz</Link></li>
            
            {/* Mobile Auth Links */}
            {currentUser ? (
              <li className="mobile-only-link"><Link to="#" onClick={(e) => { e.preventDefault(); logout(); closeMobileMenu(); }}>Logout</Link></li>
            ) : (
              <>
                <li className="mobile-only-link"><Link to="#" onClick={(e) => { e.preventDefault(); openModal('login'); closeMobileMenu(); }}>Login</Link></li>
                <li className="mobile-only-link"><Link to="#" onClick={(e) => { e.preventDefault(); openModal('register'); closeMobileMenu(); }}>Register</Link></li>
              </>
            )}
          </ul>
        </nav>

        <div className="right-nav">
          {currentUser ? (
            <>
              <span className="auth-link hide-on-mobile">Hi, {currentUser.firstName || 'User'}</span>
              <button onClick={logout} className="icon-btn hide-on-mobile" aria-label="Logout" title="Logout">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              </button>
            </>
          ) : (
            <>
              <a href="#login" className="auth-link hide-on-mobile" onClick={(e) => { e.preventDefault(); openModal('login'); }}>Login</a>
              <a href="#register" className="auth-btn hide-on-mobile" onClick={(e) => { e.preventDefault(); openModal('register'); }}>Register</a>
            </>
          )}
        <Link to="/wishlist" className="icon-btn wishlist-icon-btn" aria-label="Wishlist">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          {wishlistItems.length > 0 && <span className="cart-badge">{wishlistItems.length}</span>}
        </Link>

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
    
    {location.pathname !== '/' && (
      <div className="mobile-subheader">
        <button className="back-btn-under" onClick={() => navigate(-1)} aria-label="Go Back">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
           </svg>
        </button>
      </div>
    )}

    <AuthModal 
      isOpen={isAuthModalOpen} 
      onClose={() => setIsAuthModalOpen(false)} 
      initialView={authView} 
    />
  </>
  );
}

export default Navbar;
