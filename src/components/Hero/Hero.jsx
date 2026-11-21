import { useState, useEffect } from 'react';
import { Sparkles, Zap, Printer, Globe, Tag, ArrowRight, Gift } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const [countdown, setCountdown] = useState({ days: '06', hours: '18', mins: '42', secs: '30' });

  useEffect(() => {
    // End of Year Cyber & Holiday Sale target
    const target = new Date();
    target.setDate(target.getDate() + 7);
    target.setHours(23, 59, 59, 0);

    const updateTimer = () => {
      const now = new Date();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setCountdown({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        mins: String(mins).padStart(2, '0'),
        secs: String(secs).padStart(2, '0')
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero" id="home">
      <div className="hero-bg-pattern" aria-hidden="true" />

      {/* Festive Falling Snow & Holiday Sparkles */}
      <div className="hero-snow-layer" aria-hidden="true">
        {[...Array(16)].map((_, i) => (
          <span
            key={i}
            className="snowflake"
            style={{
              left: `${(i * 6.25) + ((i % 3) * 1.5)}%`,
              animationDelay: `${(i * 0.45) % 6}s`,
              animationDuration: `${7 + ((i * 1.4) % 6)}s`,
              fontSize: `${0.85 + ((i % 4) * 0.25)}rem`,
              opacity: 0.75 + ((i % 3) * 0.1)
            }}
          >
            {i % 4 === 0 ? '❄' : i % 4 === 1 ? '✨' : i % 4 === 2 ? '❅' : '✦'}
          </span>
        ))}
      </div>

      <div className="hero-content">
        <div className="hero-pill" style={{ background: 'rgba(220, 38, 38, 0.35)', border: '1px solid rgba(254, 202, 202, 0.6)', boxShadow: '0 4px 20px rgba(220, 38, 38, 0.35)' }}>
          <Sparkles size={14} color="#fef08a" />
          <span style={{ fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase' }}>🔥 END OF YEAR BLACK FRIDAY • ALL PATTERNS $1.99</span>
        </div>
        <h1 className="hero-title">
          End of Year Black Friday Sale<br />
          <span>Every Pattern Just $1.99</span>
        </h1>
        <p className="hero-sub">
          Our biggest holiday blowout of the year! Grab full step-by-step crochet patterns &amp; Christmas collections for just <strong>$1.99 each</strong> (was up to $7.99). Instant PDF download forever.
        </p>

        {/* Live Holiday Countdown Widget */}
        <div className="hero-countdown-wrap">
          <div className="countdown-pill">
            <span className="live-pulse" />
            <span>🎄 HOLIDAY BLOWOUT ENDS IN:</span>
          </div>
          <div className="countdown-timer">
            <div className="cd-block">
              <span className="cd-val">{countdown.days}</span>
              <span className="cd-unit">DAYS</span>
            </div>
            <span className="cd-sep">:</span>
            <div className="cd-block">
              <span className="cd-val">{countdown.hours}</span>
              <span className="cd-unit">HRS</span>
            </div>
            <span className="cd-sep">:</span>
            <div className="cd-block">
              <span className="cd-val">{countdown.mins}</span>
              <span className="cd-unit">MIN</span>
            </div>
            <span className="cd-sep">:</span>
            <div className="cd-block">
              <span className="cd-val">{countdown.secs}</span>
              <span className="cd-unit">SEC</span>
            </div>
          </div>
        </div>

        <div className="hero-highlights">
          <span>
            <Zap size={14} /> Instant delivery
          </span>
          <span>
            <Printer size={14} /> Print-ready PDFs
          </span>
          <span>
            <Globe size={14} /> US &amp; UK terms
          </span>
          <span>
            <Tag size={14} /> Black Friday $1.99 Each
          </span>
        </div>

        <div className="hero-buttons">
          <button className="btn btn-primary hero-cta" onClick={() => scroll('products')}>
            <span>Browse $1.99 Patterns</span>
            <ArrowRight size={18} />
          </button>
          <button className="btn hero-free-btn" onClick={() => scroll('freebie')}>
            <Gift size={18} />
            <span>Get Free Pattern</span>
          </button>
        </div>
      </div>

      <div className="hero-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fcf9fb" />
        </svg>
      </div>
    </section>
  );
}
