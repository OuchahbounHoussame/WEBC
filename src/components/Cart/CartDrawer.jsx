import { useState } from 'react';
import { X, Trash2, DownloadCloud, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ProductIcon } from '../Icons/CrochetIcons';
import './CartDrawer.css';

export default function CartDrawer({ isOpen, onClose, cart, onRemove, onOpenPattern }) {
  const [checkedOut, setCheckedOut] = useState(false);

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    setCheckedOut(true);
  };

  return (
    <div className="cart-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div className="cart-title-row">
            <ShoppingBag size={20} className="cart-icon-header" />
            <h3>Your Pattern Bag ({cart.length})</h3>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={48} className="cart-empty-icon" />
            <p>Your bag is empty!</p>
            <span>Explore our PDF patterns and amigurumi guides.</span>
            <button className="btn btn-primary" onClick={onClose}>
              Browse Patterns
            </button>
          </div>
        ) : checkedOut ? (
          <div className="cart-success">
            <CheckCircle2 size={54} className="cart-success-icon" />
            <h3>Thank You for Your Order!</h3>
            <p>Your instant PDF downloads are ready below:</p>

            <div className="cart-downloads-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-dl-item">
                  <div className="cdl-thumb" style={{ background: item.color || '#fef0f4' }}>
                    <ProductIcon iconKey={item.iconKey} size={36} />
                  </div>
                  <div className="cdl-info">
                    <strong>{item.name}</strong>
                    <span>{item.pages ? `${item.pages} Pages PDF` : 'PDF Pattern'}</span>
                  </div>
                  <button
                    className="btn btn-primary cdl-btn"
                    onClick={() => {
                      onOpenPattern(item);
                      onClose();
                    }}
                  >
                    <DownloadCloud size={15} />
                    <span>View / Save PDF</span>
                  </button>
                </div>
              ))}
            </div>

            <button
              className="btn btn-outline-dark"
              style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}
              onClick={() => {
                setCheckedOut(false);
                onClose();
              }}
            >
              Continue Browsing
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="ci-thumb" style={{ background: item.color || '#fee6ea' }}>
                    <ProductIcon iconKey={item.iconKey} size={42} />
                  </div>
                  <div className="ci-info">
                    <h4 className="ci-name">{item.name}</h4>
                    <span className="ci-tag">Instant PDF Download</span>
                    <span className="ci-price">${item.price.toFixed(2)}</span>
                  </div>
                  <button
                    className="ci-remove-btn"
                    onClick={() => onRemove(item.id)}
                    title="Remove item"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total-row">
                <span>Subtotal</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <p className="cart-note">
                <DownloadCloud size={14} />
                <span>Instant access sent to your email + direct download</span>
              </p>
              <button className="btn btn-primary cart-checkout-btn" onClick={handleCheckout}>
                <span>Instant Checkout &amp; Download</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
