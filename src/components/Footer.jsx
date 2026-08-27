import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-logo-container">
          <img src="/bella-removebg-preview.png" alt="Bella Logo" className="footer-logo" />
        </div>

        <nav className="footer-nav">
          <ul className="footer-links">
            <li><Link to="/face-care">Face Care</Link></li>
            <li><Link to="/sun-care">Sun Care</Link></li>
            <li><Link to="/body-care">Body Care</Link></li>
            <li><Link to="/hair-care">Hair Care</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="footer-statement">
          <p>Take time for yourself.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bella. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
