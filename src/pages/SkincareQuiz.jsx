import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function SkincareQuiz() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ type: '', concern: '' });
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleNext = (key, val) => {
    setAnswers(prev => ({ ...prev, [key]: val }));
    setStep(step + 1);
  };

  const getRecommendedRoutine = () => {
    const { type, concern } = answers;
    
    // Dynamic logic based on faceCareProducts data
    if (concern === 'Acne') return { id: 21, name: 'Salicylic Acid Serum', price: 34.00, image: '/serum9.webp' };
    if (concern === 'Aging') return { id: 16, name: 'Retinol Night Serum', price: 55.00, image: '/serum4.webp' };
    if (concern === 'Redness') return { id: 37, name: 'Green Tea Matcha Mask', price: 28.00, image: '/mask4.webp' };
    if (concern === 'Dullness' && type === 'Dry') return { id: 3, name: 'Velvet Cloud Day Cream', price: 35.00, image: '/cream3.webp' };
    if (type === 'Oily') return { id: 28, name: 'Deep Pore Cleanser 3', price: 32.00, image: '/cleanser 3.webp' };
    
    // Default fallback
    return { id: 14, name: 'Thrive Vitamin C Serum', price: 38.00, image: '/serum2.webp' };
  };

  const recommendedRoutine = step === 3 ? getRecommendedRoutine() : null;

  return (
    <div className="page-transition" style={{ maxWidth: '1000px', margin: '0 auto', padding: '6rem 2rem', textAlign: 'center', minHeight: '60vh' }}>
      <h1 className="section-title">Find Your Routine</h1>
      
      {step === 1 && (
        <div className="slide-up">
          <h2 style={{ color: '#FAF9F6', marginBottom: '2rem', fontWeight: 400 }}>What is your primary skin type?</h2>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Oily', 'Dry', 'Combination', 'Sensitive'].map(t => (
              <button key={t} className="auth-btn" onClick={() => handleNext('type', t)} style={{ minWidth: '160px', padding: '0.8rem 1.5rem', background: 'transparent', border: '1px solid #F53C44' }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="slide-up">
          <h2 style={{ color: '#FAF9F6', marginBottom: '2rem', fontWeight: 400 }}>What is your main concern?</h2>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Acne', 'Aging', 'Dullness', 'Redness'].map(c => (
              <button key={c} className="auth-btn" onClick={() => handleNext('concern', c)} style={{ minWidth: '160px', padding: '0.8rem 1.5rem', background: 'transparent', border: '1px solid #F53C44' }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && recommendedRoutine && (
        <div className="slide-up">
          <h2 style={{ color: '#FAF9F6', marginBottom: '1rem', fontWeight: 400 }}>We found your perfect match!</h2>
          <p style={{ color: '#FAF9F6', opacity: 0.7, marginBottom: '3rem' }}>
            Based on your {answers.type} skin and {answers.concern} concerns, here is your curated recommendation.
          </p>
          
          <div style={{ backgroundColor: 'rgba(245, 60, 68, 0.05)', padding: '3rem', borderRadius: '8px', display: 'flex', gap: '2rem', alignItems: 'center', textAlign: 'left', flexWrap: 'wrap', justifyContent: 'center' }}>
            <img src={recommendedRoutine.image} alt={recommendedRoutine.name} style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#FAF9F6', marginBottom: '0.5rem', fontFamily: '"Bodoni Moda", serif' }}>{recommendedRoutine.name}</h3>
              <p style={{ color: '#F53C44', fontWeight: 600, fontSize: '1.2rem', marginBottom: '1.5rem' }}>${recommendedRoutine.price.toFixed(2)}</p>
              <button 
                className="auth-btn" 
                onClick={() => {
                  addToCart(recommendedRoutine);
                  navigate('/cart');
                }}
                style={{ border: 'none', width: '100%' }}
              >
                Add Routine to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Controls */}
      <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        {step === 2 && (
          <button 
            onClick={() => setStep(1)} 
            style={{ background: 'none', border: '1px solid rgba(250, 249, 246, 0.3)', color: '#FAF9F6', padding: '0.5rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontFamily: '"Outfit", sans-serif' }}
          >
            ← Back
          </button>
        )}
        {step === 3 && (
          <button 
            onClick={() => {
              setStep(1);
              setAnswers({ type: '', concern: '' });
            }} 
            style={{ background: 'none', border: '1px solid rgba(250, 249, 246, 0.3)', color: '#FAF9F6', padding: '0.5rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontFamily: '"Outfit", sans-serif' }}
          >
            ↻ Restart Quiz
          </button>
        )}
      </div>
    </div>
  );
}

export default SkincareQuiz;
