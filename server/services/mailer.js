import { Resend } from 'resend';
import path from 'path';
import fs from 'fs';

try {
  process.loadEnvFile();
} catch (e) {
  // .env file might not exist in some environments like Vercel where env vars are injected
}

// Default sender: onboarding@resend.dev (works immediately without custom domain)
const defaultFrom = () => process.env.EMAIL_FROM || 'Crochet Store <onboarding@resend.dev>';

/**
 * Send Freebie Shooting Star Pattern Email
 */
export async function sendFreebieEmail({ to, downloadUrl, appUrl = '' }) {
  const fullDownloadUrl = downloadUrl.startsWith('http') 
    ? downloadUrl 
    : `${appUrl.replace(/\/$/, '')}${downloadUrl}`;

  const subject = '✨ Your Free Shooting Star Crochet Pattern is Ready!';

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #faf5f7; margin: 0; padding: 0; color: #332735; }
    .container { max-width: 580px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.06); border: 1px solid #f2e1ea; }
    .header { background: linear-gradient(135deg, #733c76 0%, #be6c87 100%); padding: 36px 30px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px; }
    .header p { margin: 8px 0 0 0; opacity: 0.9; font-size: 14px; }
    .content { padding: 32px 30px; }
    .product-box { background: #fdf6f9; border: 2px dashed #f2b8cb; border-radius: 14px; padding: 22px; text-align: center; margin: 24px 0; }
    .product-title { font-size: 19px; font-weight: 700; color: #482750; margin: 0 0 8px 0; }
    .product-meta { font-size: 13px; color: #7f6885; margin-bottom: 18px; }
    .btn-download { display: inline-block; background: linear-gradient(135deg, #e8829b 0%, #d86481 100%); color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 50px; font-weight: 700; font-size: 15px; box-shadow: 0 6px 18px rgba(232, 130, 155, 0.35); }
    .notice { font-size: 12px; color: #9c8a9f; text-align: center; margin-top: 14px; }
    .perks-list { margin: 20px 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #554458; }
    .footer { background: #f7eff4; padding: 20px 30px; text-align: center; font-size: 12px; color: #8f7994; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Crochet Pattern Studio 🧶</h1>
      <p>Thank you for joining our community!</p>
    </div>
    <div class="content">
      <h2 style="font-size: 20px; margin-top: 0;">Welcome! Here is your free pattern ✨</h2>
      <p style="line-height: 1.6; font-size: 15px; color: #554458;">
        We're thrilled to have you! As promised, here is your complimentary <strong>Shooting Star Keychain</strong> amigurumi PDF pattern with step-by-step photos and clear US terms.
      </p>

      <div class="product-box">
        <div style="font-size: 32px; margin-bottom: 6px;">⭐</div>
        <div class="product-title">Shooting Star Keychain Pattern</div>
        <div class="product-meta">6 Pages • Beginner Level • Instant PDF</div>
        <a href="${fullDownloadUrl}" class="btn-download" target="_blank">⬇️ Download Your Free Pattern (PDF)</a>
        <div class="notice">🔒 Secure download link is active for 48 hours.</div>
      </div>

      <h3 style="font-size: 16px; margin-bottom: 8px;">What's next?</h3>
      <ul class="perks-list">
        <li>Grab your 3.0 mm crochet hook &amp; 8/6 cotton yarn.</li>
        <li>Enjoy weekly pattern drops &amp; exclusive member-only discounts.</li>
        <li>Reach out anytime if you have questions about any stitches!</li>
      </ul>
    </div>
    <div class="footer">
      Crochet Haven Studio • Handcrafted with love for makers worldwide.<br>
      You received this because you requested a free crochet pattern.
    </div>
  </div>
</body>
</html>
  `;

  // Attach PDF directly if available on disk (< 10MB)
  const attachments = [];
  try {
    const pdfPath = path.join(process.cwd(), 'server', 'storage', 'patterns', 'pattern-2-shooting-star-keychain.pdf');
    if (fs.existsSync(pdfPath)) {
      attachments.push({
        filename: 'Shooting-Star-Keychain-Pattern.pdf',
        content: fs.readFileSync(pdfPath)
      });
    }
  } catch (e) {
    console.warn('[Mailer] Could not attach local PDF:', e.message);
  }

  return sendEmail({ to, subject, html, attachments });
}

/**
 * Send Paid Order Delivery Email with all purchased patterns
 */
export async function sendOrderDeliveryEmail({ to, customerName, orderId, totalAmount, downloads = [], appUrl = '' }) {
  const subject = `🧶 Your Crochet Patterns are Ready! (Order #${orderId})`;

  const itemsHtml = downloads.map(item => {
    const fullUrl = item.downloadUrl.startsWith('http')
      ? item.downloadUrl
      : `${appUrl.replace(/\/$/, '')}${item.downloadUrl}`;

    return `
      <div style="background: #fdf6f9; border: 1px solid #f2d5e2; border-radius: 12px; padding: 18px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-weight: 700; font-size: 16px; color: #482750;">📄 ${item.downloadName || item.productName}</div>
          <div style="font-size: 12px; color: #88748d; margin-top: 4px;">Direct PDF Download • 48h active link</div>
        </div>
        <a href="${fullUrl}" style="background: #be6c87; color: #ffffff !important; text-decoration: none; padding: 10px 18px; border-radius: 50px; font-weight: 700; font-size: 13px;" target="_blank">
          ⬇️ Download
        </a>
      </div>
    `;
  }).join('');

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${subject}</title>
</head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #faf5f7; margin: 0; padding: 20px; color: #332735;">
  <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.06); border: 1px solid #f2e1ea;">
    <div style="background: linear-gradient(135deg, #482750 0%, #be6c87 100%); padding: 32px 30px; text-align: center; color: #ffffff;">
      <h1 style="margin: 0; font-size: 24px;">Thank You for Your Order! 🧶</h1>
      <p style="margin: 6px 0 0; opacity: 0.9; font-size: 14px;">Order #${orderId} • Total: $${Number(totalAmount).toFixed(2)}</p>
    </div>
    <div style="padding: 30px;">
      <p style="font-size: 15px; line-height: 1.6;">Hello <strong>${customerName || 'Crafter'}</strong>,</p>
      <p style="font-size: 15px; line-height: 1.6; color: #554458;">
        Your payment has been successfully processed! Your digital crochet patterns are ready for immediate download below:
      </p>

      <div style="margin: 24px 0;">
        ${itemsHtml}
      </div>

      <div style="background: #fdf1f4; border-radius: 8px; padding: 12px 16px; font-size: 12px; color: #8f6072; text-align: center;">
        🔒 For your security, your download links are protected and active for 48 hours. You can request a fresh link anytime on our website.
      </div>
    </div>
    <div style="background: #f7eff4; padding: 18px; text-align: center; font-size: 12px; color: #8f7994;">
      Crochet Haven Studio • Happy Stitching!
    </div>
  </div>
</body>
</html>
  `;

  return sendEmail({ to, subject, html });
}

/**
 * Underlying sender via Resend API or Dev Preview
 */
async function sendEmail({ to, subject, html, attachments = [] }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log('\n================== [EMAIL DISPATCH SIMULATION] ==================');
    console.log(`✉️  TO:      ${to}`);
    console.log(`📌 SUBJECT: ${subject}`);
    console.log(`📎 ATTACHMENTS: ${attachments.length} file(s)`);
    console.log(`ℹ️  STATUS:  RESEND_API_KEY is not configured yet.`);
    console.log(`💡 NOTE:    Add RESEND_API_KEY in .env or Vercel environment to send real emails to inboxes!`);
    console.log('==================================================================\n');
    return { success: true, simulated: true, message: 'Logged in dev console (API key missing)' };
  }

  try {
    const resendClient = new Resend(key);
    const res = await resendClient.emails.send({
      from: defaultFrom(),
      to: [to],
      subject,
      html,
      attachments: attachments.map(a => ({
        filename: a.filename,
        content: a.content
      }))
    });

    if (res.error) {
      console.error(`[Mailer] ❌ Resend error for ${to}:`, res.error.message || res.error);
      return { success: false, error: res.error };
    }

    console.log(`[Mailer] ✅ Real email sent successfully to ${to} (id: ${res?.data?.id})`);
    return { success: true, id: res?.data?.id };
  } catch (err) {
    console.error(`[Mailer] ❌ Failed to send email to ${to}:`, err.message);
    return { success: false, error: err.message };
  }
}
