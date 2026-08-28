import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-logo-container">
          <img src="/bella-removebg-preview.png" alt="Bella Logo" className="footer-logo" />
        </div>



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
