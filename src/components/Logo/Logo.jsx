import './Logo.css';

export default function Logo({ 
  size = 36, 
  showText = true, 
  showTagline = true, 
  variant = 'auto', 
  className = '' 
}) {
  return (
    <div className={`brand-logo ${variant} ${className}`}>
      {/* Handcrafted Vector Emblem */}
      <div className="brand-logo-emblem" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="blBgGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fff8fa" />
              <stop offset="100%" stopColor="#f3edf9" />
            </linearGradient>
            <linearGradient id="blYarnGrad" x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f49ab0" />
              <stop offset="50%" stopColor="#e8829b" />
              <stop offset="100%" stopColor="#cf6a84" />
            </linearGradient>
            <linearGradient id="blHookGrad" x1="14" y1="36" x2="38" y2="12" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#9d7dc5" />
              <stop offset="50%" stopColor="#c19ad8" />
              <stop offset="100%" stopColor="#e8c288" />
            </linearGradient>
            <filter id="blShadow" x="0" y="2" width="48" height="46" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#733c76" floodOpacity="0.22" />
            </filter>
          </defs>

          {/* Circle base */}
          <circle cx="24" cy="24" r="22" fill="url(#blBgGrad)" stroke="#ebd6eb" strokeWidth="1.8" />

          <g filter="url(#blShadow)">
            {/* Yarn ball */}
            <circle cx="23" cy="25" r="13" fill="url(#blYarnGrad)" />

            {/* Yarn loops */}
            <path d="M12 24C15 17 24 16 32 21" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.88" />
            <path d="M13 28C17 33 26 34 33 27" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.88" />
            <path d="M18 16C23 19 26 29 24 36" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.88" />
            <path d="M22 13C27 17 31 25 29 35" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.75" />

            {/* Little heart tail */}
            <path d="M23 38C21 40.5 17 41.5 15 39.5C13 37.5 15 35 17 35C19 35 20.5 37 20 38.5" stroke="#cf6a84" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Crochet Hook */}
            <path d="M13 37L22 28" stroke="url(#blHookGrad)" strokeWidth="3" strokeLinecap="round" />
            <path d="M22 28L34 16" stroke="#f6ecc9" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M34 16C35.5 14.5 37.5 14 38 15.5C38.5 17 37 17.5 35.5 18" stroke="#e5b869" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Sparkles */}
          <path d="M37 8L38 11L41 12L38 13L37 16L36 13L33 12L36 11Z" fill="#f5a623" />
          <circle cx="39" cy="21" r="1.3" fill="#e8829b" />
          <circle cx="8" cy="18" r="1.3" fill="#9d7dc5" />
        </svg>
      </div>

      {showText && (
        <div className="brand-logo-text-block">
          <div className="brand-logo-name">
            <span className="bl-cozy">Cozy</span>
            <span className="bl-stitches">Stitches</span>
          </div>
          {showTagline && (
            <span className="brand-logo-tagline">Crochet Patterns</span>
          )}
        </div>
      )}
    </div>
  );
}
