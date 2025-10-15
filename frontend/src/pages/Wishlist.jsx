import { useEffect } from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useWishlistStore from '../store/wishlistStore';
import useCartStore from '../store/cartStore';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatCurrency } from '../utils/currency';

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlistItems, fetchWishlist, removeFromWishlist, loading } = useWishlistStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    const result = await removeFromWishlist(productId);
    if (result.success) {
      toast.success('Removed from wishlist');
    } else {
      toast.error(result.error);
    }
  };

  const handleAddToCart = async (product) => {
    if (product.stock === 0) {
      toast.error('Product is out of stock');
      return;
    }

    const result = await addToCart(product.id, 1);
    if (result.success) {
      toast.success('Added to cart!');
      await removeFromWishlist(product.id);
    } else {
      toast.error(result.error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Heart className="mx-auto h-24 w-24 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Save items you love for later!</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="card group">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-full h-48 object-cover cursor-pointer group-hover:scale-110 transition-transform duration-300"
                onClick={() => navigate(`/products/${item.product.id}`)}
              />
              {item.product.stock === 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Out of Stock</span>
                </div>
              )}
            </div>

            <h3
              className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-primary-600"
              onClick={() => navigate(`/products/${item.product.id}`)}
            >
              {item.product.name}
            </h3>

            <p className="text-2xl font-bold text-primary-600 mb-4">
              {formatCurrency(item.product.price)}
            </p>

            <div className="flex space-x-2">
              <button
                onClick={() => handleAddToCart(item.product)}
                disabled={item.product.stock === 0}
                className="flex-1 btn btn-primary flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => handleRemove(item.product.id)}
                className="btn btn-secondary p-2"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
