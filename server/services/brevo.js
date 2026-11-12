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
  return process.env.BREVO_API_KEY || '';
}

function getSender() {
  return {
    name: process.env.BREVO_SENDER_NAME || 'CozyStitches',
    email: process.env.BREVO_SENDER_EMAIL || process.env.EMAIL_FROM_ADDRESS || 'ouchahbounhoussame@gmail.com'
  };
}

/**
 * Send Transactional Email via Brevo REST API v3
 */
export async function sendBrevoTransactionalEmail({ to, subject, html, text }) {
  const apiKey = getBrevoApiKey();
  const masked = maskEmail(to);

  if (!apiKey) {
    console.log(`[Brevo] ℹ️ BREVO_API_KEY not configured. Simulating delivery to ${masked}.`);
    return {
      success: true,
      simulated: true,
      provider: 'brevo_simulated',
      message: 'Email dispatch simulated (BREVO_API_KEY not set)'
    };
  }

  const payload = {
    sender: getSender(),
    to: [{ email: to }],
    subject,
    htmlContent: html,
    textContent: text || 'Your free pattern is ready to download.'
  };

  try {
    const res = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: 'POST',
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
      console.error(`[Brevo] ❌ Transactional send failed for ${masked}: ${errorMsg}`);
      return {
        success: false,
        error: errorMsg,
        code: data?.code || res.status
      };
    }

    console.log(`[Brevo] ✅ Transactional email sent to ${masked} (Message ID: ${data?.messageId || 'ok'})`);
    return {
      success: true,
      messageId: data?.messageId,
      provider: 'brevo'
    };
  } catch (err) {
    console.error(`[Brevo] ❌ Network error sending to ${masked}:`, err.message);
    return {
      success: false,
      error: 'Failed to communicate with email delivery provider',
      details: err.message
    };
  }
}

/**
 * Subscribe Contact to Brevo Marketing List (Only with explicit consent)
 */
export async function subscribeBrevoContact({ email, attributes = {}, doubleOptin = false, siteUrl = 'https://www.shopcozystitches.com' }) {
  const apiKey = getBrevoApiKey();
  const masked = maskEmail(email);

  if (!apiKey) {
    console.log(`[Brevo] ℹ️ BREVO_API_KEY not configured. Simulating contact subscription for ${masked}.`);
    return {
      success: true,
      simulated: true,
      provider: 'brevo_simulated'
    };
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
          email,
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
    email,
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
  const masked = maskEmail(email);

  if (!apiKey) {
    console.log(`[Brevo] Simulating unsubscribe for ${masked}`);
    return { success: true, simulated: true };
  }

  try {
    const encoded = encodeURIComponent(email);
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
