/**
 * Brevo (Sendinblue) Email & Marketing Integration Service
 * CozyStitches - Secure Free Pattern Delivery & Marketing Automation
 */

export function maskEmail(email) {
  if (!email || typeof email !== 'string') return '***';
  const parts = email.split('@');
  if (parts.length !== 2) return '***';
  const [name, domain] = parts;
  const maskedName = name.length > 2 ? `${name[0]}***${name[name.length - 1]}` : `${name[0]}***`;
  const domainParts = domain.split('.');
  const maskedDomain = domainParts
    .map((p, i) => (i === 0 ? (p.length > 2 ? `${p[0]}***${p[p.length - 1]}` : `${p[0]}*`) : p))
    .join('.');
  return `${maskedName}@${maskedDomain}`;
}

const BREVO_API_URL = 'https://api.brevo.com/v3';

function getBrevoApiKey() {
  return (process.env.BREVO_API_KEY || '').trim();
}

/**
 * Extracts pure email address from strings like:
 * - "CozyStitches <hello@shopcozystitches.com>"
 * - "\"hello@shopcozystitches.com\""
 * - "hello@shopcozystitches.com"
 */
export function extractPureEmail(raw) {
  if (!raw || typeof raw !== 'string') return '';
  const match = raw.match(/<([^>]+)>/);
  const candidate = (match ? match[1] : raw).replace(/['"\s]/g, '').trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(candidate) ? candidate : '';
}

/**
 * Verified sender details for CozyStitches
 * Enforces verified domain hello@shopcozystitches.com to ensure DKIM/DMARC alignment.
 */
export function getSender() {
  const envRaw = process.env.BREVO_SENDER_EMAIL || process.env.EMAIL_FROM_ADDRESS || process.env.EMAIL_FROM;
  const parsed = extractPureEmail(envRaw);

  // If parsed email is a Gmail address, empty, or unverified, enforce verified domain sender
  const email = (parsed && !parsed.includes('@gmail.com'))
    ? parsed
    : 'hello@shopcozystitches.com';

  const nameRaw = process.env.BREVO_SENDER_NAME || 'CozyStitches';
  const name = nameRaw.replace(/['"]/g, '').trim() || 'CozyStitches';

  return { name, email };
}

/**
 * Send Transactional Email via Brevo REST API v3
 */
export async function sendBrevoTransactionalEmail({ to, subject, html, text }) {
  const apiKey = getBrevoApiKey();
  const cleanTo = extractPureEmail(to);
  const masked = maskEmail(cleanTo || to);
  const sender = getSender();

  if (!apiKey) {
    console.log(`[Brevo] ℹ️ BREVO_API_KEY not configured. Simulating delivery to ${masked}.`);
    return {
      success: true,
      simulated: true,
      provider: 'brevo_simulated',
      message: 'Email dispatch simulated (BREVO_API_KEY not set)'
    };
  }

  if (!cleanTo) {
    return {
      success: false,
      error: 'Invalid recipient email format'
    };
  }

  const payload = {
    sender: {
      name: sender.name,
      email: sender.email
    },
    replyTo: {
      name: sender.name,
      email: sender.email
    },
    to: [{ email: cleanTo }],
    subject,
    htmlContent: html,
    textContent: text || 'Your free pattern is ready to download.',
    tags: ['free-pattern-delivery']
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s request timeout

  try {
    const res = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errorMsg = data?.message || `Brevo returned HTTP ${res.status}`;
      console.error(`[Brevo] ❌ Transactional send failed for ${masked}: ${errorMsg} (Code: ${data?.code || res.status})`);
      return {
        success: false,
        error: errorMsg,
        code: data?.code || res.status
      };
    }

    console.log(`[Brevo] ✅ Transactional email dispatched from ${sender.email} to ${masked} (Message ID: ${data?.messageId || 'ok'})`);
    return {
      success: true,
      messageId: data?.messageId,
      sender: sender.email,
      provider: 'brevo'
    };
  } catch (err) {
    const isTimeout = err.name === 'AbortError';
    const errorMsg = isTimeout ? 'Brevo request timed out after 10 seconds' : err.message;
    console.error(`[Brevo] ❌ Network error sending to ${masked}:`, errorMsg);
    return {
      success: false,
      error: 'Failed to communicate with email delivery provider',
      details: errorMsg
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Subscribe Contact to Brevo Marketing List (Only with explicit consent)
 */
export async function subscribeBrevoContact({ email, attributes = {}, doubleOptin = false, siteUrl = 'https://www.shopcozystitches.com' }) {
  const apiKey = getBrevoApiKey();
  const cleanEmail = extractPureEmail(email);
  const masked = maskEmail(cleanEmail || email);

  if (!apiKey) {
    console.log(`[Brevo] ℹ️ BREVO_API_KEY not configured. Simulating contact subscription for ${masked}.`);
    return {
      success: true,
      simulated: true,
      provider: 'brevo_simulated'
    };
  }

  if (!cleanEmail) {
    return { success: false, error: 'Invalid email' };
  }

  const listId = process.env.BREVO_LIST_ID ? Number(process.env.BREVO_LIST_ID) : null;
  const doiTemplateId = process.env.BREVO_DOUBLE_OPTIN_TEMPLATE_ID
    ? Number(process.env.BREVO_DOUBLE_OPTIN_TEMPLATE_ID)
    : null;

  // Use Double Opt-in if requested and template is configured
  if (doubleOptin && doiTemplateId && listId) {
    try {
      const res = await fetch(`${BREVO_API_URL}/contacts/doubleOptinConfirmation`, {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: cleanEmail,
          includeListIds: [listId],
          templateId: doiTemplateId,
          redirectionUrl: `${siteUrl.replace(/\/$/, '')}/?optin=confirmed`,
          attributes: {
            CONSENT_TIMESTAMP: attributes.consentTimestamp || new Date().toISOString(),
            CONSENT_SOURCE: attributes.consentSource || 'freebie_shooting_star',
            CONSENT_NOTICE_VERSION: attributes.consentNoticeVersion || 'v1.0'
          }
        })
      });

      if (!res.ok && res.status !== 204) {
        const errData = await res.json().catch(() => ({}));
        console.warn(`[Brevo] ⚠️ Double opt-in trigger note for ${masked}:`, errData?.message || res.status);
      } else {
        console.log(`[Brevo] ✅ Double opt-in email triggered for ${masked}`);
        return { success: true, doubleOptin: true };
      }
    } catch (err) {
      console.warn(`[Brevo] Double opt-in request warning:`, err.message);
    }
  }

  // Standard Direct List Subscription
  const payload = {
    email: cleanEmail,
    updateEnabled: true,
    attributes: {
      CONSENT_TIMESTAMP: attributes.consentTimestamp || new Date().toISOString(),
      CONSENT_SOURCE: attributes.consentSource || 'freebie_shooting_star',
      CONSENT_NOTICE_VERSION: attributes.consentNoticeVersion || 'v1.0'
    }
  };

  if (listId && !isNaN(listId)) {
    payload.listIds = [listId];
  }

  try {
    const res = await fetch(`${BREVO_API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (res.status === 201 || res.status === 204) {
      console.log(`[Brevo] ✅ Contact successfully added/updated for ${masked}`);
      return { success: true };
    }

    const data = await res.json().catch(() => ({}));

    // Check if contact already exists or already in list
    if (data?.code === 'duplicate_parameter') {
      console.log(`[Brevo] ℹ️ Contact ${masked} already exists in Brevo.`);
      return { success: true, alreadySubscribed: true };
    }

    console.warn(`[Brevo] ⚠️ Contact subscription notice for ${masked}:`, data?.message || res.status);
    return { success: false, error: data?.message || 'Subscription failed' };
  } catch (err) {
    console.error(`[Brevo] ❌ Network error subscribing ${masked}:`, err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Handle Unsubscribe Requests
 */
export async function unsubscribeBrevoContact(email) {
  const apiKey = getBrevoApiKey();
  const cleanEmail = extractPureEmail(email);
  const masked = maskEmail(cleanEmail || email);

  if (!apiKey) {
    console.log(`[Brevo] Simulating unsubscribe for ${masked}`);
    return { success: true, simulated: true };
  }

  if (!cleanEmail) {
    return { success: false, error: 'Invalid email' };
  }

  try {
    const encoded = encodeURIComponent(cleanEmail);
    const res = await fetch(`${BREVO_API_URL}/contacts/${encoded}`, {
      method: 'PUT',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ emailBlacklisted: true })
    });

    if (res.ok || res.status === 204) {
      console.log(`[Brevo] ✅ Successfully unsubscribed ${masked}`);
      return { success: true };
    }

    const data = await res.json().catch(() => ({}));
    return { success: false, error: data?.message };
  } catch (err) {
    console.error(`[Brevo] Failed to unsubscribe ${masked}:`, err.message);
    return { success: false, error: err.message };
  }
}
