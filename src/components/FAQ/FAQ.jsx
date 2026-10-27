import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { faqs } from '../../data/products';
import './FAQ.css';

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const toggle = (id) => setOpen(open === id ? null : id);

  return (
    <section className="faq-section" id="faq">
      <div className="section-header">
        <p className="section-label">Got Questions?</p>
        <h2>Frequently Asked Questions</h2>
        <p className="section-desc">
          Everything you need to know about buying and using digital crochet patterns from our store.
        </p>
      </div>

      <div className="faq-list">
        {faqs.map((faq) => {
          const isOpen = open === faq.id;
          return (
            <div
              key={faq.id}
              className={`faq-item ${isOpen ? 'open' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggle(faq.id)}
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <span className="faq-icon">
                  <ChevronDown
                    size={17}
                    className={`faq-chevron ${isOpen ? 'rotated' : ''}`}
                  />
                </span>
              </button>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="faq-contact-cta">
        <p>Still have questions? We reply within a few hours.</p>
        <a
          href="#contact"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <MessageCircle size={17} />
          <span>Contact Our Team</span>
        </a>
      </div>
    </section>
  );
}
