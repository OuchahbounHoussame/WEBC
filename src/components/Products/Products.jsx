import { useState } from 'react';
import { SearchX } from 'lucide-react';
import { products, categories, skillLevels } from '../../data/products';
import ProductCard from './ProductCard';
import './Products.css';

export default function Products({ onAddToCart, onViewProduct }) {
  const [activeCat,       setActiveCat]       = useState('all');
  const [activeSkill,     setActiveSkill]     = useState('all');
  const [sort,            setSort]            = useState('featured');

  const filtered = products
    .filter((p) => {
      if (activeCat === 'all') return true;
      if (activeCat === 'christmas') {
        return (
          p.iconKey === 'christmas-collection' ||
          p.iconKey === 'santa' ||
          p.badge === 'Holiday Special' ||
          p.badge === '5-in-1 Bundle' ||
          (p.slug && (p.slug.includes('christmas') || p.slug.includes('grinch') || p.slug.includes('snowman') || p.slug.includes('gingerbread') || p.slug.includes('dragon')))
        );
      }
      if (activeCat === 'pdf-pattern') {
        return p.category === 'pdf-pattern' || p.category === 'amigurumi' || (p.formats && p.formats.includes('PDF'));
      }
      return p.category === activeCat;
    })
    .filter((p) => (activeSkill === 'all' || p.skill === activeSkill))
    .sort((a, b) => {
      if (sort === 'featured')   return 0;
      if (sort === 'price-asc')  return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'popular')    return b.reviews - a.reviews;
      return 0;
    });

  return (
    <section className="products-section" id="products">
      <div className="section-header">
        <p className="section-label" style={{ color: '#dc2626', fontWeight: 800, letterSpacing: '1px' }}>
          🔥 END OF YEAR BLACK FRIDAY SALE
        </p>
        <h2>Holiday Amigurumi &amp; Crochet Patterns</h2>
        <p className="section-desc">
          Every pattern is an instant PDF download. Grab your favorite holiday designs for just <strong>$1.99</strong>!
        </p>
      </div>

      {/* Black Friday Promo Feature Banner */}
      <div className="bf-catalog-banner" style={{
        maxWidth: '1240px',
        margin: '0 auto 32px',
        background: 'linear-gradient(135deg, #1f0b24 0%, #4a0d26 50%, #7f1d1d 100%)',
        borderRadius: '16px',
        padding: '20px 28px',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        border: '1px solid rgba(244, 63, 94, 0.35)',
        boxShadow: '0 8px 30px rgba(42, 8, 39, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0, boxShadow: '0 0 15px rgba(220, 38, 38, 0.6)' }}>
            🎁
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                End of Year Event
              </span>
              <span style={{ color: '#fef08a', fontSize: '0.85rem', fontWeight: 700 }}>
                ⚡ Black Friday Doorbuster Deal
              </span>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.3rem', fontFamily: 'Georgia, serif', color: '#fff' }}>
              All Digital Patterns Marked Down to $1.99
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.86rem', color: 'rgba(255,255,255,0.85)' }}>
              Christmas Collections, Plush Santa, Festive Grinch, Snowman, Elf &amp; Animals. Instant lifetime access.
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'right', marginLeft: 'auto' }}>
          <div style={{ fontSize: '0.75rem', color: '#fecaca', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 700 }}>
            Catalog-Wide Price
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#fef08a', lineHeight: 1 }}>
            $1.99 <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500, textDecoration: 'line-through' }}>$7.99</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-row">
        <div className="filter-group">
          <span className="filter-label">Category:</span>
          <div className="filter-pills">
            {categories.map(({ key, label }) => (
              <button
                key={key}
                className={`filter-pill ${activeCat === key ? 'active' : ''}`}
                onClick={() => setActiveCat(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <span className="filter-label">Skill:</span>
          <div className="filter-pills">
            {skillLevels.map(({ key, label }) => (
              <button
                key={key}
                className={`filter-pill ${activeSkill === key ? 'active' : ''}`}
                onClick={() => setActiveSkill(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <select
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort products"
        >
          <option value="featured">Featured / Newest</option>
          <option value="popular">Most Popular</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>

      {/* Results count */}
      <p className="results-count">
        Showing <strong>{filtered.length}</strong> product{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="products-grid">
          {filtered.map((p, idx) => (
            <ProductCard
              key={p.id}
              product={p}
              priority={idx === 0}
              onAddToCart={onAddToCart}
              onViewProduct={onViewProduct}
            />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <SearchX size={40} className="no-results-icon" />
          <p>No patterns match these filters. Try a different combination!</p>
        </div>
      )}
    </section>
  );
}
