import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Sparkles, Compass, DownloadCloud } from 'lucide-react';
import { YarnLogoIcon } from '../Icons/CrochetIcons';
import './Navbar.css';

export default function Navbar({ cartCount, downloadsCount = 0, onOpenCart, onOpenDownloads, onLogoClick }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const nav = (id) => {
    setMenuOpen(false);
    if (onLogoClick) onLogoClick();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
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
    <header className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="nav-container">
        <button
          className="logo-btn"
          onClick={() => {
            setMenuOpen(false);
            if (onLogoClick) onLogoClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Cozy Stitches Home"
        >
          <YarnLogoIcon size={30} className="logo-svg" />
          <span className="logo-text">Cozy Stitches</span>
        </button>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          <div className="mobile-nav-header">
            <span className="mobile-nav-title">Menu</span>
            <button
              className="mobile-close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          {links.map(({ id, label, icon }) => (
            <button key={id} className="nav-link" onClick={() => nav(id)}>
              {icon}
              <span>{label}</span>
            </button>
          ))}
          <button
            className="mobile-cta-btn"
            onClick={() => nav('products')}
          >
            <Compass size={16} />
            <span>Browse All Patterns</span>
          </button>
        </nav>

        <div className="nav-actions">
          {downloadsCount > 0 && (
            <button
              className="nav-downloads-btn"
              title="View my purchased patterns"
              onClick={onOpenDownloads}
              aria-label="My downloads"
            >
              <DownloadCloud size={16} />
              <span>My Patterns</span>
              <span className="downloads-count">{downloadsCount}</span>
            </button>
          )}

          <button
            className="nav-shop-btn"
            onClick={() => nav('products')}
          >
            <Compass size={15} />
            <span>Browse Patterns</span>
          </button>

          <button
            className="cart-btn"
            title="View cart"
            aria-label="Shopping cart"
            onClick={onOpenCart || (() => nav('products'))}
          >
            <ShoppingBag size={20} />
            <span className="cart-count">{cartCount}</span>
          </button>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
