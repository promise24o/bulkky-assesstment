import { create } from 'zustand';
import { wishlistAPI } from '../services/api';

const useWishlistStore = create((set, get) => ({
  wishlistItems: [],
  loading: false,

  fetchWishlist: async () => {
    set({ loading: true });
    try {
      const response = await wishlistAPI.get();
      const { wishlistItems } = response.data.data;
      set({ wishlistItems, loading: false });
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
      set({ loading: false });
    }
  },

  addToWishlist: async (productId) => {
    try {
      await wishlistAPI.add(productId);
      await get().fetchWishlist();
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add to wishlist';
      return { success: false, error: message };
    }
  },

  removeFromWishlist: async (productId) => {
    try {
      await wishlistAPI.remove(productId);
      await get().fetchWishlist();
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove from wishlist';
      return { success: false, error: message };
    }
  },

  isInWishlist: (productId) => {
    const { wishlistItems } = get();
    return wishlistItems.some(item => item.productId === productId);
  },
}));

export default useWishlistStore;
