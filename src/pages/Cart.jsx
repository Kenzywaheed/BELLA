import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();

  return (
    <div className="page-transition" style={{ padding: '8rem 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <h1 className="section-title">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '4rem', opacity: 0.8 }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Your cart is currently empty.</p>
          <Link to="/" className="auth-btn" style={{ display: 'inline-block' }}>Continue Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '2', minWidth: '300px' }}>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '2rem', padding: '2rem 0', borderBottom: '1px solid rgba(245, 60, 68, 0.15)', alignItems: 'center' }}>
                <img src={item.image} alt={item.name} style={{ width: '100px', height: '120px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flex: '1' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 500, color: '#FAF9F6' }}>{item.name}</h3>
                  <p style={{ color: '#F53C44', fontWeight: 600 }}>${item.price.toFixed(2)}</p>
                </div>
                <div style={{ border: '1px solid rgba(250, 249, 246, 0.2)', padding: '0.25rem 0.5rem', display: 'flex', gap: '1rem', borderRadius: '4px', alignItems: 'center' }}>
                  <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', color: '#FAF9F6', cursor: 'pointer', fontSize: '1.2rem', padding: '0 0.5rem' }}>-</button>
                  <span style={{ color: '#FAF9F6' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', color: '#FAF9F6', cursor: 'pointer', fontSize: '1.2rem', padding: '0 0.5rem' }}>+</button>
                </div>
                <div style={{ marginLeft: '1rem', fontWeight: 600, color: '#FAF9F6', width: '80px', textAlign: 'right' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  style={{ background: 'none', border: 'none', color: '#FAF9F6', cursor: 'pointer', fontSize: '1.2rem', marginLeft: '1.5rem', opacity: 0.5, transition: 'opacity 0.3s' }}
                  onMouseEnter={e => e.target.style.opacity = 1}
                  onMouseLeave={e => e.target.style.opacity = 0.5}
                >✕</button>
              </div>
            ))}
          </div>
          
          <div style={{ flex: '1', minWidth: '300px', backgroundColor: 'rgba(245, 60, 68, 0.03)', padding: '3rem', borderRadius: '8px', height: 'fit-content' }}>
            <h2 style={{ fontFamily: '"Bodoni Moda", serif', fontSize: '1.5rem', color: '#F53C44', marginBottom: '2rem', borderBottom: '1px solid rgba(245, 60, 68, 0.15)', paddingBottom: '1rem' }}>Order Summary</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: '#FAF9F6', opacity: 0.8 }}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: '#FAF9F6', opacity: 0.8 }}>
              <span>Shipping</span>
              <span>{subtotal >= 50 ? 'FREE' : 'Calculated at checkout'}</span>
            </div>

            <div className="shipping-progress-container" style={{ margin: '1.5rem 0', padding: 0 }}>
              <p className="shipping-text" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                {subtotal >= 50 
                  ? "You've unlocked FREE shipping!" 
                  : `Add $${(50 - subtotal).toFixed(2)} more for FREE shipping`}
              </p>
              <div className="progress-bar-bg" style={{ height: '6px', background: 'rgba(250, 249, 246, 0.1)', borderRadius: '3px' }}>
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${Math.min(100, (subtotal / 50) * 100)}%`, height: '100%', background: '#F53C44', borderRadius: '3px', transition: 'width 0.3s ease' }}
                ></div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(250, 249, 246, 0.1)', fontSize: '1.2rem', fontWeight: 600, color: '#FAF9F6' }}>
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <button className="auth-btn" style={{ width: '100%', marginTop: '3rem', display: 'block', textAlign: 'center', border: 'none' }}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
