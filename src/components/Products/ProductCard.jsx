import { useState } from 'react';
import {
  Star,
  Zap,
  Globe,
  DownloadCloud,
  FileText,
  Eye,
  Check,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { ProductIcon } from '../Icons/CrochetIcons';
import './Products.css';

export default function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article className="product-card">
      {/* Thumbnail */}
      <div className="pc-thumb" style={{ background: product.color }}>
        <div className="pc-vector-art">
          <ProductIcon iconKey={product.iconKey} size={90} />
        </div>

        {product.bestseller && (
          <div className="pc-ribbon">
            <Sparkles size={11} className="pc-ribbon-icon" />
            <span>Bestseller</span>
          </div>
        )}

        {product.originalPrice && (
          <div className="pc-sale-badge">
            SAVE {Math.round((1 - product.price / product.originalPrice) * 100)}%
          </div>
        )}

        <div className="pc-overlay">
          <button className="pc-preview-btn">
            <Eye size={15} />
            <span>Quick Preview</span>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="pc-body">
        {/* Badges row */}
        <div className="pc-badges">
          <span className="pc-badge-type">{product.badge}</span>
          <span className="pc-badge-instant">
            <Zap size={11} />
            <span>{product.tag}</span>
          </span>
        </div>

        {/* Skill + terms */}
        <div className="pc-meta">
          <span className={`skill-pill skill-${product.skill}`}>
            <span className="skill-dot" />
            <span>{product.skill}</span>
          </span>
          <span className="pc-terms">
            <Globe size={12} />
            <span>{product.terms}</span>
          </span>
        </div>

        <h3 className="pc-name">{product.name}</h3>
        <p className="pc-desc">{product.description}</p>

        {/* Stats */}
        <div className="pc-stats">
          <div className="pc-stars" title={`${product.stars} stars`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={13}
                fill={i < product.stars ? "#f5a623" : "none"}
                color={i < product.stars ? "#f5a623" : "#d8c2e0"}
                strokeWidth={2}
              />
            ))}
            <span className="pc-review-count">({product.reviews})</span>
          </div>
          <span className="pc-downloads">
            <DownloadCloud size={13} />
            <span>{product.downloads} downloads</span>
          </span>
        </div>

        {/* File info */}
        <div className="pc-formats">
          {product.pages && (
            <span className="pc-pages-info">
              <FileText size={12} />
              <span>{product.pages} pages</span>
            </span>
          )}
          {product.formats.map((f) => (
            <span key={f} className="pc-format-tag">{f}</span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="pc-footer">
          <div className="pc-price-wrap">
            {product.originalPrice && (
              <span className="pc-original">\${product.originalPrice.toFixed(2)}</span>
            )}
            <span className="pc-price">\${product.price.toFixed(2)}</span>
          </div>
          <button
            className={`btn pc-cta ${added ? 'added' : 'btn-primary'}`}
            onClick={handleAdd}
          >
            {added ? (
              <>
                <Check size={15} />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={15} />
                <span>Get Pattern</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
