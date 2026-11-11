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
  Sparkles,
  Gift
} from 'lucide-react';
import { ProductIcon } from '../Icons/CrochetIcons';
import './Products.css';

export default function ProductCard({ product, onAddToCart, onViewProduct }) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleOpenProduct = () => {
    if (onViewProduct) {
      onViewProduct(product);
    }
  };

  return (
    <article className="product-card">
      {/* Thumbnail */}
      <div
        className="pc-thumb"
        onClick={handleOpenProduct}
        title="Click to view pattern details and photos"
      >
        <div className="pc-vector-art">
          {product.primaryImage ? (
            <img
              src={product.primaryImage}
              alt={`${product.name} handmade crochet amigurumi pattern PDF`}
              loading="lazy"
              className="pc-real-product-img"
            />
          ) : (
            <ProductIcon iconKey={product.iconKey} size={105} />
          )}
        </div>

        {product.bestseller && (
          <div className="pc-ribbon">
            <Sparkles size={11} className="pc-ribbon-icon" />
            <span>Bestseller</span>
          </div>
        )}

        {/* Top-Right Badge (Clean separation to prevent collision) */}
        {product.id === 2 && (
          <a
            href="#freebie"
            className="pc-sale-badge"
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              textDecoration: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
            onClick={(e) => {
              e.stopPropagation();
              const el = document.getElementById('freebie');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            title="Download this pattern 100% Free below!"
          >
            <Gift size={11} />
            <span>FREE WITH EMAIL</span>
          </a>
        )}

        <div className="pc-overlay">
          <a
            href={`/product/${product.id}`}
            className="pc-preview-btn"
            style={{ textDecoration: 'none' }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleOpenProduct();
            }}
          >
            <Eye size={15} />
            <span>View Product</span>
          </a>
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

        <h3 className="pc-name">
          <a
            href={`/product/${product.id}`}
            className="pc-name-link"
            onClick={(e) => {
              e.preventDefault();
              handleOpenProduct();
            }}
          >
            {product.name}
          </a>
        </h3>
        <p className="pc-desc">{product.description}</p>

        {/* Honest Format & Delivery Specs */}
        <div className="pc-stats">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: '#733c76', fontWeight: 600 }}>
            <FileText size={13} color="#be6c87" />
            <span>Digital PDF</span>
          </div>
          <span className="pc-downloads">
            <DownloadCloud size={13} />
            <span>Instant Access</span>
          </span>
        </div>
      </div>
    </article>
  );
}
