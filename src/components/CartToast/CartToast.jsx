import { CheckCircle2 } from 'lucide-react';
import './CartToast.css';

export default function CartToast({ toast }) {
  return (
    <div className={`cart-toast ${toast.visible ? 'show' : ''}`} role="alert" aria-live="polite">
      <CheckCircle2 size={18} className="toast-check-icon" />
      <span>{toast.message}</span>
    </div>
  );
}
