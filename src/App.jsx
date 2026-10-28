import { useState } from 'react';
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
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: '' });

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

  return (
    <>
      <Navbar cartCount={cart.length} onOpenCart={() => setCartOpen(true)} />
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
        onRemove={removeFromCart}
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
