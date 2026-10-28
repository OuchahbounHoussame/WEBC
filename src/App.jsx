import { useState, useEffect } from 'react';
import Navbar       from './components/Navbar/Navbar';
import Hero         from './components/Hero/Hero';
import TrustBar     from './components/TrustBar/TrustBar';
import Products     from './components/Products/Products';
import HowItWorks   from './components/HowItWorks/HowItWorks';
import Freebie      from './components/Freebie/Freebie';
import Testimonials from './components/Testimonials/Testimonials';
import FAQ          from './components/FAQ/FAQ';
import Footer       from './components/Footer/Footer';
import CartToast    from './components/CartToast/CartToast';
import CartDrawer   from './components/Cart/CartDrawer';
import PatternModal from './components/Products/PatternModal';
import BackToTop    from './components/BackToTop/BackToTop';
import './App.css';

export default function App() {
  // Persist cart across reloads
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('crochet_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Persist purchased orders across reloads
  const [purchasedOrders, setPurchasedOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('crochet_purchased_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [cartInitialTab, setCartInitialTab] = useState('cart'); // 'cart' | 'downloads'
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: '' });

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('crochet_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  // Save purchased orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('crochet_purchased_orders', JSON.stringify(purchasedOrders));
    } catch (e) {}
  }, [purchasedOrders]);

  const addToCart = (product) => {
    if (!cart.find((p) => p.id === product.id)) {
      setCart((prev) => [...prev, product]);
    }
    setToast({ visible: true, message: `"${product.name}" added to bag!` });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const handleOrderSuccess = (order) => {
    setPurchasedOrders((prev) => [order, ...prev.filter((o) => o.orderId !== order.orderId)]);
    setCart([]);
  };

  // Total downloads count
  const downloadsCount = purchasedOrders.reduce(
    (sum, o) => sum + (o.downloads ? o.downloads.length : 0),
    0
  );

  return (
    <>
      <Navbar
        cartCount={cart.length}
        downloadsCount={downloadsCount}
        onOpenCart={() => {
          setCartInitialTab('cart');
          setCartOpen(true);
        }}
        onOpenDownloads={() => {
          setCartInitialTab('downloads');
          setCartOpen(true);
        }}
      />
      <main>
        <Hero />
        <TrustBar />
        <Products onAddToCart={addToCart} />
        <HowItWorks />
        <Freebie />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <CartToast toast={toast} />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        initialTab={cartInitialTab}
        purchasedOrders={purchasedOrders}
        onOrderSuccess={handleOrderSuccess}
        onRemove={removeFromCart}
        onClearCart={() => setCart([])}
        onOpenPattern={(product) => setSelectedPattern(product)}
      />
      {selectedPattern && (
        <PatternModal
          product={selectedPattern}
          onClose={() => setSelectedPattern(null)}
          onAddToCart={addToCart}
        />
      )}
      <BackToTop />
    </>
  );
}
