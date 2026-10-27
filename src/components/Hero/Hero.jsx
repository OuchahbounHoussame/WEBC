import { Sparkles, Zap, Printer, Globe, Tag, ArrowRight, Gift } from 'lucide-react';
import { SunflowerSquareIcon, BearAmigurumiIcon, CrochetBibleIcon } from '../Icons/CrochetIcons';
import './Hero.css';

export default function Hero() {
  const scroll = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero" id="home">
      <div className="hero-bg-pattern" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-pill">
          <Sparkles size={14} />
          <span>New patterns dropped every week</span>
        </div>
        <h1 className="hero-title">
          Beautiful Crochet Patterns,<br />
          <span>Instant PDF Download</span>
        </h1>
        <p className="hero-sub">
          Shop hundreds of downloadable crochet patterns, amigurumi guides, e-books, and video masterclasses.
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
            <Tag size={14} /> From \$4.99
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

      <div className="hero-cards" aria-hidden="true">
        {[
          {
            icon: <SunflowerSquareIcon size={52} />,
            label: 'Sunflower Square',
            price: '\$4.99',
            tag: 'PDF PATTERN',
          },
          {
            icon: <BearAmigurumiIcon size={52} />,
            label: 'Bear Amigurumi',
            price: '\$5.99',
            tag: 'GUIDE',
          },
          {
            icon: <CrochetBibleIcon size={52} />,
            label: 'Crochet Bible',
            price: '\$14.99',
            tag: 'E-BOOK',
          },
        ].map(({ icon, label, price, tag }) => (
          <div className="hero-card" key={label}>
            <div className="hc-vector-icon">{icon}</div>
            <div className="hc-tag">{tag}</div>
            <div className="hc-info">
              <p className="hc-label">{label}</p>
              <p className="hc-price">{price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fcf9fb" />
        </svg>
      </div>
    </section>
  );
}
