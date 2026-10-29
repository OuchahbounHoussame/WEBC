import { useState } from 'react';
import { Gift, Zap, FileText, CheckCircle2, Lock, MailCheck, Send, Download, Sparkles } from 'lucide-react';
import { ShootingStarIcon } from '../Icons/CrochetIcons';
import './Freebie.css';

export default function Freebie() {
  const [email, setEmail]             = useState('');
  const [status, setStatus]           = useState('idle'); // idle | loading | done
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/orders/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'freebie_shooting_star' })
      });
      const data = await res.json();
      if (data && data.downloadUrl) {
        setDownloadUrl(data.downloadUrl);
      }
    } catch (err) {
      console.error('Newsletter error:', err);
    }
    setTimeout(() => setStatus('done'), 600);
  };

  const perks = [
    'Free Shooting Star Keychain PDF pattern (worth $4.49)',
    'Instant 1-click download direct to your phone or tablet',
    'Exclusive members-only discounts up to 30% off',
    'Free beginner tips, stitch charts, and weekly pattern drops'
  ];

  return (
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
                <span className="skill-dot" /> Beginner
              </span>
              <span>
                <Zap size={12} /> Instant
              </span>
            </div>

            <div className="fc-value">
              <span>Value: <s>$4.49</s></span>
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
            Join <strong>8,000+ crocheters</strong> in our creative community and receive a FREE 6-page Shooting Star Keychain pattern — complete with step-by-step photos, stitch guides, and print-ready PDF.
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
                <h3>Check your inbox &amp; download below!</h3>
                <p>Your free pattern has been prepared for <strong>{email}</strong></p>
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
            <form className="freebie-form" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                aria-label="Email address"
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <span>Sending…</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send My Free Pattern</span>
                  </>
                )}
              </button>
            </form>
          )}
          <p className="freebie-note">
            <Lock size={12} />
            <span>Zero spam, ever. Unsubscribe with one click anytime.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
