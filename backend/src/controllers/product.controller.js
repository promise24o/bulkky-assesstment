import prisma from '../config/database.js';
import { AppError, asyncHandler } from '../utils/errorHandler.js';

export const getAllProducts = asyncHandler(async (req, res) => {
  const { 
    page = 1, 
    limit = 10, 
    search, 
    minPrice, 
    maxPrice,
    sortBy = 'createdAt',
    order = 'desc'
  } = req.query;

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);

  // Build where clause
  const where = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice);
    if (maxPrice) where.price.lte = parseFloat(maxPrice);
  }

  // Build orderBy clause
  const validSortFields = ['price', 'name', 'createdAt', 'stock'];
  const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
  const sortOrder = order === 'asc' ? 'asc' : 'desc';

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take,
      orderBy: { [sortField]: sortOrder },
    }),
    prisma.product.count({ where }),
  ]);

  res.json({
    success: true,
    data: {
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / take),
        hasNextPage: skip + take < total,
        hasPrevPage: parseInt(page) > 1,
      },
      filters: {
        search: search || null,
        minPrice: minPrice ? parseFloat(minPrice) : null,
        maxPrice: maxPrice ? parseFloat(maxPrice) : null,
        sortBy: sortField,
        order: sortOrder,
      },
    },
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.json({
    success: true,
    data: { product },
  });
});

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, imageUrl } = req.body;

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      imageUrl,
    },
  });

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: { product },
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, imageUrl } = req.body;

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price: parseFloat(price) }),
      ...(stock !== undefined && { stock: parseInt(stock) }),
      ...(imageUrl && { imageUrl }),
    },
  });

  res.json({
    success: true,
    message: 'Product updated successfully',
    data: { product },
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.product.delete({
    where: { id },
  });

  res.json({
    success: true,
    message: 'Product deleted successfully',
  });
});
