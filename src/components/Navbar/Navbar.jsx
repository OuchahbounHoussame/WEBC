import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Sparkles, Compass } from 'lucide-react';
import { YarnLogoIcon } from '../Icons/CrochetIcons';
import './Navbar.css';

export default function Navbar({ cartCount }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const links = [
    { id: 'products',      label: 'Shop Patterns', icon: null },
    { id: 'how-it-works',  label: 'How It Works',  icon: null },
    { id: 'freebie',       label: 'Free Pattern',   icon: <Sparkles size={14} className="nav-sparkle-icon" /> },
    { id: 'testimonials',  label: 'Community',      icon: null },
    { id: 'faq',           label: 'FAQ',            icon: null },
    { id: 'contact',       label: 'Contact',        icon: null },
  ];

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <button
          className="logo-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Cozy Stitches Home"
        >
          <YarnLogoIcon size={32} className="logo-svg" />
          <span className="logo-text">Cozy Stitches</span>
        </button>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          {links.map(({ id, label, icon }) => (
            <button key={id} className="nav-link" onClick={() => nav(id)}>
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="nav-shop-btn"
            onClick={() => nav('products')}
          >
            <Compass size={15} />
            <span>Browse Patterns</span>
          </button>

          <button className="cart-btn" title="View cart" aria-label="Shopping cart">
            <ShoppingBag size={20} />
            <span className="cart-count">{cartCount}</span>
          </button>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
