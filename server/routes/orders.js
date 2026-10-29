import express from 'express';
import { createOrder, getOrderDetails, refreshOrderTokens, addSubscriber, grantFreebieDownload } from '../db.js';
import { sendFreebieEmail, sendOrderDeliveryEmail } from '../services/mailer.js';

const router = express.Router();

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// POST /api/orders/checkout (SQL Transaction)
router.post('/checkout', (req, res) => {
  try {
    const { email, name, items, paymentMethod } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required to receive your pattern download links.'
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Your cart is empty.'
      });
    }

    // Runs inside SQL Transaction
    const order = createOrder({
      email,
      name,
      items,
      paymentMethod: paymentMethod || 'credit_card'
    });

    // Send order delivery email with download links to customer
    try {
      const appUrl = `${req.protocol}://${req.get('host')}`;
      sendOrderDeliveryEmail({
        to: email,
        customerName: name,
        orderId: order.orderId,
        totalAmount: order.totalAmount,
        downloads: order.downloads,
        appUrl
      }).catch(e => console.error('[Order Delivery Email Error]:', e.message));
    } catch (e) {
      console.error('[Order Email Trigger Error]:', e.message);
    }

    res.status(201).json({
      success: true,
      message: 'Order created and saved in SQL database. Secure download links generated.',
      order
    });
  } catch (err) {
    console.error('SQL Checkout error:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Error processing order'
    });
  }
});

// GET /api/orders/:orderId
router.get('/:orderId', (req, res) => {
  try {
    const order = getOrderDetails(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found in database' });
    }
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/orders/refresh-access
router.post('/refresh-access', (req, res) => {
  try {
    const { orderId, email } = req.body;
    if (!orderId || !email) {
      return res.status(400).json({
        success: false,
        message: 'Both Order ID and purchasing email address are required.'
      });
    }

    const downloads = refreshOrderTokens(orderId, email);
    if (!downloads) {
      return res.status(404).json({
        success: false,
        message: 'No matching order found for this Order ID and email combination.'
      });
    }

    res.json({
      success: true,
      message: 'Fresh secure tokens created in SQL database.',
      downloads
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/orders/subscribe (Newsletter / Freebie leads)
router.post('/subscribe', (req, res) => {
  try {
    const { email, source } = req.body;
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Valid email required' });
    }
    const subscriber = addSubscriber(email, source);
    
    // Grant instant free access token to Shooting Star Keychain (product id 2)
    let freebie = null;
    try {
      freebie = grantFreebieDownload(email, 2);
    } catch (e) {
      console.warn('Could not generate freebie token:', e.message);
    }

    // Send Freebie pattern directly to client's email inbox!
    if (freebie?.downloadUrl) {
      try {
        const appUrl = `${req.protocol}://${req.get('host')}`;
        sendFreebieEmail({
          to: email,
          downloadUrl: freebie.downloadUrl,
          appUrl
        }).catch(e => console.error('[Freebie Email Dispatch Error]:', e.message));
      } catch (e) {
        console.error('[Freebie Email Trigger Error]:', e.message);
      }
    }

    res.json({
      success: true,
      message: 'Subscribed and free Shooting Star Keychain PDF granted!',
      subscriber,
      downloadUrl: freebie?.downloadUrl || null,
      downloadName: freebie?.downloadName || 'Shooting-Star-Keychain-Pattern.pdf'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
