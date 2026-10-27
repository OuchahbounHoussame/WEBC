import { useState } from 'react';
import { Gift, Zap, FileText, CheckCircle2, Lock, MailCheck, Send } from 'lucide-react';
import { CactusMiniIcon } from '../Icons/CrochetIcons';
import './Freebie.css';

export default function Freebie() {
  const [email, setEmail]     = useState('');
  const [status, setStatus]   = useState('idle'); // idle | loading | done

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => setStatus('done'), 1400);
  };

  const perks = [
    'Free Mini Cactus Amigurumi PDF pattern (worth \$4.99)',
    'Instant delivery direct to your email inbox',
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
              <Gift size={24} className="fc-gift-icon" />
              <div>
                <p className="fc-tag">FREE PDF PATTERN</p>
                <p className="fc-title">Mini Cactus Amigurumi</p>
              </div>
            </div>
            <div className="fc-vector-wrapper">
              <CactusMiniIcon size={105} />
            </div>
            <div className="fc-details">
              <span>
                <FileText size={12} /> 8 pages
              </span>
              <span>
                <span className="skill-dot" /> Beginner
              </span>
              <span>
                <Zap size={12} /> Instant
              </span>
            </div>
            <div className="fc-value">
              Value: <s>\$4.99</s> <strong>FREE</strong>
            </div>
          </div>
          <div className="freebie-deco d1" />
          <div className="freebie-deco d2" />
        </div>

        {/* Right: form content */}
        <div className="freebie-content">
          <p className="section-label">Instant Free Download</p>
          <h2>Get Your Free Mini Pattern!</h2>
          <p className="freebie-sub">
            Join <strong>8,000+ crocheters</strong> in our creative community and receive a FREE 8-page Mini Cactus Amigurumi pattern — complete with step-by-step photos, stitch guides, and print-ready PDF.
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
                <h3>Check your inbox!</h3>
                <p>Your free pattern has been sent to <strong>{email}</strong></p>
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
