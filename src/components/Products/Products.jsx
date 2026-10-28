import { useState } from 'react';
import { SearchX } from 'lucide-react';
import { products, categories, skillLevels } from '../../data/products';
import ProductCard from './ProductCard';
import PatternModal from './PatternModal';
import './Products.css';

export default function Products({ onAddToCart }) {
  const [activeCat,       setActiveCat]       = useState('all');
  const [activeSkill,     setActiveSkill]     = useState('all');
  const [sort,            setSort]            = useState('featured');
  const [previewProduct, setPreviewProduct]  = useState(null);

  const filtered = products
    .filter((p) => {
      if (activeCat === 'all') return true;
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
        <p className="section-label">Digital Catalog</p>
        <h2>Download &amp; Start Crocheting Today</h2>
        <p className="section-desc">
          Every pattern is an instant PDF download — no waiting, no shipping. Just beautiful crochet.
        </p>
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
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={onAddToCart}
              onPreview={setPreviewProduct}
            />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <SearchX size={40} className="no-results-icon" />
          <p>No patterns match these filters. Try a different combination!</p>
        </div>
      )}

      {/* Quick Preview Modal */}
      {previewProduct && (
        <PatternModal
          product={previewProduct}
          onClose={() => setPreviewProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
}
