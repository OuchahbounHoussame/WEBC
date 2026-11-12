import { useState } from 'react';
import { Gift, Zap, FileText, CheckCircle2, Lock, MailCheck, Send, Download, Sparkles, AlertCircle } from 'lucide-react';
import { track } from '@vercel/analytics';
import PrivacyPolicyModal from '../Privacy/PrivacyPolicyModal';
import './Freebie.css';

export default function Freebie() {
  const [email, setEmail]                       = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false); // Unchecked by default per GDPR
  const [honeypot, setHoneypot]                 = useState('');
  const [status, setStatus]                     = useState('idle'); // idle | loading | done | error
  const [errorMessage, setErrorMessage]         = useState('');
  const [downloadUrl, setDownloadUrl]           = useState(null);
  const [privacyOpen, setPrivacyOpen]           = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    // Honeypot check (bot protection)
    if (honeypot) {
      setStatus('done');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Track privacy-conscious aggregate event (no PII)
    try {
      track('free_pattern_submitted', { has_marketing_consent: marketingConsent });
    } catch (err) {
      // Non-blocking analytics
    }

    try {
      const res = await fetch('/api/free-pattern', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          marketingConsent,
          hp: honeypot
        })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'We could not send your pattern right now. Please try again.');
      }

      if (data.downloadUrl) {
        setDownloadUrl(data.downloadUrl);
      }

      // Track successful request without PII
      try {
        track('free_pattern_success', { has_marketing_consent: marketingConsent });
      } catch (err) {
        // Ignore analytics failure
      }

      setStatus('done');
    } catch (err) {
      console.error('[Freebie] Submission error:', err.message);
      setStatus('error');
      setErrorMessage(err.message || 'Could not connect to email delivery service. Please try again later.');

      try {
        track('free_pattern_failure', { error_type: 'network_or_api' });
      } catch (e) {
        // Ignore analytics failure
      }
    }
  };

  const perks = [
    'Official 6-page digital PDF pattern with full color guide',
    'Step-by-step photos for star points, face embroidery & rainbow tail',
    'Instant delivery directly to your inbox',
    'Standard US crochet terms with hook and yarn specifications'
  ];

  return (
    <>
      <section className="freebie-section" id="freebie">
        <div className="freebie-inner">
          {/* Left: visual card */}
          <div className="freebie-visual" aria-hidden="true">
            <div className="freebie-card">
              <div className="fc-header">
                <div className="fc-gift-icon-wrap">
                  <Gift size={22} className="fc-gift-icon" />
                </div>
                <div>
                  <p className="fc-tag">FREE PDF PATTERN</p>
                  <p className="fc-title">Shooting Star Keychain</p>
                </div>
              </div>

              <div className="fc-image-stage">
                <img
                  src="/images/products/shooting-star/star-1.png"
                  alt="Shooting Star Keychain crochet amigurumi"
                  className="fc-hero-img"
                  loading="lazy"
                />
                <div className="fc-img-badge">
                  <Sparkles size={12} />
                  <span>Free Pattern</span>
                </div>
              </div>

              <div className="fc-details">
                <span>
                  <FileText size={12} /> 6 pages PDF
                </span>
                <span>
                  <span className="skill-dot" /> Intermediate
                </span>
                <span>
                  <Zap size={12} /> Instant
                </span>
              </div>

              <div className="fc-value">
                <span>Digital Pattern PDF</span>
                <strong className="fc-free-pill">100% FREE</strong>
              </div>
            </div>
            <div className="freebie-deco d1" />
            <div className="freebie-deco d2" />
          </div>

          {/* Right: form content */}
          <div className="freebie-content">
            <p className="section-label">Instant Free Download</p>
            <h2>Get Your Free Shooting Star Pattern!</h2>
            <p className="freebie-sub">
              Enjoy a complimentary 6-page Shooting Star Keychain pattern — complete with step-by-step photos, stitch guides, and a print-ready PDF delivered directly to your inbox.
            </p>

            <ul className="freebie-perks">
              {perks.map((perk) => (
                <li key={perk}>
                  <CheckCircle2 size={16} className="perk-check-icon" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>

            {status === 'done' ? (
              <div className="freebie-success">
                <MailCheck size={36} className="success-mail-icon" />
                <div>
                  <h3>Check your inbox &amp; start crafting!</h3>
                  <p>Your free pattern has been prepared and sent to <strong>{email}</strong>.</p>
                  {downloadUrl && (
                    <div style={{ marginTop: '14px' }}>
                      <a
                        href={downloadUrl}
                        className="btn btn-primary"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '12px 24px',
                          textDecoration: 'none',
                          fontWeight: 700,
                          borderRadius: '50px'
                        }}
                        download
                      >
                        <Download size={16} />
                        <span>Download Shooting Star PDF</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <form className="freebie-form-wrapper" onSubmit={handleSubmit}>
                {status === 'error' && (
                  <div className="freebie-error-banner" role="alert">
                    <AlertCircle size={16} style={{ flexShrink: 0 }} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Honeypot field for bot protection */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input
                    type="text"
                    name="b_hp_website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="freebie-form">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    aria-label="Email address for pattern delivery"
                    disabled={status === 'loading'}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <span>Sending Pattern…</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send My Free Pattern</span>
                      </>
                    )}
                  </button>
                </div>

                {/* GDPR Optional Marketing Consent Checkbox */}
                <label className="freebie-consent-label">
                  <input
                    type="checkbox"
                    className="freebie-consent-checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    disabled={status === 'loading'}
                  />
                  <span>
                    Yes, I&apos;d like to receive crochet tips, new pattern announcements, and occasional offers from CozyStitches by email. I can unsubscribe at any time.
                  </span>
                </label>

                {/* Privacy Policy Link Note */}
                <p className="freebie-privacy-note">
                  We respect your privacy. By requesting this pattern, you agree to our{' '}
                  <button
                    type="button"
                    className="freebie-privacy-link"
                    onClick={() => setPrivacyOpen(true)}
                  >
                    Privacy Policy
                  </button>
                  . Consent to marketing is completely optional and not required to receive the free PDF.
                </p>
              </form>
            )}

            <p className="freebie-note">
              <Lock size={12} />
              <span>Zero spam, ever. Unsubscribe with one click anytime.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Accessible Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />
    </>
  );
}
