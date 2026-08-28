import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export function useProtectedAction() {
  const { currentUser } = useAuth();
  const { addToCart } = useCart();
  const { toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const PENDING_ACTION_KEY = 'bella_pending_action';
  const TTL_MS = 60 * 60 * 1000; // 1 hour

  const executeAction = (type, payload) => {
    try {
      if (type === 'ADD_TO_CART') {
        addToCart(payload);
      } else if (type === 'TOGGLE_WISHLIST') {
        toggleWishlist(payload);
      }
    } catch (err) {
      console.error('Failed to execute protected action', err);
      showToast('Action failed. Please try again.', 'error');
    }
  };

  /**
   * requireAuthAction
   * Wraps an action that requires authentication. If the user is logged in,
   * it executes immediately. If not, it saves the action to sessionStorage
   * and triggers the login modal.
   * 
   * @param {string} type - The type of action (e.g., 'ADD_TO_CART')
   * @param {object} payload - The data required to execute the action
   */
  const requireAuthAction = (type, payload) => {
    if (currentUser) {
      executeAction(type, payload);
    } else {
      const actionData = {
        type,
        payload,
        createdAt: Date.now()
      };
      sessionStorage.setItem(PENDING_ACTION_KEY, JSON.stringify(actionData));
      showToast('Please login first to continue', 'info');
      // Dispatch a custom event to open the AuthModal (handled in Navbar)
      window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: 'login' }));
    }
  };

  /**
   * resumePendingAction
   * Checks sessionStorage for any pending actions and executes them if valid.
   * Clears the storage immediately to prevent duplicate execution.
   */
  const resumePendingAction = () => {
    const saved = sessionStorage.getItem(PENDING_ACTION_KEY);
    if (!saved) return;

    // Clear immediately to prevent replay on strict mode double render
    sessionStorage.removeItem(PENDING_ACTION_KEY);

    try {
      const action = JSON.parse(saved);
      const isExpired = Date.now() - action.createdAt > TTL_MS;
      
      if (!isExpired) {
        executeAction(action.type, action.payload);
      } else {
        console.warn('Pending action expired');
      }
    } catch (err) {
      console.error('Failed to parse pending action', err);
    }
  };

  return { requireAuthAction, resumePendingAction };
}
