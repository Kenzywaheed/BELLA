import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { currentUser, openModal, setPendingAction } = useAuth();
  const { showToast } = useToast();
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('bella_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bella_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    if (!currentUser) {
      showToast('Please login first to manage your wishlist', 'info');
      setPendingAction(() => () => {
        setWishlistItems(prev => {
          const exists = prev.find(item => item.id === product.id);
          if (exists) {
            showToast(`Removed ${product.name} from wishlist`, 'info');
            return prev.filter(item => item.id !== product.id);
          } else {
            showToast(`Added ${product.name} to wishlist`, 'success');
            return [...prev, product];
          }
        });
      });
      openModal('login');
      return;
    }

    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from wishlist`, 'info');
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`Added ${product.name} to wishlist`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      toggleWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
