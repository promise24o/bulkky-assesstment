import express from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from '../controllers/wishlist.controller.js';
import { authenticate } from '../middleware/auth.js';
import { productIdParamValidation, validate } from '../utils/validators.js';

const router = express.Router();

router.use(authenticate);

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist items retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', getWishlist);

/**
 * @swagger
 * /wishlist/{productId}:
 *   post:
 *     summary: Add product to wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID to add to wishlist
 *     responses:
 *       201:
 *         description: Product added to wishlist
 *       400:
 *         description: Product already in wishlist
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 */
router.post('/:productId', productIdParamValidation, validate, addToWishlist);

/**
 * @swagger
 * /wishlist/{productId}:
 *   delete:
 *     summary: Remove product from wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID to remove from wishlist
 *     responses:
 *       200:
 *         description: Product removed from wishlist
 *       404:
 *         description: Product not found in wishlist
 *       401:
 *         description: Unauthorized
 */
router.delete('/:productId', productIdParamValidation, validate, removeFromWishlist);

/**
 * @swagger
 * /wishlist:
 *   delete:
 *     summary: Clear entire wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist cleared successfully
 *       401:
 *         description: Unauthorized
 */
router.delete('/', clearWishlist);

export default router;
