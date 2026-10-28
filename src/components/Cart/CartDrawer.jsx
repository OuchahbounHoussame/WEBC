import { useState, useEffect } from 'react';
import {
  X,
  Trash2,
  DownloadCloud,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Lock,
  Mail,
  User,
  Clock,
  RefreshCw,
  Search,
  PackageCheck
} from 'lucide-react';
import { ProductIcon } from '../Icons/CrochetIcons';
import './CartDrawer.css';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  initialTab = 'cart',
  purchasedOrders = [],
  onOrderSuccess,
  onRemove,
  onClearCart
}) {
  const [view, setView] = useState('cart'); // 'cart' | 'checkout' | 'success' | 'downloads' | 'recover'
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [orderResult, setOrderResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Recover form
  const [recoverOrderId, setRecoverOrderId] = useState('');
  const [recoverEmail, setRecoverEmail] = useState('');
  const [recoverResult, setRecoverResult] = useState(null);

  // Sync initial tab when opened
  useEffect(() => {
    if (isOpen) {
      if (initialTab === 'downloads') {
        setView('downloads');
      } else if (view !== 'success') {
        setView('cart');
      }
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // Flatten all purchased downloads across orders
  const allPurchasedDownloads = [];
  for (const ord of purchasedOrders) {
    if (ord.downloads) {
      for (const dl of ord.downloads) {
        allPurchasedDownloads.push({
          ...dl,
          orderId: ord.orderId,
          customerEmail: ord.customerEmail,
          purchasedAt: ord.createdAt
        });
      }
    }
  }

  // Submit checkout to real backend
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerEmail || !customerEmail.includes('@')) {
      setErrorMsg('Please enter a valid email to receive your secure downloads.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/orders/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: customerEmail,
          name: customerName,
          items: cart.map((i) => ({ id: i.id })),
          paymentMethod: 'card'
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Payment failed to process');
      }

      setOrderResult(data.order);
      if (onOrderSuccess) onOrderSuccess(data.order);
      if (onClearCart) onClearCart();
      setView('success');
    } catch (err) {
      console.error('Checkout failed:', err);
      setErrorMsg(err.message || 'Could not connect to store backend.');
    } finally {
      setLoading(false);
    }
  };

  // Recover order links
  const handleRecoverSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setRecoverResult(null);

    try {
      setLoading(true);
      const res = await fetch('/api/orders/refresh-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: recoverOrderId,
          email: recoverEmail
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Order not found');
      }
      setRecoverResult(data.downloads);
      if (onOrderSuccess) {
        onOrderSuccess({
          orderId: recoverOrderId,
          customerEmail: recoverEmail,
          createdAt: new Date().toISOString(),
          downloads: data.downloads
        });
      }
    } catch (err) {
      setErrorMsg(err.message || 'Could not verify order details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title-row">
            <ShoppingBag size={20} className="cart-icon-header" />
            <h3>
              {view === 'cart' && `Your Bag (${cart.length})`}
              {view === 'checkout' && 'Secure Instant Checkout'}
              {view === 'success' && 'Order Confirmed!'}
              {view === 'downloads' && `My Patterns (${allPurchasedDownloads.length})`}
              {view === 'recover' && 'Access Your Patterns'}
            </h3>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs (when user has purchases) */}
        {(purchasedOrders.length > 0 || allPurchasedDownloads.length > 0) && view !== 'checkout' && view !== 'success' && (
          <div className="cart-tabs-bar">
            <button
              className={`cart-tab-btn ${view === 'cart' ? 'active' : ''}`}
              onClick={() => setView('cart')}
            >
              <ShoppingBag size={14} />
              <span>Bag ({cart.length})</span>
            </button>
            <button
              className={`cart-tab-btn ${view === 'downloads' ? 'active' : ''}`}
              onClick={() => setView('downloads')}
            >
              <PackageCheck size={14} />
              <span>My Patterns ({allPurchasedDownloads.length})</span>
            </button>
          </div>
        )}

        {/* View 1: Cart Items */}
        {view === 'cart' && (
          <>
            {cart.length === 0 ? (
              <div className="cart-empty">
                <ShoppingBag size={48} className="cart-empty-icon" />
                <p>Your bag is empty!</p>
                <span>Select any pattern to get instant PDF download access.</span>
                <button className="btn btn-primary" onClick={onClose}>
                  Browse Patterns
                </button>
                {allPurchasedDownloads.length > 0 ? (
                  <button
                    className="btn btn-outline-dark"
                    style={{ marginTop: '16px' }}
                    onClick={() => setView('downloads')}
                  >
                    <DownloadCloud size={15} />
                    <span>View My Purchased Patterns ({allPurchasedDownloads.length})</span>
                  </button>
                ) : (
                  <button
                    className="cart-recover-link"
                    onClick={() => setView('recover')}
                    style={{ marginTop: '24px' }}
                  >
                    <Search size={14} />
                    <span>Already purchased? Retrieve downloads</span>
                  </button>
                )}
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
                        <span className="ci-tag">Protected Instant PDF</span>
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
                    <span>Total Amount</span>
                    <strong>${total.toFixed(2)}</strong>
                  </div>
                  <div className="cart-security-badge">
                    <ShieldCheck size={16} className="csb-icon" />
                    <span>Saved in browser • Private download stream</span>
                  </div>
                  <button
                    className="btn btn-primary cart-checkout-btn"
                    onClick={() => setView('checkout')}
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={17} />
                  </button>
                  <button className="cart-recover-link" onClick={() => setView('recover')}>
                    <Search size={13} />
                    <span>Already purchased? Retrieve your patterns</span>
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* View 2: Checkout Form */}
        {view === 'checkout' && (
          <form className="cart-checkout-form" onSubmit={handleCheckoutSubmit}>
            <div className="cc-summary-box">
              <div className="cc-sum-header">
                <span>Order Summary ({cart.length} item{cart.length > 1 ? 's' : ''})</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <ul className="cc-items-pill-list">
                {cart.map((c) => (
                  <li key={c.id}>
                    <span>{c.name}</span>
                    <span>${c.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="cc-input-group">
              <label htmlFor="customer-email">
                <Mail size={14} /> Email Address (For Pattern Delivery) *
              </label>
              <input
                id="customer-email"
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="cc-input"
              />
              <span className="cc-hint">
                Your private download links &amp; receipt will be linked to this email.
              </span>
            </div>

            <div className="cc-input-group">
              <label htmlFor="customer-name">
                <User size={14} /> Your Name (Optional)
              </label>
              <input
                id="customer-name"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Crochet Lover"
                className="cc-input"
              />
            </div>

            {errorMsg && <div className="cc-error-box">{errorMsg}</div>}

            <div className="cc-protection-box">
              <Lock size={15} />
              <div>
                <strong>Secure Tokenized Download</strong>
                <p>PDFs are never public. Access is granted via private, timed tokens to prevent piracy.</p>
              </div>
            </div>

            <div className="cc-buttons-row">
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => setView('cart')}
                disabled={loading}
              >
                Back to Bag
              </button>
              <button
                type="submit"
                className="btn btn-primary cc-pay-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="spin-icon" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Lock size={15} />
                    <span>Complete &amp; Download</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* View 3: Order Completed (Immediate Success) */}
        {view === 'success' && orderResult && (
          <div className="cart-success">
            <CheckCircle2 size={54} className="cart-success-icon" />
            <h3>Payment Confirmed!</h3>
            <p className="cs-order-num">
              Order ID: <strong>{orderResult.orderId}</strong>
            </p>
            <p className="cs-email-tag">
              Saved permanently to your browser + receipt to <strong>{orderResult.customerEmail}</strong>
            </p>

            <div className="cs-security-callout">
              <ShieldCheck size={16} />
              <span>
                Permanent access saved in your browser • 48-hour active direct links
              </span>
            </div>

            <div className="cart-downloads-list">
              {orderResult.downloads.map((dl) => (
                <div key={dl.productId} className="cart-dl-item">
                  <div className="cdl-thumb" style={{ background: '#fdf0f4' }}>
                    <ProductIcon iconKey={dl.productId === 1 ? 'crewmate' : dl.productId === 2 ? 'star' : 'glasses'} size={38} />
                  </div>
                  <div className="cdl-info">
                    <strong>{dl.productName}</strong>
                    <div className="cdl-meta">
                      <span><Clock size={11} /> 48h active link</span>
                      <span><DownloadCloud size={11} /> 5 downloads limit</span>
                    </div>
                  </div>
                  <a
                    href={dl.downloadUrl}
                    className="btn btn-primary cdl-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DownloadCloud size={14} />
                    <span>Download PDF</span>
                  </a>
                </div>
              ))}
            </div>

            <div className="cs-actions" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setView('downloads')}
              >
                <PackageCheck size={16} />
                <span>Go to My Purchased Patterns</span>
              </button>
              <button
                className="btn btn-outline-dark"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={onClose}
              >
                Back to Store
              </button>
            </div>
          </div>
        )}

        {/* View 4: Persistent "My Purchased Patterns" (Survives Reloads!) */}
        {view === 'downloads' && (
          <div className="cart-persistent-downloads">
            {allPurchasedDownloads.length === 0 ? (
              <div className="cart-empty">
                <PackageCheck size={48} className="cart-empty-icon" />
                <p>No Patterns Purchased Yet</p>
                <span>When you purchase patterns, they stay permanently accessible here.</span>
                <button className="btn btn-primary" onClick={() => setView('cart')}>
                  Back to Store
                </button>
              </div>
            ) : (
              <>
                <div className="cpd-header">
                  <p>Here are your purchased patterns. You can download your PDFs anytime:</p>
                </div>

                <div className="cart-downloads-list">
                  {allPurchasedDownloads.map((dl, idx) => (
                    <div key={`${dl.orderId}-${dl.productId}-${idx}`} className="cart-dl-item">
                      <div className="cdl-thumb" style={{ background: '#fdf0f4' }}>
                        <ProductIcon iconKey={dl.productId === 1 ? 'crewmate' : dl.productId === 2 ? 'star' : 'glasses'} size={38} />
                      </div>
                      <div className="cdl-info">
                        <strong>{dl.productName}</strong>
                        <div className="cdl-meta">
                          <span>Order: {dl.orderId}</span>
                        </div>
                      </div>
                      <a
                        href={dl.downloadUrl}
                        className="btn btn-primary cdl-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <DownloadCloud size={14} />
                        <span>Download PDF</span>
                      </a>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #f0e0f4' }}>
                  <button className="cart-recover-link" onClick={() => setView('recover')}>
                    <RefreshCw size={13} />
                    <span>Need to renew expired links? Click here</span>
                  </button>
                  <button
                    className="btn btn-outline-dark"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* View 5: Retrieve / Refresh Link */}
        {view === 'recover' && (
          <div className="cart-recover-view">
            <h4>Retrieve Purchased Patterns</h4>
            <p className="cr-desc">
              Enter your Order ID and the email you used at checkout to generate fresh download tokens.
            </p>

            <form onSubmit={handleRecoverSubmit} className="cr-form">
              <div className="cc-input-group">
                <label>Order ID *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ORD-MVSGN925-7641"
                  value={recoverOrderId}
                  onChange={(e) => setRecoverOrderId(e.target.value)}
                  className="cc-input"
                />
              </div>

              <div className="cc-input-group">
                <label>Purchasing Email *</label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={recoverEmail}
                  onChange={(e) => setRecoverEmail(e.target.value)}
                  className="cc-input"
                />
              </div>

              {errorMsg && <div className="cc-error-box">{errorMsg}</div>}

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                disabled={loading}
              >
                {loading ? 'Verifying Order...' : 'Retrieve Secure Access'}
              </button>
            </form>

            {recoverResult && (
              <div className="cr-results">
                <h5>Active Downloads for Order:</h5>
                <div className="cart-downloads-list">
                  {recoverResult.map((dl) => (
                    <div key={dl.productId} className="cart-dl-item">
                      <div className="cdl-info">
                        <strong>{dl.productName}</strong>
                        <span>Token renewed • 48h active</span>
                      </div>
                      <a
                        href={dl.downloadUrl}
                        className="btn btn-primary cdl-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <DownloadCloud size={14} />
                        <span>Download PDF</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              className="btn btn-outline-dark"
              style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}
              onClick={() => setView('cart')}
            >
              Back to Bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
