import prisma from '../config/database.js';
import { AppError, asyncHandler } from '../utils/errorHandler.js';

export const getWishlist = asyncHandler(async (req, res) => {
  const wishlistItems = await prisma.wishlist.findMany({
    where: { userId: req.user.id },
    include: {
      product: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json({
    success: true,
    data: {
      wishlistItems,
      count: wishlistItems.length,
    },
  });
});

export const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  // Check if product exists
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Check if already in wishlist
  const existingItem = await prisma.wishlist.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (existingItem) {
    throw new AppError('Product already in wishlist', 400);
  }

  // Add to wishlist
  const wishlistItem = await prisma.wishlist.create({
    data: {
      userId,
      productId,
    },
    include: {
      product: true,
    },
  });

  res.status(201).json({
    success: true,
    message: 'Product added to wishlist',
    data: { wishlistItem },
  });
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  // Find wishlist item
  const wishlistItem = await prisma.wishlist.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (!wishlistItem) {
    throw new AppError('Product not found in wishlist', 404);
  }

  // Remove from wishlist
  await prisma.wishlist.delete({
    where: {
      id: wishlistItem.id,
    },
  });

  res.json({
    success: true,
    message: 'Product removed from wishlist',
  });
});

export const clearWishlist = asyncHandler(async (req, res) => {
  await prisma.wishlist.deleteMany({
    where: { userId: req.user.id },
  });

  res.json({
    success: true,
    message: 'Wishlist cleared successfully',
  });
});
