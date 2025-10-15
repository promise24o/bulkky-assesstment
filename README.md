# E-Commerce Platform - Full Stack Assessment

A modern, full-featured e-commerce platform built with Node.js, Express, Prisma, React, and Vite.

## 🚀 Features

### Backend
- **Authentication & Authorization**: JWT-based authentication with role-based access control (USER/ADMIN)
- **Product Management**: Full CRUD operations for products (admin only)
- **Shopping Cart**: Add, update, remove items with stock validation
- **Order Management**: Place orders, view order history, admin order management
- **Wishlist**: Save favorite products for later
- **API Documentation**: Complete Swagger/OpenAPI 3.0 documentation
- **Pagination & Filtering**: Advanced product search, filtering, and sorting
- **Database**: SQLite with Prisma ORM
- **Validation**: Request validation with express-validator
- **Error Handling**: Centralized error handling with custom error classes

### Frontend
- **Modern UI**: Built with React, Vite, and Tailwind CSS
- **State Management**: Zustand for global state
- **Routing**: React Router v6 with protected routes
- **Authentication**: JWT token management with automatic refresh
- **Real-time Notifications**: React Hot Toast for user feedback
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Admin Dashboard**: Product and order management interface

## 📁 Project Structure

```
bulkky-assesstment/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── seed.js                # Database seeding
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js        # Prisma client configuration
│   │   ├── controllers/           # Route controllers
│   │   │   ├── auth.controller.js
│   │   │   ├── cart.controller.js
│   │   │   ├── order.controller.js
│   │   │   ├── product.controller.js
│   │   │   └── wishlist.controller.js
│   │   ├── middleware/
│   │   │   └── auth.js            # Authentication & authorization
│   │   ├── routes/                # API routes
│   │   │   ├── auth.routes.js
│   │   │   ├── cart.routes.js
│   │   │   ├── order.routes.js
│   │   │   ├── product.routes.js
│   │   │   └── wishlist.routes.js
│   │   ├── utils/                 # Utility functions
│   │   │   ├── errorHandler.js
│   │   │   ├── jwt.js
│   │   │   └── validators.js
│   │   └── server.js              # Express app entry point
│   ├── .env                       # Environment variables
│   ├── package.json
│   └── API_DOCUMENTATION.md       # API documentation
│
└── frontend/
    ├── src/
    │   ├── components/            # Reusable components
    │   │   ├── LoadingSpinner.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── ProductCard.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/                 # Page components
    │   │   ├── Admin.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Login.jsx
    │   │   ├── Orders.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── Products.jsx
    │   │   ├── Register.jsx
    │   │   └── Wishlist.jsx
    │   ├── services/
    │   │   └── api.js             # API service layer
    │   ├── store/                 # Zustand stores
    │   │   ├── authStore.js
    │   │   ├── cartStore.js
    │   │   └── wishlistStore.js
    │   ├── App.jsx                # Main app component
    │   ├── main.jsx               # React entry point
    │   └── index.css              # Global styles
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator
- **Password Hashing**: bcryptjs
- **API Documentation**: Swagger/OpenAPI (swagger-jsdoc, swagger-ui-express)

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Generate Prisma client and run migrations:
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Seed the database with sample data:
```bash
npm run prisma:seed
```

6. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5001`

**API Documentation**: `http://localhost:5001/api-docs`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🔑 Default Credentials

### Admin Account
- **Email**: admin@ecommerce.com
- **Password**: admin123

### Regular User Account
- **Email**: user@example.com
- **Password**: user123

## 📚 API Documentation

### Interactive Swagger Documentation
Access the complete interactive API documentation at:
```
http://localhost:5001/api-docs
```

Features:
- **22 documented endpoints** across 5 categories
- **Try it out** - Test endpoints directly from the browser
- **Authentication** - Built-in JWT token support
- **Request/Response schemas** - Complete data models
- **Examples** - Sample requests and responses

### Base URL
```
http://localhost:5001/api
```

### Quick Reference

**Authentication**
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile

**Products** (with pagination & filtering)
- `GET /products?page=1&limit=10&search=...&minPrice=...&maxPrice=...&sortBy=price&order=asc`
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (admin)
- `PUT /products/:id` - Update product (admin)
- `DELETE /products/:id` - Delete product (admin)

**Cart**
- `GET /cart` - Get user cart
- `POST /cart` - Add to cart
- `PUT /cart/:id` - Update cart item
- `DELETE /cart/:id` - Remove from cart
- `DELETE /cart` - Clear cart

**Orders**
- `POST /orders` - Create order from cart
- `GET /orders` - Get user orders
- `GET /orders/:id` - Get order by ID
- `GET /orders/all` - Get all orders (admin)
- `PATCH /orders/:id/status` - Update order status (admin)

**Wishlist**
- `GET /wishlist` - Get wishlist
- `POST /wishlist/:productId` - Add to wishlist
- `DELETE /wishlist/:productId` - Remove from wishlist
- `DELETE /wishlist` - Clear wishlist

## 🎯 Features Implementation

### ✅ Authentication
- [x] User registration with validation
- [x] User login with JWT token
- [x] Protected routes with authentication middleware
- [x] Role-based authorization (USER/ADMIN)
- [x] Token storage and management

### ✅ Products
- [x] Public product listing with pagination
- [x] Product search and filtering
- [x] Product detail page
- [x] Admin product CRUD operations
- [x] Stock management

### ✅ Shopping Cart
- [x] Add products to cart
- [x] Update cart item quantity
- [x] Remove items from cart
- [x] Clear entire cart
- [x] Stock validation
- [x] Cart badge with item count

### ✅ Orders
- [x] Place order from cart
- [x] View order history
- [x] Order details with items
- [x] Admin order management
- [x] Order status updates
- [x] Stock deduction on order

### ✅ Wishlist
- [x] Add products to wishlist
- [x] Remove from wishlist
- [x] View wishlist
- [x] Prevent duplicate entries
- [x] Move from wishlist to cart

### ✅ UI/UX
- [x] Responsive design
- [x] Modern, clean interface
- [x] Loading states
- [x] Error handling
- [x] Toast notifications
- [x] Protected routes
- [x] Admin-only features

## 🏗️ Architecture Highlights

### Backend Architecture
- **Layered Architecture**: Controllers → Services → Database
- **Middleware Pattern**: Authentication, validation, error handling
- **Async Error Handling**: Custom async handler wrapper
- **Database Transactions**: For order creation with stock updates
- **Input Validation**: Request validation with express-validator
- **Security**: Password hashing, JWT tokens, role-based access

### Frontend Architecture
- **Component-Based**: Reusable, modular components
- **State Management**: Zustand for global state (auth, cart, wishlist)
- **Service Layer**: Centralized API calls with axios
- **Protected Routes**: HOC for authentication checks
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Error Boundaries**: Graceful error handling

## 🧪 Testing the Application

1. **Register a new user** or use demo credentials
2. **Browse products** on the home page
3. **Search and filter** products by price
4. **Add products to cart** and update quantities
5. **Add products to wishlist** for later
6. **Place an order** from the cart
7. **View order history** with order details
8. **Login as admin** to manage products and orders
9. **Create/Edit/Delete products** as admin
10. **Update order status** as admin

## 🚀 Production Deployment

### Backend
1. Set `NODE_ENV=production` in environment variables
2. Use PostgreSQL or MySQL instead of SQLite for production
3. Set strong `JWT_SECRET`
4. Enable CORS for specific origins
5. Add rate limiting and security headers
6. Use PM2 or similar for process management

### Frontend
1. Build the production bundle:
```bash
npm run build
```
2. Deploy to Vercel, Netlify, or similar platforms
3. Update `VITE_API_URL` to production backend URL

## 📝 Database Schema

The application uses the following main models:
- **User**: Authentication and user data
- **Product**: Product catalog
- **CartItem**: Shopping cart items
- **Order**: Order records
- **OrderItem**: Order line items
- **Wishlist**: User wishlists

See `backend/prisma/schema.prisma` for the complete schema.

## 🎨 UI Components

- **Navbar**: Navigation with cart badge and user menu
- **ProductCard**: Product display with wishlist and cart actions
- **LoadingSpinner**: Reusable loading indicator
- **ProtectedRoute**: Route wrapper for authentication
- **Admin Dashboard**: Product and order management interface


## 🤝 Contributing

This is an assessment project. For production use, consider:
- Adding comprehensive tests (Jest, React Testing Library)
- Implementing CI/CD pipelines
- Adding API documentation with Swagger
- Implementing caching strategies
- Adding monitoring and logging
- Implementing email notifications
- Adding payment gateway integration

## 📄 License

MIT License - feel free to use this project for learning purposes.

## 👨‍💻 Author

Built as a full-stack assessment project demonstrating modern web development practices.
