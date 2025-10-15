import { create } from 'zustand';
import { cartAPI } from '../services/api';

const useCartStore = create((set, get) => ({
  cartItems: [],
  total: 0,
  itemCount: 0,
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const response = await cartAPI.get();
      const { cartItems, total, itemCount } = response.data.data;
      set({ cartItems, total, itemCount, loading: false });
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      set({ loading: false });
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      await cartAPI.add({ productId, quantity });
      await get().fetchCart();
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add to cart';
      return { success: false, error: message };
    }
  },

  updateCartItem: async (id, quantity) => {
    try {
      await cartAPI.update(id, { quantity });
      await get().fetchCart();
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update cart';
      return { success: false, error: message };
    }
  },

  removeFromCart: async (id) => {
    try {
      await cartAPI.remove(id);
      await get().fetchCart();
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove from cart';
      return { success: false, error: message };
    }
  },

  clearCart: async () => {
    try {
      await cartAPI.clear();
      set({ cartItems: [], total: 0, itemCount: 0 });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to clear cart';
      return { success: false, error: message };
    }
  },
}));

export default useCartStore;
