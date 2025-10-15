import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { toast } from 'react-hot-toast';
import useCartStore from '../store/cartStore';
import { ordersAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatCurrency } from '../utils/currency';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, total, fetchCart, updateCartItem, removeFromCart, loading } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (id, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;

    const result = await updateCartItem(id, newQuantity);
    if (!result.success) {
      toast.error(result.error);
    }
  };

  const handleRemove = async (id) => {
    const result = await removeFromCart(id);
    if (result.success) {
      toast.success('Item removed from cart');
    } else {
      toast.error(result.error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await ordersAPI.create();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="card flex items-center space-x-4">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                <p className="text-gray-600">{formatCurrency(item.product.price)}</p>
                <p className="text-sm text-gray-500">Stock: {item.product.stock}</p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                  disabled={item.quantity >= item.product.stock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(item.product.price * item.quantity)}
                </p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-600 hover:text-red-800 mt-2"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <button onClick={handleCheckout} className="w-full btn btn-primary">
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full btn btn-secondary mt-3"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
