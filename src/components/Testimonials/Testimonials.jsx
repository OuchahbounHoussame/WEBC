import { Star, CheckCircle2, Sparkles, Users, DownloadCloud, ThumbsUp, Heart } from 'lucide-react';
import { InstagramIcon } from '../Icons/CrochetIcons';
import { testimonials } from '../../data/products';
import './Testimonials.css';

export default function Testimonials() {
  const statIcons = {
    'Happy Makers': <Users size={18} />,
    'Patterns Downloaded': <DownloadCloud size={18} />,
    'Average Rating': <Star size={18} fill="#f5a623" color="#f5a623" />,
    'Would Recommend': <ThumbsUp size={18} />,
  };

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="section-header">
        <p className="section-label">Community Love</p>
        <h2>Made by Real Crocheters Like You</h2>
        <p className="section-desc">
          Over 8,000 happy makers have downloaded our patterns. Here's what they're saying — and making!
        </p>
      </div>

      {/* Stats strip */}
      <div className="testi-stats">
        {[
          { val: '8,000+', label: 'Happy Makers' },
          { val: '12,000+', label: 'Patterns Downloaded' },
          { val: '4.9 / 5', label: 'Average Rating' },
          { val: '98%', label: 'Would Recommend' },
        ].map(({ val, label }) => (
          <div className="tstat" key={label}>
            <div className="tstat-icon">{statIcons[label]}</div>
            <strong>{val}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Review cards */}
      <div className="testi-grid">
        {testimonials.map((t) => (
          <div key={t.id} className={`testi-card ${t.featured ? 'featured' : ''}`}>
            {t.featured && (
              <div className="testi-featured-badge">
                <Sparkles size={11} />
                <span>Featured Review</span>
              </div>
            )}

            <div className="testi-stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  fill={i < t.rating ? "#f5a623" : "none"}
                  color={i < t.rating ? "#f5a623" : "#d8c2e0"}
                  strokeWidth={2}
                />
              ))}
            </div>

            <p className="testi-text">"{t.text}"</p>

            <div className="testi-project">
              <Heart size={14} className="tp-heart-icon" />
              <span>
                Pattern: <em>{t.project}</em>
              </span>
            </div>

            <div className="testi-author">
              <div className="ta-avatar">{t.initial}</div>
              <div>
                <strong>{t.name}</strong>
                <span>{t.location}</span>
              </div>
              <div className="ta-verified">
                <CheckCircle2 size={12} />
                <span>Verified Buyer</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Community CTA */}
      <div className="testi-cta">
        <InstagramIcon size={20} className="testi-insta-icon" />
        <p>
          Share your finished project on Instagram with <strong>#CozyStitchesPattern</strong> to get featured!
        </p>
      </div>
    </section>
  );
}
