import { Sparkles, Zap, Printer, Globe, Tag, ArrowRight, Gift } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const scroll = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero" id="home">
      <div className="hero-bg-pattern" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-pill" style={{ background: 'rgba(220, 38, 38, 0.3)', border: '1px solid rgba(254, 202, 202, 0.45)' }}>
          <Sparkles size={14} />
          <span>🔥 BLACK FRIDAY SALE: All Patterns Just $1.99!</span>
        </div>
        <h1 className="hero-title">
          Beautiful Crochet Patterns,<br />
          <span>Instant PDF Download</span>
        </h1>
        <p className="hero-sub">
          Shop downloadable crochet patterns, amigurumi guides, and detailed project tutorials.
          Buy once, download forever — straight to your device in seconds.
        </p>

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
            <Tag size={14} /> Black Friday $1.99
          </span>
        </div>

        <div className="hero-buttons">
          <button className="btn btn-primary hero-cta" onClick={() => scroll('products')}>
            <span>Browse Patterns</span>
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
