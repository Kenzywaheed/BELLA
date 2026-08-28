import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FaceCarePage from './pages/FaceCarePage';
import SunCarePage from './pages/SunCarePage';
import BodyCarePage from './pages/BodyCarePage';
import HairCarePage from './pages/HairCarePage';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import SkincareQuiz from './pages/SkincareQuiz';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = document.getElementById('intro-video');
    const container = document.getElementById('intro-video-container');

    if (!container) {
      setIsLoading(false);
      return;
    }

    if (!isLoading) {
      container.remove();
      return;
    }

    const handleEnd = () => {
      container.classList.add('hidden');
      setTimeout(() => container.remove(), 100);
      setIsLoading(false);
    };

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Show image for 0.4 seconds on mobile
      const timer = setTimeout(handleEnd, 400);
      return () => clearTimeout(timer);
    } else {
      if (video) {
        video.addEventListener('ended', handleEnd);
        return () => video.removeEventListener('ended', handleEnd);
      } else {
        handleEnd();
      }
    }
  }, [isLoading]);

  return (
    <>
      {/* Main App Content */}
      {!isLoading && (
        <main className="main-content">
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/face-care" element={<FaceCarePage />} />
            <Route path="/sun-care" element={<SunCarePage />} />
            <Route path="/body-care" element={<BodyCarePage />} />
            <Route path="/hair-care" element={<HairCarePage />} />
            <Route path="/face-care/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/quiz" element={<SkincareQuiz />} />
          </Routes>

          <Footer />
          <CartDrawer />
          <Toast />
        </main>
      )}
    </>
  );
}

export default App;
