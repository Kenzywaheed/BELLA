import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProtectedAction } from '../hooks/useProtectedAction';

// Mock product data for the demo
const mockProduct = {
  id: 'demo-1',
  name: 'Velvet Cloud Day Cream',
  category: 'Face Cream',
  price: 35.00,
  rating: 4.7,
  reviews: 84,
  image: '/cream3.webp',
  description: 'CALICUM',
  details: 'This cloud-like cream melts instantly into the skin, providing a matte yet hydrated finish that serves as the perfect base for your daily makeup.'
};

const visualReviews = [
  { id: 1, name: 'Eleanor V.', text: 'Bella completely transformed my evening routine. It feels like a spa retreat every single night.', rating: 5, date: '2 days ago', photo: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Sophia R.', text: 'The most luxurious and delicate textures I have ever put on my skin. I feel glowing.', rating: 5, date: '1 week ago', photo: 'https://i.pravatar.cc/150?img=5' },
  { id: 3, name: 'Mia T.', text: 'Finally, a brand that understands that skincare is about taking a moment to breathe and love yourself. The packaging is stunning.', rating: 4, date: '3 weeks ago', photo: 'https://i.pravatar.cc/150?img=9' }
];

function ProductDetails() {
  const { productId } = useParams();
  const { requireAuthAction } = useProtectedAction();
  const [qty, setQty] = useState(1);

  // In a real app, we would fetch the product by productId here.
  const product = mockProduct;

  return (
    <div className="page-transition" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', marginBottom: '6rem' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', aspectRatio: '4/5' }} />
        </div>
        <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ color: '#F53C44', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{product.category}</p>
          <h1 style={{ fontFamily: '"Bodoni Moda", serif', fontSize: '2.5rem', color: '#FAF9F6', marginBottom: '1rem' }}>{product.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ color: '#F53C44' }}>{'★'.repeat(Math.floor(product.rating))}</span>
            <span style={{ color: '#FAF9F6', opacity: 0.6 }}>({product.reviews} reviews)</span>
          </div>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FAF9F6', marginBottom: '2rem' }}>${product.price.toFixed(2)}</p>
          <p style={{ fontSize: '1.1rem', color: '#FAF9F6', opacity: 0.9, fontStyle: 'italic', marginBottom: '1rem' }}>{product.description}</p>
          <p style={{ color: '#FAF9F6', opacity: 0.7, lineHeight: 1.6, marginBottom: '2.5rem' }}>{product.details}</p>
          
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ border: '1px solid rgba(250, 249, 246, 0.3)', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '1.5rem', borderRadius: '4px' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: 'none', border: 'none', color: '#FAF9F6', cursor: 'pointer' }}>-</button>
              <span style={{ color: '#FAF9F6' }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ background: 'none', border: 'none', color: '#FAF9F6', cursor: 'pointer' }}>+</button>
            </div>
            <button 
              className="auth-btn" 
              style={{ flex: 1, border: 'none', cursor: 'pointer', textAlign: 'center' }}
              onClick={() => {
                for(let i=0; i<qty; i++) requireAuthAction('ADD_TO_CART', product);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <section style={{ borderTop: '1px solid rgba(245, 60, 68, 0.15)', paddingTop: '4rem' }}>
        <h2 style={{ fontFamily: '"Bodoni Moda", serif', fontSize: '2rem', color: '#FAF9F6', marginBottom: '3rem', textAlign: 'center' }}>Real Results, Real People</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {visualReviews.map(review => (
            <div key={review.id} style={{ backgroundColor: 'rgba(245, 60, 68, 0.03)', padding: '2rem', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <img src={review.photo} alt={review.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ color: '#FAF9F6', margin: '0 0 0.25rem 0' }}>{review.name}</h4>
                  <div style={{ color: '#F53C44', fontSize: '0.8rem' }}>{'★'.repeat(review.rating)}</div>
                </div>
                <span style={{ color: '#FAF9F6', opacity: 0.5, fontSize: '0.8rem', marginLeft: 'auto' }}>{review.date}</span>
              </div>
              <p style={{ color: '#FAF9F6', opacity: 0.8, lineHeight: 1.5, fontStyle: 'italic' }}>"{review.text}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
