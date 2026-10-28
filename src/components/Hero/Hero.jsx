import { Sparkles, Zap, Printer, Globe, Tag, ArrowRight, Gift } from 'lucide-react';
import { SusCrewmateIcon, ShootingStarIcon, EyeglassHolderIcon } from '../Icons/CrochetIcons';
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
            <Tag size={14} /> From $4.49
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
            icon: <SusCrewmateIcon size={52} />,
            label: 'Sus Space Crewmate',
            price: '$4.99',
            tag: 'AMIGURUMI',
          },
          {
            icon: <ShootingStarIcon size={52} />,
            label: 'Shooting Star Keychain',
            price: '$4.49',
            tag: 'KEYCHAIN',
          },
          {
            icon: <EyeglassHolderIcon size={52} />,
            label: 'Eyeglass Holder Set',
            price: '$7.99',
            tag: '7 IN 1 SET',
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
