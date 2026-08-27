import React from 'react';
import { useCart } from '../context/CartContext';

const bundles = [
  {
    id: 'bundle-1',
    name: 'Morning Glow Routine',
    description: 'Start your day with radiant, protected skin. Includes Gentle Cleanser, Vitamin C Serum, and Daily SPF 50.',
    originalPrice: 120,
    price: 95,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop',
    products: ['fc-1', 'fc-2', 'sc-1']
  },
  {
    id: 'bundle-2',
    name: 'Ultimate Body Renewal',
    description: 'Everything you need for silky smooth skin from neck to toe. Includes Exfoliating Scrub, Body Butter, and Glow Oil.',
    originalPrice: 150,
    price: 115,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800&auto=format&fit=crop',
    products: ['bc-1', 'bc-2', 'bc-3']
  }
];

function ProductBundles() {
  const { addToCart } = useCart();

  return (
    <section style={{ padding: '6rem 2rem' }}>
      <h2 className="section-title">Curated Routines</h2>
      <p style={{ textAlign: 'center', color: '#FAF9F6', opacity: 0.8, marginBottom: '4rem', fontFamily: 'Outfit' }}>
        Bundle and save on our most loved skincare sets.
      </p>

      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto' }}>
        {bundles.map(bundle => (
          <div key={bundle.id} style={{ flex: '1', minWidth: '300px', backgroundColor: 'rgba(245, 60, 68, 0.03)', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <img src={bundle.image} alt={bundle.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ fontSize: '1.5rem', fontFamily: '"Bodoni Moda", serif', color: '#FAF9F6', marginBottom: '1rem' }}>{bundle.name}</h3>
              <p style={{ color: '#FAF9F6', opacity: 0.7, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>{bundle.description}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#F53C44' }}>${bundle.price}</span>
                  <span style={{ fontSize: '1rem', color: '#FAF9F6', opacity: 0.5, textDecoration: 'line-through' }}>${bundle.originalPrice}</span>
                </div>
                <span style={{ backgroundColor: '#F53C44', color: '#FFF', fontSize: '0.8rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>SAVE ${(bundle.originalPrice - bundle.price)}</span>
              </div>
              
              <button 
                className="auth-btn" 
                style={{ width: '100%', border: 'none', cursor: 'pointer', textAlign: 'center' }}
                onClick={() => addToCart({ id: bundle.id, name: bundle.name, price: bundle.price, image: bundle.image })}
              >
                Add Routine to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductBundles;
