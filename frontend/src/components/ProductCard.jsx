import { ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useCartStore from '../store/cartStore';
import useWishlistStore from '../store/wishlistStore';
import useAuthStore from '../store/authStore';
import { formatCurrency } from '../utils/currency';

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuthStore();
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    const result = await addToCart(product.id, 1);
    if (result.success) {
      toast.success('Added to cart!');
    } else {
      toast.error(result.error);
    }
  };

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    if (inWishlist) {
      const result = await removeFromWishlist(product.id);
      if (result.success) {
        toast.success('Removed from wishlist');
      } else {
        toast.error(result.error);
      }
    } else {
      const result = await addToWishlist(product.id);
      if (result.success) {
        toast.success('Added to wishlist!');
      } else {
        toast.error(result.error);
      }
    }
  };

  return (
    <Link to={`/products/${product.id}`} className="card group hover:shadow-xl transition-shadow duration-300">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <Heart
            className={`h-5 w-5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {product.name}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {product.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-primary-600">
          {formatCurrency(product.price)}
        </span>
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="btn btn-primary flex items-center space-x-2 disabled:opacity-50"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Add</span>
        </button>
      </div>

      <div className="mt-2 text-sm text-gray-500">
        {product.stock > 0 ? (
          <span>{product.stock} in stock</span>
        ) : (
          <span className="text-red-500">Out of stock</span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
