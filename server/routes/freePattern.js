/**
 * Free Pattern Delivery & Marketing Automation Router
 * CozyStitches — Secure, GDPR-Friendly Email Funnel
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { sendBrevoTransactionalEmail, subscribeBrevoContact, unsubscribeBrevoContact, maskEmail } from '../services/brevo.js';
import { createFreebieToken, verifyFreebieToken } from '../services/token.js';
import { STORAGE_DIR, addSubscriber } from '../db.js';

const router = express.Router();

// ── In-Memory Rate Limiting & Anti-Abuse ────────────────────────
const ipRateMap = new Map();
const emailRateMap = new Map();

// Periodic cleanup of expired rate limits every 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamps] of ipRateMap.entries()) {
    const valid = timestamps.filter(t => now - t < 15 * 60 * 1000);
    if (valid.length === 0) ipRateMap.delete(key);
    else ipRateMap.set(key, valid);
  }
  for (const [key, timestamps] of emailRateMap.entries()) {
    const valid = timestamps.filter(t => now - t < 5 * 60 * 1000);
    if (valid.length === 0) emailRateMap.delete(key);
    else emailRateMap.set(key, valid);
  }
}, 30 * 60 * 1000).unref();

function checkRateLimit(ip, email) {
  const now = Date.now();

  // 1. IP rate limit: max 6 requests per 15 minutes
  const ipHistory = (ipRateMap.get(ip) || []).filter(t => now - t < 15 * 60 * 1000);
  if (ipHistory.length >= 6) {
    return { limited: true, message: 'Too many requests from your network. Please wait a few minutes before trying again.' };
  }
  ipHistory.push(now);
  ipRateMap.set(ip, ipHistory);

  // 2. Email rate limit: max 2 requests per 5 minutes to prevent spamming the same inbox
  const emailHistory = (emailRateMap.get(email) || []).filter(t => now - t < 5 * 60 * 1000);
  if (emailHistory.length >= 2) {
    return { limited: true, message: 'A pattern link was recently sent to this email. Please check your inbox and spam folder.' };
  }
  emailHistory.push(now);
  emailRateMap.set(email, emailHistory);

  return { limited: false };
}

function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  if (email.length > 254) return false;
  // RFC 5322 compliant regex for web forms
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return re.test(email.trim());
}

function getSiteUrl(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '');
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'www.shopcozystitches.com';
  return `${proto}://${host}`;
}

// ── 1. POST /api/free-pattern (Submit email for free PDF) ───────
router.post('/', async (req, res) => {
  const { email, marketingConsent, hp, b_hp_website } = req.body || {};
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || '127.0.0.1';

  // 1. Honeypot check (Bot sinkhole)
  if (hp || b_hp_website) {
    console.log(`[FreePattern] 🤖 Bot detected via honeypot field from ${clientIp}. Responding with 200 OK.`);
    return res.json({
      success: true,
      message: 'Your free pattern is on its way to your inbox!'
    });
  }

  // 2. Email Validation
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.'
    });
  }

  const cleanEmail = email.trim().toLowerCase();
  const masked = maskEmail(cleanEmail);

  // 3. Rate Limiting Check
  const rateLimit = checkRateLimit(clientIp, cleanEmail);
  if (rateLimit.limited) {
    return res.status(429).json({
      success: false,
      message: rateLimit.message
    });
  }

  // 4. Generate Cryptographically Signed Download Token
  const token = createFreebieToken(cleanEmail, 48); // 48-hour validity
  const siteUrl = getSiteUrl(req);
  const downloadUrl = `${siteUrl}/api/free-pattern/download/${token}`;

  // 5. Build Branded Email Template
  const emailSubject = 'Your Free Shooting Star Crochet Pattern PDF ⭐';

  const emailText = `Hi there!

Thanks for visiting CozyStitches.

Your free Shooting Star Keychain crochet pattern is ready.

Click below to download your PDF and start crocheting:
${downloadUrl}

(For your security, this download link is active for 48 hours. You can request a fresh link anytime on our website.)

Happy crocheting,
CozyStitches
https://www.shopcozystitches.com
`;

  const emailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${emailSubject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #faf5f7; margin: 0; padding: 20px; color: #482750; }
    .card { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #ebd9ea; box-shadow: 0 8px 30px rgba(72,39,80,0.06); }
    .header { background: linear-gradient(135deg, #482750 0%, #be6c87 100%); padding: 36px 30px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
    .content { padding: 32px 28px; line-height: 1.6; font-size: 15px; color: #554458; }
    .cta-box { background: #fdf6f9; border: 2px dashed #f2b8cb; border-radius: 16px; padding: 24px; text-align: center; margin: 24px 0; }
    .btn-download { display: inline-block; background: #be6c87; color: #ffffff !important; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 15px; margin-top: 14px; }
    .expiry-note { font-size: 12px; color: #88748d; margin-top: 14px; }
    .footer { background: #f7eff4; padding: 20px 24px; text-align: center; font-size: 12px; color: #7f6885; }
    .footer a { color: #be6c87; text-decoration: none; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>CozyStitches 🧶</h1>
    </div>
    <div class="content">
      <p style="font-size: 16px; margin-top: 0;">Hi there!</p>
      <p>Thanks for visiting CozyStitches.</p>
      <p>Your free <strong>Shooting Star Keychain</strong> crochet pattern is ready.</p>
      <p>Click below to download your PDF and start crocheting!</p>

      <div class="cta-box">
        <div style="font-size: 32px; margin-bottom: 8px;">⭐</div>
        <div style="font-size: 18px; font-weight: 700; color: #482750;">Shooting Star Keychain Pattern</div>
        <div style="font-size: 13px; color: #7f6885; margin: 4px 0 12px;">7 Printable Pages • Full Color Step Photos • US Terms</div>
        <a href="${downloadUrl}" class="btn-download" target="_blank">Download Your Free Pattern</a>
        <div class="expiry-note">🔒 Active for 48 hours. You can request a fresh link anytime on our website.</div>
      </div>

      <p style="margin-bottom: 0;">Happy crocheting,<br><strong>CozyStitches</strong></p>
    </div>
    <div class="footer">
      CozyStitches · Digital Crochet PDF Patterns<br>
      You received this because a free pattern was requested for ${masked}.<br>
      <a href="${siteUrl}/#contact">Contact Support</a> &bull; <a href="${siteUrl}/#privacy">Privacy Policy</a>
    </div>
  </div>
</body>
</html>`;

  // 6. Send Transactional PDF Delivery Email via Brevo
  const emailResult = await sendBrevoTransactionalEmail({
    to: cleanEmail,
    subject: emailSubject,
    html: emailHtml,
    text: emailText
  });

  if (!emailResult.success) {
    console.error(`[FreePattern] ❌ Failed to dispatch delivery email to ${masked}: ${emailResult.error || 'Provider rejected'}`);
    return res.status(502).json({
      success: false,
      message: 'We could not send your pattern email right now. Please check back shortly or reach out to support.',
      error: emailResult.error || 'Email dispatch failed'
    });
  }

  // 7. Handle Optional Marketing Consent (GDPR Strict)
  let subscribedToMarketing = false;
  if (marketingConsent === true) {
    const consentRecord = {
      consentTimestamp: new Date().toISOString(),
      consentSource: 'freebie_shooting_star',
      consentNoticeVersion: 'v1.0'
    };

    console.log(`[MarketingConsent] Explicit consent received from ${masked}. Registering with Brevo.`);
    const subRes = await subscribeBrevoContact({
      email: cleanEmail,
      attributes: consentRecord,
      doubleOptin: Boolean(process.env.BREVO_DOUBLE_OPTIN_TEMPLATE_ID),
      siteUrl
    });
    subscribedToMarketing = subRes.success;
  } else {
    console.log(`[MarketingConsent] No marketing consent requested from ${masked}. Solely delivering requested PDF.`);
  }

  // 8. Record in Local Database if available (Non-blocking)
  try {
    if (typeof addSubscriber === 'function') {
      addSubscriber(cleanEmail, marketingConsent ? 'freebie_with_newsletter' : 'freebie_only');
    }
  } catch (_dbErr) {
    // Non-critical in serverless environments
  }

  // 9. Respond to Client
  return res.json({
    success: true,
    message: 'Your free Shooting Star pattern has been prepared and sent to your email!',
    delivery: emailResult.success ? 'dispatched' : 'ready_for_download',
    downloadUrl, // Also provide immediate download link in UI for superior customer experience
    marketingSubscribed: subscribedToMarketing
  });
});

// ── 2. GET /api/free-pattern/download/:token ───────────────────
router.get('/download/:token', (req, res) => {
  const token = req.params.token;
  const verification = verifyFreebieToken(token);

  if (!verification.valid) {
    if (verification.expired) {
      return res.status(410).type('html').send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Download Link Expired | CozyStitches</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #faf5f7; color: #482750; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
    .card { background: #ffffff; border: 1px solid #ebd9ea; border-radius: 24px; padding: 40px 28px; max-width: 480px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
    h1 { font-size: 22px; color: #482750; margin: 0 0 12px; }
    p { font-size: 15px; color: #6b4d70; line-height: 1.6; margin: 0 0 24px; }
    .btn { display: inline-block; background: #be6c87; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 50px; font-weight: 700; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <div style="font-size: 40px; margin-bottom: 12px;">⏳</div>
    <h1>Download Link Expired</h1>
    <p>For your security, download links expire after 48 hours. You can request a fresh download link anytime on our website with your email address.</p>
    <a href="/#freebie" class="btn">Get a Fresh Pattern Link</a>
  </div>
</body>
</html>`);
    }

    return res.status(400).type('html').send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>Invalid Download Link | CozyStitches</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #faf5f7; color: #482750; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .card { background: #ffffff; border: 1px solid #ebd9ea; border-radius: 24px; padding: 40px 28px; max-width: 480px; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Invalid Download Link</h2>
    <p>This download token could not be verified or is malformed.</p>
    <a href="/" style="display: inline-block; margin-top: 16px; background: #be6c87; color: #fff; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: bold;">Return to Store</a>
  </div>
</body>
</html>`);
  }

  // Resolve Freebie Pattern PDF safely
  const candidates = [
    path.join(STORAGE_DIR, 'pattern-2-shooting-star-keychain.pdf'),
    path.join(process.cwd(), 'server', 'storage', 'patterns', 'pattern-2-shooting-star-keychain.pdf'),
    path.join(process.cwd(), 'crochet-store-react', 'server', 'storage', 'patterns', 'pattern-2-shooting-star-keychain.pdf')
  ];

  let resolvedPath = null;
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      resolvedPath = c;
      break;
    }
  }

  if (!resolvedPath) {
    console.error('[FreePattern] PDF file missing from storage candidates');
    return res.status(500).json({ success: false, message: 'PDF file is temporarily unavailable. Please contact support.' });
  }

  console.log(`[FreePattern] ✅ Streaming freebie PDF to verified requester`);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="CozyStitches-Shooting-Star-Keychain-Pattern.pdf"');
  res.setHeader('Cache-Control', 'private, no-transform, max-age=86400');
  
  const stream = fs.createReadStream(resolvedPath);
  stream.pipe(res);
});

// ── 3. POST /api/free-pattern/unsubscribe ──────────────────────
router.post('/unsubscribe', async (req, res) => {
  const { email } = req.body || {};
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }

  await unsubscribeBrevoContact(email.trim().toLowerCase());
  return res.json({
    success: true,
    message: 'You have been unsubscribed from CozyStitches marketing emails.'
  });
});

export default router;
