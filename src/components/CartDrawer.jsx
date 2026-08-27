import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    subtotal 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>
      
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>YOUR BAG</h2>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>✕</button>
        </div>

        {cartItems.length > 0 && (
          <div className="shipping-progress-container">
            <p className="shipping-text">
              {subtotal >= 50 
                ? "You've unlocked FREE shipping!" 
                : `Add $${(50 - subtotal).toFixed(2)} more for FREE shipping`}
            </p>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${Math.min(100, (subtotal / 50) * 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart-msg">Your bag is currently empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  <div className="qty-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
                <button className="remove-item" onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-line">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-line">
              <span>Shipping</span>
              <span>{subtotal >= 50 ? 'FREE' : 'Calculated at checkout'}</span>
            </div>
            <div className="cart-summary-line total-line">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-actions">
              <Link to="/cart" className="view-cart-btn" onClick={() => setIsCartOpen(false)}>VIEW CART</Link>
              <button className="checkout-btn">CHECKOUT</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
