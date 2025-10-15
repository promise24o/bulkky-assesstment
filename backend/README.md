# E-Commerce Backend API

RESTful API for the e-commerce platform built with Node.js, Express, Prisma, and SQLite.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed database with sample data
npm run prisma:seed

# Start development server
npm run dev

# Start production server
npm start
```

## 📦 Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)
- `npm run prisma:seed` - Seed database with sample data

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products (public)
- `GET /api/products/:id` - Get product by ID (public)
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart/:id` - Update cart item (protected)
- `DELETE /api/cart/:id` - Remove item from cart (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `GET /api/orders/all` - Get all orders (admin only)
- `PATCH /api/orders/:id/status` - Update order status (admin only)

### Wishlist
- `GET /api/wishlist` - Get wishlist (protected)
- `POST /api/wishlist/:productId` - Add to wishlist (protected)
- `DELETE /api/wishlist/:productId` - Remove from wishlist (protected)
- `DELETE /api/wishlist` - Clear wishlist (protected)

## 🗄️ Database Schema

### User
- id (String, Primary Key)
- email (String, Unique)
- password (String, Hashed)
- name (String)
- role (Enum: USER, ADMIN)
- cartItems (Relation)
- orders (Relation)
- wishlist (Relation)

### Product
- id (String, Primary Key)
- name (String)
- description (String)
- price (Float)
- stock (Int)
- imageUrl (String)

### CartItem
- id (String, Primary Key)
- userId (String, Foreign Key)
- productId (String, Foreign Key)
- quantity (Int)
- Unique constraint: [userId, productId]

### Order
- id (String, Primary Key)
- userId (String, Foreign Key)
- total (Float)
- status (Enum: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- items (Relation)

### OrderItem
- id (String, Primary Key)
- orderId (String, Foreign Key)
- productId (String, Foreign Key)
- quantity (Int)
- price (Float)

### Wishlist
- id (String, Primary Key)
- userId (String, Foreign Key)
- productId (String, Foreign Key)
- Unique constraint: [userId, productId]

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Login Flow
1. User sends credentials to `/api/auth/login`
2. Server validates credentials
3. Server generates JWT token
4. Client stores token
5. Client includes token in Authorization header for protected routes

### Authorization Header
```
Authorization: Bearer <your-jwt-token>
```

## 🛡️ Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Role-based authorization
- Input validation with express-validator
- SQL injection prevention (Prisma ORM)
- CORS enabled
- Error handling middleware

## 📝 Request/Response Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "clx...",
      "email": "john@example.com",
      "name": "John Doe",
      "role": "USER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Add to Cart
```bash
POST /api/cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "clx...",
  "quantity": 2
}
```

### Create Order
```bash
POST /api/orders
Authorization: Bearer <token>
```

## 🧪 Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Get Products
curl http://localhost:5000/api/products

# Add to Cart (replace TOKEN)
curl -X POST http://localhost:5000/api/cart \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productId":"PRODUCT_ID","quantity":1}'
```

## 🎯 Default Seed Data

The seed script creates:
- 1 Admin user (admin@ecommerce.com / admin123)
- 1 Regular user (user@example.com / user123)
- 10 Sample products with images from Unsplash

## 🏗️ Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.js            # Seed data
├── src/
│   ├── config/
│   │   └── database.js    # Prisma client
│   ├── controllers/       # Business logic
│   ├── middleware/        # Auth & validation
│   ├── routes/           # API routes
│   ├── utils/            # Helper functions
│   └── server.js         # Express app
├── .env                  # Environment variables
├── package.json
└── README.md
```

## 🚀 Production Considerations

1. **Database**: Switch from SQLite to PostgreSQL or MySQL
2. **Environment**: Set `NODE_ENV=production`
3. **Security**: Use strong JWT_SECRET
4. **CORS**: Configure allowed origins
5. **Rate Limiting**: Add rate limiting middleware
6. **Logging**: Implement proper logging (Winston, Morgan)
7. **Monitoring**: Add APM tools (New Relic, DataDog)
8. **Caching**: Implement Redis for caching
9. **Documentation**: Add Swagger/OpenAPI docs
10. **Testing**: Add unit and integration tests

## 📊 Error Handling

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [] // Optional validation errors
}
```

HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## 🔍 Prisma Studio

To view and edit your database visually:

```bash
npm run prisma:studio
```

This opens a web interface at `http://localhost:5555`

## 📦 Dependencies

### Production
- express - Web framework
- @prisma/client - Database ORM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- cors - CORS middleware
- dotenv - Environment variables
- express-validator - Request validation

### Development
- nodemon - Auto-restart server
- prisma - Prisma CLI

## 🤝 Contributing

1. Follow existing code structure
2. Use async/await for asynchronous operations
3. Add proper error handling
4. Validate all inputs
5. Write meaningful commit messages
6. Test all endpoints before committing

## 📄 License

MIT
