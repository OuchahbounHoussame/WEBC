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
import BackToTop    from './components/BackToTop/BackToTop';
import './App.css';

export default function App() {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const addToCart = (product) => {
    if (!cart.find((p) => p.id === product.id)) {
      setCart((prev) => [...prev, product]);
    }
    setToast({ visible: true, message: `"${product.name}" added to cart!` });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  return (
    <>
      <Navbar cartCount={cart.length} />
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
      <BackToTop />
    </>
  );
}
