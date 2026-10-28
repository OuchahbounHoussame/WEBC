import express from 'express';
import { getAllProducts, getProductById } from '../db.js';

const router = express.Router();

// GET /api/products (from SQL)
router.get('/', (req, res) => {
  try {
    const products = getAllProducts();
    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  try {
    const product = getProductById(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
