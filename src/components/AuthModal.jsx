import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../index.css'; // ensure styles are imported if needed

function AuthModal() {
  const { login, register, isAuthModalOpen, authView, setAuthView, closeModal, pendingAction, setPendingAction } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset state when modal opens or view changes
  useEffect(() => {
    if (isAuthModalOpen) {
      setError('');
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setConfirmPassword('');
    }
  }, [isAuthModalOpen, authView]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (authView === 'login') {
        await login({ email, password });
        if (pendingAction) {
          pendingAction();
          setPendingAction(null);
        }
        closeModal();
      } else if (authView === 'register') {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        await register({ firstName, lastName, email, password });
        // Optionally switch to login or close and auto-login
        setAuthView('login');
      } else if (authView === 'forgotPassword') {
        // Implement forgot password call here
        // await forgotPassword(email);
        alert('Password reset link sent to ' + email);
        setAuthView('login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>&times;</button>
        
        <h2 className="modal-title">
          {authView === 'login' && 'Welcome Back'}
          {authView === 'register' && 'Create an Account'}
          {authView === 'forgotPassword' && 'Reset Password'}
        </h2>

        {error && <div className="modal-error">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          {authView === 'register' && (
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          {authView !== 'forgotPassword' && (
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
          )}

          {authView === 'register' && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            </div>
          )}

          {authView === 'login' && (
            <div className="forgot-password-link" onClick={() => setAuthView('forgotPassword')}>
              Forgot Password?
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Processing...' : (authView === 'login' ? 'Sign In' : authView === 'register' ? 'Sign Up' : 'Send Link')}
          </button>
        </form>

        <div className="modal-footer">
          {authView === 'login' ? (
            <p>Don't have an account? <span onClick={() => setAuthView('register')}>Register here</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setAuthView('login')}>Log in</span></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
