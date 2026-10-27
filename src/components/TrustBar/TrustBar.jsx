import { Zap, Printer, Infinity as InfinityIcon, ShieldCheck, Globe, Clock } from 'lucide-react';
import './TrustBar.css';

const items = [
  { icon: <Zap size={17} className="trust-lucide" />, text: 'Instant PDF Delivery' },
  { icon: <Printer size={17} className="trust-lucide" />, text: 'Print-Ready Files' },
  { icon: <InfinityIcon size={17} className="trust-lucide" />, text: 'Download Forever' },
  { icon: <ShieldCheck size={17} className="trust-lucide" />, text: 'Secure 256-bit Checkout' },
  { icon: <Globe size={17} className="trust-lucide" />, text: 'US & UK Terms Included' },
  { icon: <Clock size={17} className="trust-lucide" />, text: '24/7 Dedicated Support' },
];

export default function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="trust-inner">
        {items.map(({ icon, text }) => (
          <div className="trust-item" key={text}>
            <span className="trust-icon">{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
