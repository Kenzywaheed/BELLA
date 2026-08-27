import React from 'react';
import AboutSection from '../components/AboutSection';
import ReviewsSection from '../components/ReviewsSection';
import PolicySection from '../components/PolicySection';

function HomePage() {
  return (
    <div className="page-transition">
      <div className="hero-section">
        <img src="/she.webp" alt="Skincare Hero" className="hero" />
      </div>
      <AboutSection />
      <ReviewsSection />
      <PolicySection />
    </div>
  );
}

export default HomePage;
