/**
 * Cryptographically Signed Token Service
 * Secure, Stateless, Serverless-Compatible Freebie Download Links
 * CozyStitches
 */

import crypto from 'crypto';

function getSecret() {
  return (
    process.env.FREEBIE_TOKEN_SECRET ||
    process.env.ADMIN_PASSWORD ||
    'cozystitches_default_secure_hmac_secret_2026'
  );
}

/**
 * Generate a URL-safe, tamper-proof download token active for 48 hours
 */
export function createFreebieToken(email, expiresInHours = 48) {
  const secret = getSecret();
  const payload = {
    email: email.trim().toLowerCase(),
    patternId: 2,
    fileName: 'pattern-2-shooting-star-keychain.pdf',
    iat: Date.now(),
    exp: Date.now() + expiresInHours * 60 * 60 * 1000
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

/**
 * Verify and decode download token
 */
export function verifyFreebieToken(token) {
  if (!token || typeof token !== 'string') {
    return { valid: false, reason: 'missing_token' };
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false, reason: 'malformed_token' };
  }

  const [payloadB64, signature] = parts;
  const secret = getSecret();

  // Validate HMAC signature using timingSafeEqual to prevent timing attacks
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payloadB64)
    .digest('base64url');

  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSignature);

  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return { valid: false, reason: 'invalid_signature' };
  }

  try {
    const jsonStr = Buffer.from(payloadB64, 'base64url').toString('utf8');
    const payload = JSON.parse(jsonStr);

    // Verify patternId strictly matches freebie pattern (id: 2)
    if (payload.patternId !== 2 || payload.fileName !== 'pattern-2-shooting-star-keychain.pdf') {
      return { valid: false, reason: 'unauthorized_file' };
    }

    // Expiration check
    if (Date.now() > payload.exp) {
      return {
        valid: false,
        expired: true,
        email: payload.email,
        reason: 'token_expired'
      };
    }

    return {
      valid: true,
      email: payload.email,
      patternId: payload.patternId,
      fileName: payload.fileName,
      expiresAt: payload.exp
    };
  } catch (_err) {
    return { valid: false, reason: 'parse_error' };
  }
}
