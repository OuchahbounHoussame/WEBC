import { Leaf, Scissors, PackageCheck, Heart } from 'lucide-react';
import './Features.css';

const items = [
  { icon: <Leaf size={28} />, title: 'Eco-Friendly Yarns', desc: 'Sustainably sourced, natural fibers' },
  { icon: <Scissors size={28} />, title: 'Custom Orders', desc: 'Made to your exact specifications' },
  { icon: <PackageCheck size={28} />, title: 'Fast Delivery', desc: 'Instant access right to your inbox' },
  { icon: <Heart size={28} />, title: 'Made with Love', desc: 'Every stitch carefully designed' },
];

export default function Features() {
  return (
    <section className="features-strip">
      <div className="features-container">
        {items.map(({ icon, title, desc }) => (
          <div className="feature-item" key={title}>
            <span className="feature-icon">{icon}</span>
            <div>
              <strong>{title}</strong>
              <p>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
