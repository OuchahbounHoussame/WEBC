import express from 'express';
import fs from 'fs';
import path from 'path';
import { findDownloadByToken, recordDownload, STORAGE_DIR } from '../db.js';

const router = express.Router();

// GET /api/downloads/:token/status
router.get('/:token/status', (req, res) => {
  try {
    const dt = findDownloadByToken(req.params.token);
    if (!dt) {
      return res.status(404).json({ valid: false, message: 'Invalid or revoked token.' });
    }

    const now = Date.now();
    const isExpired = now > dt.expires_at;
    const isLimitReached = dt.download_count >= dt.max_downloads;

    res.json({
      valid: !isExpired && !isLimitReached,
      productName: dt.download_name,
      remainingDownloads: Math.max(0, dt.max_downloads - dt.download_count),
      maxDownloads: dt.max_downloads,
      downloadCount: dt.download_count,
      expiresAt: dt.expires_at,
      isExpired,
      isLimitReached,
      orderId: dt.order_id
    });
  } catch (err) {
    res.status(500).json({ valid: false, message: err.message });
  }
});

// GET /api/downloads/:token (Protected stream with SQL auditing)
router.get('/:token', (req, res) => {
  try {
    const token = req.params.token;
    const dt = findDownloadByToken(token);

    if (!dt) {
      return res.status(404).type('html').send(`
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="utf-8"/><title>Invalid Link</title>
        <style>body{font-family:sans-serif;background:#fdf8fb;color:#44264a;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;}
        .box{background:white;padding:40px;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,0.08);text-align:center;max-width:480px;}
        h1{color:#cf6a84;font-size:1.6rem;}p{color:#6b4d70;line-height:1.6;}
        a{display:inline-block;margin-top:15px;padding:12px 24px;background:#e8829b;color:white;text-decoration:none;border-radius:50px;font-weight:bold;}</style></head>
        <body><div class="box"><h1>Link Not Found in Database</h1>
        <p>This token is invalid or has been revoked. Please check your order confirmation.</p>
        <a href="/">Return to Store</a></div></body></html>
      `);
    }

    const now = Date.now();
    // 1. Expiration Check
    if (now > dt.expires_at) {
      return res.status(410).type('html').send(`
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="utf-8"/><title>Link Expired</title>
        <style>body{font-family:sans-serif;background:#fdf8fb;color:#44264a;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;}
        .box{background:white;padding:40px;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,0.08);text-align:center;max-width:480px;}
        h1{color:#cf6a84;font-size:1.6rem;}p{color:#6b4d70;line-height:1.6;}
        a{display:inline-block;margin-top:15px;padding:12px 24px;background:#e8829b;color:white;text-decoration:none;border-radius:50px;font-weight:bold;}</style></head>
        <body><div class="box"><h1>Download Link Expired (48h Limit)</h1>
        <p>For your security, links expire after 48 hours. You can retrieve fresh links with your Order ID <strong>${dt.order_id}</strong>.</p>
        <a href="/">Return to Store</a></div></body></html>
      `);
    }

    // 2. Download Count Limit Check
    if (dt.download_count >= dt.max_downloads) {
      return res.status(403).type('html').send(`
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="utf-8"/><title>Download Limit Exceeded</title>
        <style>body{font-family:sans-serif;background:#fdf8fb;color:#44264a;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;}
        .box{background:white;padding:40px;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,0.08);text-align:center;max-width:480px;}
        h1{color:#cf6a84;font-size:1.6rem;}p{color:#6b4d70;line-height:1.6;}
        a{display:inline-block;margin-top:15px;padding:12px 24px;background:#e8829b;color:white;text-decoration:none;border-radius:50px;font-weight:bold;}</style></head>
        <body><div class="box"><h1>Download Limit Exceeded (5/5)</h1>
        <p>This pattern link has reached its maximum download limit of 5. This prevents unauthorized link sharing.</p>
        <a href="/">Return to Store</a></div></body></html>
      `);
    }

    // 3. Resolve physical PDF
    const filePath = path.join(STORAGE_DIR, dt.file_name);
    if (!fs.existsSync(filePath)) {
      console.error(`File missing: ${filePath}`);
      return res.status(500).json({ success: false, message: 'PDF file is temporarily unavailable' });
    }

    // 4. Record audit in SQL
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'] || 'unknown';
    recordDownload(token, clientIp, userAgent);

    // 5. Stream PDF with security headers
    const stat = fs.statSync(filePath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Disposition', `attachment; filename="${dt.download_name}"`);
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } catch (err) {
    console.error('Download error:', err);
    res.status(500).json({ success: false, message: 'Internal server error while streaming file' });
  }
});

export default router;
