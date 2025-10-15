import prisma from '../config/database.js';
import { AppError, asyncHandler } from '../utils/errorHandler.js';

export const getCart = asyncHandler(async (req, res) => {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId: req.user.id },
    include: {
      product: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const total = cartItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  res.json({
    success: true,
    data: {
      cartItems,
      total: parseFloat(total.toFixed(2)),
      itemCount: cartItems.length,
    },
  });
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  // Check if product exists and has enough stock
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  if (product.stock < quantity) {
    throw new AppError('Insufficient stock available', 400);
  }

  // Check if item already exists in cart
  const existingCartItem = await prisma.cartItem.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  let cartItem;

  if (existingCartItem) {
    // Update quantity
    const newQuantity = existingCartItem.quantity + quantity;

    if (product.stock < newQuantity) {
      throw new AppError('Insufficient stock available', 400);
    }

    cartItem = await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: newQuantity },
      include: { product: true },
    });
  } else {
    // Create new cart item
    cartItem = await prisma.cartItem.create({
      data: {
        userId,
        productId,
        quantity,
      },
      include: { product: true },
    });
  }

  res.status(201).json({
    success: true,
    message: 'Product added to cart',
    data: { cartItem },
  });
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const userId = req.user.id;

  // Find cart item
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      id,
      userId,
    },
    include: { product: true },
  });

  if (!cartItem) {
    throw new AppError('Cart item not found', 404);
  }

  // Check stock availability
  if (cartItem.product.stock < quantity) {
    throw new AppError('Insufficient stock available', 400);
  }

  // Update cart item
  const updatedCartItem = await prisma.cartItem.update({
    where: { id },
    data: { quantity },
    include: { product: true },
  });

  res.json({
    success: true,
    message: 'Cart item updated',
    data: { cartItem: updatedCartItem },
  });
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  // Verify cart item belongs to user
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!cartItem) {
    throw new AppError('Cart item not found', 404);
  }

  await prisma.cartItem.delete({
    where: { id },
  });

  res.json({
    success: true,
    message: 'Product removed from cart',
  });
});

export const clearCart = asyncHandler(async (req, res) => {
  await prisma.cartItem.deleteMany({
    where: { userId: req.user.id },
  });

  res.json({
    success: true,
    message: 'Cart cleared successfully',
  });
});
