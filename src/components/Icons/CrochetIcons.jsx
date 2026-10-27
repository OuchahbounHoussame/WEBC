// Custom professional vector illustrations for crochet store
export function YarnLogoIcon({ size = 28, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="18" fill="url(#yarnGrad)" />
      {/* Yarn texture curves */}
      <path
        d="M10 20C14 14 26 12 36 20M12 28C18 34 30 35 38 27M16 14C24 18 28 30 26 38M20 10C27 16 32 26 31 38"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />
      {/* Crochet Hook */}
      <path
        d="M38 8L28 18M38 8C39.5 6.5 41.5 7.5 41 9.5C40.5 11 39 11.5 37.5 10.5"
        stroke="#ffffff"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tail loop */}
      <path
        d="M26 38C24 43 18 45 14 43C10 41 12 36 15 36C18 36 19 39 18 42"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.75"
      />
      <defs>
        <linearGradient id="yarnGrad" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e8829b" />
          <stop offset="0.5" stopColor="#b47eb3" />
          <stop offset="1" stopColor="#54b895" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 1. Sunflower Granny Square Vector
export function SunflowerSquareIcon({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Granny Square Base Frame */}
      <rect x="12" y="12" width="76" height="76" rx="14" fill="#ffffff" fillOpacity="0.4" stroke="#d49a3d" strokeWidth="2.5" strokeDasharray="5 3" />
      <rect x="20" y="20" width="60" height="60" rx="8" fill="#ffffff" fillOpacity="0.5" stroke="#e6b359" strokeWidth="2" />
      {/* Granny corner clusters */}
      <circle cx="20" cy="20" r="4" fill="#e8829b" />
      <circle cx="80" cy="20" r="4" fill="#e8829b" />
      <circle cx="20" cy="80" r="4" fill="#e8829b" />
      <circle cx="80" cy="80" r="4" fill="#e8829b" />
      {/* Sunflower Petals */}
      <g transform="translate(50, 50)">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
          <path
            key={deg}
            d="M0 -8 C-4 -16 0 -24 0 -24 C0 -24 4 -16 0 -8 Z"
            fill={i % 2 === 0 ? "#f7c948" : "#fadb5f"}
            stroke="#d49a3d"
            strokeWidth="1"
            transform={`rotate(${deg})`}
          />
        ))}
        {/* Flower Center with Crochet Puff Stitches */}
        <circle cx="0" cy="0" r="10" fill="#7a4419" />
        <circle cx="0" cy="0" r="7" fill="#5c3110" />
        <circle cx="-2" cy="-2" r="1.5" fill="#f7c948" fillOpacity="0.8" />
        <circle cx="3" cy="-1" r="1.2" fill="#f7c948" fillOpacity="0.8" />
        <circle cx="0" cy="3" r="1.3" fill="#f7c948" fillOpacity="0.8" />
      </g>
    </svg>
  );
}

// 2. Amigurumi Teddy Bear Vector
export function BearAmigurumiIcon({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Ears */}
      <circle cx="32" cy="28" r="12" fill="#e29aa9" stroke="#b86d7d" strokeWidth="2.5" />
      <circle cx="32" cy="28" r="6" fill="#f6c2cd" />
      <circle cx="68" cy="28" r="12" fill="#e29aa9" stroke="#b86d7d" strokeWidth="2.5" />
      <circle cx="68" cy="28" r="6" fill="#f6c2cd" />
      {/* Head */}
      <ellipse cx="50" cy="50" rx="28" ry="24" fill="#eed0d6" stroke="#b86d7d" strokeWidth="2.5" />
      {/* Crochet texture stitch marks */}
      <path d="M36 38L38 40M48 34L50 36M62 38L64 40" stroke="#c97e8e" strokeWidth="1.8" strokeLinecap="round" />
      {/* Eyes (Safety eyes with shine) */}
      <circle cx="40" cy="46" r="3.5" fill="#2d1c24" />
      <circle cx="39" cy="45" r="1.2" fill="#ffffff" />
      <circle cx="60" cy="46" r="3.5" fill="#2d1c24" />
      <circle cx="59" cy="45" r="1.2" fill="#ffffff" />
      {/* Snout */}
      <ellipse cx="50" cy="56" rx="10" ry="7" fill="#ffffff" stroke="#e29aa9" strokeWidth="1.5" />
      <path d="M47 54C48.5 53 51.5 53 53 54C52 56 48 56 47 54Z" fill="#592b35" />
      <path d="M50 55V59M48 59C49 60 51 60 52 59" stroke="#592b35" strokeWidth="1.5" strokeLinecap="round" />
      {/* Cheeks */}
      <ellipse cx="32" cy="53" rx="4" ry="2.5" fill="#e8829b" fillOpacity="0.5" />
      <ellipse cx="68" cy="53" rx="4" ry="2.5" fill="#e8829b" fillOpacity="0.5" />
      {/* Body / Bow */}
      <path d="M45 74L50 71L55 74L53 77L50 75L47 77Z" fill="#9d7dc5" />
    </svg>
  );
}

// 3. Boho Tote Bag Vector
export function BohoToteIcon({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Handles */}
      <path d="M38 42V20C38 15 44 12 50 12C56 12 62 15 62 20V42" stroke="#8c77b2" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Bag Body */}
      <path d="M26 40C26 38 28 36 30 36H70C72 36 74 38 74 40L70 82C69 86 65 88 60 88H40C35 88 31 86 30 82L26 40Z" fill="#f0e9f8" stroke="#8c77b2" strokeWidth="2.5" />
      {/* Mesh / Shell Stitches pattern */}
      <g stroke="#a694c9" strokeWidth="1.6" fill="none">
        <path d="M30 46Q50 52 70 46" />
        <path d="M29 55Q50 62 71 55" />
        <path d="M30 64Q50 71 70 64" />
        <path d="M32 73Q50 80 68 73" />
        {/* Vertical cross texture */}
        <path d="M42 38L40 85M50 38V87M58 38L60 85" strokeDasharray="3 3" />
      </g>
      {/* Tassel */}
      <path d="M62 42L66 52M64 52L68 52" stroke="#e8829b" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 4. Crochet Bible Book Vector
export function CrochetBibleIcon({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Back Cover */}
      <path d="M18 26L48 30V84L18 80Z" fill="#3c8e70" />
      <path d="M82 26L52 30V84L82 80Z" fill="#3c8e70" />
      {/* Pages */}
      <path d="M22 28L49 32V81L22 77Z" fill="#ffffff" stroke="#c4ebdb" strokeWidth="1" />
      <path d="M78 28L51 32V81L78 77Z" fill="#ffffff" stroke="#c4ebdb" strokeWidth="1" />
      {/* Spine */}
      <rect x="48" y="30" width="4" height="54" rx="2" fill="#2d6f57" />
      {/* Page Lines & Diagram */}
      <path d="M27 38H44M27 44H44M27 50H38" stroke="#89cfb5" strokeWidth="1.8" strokeLinecap="round" />
      {/* Mini Granny / Stitch Chart on Right Page */}
      <rect x="56" y="38" width="16" height="16" rx="3" fill="#eaf7f2" stroke="#54b895" strokeWidth="1.5" />
      <circle cx="64" cy="46" r="3" fill="#e8829b" />
      <path d="M56 60H73M56 66H68" stroke="#89cfb5" strokeWidth="1.8" strokeLinecap="round" />
      {/* Ribbon Bookmark */}
      <path d="M50 32V68L53 65L56 68V32" fill="#e8829b" />
    </svg>
  );
}

// 5. Lacy Summer Top Vector
export function LacyTopIcon({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Straps */}
      <path d="M36 18V36M64 18V36" stroke="#c45d78" strokeWidth="3" strokeLinecap="round" />
      {/* Top Bodice */}
      <path d="M30 36C34 38 42 40 50 38C58 40 66 38 70 36L74 74C66 78 58 76 50 78C42 76 34 78 26 74L30 36Z" fill="#fce4ed" stroke="#c45d78" strokeWidth="2.5" />
      {/* Lace scallop details */}
      <g stroke="#db7490" strokeWidth="1.5" fill="none">
        <path d="M34 46Q42 50 50 48Q58 50 66 46" />
        <path d="M33 56Q42 60 50 58Q58 60 67 56" />
        <path d="M32 66Q42 70 50 68Q58 70 68 66" />
        {/* Scallop Hem */}
        <path d="M26 74Q32 82 38 76Q44 82 50 78Q56 82 62 76Q68 82 74 74" />
      </g>
      {/* Delicate center bow */}
      <circle cx="50" cy="38" r="2.5" fill="#e8829b" />
    </svg>
  );
}

// 6. Zoo Amigurumi Lion Vector
export function ZooBundleIcon({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Lion Mane (crochet loop clusters) */}
      <g fill="#e89d58" stroke="#be7330" strokeWidth="1.5">
        {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
          <circle key={deg} cx={50 + 26 * Math.cos((deg * Math.PI) / 180)} cy={48 + 26 * Math.sin((deg * Math.PI) / 180)} r="9" />
        ))}
      </g>
      {/* Head */}
      <circle cx="50" cy="48" r="22" fill="#fed7a5" stroke="#be7330" strokeWidth="2.5" />
      {/* Ears */}
      <circle cx="34" cy="34" r="6" fill="#fcd095" stroke="#be7330" strokeWidth="1.5" />
      <circle cx="66" cy="34" r="6" fill="#fcd095" stroke="#be7330" strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="42" cy="46" r="3" fill="#2d1c24" />
      <circle cx="41" cy="45" r="1" fill="#ffffff" />
      <circle cx="58" cy="46" r="3" fill="#2d1c24" />
      <circle cx="57" cy="45" r="1" fill="#ffffff" />
      {/* Muzzle & Nose */}
      <ellipse cx="50" cy="54" rx="7" ry="5" fill="#ffffff" />
      <path d="M48 52H52L50 55Z" fill="#9d7dc5" />
      <path d="M50 55V58" stroke="#333" strokeWidth="1.2" strokeLinecap="round" />
      {/* Bundle Badge */}
      <rect x="25" y="76" width="50" height="15" rx="7.5" fill="#9d7dc5" />
      <text x="50" y="87" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        10 PACK
      </text>
    </svg>
  );
}

// 7. Video Masterclass Vector
export function VideoMasterclassIcon({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Screen Frame */}
      <rect x="16" y="22" width="68" height="52" rx="10" fill="#ffffff" stroke="#3b8898" strokeWidth="2.5" />
      <rect x="20" y="26" width="60" height="40" rx="6" fill="#d9f0f4" />
      {/* Play Button with Glow */}
      <circle cx="50" cy="46" r="14" fill="#54b895" />
      <polygon points="46,39 58,46 46,53" fill="#ffffff" />
      {/* Video timeline / progress bar */}
      <line x1="24" y1="70" x2="76" y2="70" stroke="#bee1e6" strokeWidth="3" strokeLinecap="round" />
      <line x1="24" y1="70" x2="48" y2="70" stroke="#e8829b" strokeWidth="3" strokeLinecap="round" />
      <circle cx="48" cy="70" r="3" fill="#e8829b" />
      {/* HD badge */}
      <rect x="68" y="30" width="10" height="6" rx="2" fill="#3b8898" />
      <text x="73" y="35" fill="#fff" fontSize="4.5" fontWeight="bold" textAnchor="middle">HD</text>
      {/* Stand base */}
      <path d="M44 74L40 82H60L56 74" fill="#3b8898" />
    </svg>
  );
}

// 8. Chunky Blanket Vector
export function ChunkyBlanketIcon({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Stacked folded blanket ripples */}
      {/* Bottom fold */}
      <rect x="18" y="62" width="64" height="18" rx="9" fill="#f8b4a5" stroke="#cc6e5c" strokeWidth="2.5" />
      <path d="M26 71H74" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" strokeOpacity="0.8" />
      {/* Middle fold */}
      <rect x="22" y="44" width="56" height="18" rx="9" fill="#fbc4b8" stroke="#cc6e5c" strokeWidth="2.5" />
      <path d="M30 53H70" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" strokeOpacity="0.8" />
      {/* Top fold */}
      <rect x="26" y="26" width="48" height="18" rx="9" fill="#fed5c8" stroke="#cc6e5c" strokeWidth="2.5" />
      <path d="M34 35H66" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" strokeOpacity="0.8" />
      {/* Fringe tassels on side */}
      <path d="M78 68L84 66M78 72L85 72M78 76L84 78" stroke="#cc6e5c" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 9. Freebie Mini Cactus Vector
export function CactusMiniIcon({ size = 90 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Terracotta / Pastel Pot */}
      <path d="M34 60H66L62 86H38L34 60Z" fill="#e8829b" stroke="#ba546f" strokeWidth="2.5" />
      <rect x="30" y="56" width="40" height="7" rx="3" fill="#d26883" />
      {/* Pot stitch heart motif */}
      <path d="M47 72C45 70 42 72 42 74C42 77 47 80 50 82C53 80 58 77 58 74C58 72 55 70 53 72L50 74L47 72Z" fill="#ffffff" fillOpacity="0.85" />
      {/* Soil */}
      <ellipse cx="50" cy="56" rx="17" ry="4" fill="#4d2f1d" />
      {/* Main Cactus Stem */}
      <rect x="42" y="24" width="16" height="34" rx="8" fill="#54b895" stroke="#337a60" strokeWidth="2.5" />
      {/* Left arm */}
      <path d="M42 38H32C29 38 27 36 27 33V28" stroke="#337a60" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 38H32C29 38 27 36 27 33V28" stroke="#54b895" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Right arm */}
      <path d="M58 44H68C71 44 73 42 73 39V34" stroke="#337a60" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M58 44H68C71 44 73 42 73 39V34" stroke="#54b895" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Needle Stitches */}
      <g stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round">
        <line x1="47" y1="30" x2="49" y2="30" />
        <line x1="53" y1="36" x2="55" y2="36" />
        <line x1="46" y1="44" x2="48" y2="44" />
        <line x1="52" y1="50" x2="54" y2="50" />
      </g>
      {/* Flower on top */}
      <circle cx="50" cy="22" r="5" fill="#f7c948" />
      <circle cx="46" cy="20" r="3" fill="#e8829b" />
      <circle cx="54" cy="20" r="3" fill="#e8829b" />
      <circle cx="50" cy="17" r="3" fill="#e8829b" />
      <circle cx="50" cy="22" r="2.5" fill="#ffffff" />
    </svg>
  );
}

// Helper to render matching vector artwork by key
export function ProductIcon({ iconKey, size = 80 }) {
  switch (iconKey) {
    case 'sunflower': return <SunflowerSquareIcon size={size} />;
    case 'bear':      return <BearAmigurumiIcon size={size} />;
    case 'tote':      return <BohoToteIcon size={size} />;
    case 'bible':     return <CrochetBibleIcon size={size} />;
    case 'top':       return <LacyTopIcon size={size} />;
    case 'zoo':       return <ZooBundleIcon size={size} />;
    case 'video':     return <VideoMasterclassIcon size={size} />;
    case 'blanket':   return <ChunkyBlanketIcon size={size} />;
    case 'cactus':    return <CactusMiniIcon size={size} />;
    default:          return <YarnLogoIcon size={size} />;
  }
}

// Clean vector social icons
export function InstagramIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function YoutubeIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

export function PinterestIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <line x1="12" y1="9" x2="12" y2="22" />
      <path d="M12 9c-2 0-3.5 1-3.5 3 0 1.5 1 2.5 2 2.5s2-1 2-2.5-1-3-3-3" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

