# E-Commerce Frontend

Modern, responsive e-commerce frontend built with React, Vite, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── LoadingSpinner.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/              # Page components
│   │   ├── Admin.jsx       # Admin dashboard
│   │   ├── Cart.jsx        # Shopping cart
│   │   ├── Login.jsx       # Login page
│   │   ├── Orders.jsx      # Order history
│   │   ├── ProductDetail.jsx
│   │   ├── Products.jsx    # Product listing
│   │   ├── Register.jsx    # Registration
│   │   └── Wishlist.jsx    # Wishlist
│   ├── services/
│   │   └── api.js          # API service layer
│   ├── store/              # Zustand stores
│   │   ├── authStore.js    # Authentication state
│   │   ├── cartStore.js    # Cart state
│   │   └── wishlistStore.js # Wishlist state
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── .env
```

## 🔧 Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🎨 Features

### User Features
- ✅ User registration and login
- ✅ Browse products with search and filters
- ✅ View product details
- ✅ Add products to cart
- ✅ Update cart quantities
- ✅ Place orders
- ✅ View order history
- ✅ Add products to wishlist
- ✅ Move wishlist items to cart

### Admin Features
- ✅ Product management (CRUD)
- ✅ Order management
- ✅ Update order status
- ✅ View all orders with customer details

### UI/UX Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states
- ✅ Error handling
- ✅ Toast notifications
- ✅ Protected routes
- ✅ Cart badge with item count
- ✅ Wishlist heart icon
- ✅ Modern, clean interface

## 🗂️ State Management

### Auth Store (`authStore.js`)
```javascript
{
  user: null | User,
  token: null | string,
  isAuthenticated: boolean,
  loading: boolean,
  error: null | string,
  login: (credentials) => Promise,
  register: (userData) => Promise,
  logout: () => void
}
```

### Cart Store (`cartStore.js`)
```javascript
{
  cartItems: [],
  total: 0,
  itemCount: 0,
  loading: boolean,
  fetchCart: () => Promise,
  addToCart: (productId, quantity) => Promise,
  updateCartItem: (id, quantity) => Promise,
  removeFromCart: (id) => Promise,
  clearCart: () => Promise
}
```

### Wishlist Store (`wishlistStore.js`)
```javascript
{
  wishlistItems: [],
  loading: boolean,
  fetchWishlist: () => Promise,
  addToWishlist: (productId) => Promise,
  removeFromWishlist: (productId) => Promise,
  isInWishlist: (productId) => boolean
}
```

## 🎯 Routes

| Route | Component | Protected | Admin Only |
|-------|-----------|-----------|------------|
| `/` | Products | No | No |
| `/products/:id` | ProductDetail | No | No |
| `/login` | Login | No | No |
| `/register` | Register | No | No |
| `/cart` | Cart | Yes | No |
| `/orders` | Orders | Yes | No |
| `/wishlist` | Wishlist | Yes | No |
| `/admin` | Admin | Yes | Yes |

## 🎨 Tailwind CSS Utilities

Custom utility classes defined in `index.css`:

```css
.btn - Base button styles
.btn-primary - Primary button (blue)
.btn-secondary - Secondary button (gray)
.btn-danger - Danger button (red)
.btn-outline - Outline button
.input - Input field styles
.card - Card container styles
.badge - Badge styles
```

## 🔐 Authentication Flow

1. User logs in via `/login`
2. JWT token stored in localStorage
3. Token added to all API requests via axios interceptor
4. Protected routes check authentication status
5. Unauthorized requests redirect to login
6. Logout clears token and redirects

## 📱 Responsive Design

Breakpoints (Tailwind defaults):
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 🎨 Color Scheme

Primary colors (blue):
- 50: #f0f9ff
- 100: #e0f2fe
- 500: #0ea5e9 (main)
- 600: #0284c7 (hover)
- 700: #0369a1 (active)

## 🧩 Component Examples

### ProductCard
```jsx
<ProductCard product={product} />
```

### LoadingSpinner
```jsx
<LoadingSpinner size="sm|md|lg" />
```

### ProtectedRoute
```jsx
<ProtectedRoute adminOnly={false}>
  <YourComponent />
</ProtectedRoute>
```

## 🔔 Toast Notifications

```javascript
import { toast } from 'react-hot-toast';

toast.success('Success message');
toast.error('Error message');
toast.loading('Loading...');
```

## 🚀 Build & Deploy

### Development
```bash
npm run dev
```
Runs on `http://localhost:3000`

### Production Build
```bash
npm run build
```
Output in `dist/` directory

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Build
npm run build

# Deploy dist/ folder to Netlify
```

## 🎯 Best Practices

1. **Component Organization**
   - Keep components small and focused
   - Use functional components with hooks
   - Extract reusable logic into custom hooks

2. **State Management**
   - Use Zustand for global state
   - Use local state for component-specific data
   - Avoid prop drilling

3. **API Calls**
   - Centralize API calls in `services/api.js`
   - Handle errors gracefully
   - Show loading states

4. **Styling**
   - Use Tailwind utility classes
   - Create custom utilities for repeated patterns
   - Keep inline styles minimal

5. **Performance**
   - Lazy load routes if needed
   - Optimize images
   - Minimize re-renders

## 🐛 Common Issues

### CORS Errors
Ensure backend CORS is configured to allow frontend origin.

### API Connection Failed
Check `VITE_API_URL` in `.env` file.

### Token Expired
Tokens expire after 7 days. Login again to get a new token.

### Build Errors
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📦 Dependencies

### Production
- react - UI library
- react-dom - React DOM renderer
- react-router-dom - Routing
- axios - HTTP client
- zustand - State management
- react-hot-toast - Notifications
- lucide-react - Icons

### Development
- @vitejs/plugin-react - Vite React plugin
- tailwindcss - CSS framework
- autoprefixer - CSS post-processor
- postcss - CSS transformer
- vite - Build tool

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Router](https://reactrouter.com)

## 📄 License

MIT
