const { sendBrevoTransactionalEmail } = require('../server/services/brevo.js');

async function main() {
  const targetEmail = process.env.TEST_EMAIL || 'ouchahbounhoussame@gmail.com';
  console.log(`Sending live test email to: ${targetEmail}...`);

  const subject = 'Your Free Shooting Star Crochet Pattern PDF ⭐';
  const downloadUrl = 'https://www.shopcozystitches.com/api/free-pattern/download/demo-token';
  const html = `<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 580px; margin: 0 auto; padding: 24px;">
  <div style="background: #fdfbf7; border: 1px solid #ebd9c8; border-radius: 16px; padding: 32px; text-align: center;">
    <h1 style="color: #634832; margin-top: 0; font-size: 24px;">⭐ CozyStitches</h1>
    <h2 style="color: #2b2b2b; font-size: 20px; margin-bottom: 16px;">Your Free Shooting Star Pattern is Ready!</h2>
    <p style="font-size: 15px; color: #555; margin-bottom: 24px;">
      Hi there!<br/><br/>
      Thanks for visiting CozyStitches. Your free <strong>Shooting Star Keychain</strong> crochet pattern is ready for download.
    </p>
    <div style="margin: 28px 0;">
      <a href="${downloadUrl}" style="background-color: #2e7d32; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 9999px; font-weight: bold; display: inline-block;">
        Download Your Free Pattern
      </a>
    </div>
    <p style="font-size: 13px; color: #777;">
      This secure download link is valid for 48 hours. Happy crocheting!
    </p>
  </div>
</body>
</html>`;

  try {
    const res = await sendBrevoTransactionalEmail({
      to: targetEmail,
      subject,
      html,
      text: 'Your Free Shooting Star Keychain pattern is ready: ' + downloadUrl
    });
    console.log('RESULT:', JSON.stringify(res, null, 2));
    if (res.success) {
      console.log(`\n🎉 Success! Email dispatched with MessageId: ${res.messageId}`);
    } else {
      console.log(`\n❌ Failed: ${res.error}`);
    }
  } catch (err) {
    console.error('Fatal error:', err);
  }
}

main();
