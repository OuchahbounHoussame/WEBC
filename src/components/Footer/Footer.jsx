import { useState } from 'react';
import {
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { YarnLogoIcon, InstagramIcon, YoutubeIcon, PinterestIcon } from '../Icons/CrochetIcons';
import './Footer.css';

export default function Footer() {
  const [email, setEmail]   = useState('');
  const [sent,  setSent]    = useState(false);
  const [form,  setForm]    = useState({ name: '', email: '', topic: '', msg: '' });
  const [formSent, setFormSent] = useState(false);

  const handleContact = (e) => {
    e.preventDefault();
    setFormSent(true);
  };

  const socials = [
    { label: 'Instagram', icon: <InstagramIcon size={14} /> },
    { label: 'Pinterest', icon: <PinterestIcon size={14} /> },
    { label: 'YouTube', icon: <YoutubeIcon size={14} /> },
    { label: 'Etsy Shop', icon: <ShoppingBag size={14} /> },
  ];

  return (
    <footer className="footer" id="contact">
      {/* Contact strip */}
      <div className="footer-contact">
        <div className="fc-inner">
          <div className="fc-text">
            <p className="section-label" style={{ color: '#ffe4ee' }}>Get In Touch</p>
            <h3>Have a Question or Custom Pattern Request?</h3>
            <p>We typically reply within a few hours. Don't be shy — we love hearing from our maker community!</p>
            <div className="fc-info">
              <div>
                <Mail size={17} className="fc-info-icon" />
                <span>hello@cozystitches.com</span>
              </div>
              <div>
                <InstagramIcon size={17} className="fc-info-icon" />
                <span>@cozystitches_patterns</span>
              </div>
              <div>
                <Clock size={17} className="fc-info-icon" />
                <span>Mon–Fri, 9am–6pm (Quick response)</span>
              </div>
            </div>
          </div>

          {formSent ? (
            <div className="fc-success">
              <CheckCircle2 size={36} className="fc-success-icon" />
              <div>
                <h3>Message sent successfully!</h3>
                <p>We'll reply to your email within 24 hours. Happy crafting!</p>
              </div>
            </div>
          ) : (
            <form className="fc-form" onSubmit={handleContact}>
              <div className="fc-row">
                <input
                  type="text" placeholder="Your name" required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="email" placeholder="Email address" required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <select
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                defaultValue=""
                required
              >
                <option value="" disabled>Select inquiry topic…</option>
                <option>Download access assistance</option>
                <option>Crochet stitch or pattern question</option>
                <option>Custom pattern request</option>
                <option>Billing or refund inquiry</option>
                <option>Other feedback</option>
              </select>
              <textarea
                rows={4} placeholder="Tell us how we can help…" required
                value={form.msg}
                onChange={(e) => setForm({ ...form, msg: e.target.value })}
              />
              <button type="submit" className="btn btn-primary fc-submit-btn">
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main footer */}
      <div className="footer-main">
        <div className="fm-brand">
          <div className="logo">
            <YarnLogoIcon size={30} />
            <span className="logo-text">Cozy Stitches</span>
          </div>
          <p>Handcrafted digital patterns for makers everywhere. Instant PDF downloads to create anywhere, anytime.</p>
          <div className="fm-socials">
            {socials.map(({ label, icon }) => (
              <a href="#" key={label}>
                {icon}
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="fm-col">
          <h4>Shop Patterns</h4>
          {['PDF Patterns', 'Amigurumi Guides', 'E-Books', 'Video Masterclasses', 'Pattern Bundles'].map((l) => (
            <a key={l} href="#">{l}</a>
          ))}
        </div>

        <div className="fm-col">
          <h4>Learn &amp; Craft</h4>
          {["Beginner's Guide", 'Stitch Library', 'Free Mini Pattern', 'US vs UK Terms', 'Crochet Journal'].map((l) => (
            <a key={l} href="#">{l}</a>
          ))}
        </div>

        <div className="fm-col">
          <h4>Support &amp; Trust</h4>
          {['How to Download', 'FAQ', 'Refund Policy', 'Contact Support', 'License Agreement'].map((l) => (
            <a key={l} href="#">{l}</a>
          ))}
        </div>

        <div className="fm-col">
          <h4>VIP Newsletter</h4>
          <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '.85rem', marginBottom: 12 }}>
            Get your free pattern + weekly drops:
          </p>
          {sent ? (
            <div className="fm-nl-success">
              <CheckCircle2 size={16} />
              <span>You're subscribed!</span>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="fm-nl">
              <input
                type="email" value={email} placeholder="your@email.com" required
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">
                <span>Join</span>
                <Send size={13} />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Cozy Stitches · All rights reserved · Digital patterns are licensed for personal &amp; small business use.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
