import express from 'express';
import { createOrder, getOrderDetails, refreshOrderTokens, addSubscriber, grantFreebieDownload } from '../db.js';
import { sendFreebieEmail, sendOrderDeliveryEmail } from '../services/mailer.js';

const router = express.Router();

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// POST /api/orders/checkout (BLOCKED: direct unpaid checkout disabled)
router.post('/checkout', (req, res) => {
  return res.status(403).json({
    success: false,
    message: 'Direct unpaid checkout is disabled. All orders must be processed through our verified payment gateway (Fourthwall / Stripe).'
  });
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
