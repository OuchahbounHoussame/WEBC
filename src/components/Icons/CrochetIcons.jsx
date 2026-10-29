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

// Eyeglass Holder Set 2 Vector (From Real PDF Pattern - Fox & Character Tray)
export function EyeglassHolderIcon({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Soft shadow */}
      <ellipse cx="50" cy="86" rx="36" ry="6" fill="#4d1b2a" fillOpacity="0.2" />

      {/* Fox Ears on top rim */}
      {/* Left Ear */}
      <polygon points="26,38 34,16 44,34" fill="#e44331" stroke="#9e2417" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="30,35 34,22 40,33" fill="#fdf4e7" />
      {/* Right Ear */}
      <polygon points="56,34 66,16 74,38" fill="#e44331" stroke="#9e2417" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="60,33 66,22 70,35" fill="#fdf4e7" />

      {/* Main Oval Tray Body (Crochet Base & Raised Walls) */}
      {/* Outer base */}
      <ellipse cx="50" cy="58" rx="42" ry="24" fill="#c93322" stroke="#8e1c0f" strokeWidth="2.5" />
      {/* Inner tray bowl (BPSC vertical wall depth) */}
      <ellipse cx="50" cy="56" rx="38" ry="20" fill="url(#foxTrayGrad)" />

      {/* Front Cream Muzzle Band */}
      <path
        d="M20 58 C26 74 74 74 80 58 C74 70 26 70 20 58 Z"
        fill="#fdf4e7"
        stroke="#d1b899"
        strokeWidth="1.2"
      />

      {/* Crochet Stitch Texture along the tray rim */}
      <ellipse
        cx="50"
        cy="56"
        rx="36"
        ry="18"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeDasharray="3 3"
        strokeOpacity="0.55"
        fill="none"
      />

      {/* Eyes on tray back wall */}
      <ellipse cx="37" cy="48" rx="3" ry="4" fill="#1e1822" />
      <circle cx="36" cy="47" r="1" fill="#ffffff" />
      <ellipse cx="63" cy="48" rx="3" ry="4" fill="#1e1822" />
      <circle cx="62" cy="47" r="1" fill="#ffffff" />

      {/* 3D Snout in center */}
      <polygon points="45,60 55,60 50,72" fill="#e44331" stroke="#9e2417" strokeWidth="1.5" />
      <ellipse cx="50" cy="62" rx="4" ry="2.5" fill="#1e1822" />

      {/* Stylized Eyeglasses Resting on Holder */}
      {/* Left Frame */}
      <rect x="22" y="44" width="22" height="15" rx="7" stroke="#332a38" strokeWidth="2.2" fill="rgba(255,255,255,0.4)" />
      {/* Right Frame */}
      <rect x="56" y="44" width="22" height="15" rx="7" stroke="#332a38" strokeWidth="2.2" fill="rgba(255,255,255,0.4)" />
      {/* Bridge over snout */}
      <path d="M44 48 Q50 44 56 48" stroke="#332a38" strokeWidth="2.2" fill="none" />
      {/* Temple arms */}
      <path d="M22 48 L14 44" stroke="#332a38" strokeWidth="2" strokeLinecap="round" />
      <path d="M78 48 L86 44" stroke="#332a38" strokeWidth="2" strokeLinecap="round" />

      {/* Bundle Badge */}
      <rect x="34" y="77" width="32" height="13" rx="6.5" fill="#9d7dc5" />
      <text x="50" y="86.5" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        7 IN 1 SET
      </text>

      {/* Gradients */}
      <defs>
        <linearGradient id="foxTrayGrad" x1="50" y1="36" x2="50" y2="76" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ee4c3a" />
          <stop offset="0.7" stopColor="#dd3725" />
          <stop offset="1" stopColor="#bd2313" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Shooting Star Keychain Vector (From Real PDF Pattern)
export function ShootingStarIcon({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Keychain ring & connector chain at top */}
      <circle cx="72" cy="14" r="7" stroke="#b0b7c3" strokeWidth="2.5" fill="none" />
      <circle cx="72" cy="14" r="4.5" fill="#fcf9fb" fillOpacity="0.4" />
      <path d="M68 20L64 26" stroke="#9aa3af" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="64" cy="27" r="2.2" fill="#9aa3af" />

      {/* Pastel Rainbow Tail (curved stripes coming from back left) */}
      <g>
        {/* Stripe 1: Lilac / Pastel Lavender */}
        <path
          d="M12 55 C16 48 30 46 48 50"
          stroke="#bca1e6"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M14 55 C18 48 30 46 46 50"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeDasharray="2 3"
          strokeLinecap="round"
          strokeOpacity="0.6"
          fill="none"
        />

        {/* Stripe 2: Pastel Rose Pink */}
        <path
          d="M14 62 C20 56 32 54 46 56"
          stroke="#f29cb1"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M16 62 C22 56 32 54 44 56"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeDasharray="2 3"
          strokeLinecap="round"
          strokeOpacity="0.6"
          fill="none"
        />

        {/* Stripe 3: Aqua Green / Mint */}
        <path
          d="M18 69 C24 64 34 62 44 63"
          stroke="#68cfa9"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M20 69 C26 64 34 62 42 63"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeDasharray="2 3"
          strokeLinecap="round"
          strokeOpacity="0.6"
          fill="none"
        />
      </g>

      {/* Main Yellow 5-Point Star Body */}
      {/* Center at cx: 58, cy: 54, radius ~24 */}
      <path
        d="M58 28
           C60 28 62 33 65 39
           C67 42 71 44 76 45
           C81 46 83 49 80 53
           C77 56 75 60 76 65
           C77 70 74 72 70 70
           C65 67 61 67 58 69
           C55 67 51 67 46 70
           C42 72 39 70 40 65
           C41 60 39 56 36 53
           C33 49 35 46 40 45
           C45 44 49 42 51 39
           C54 33 56 28 58 28 Z"
        fill="url(#starYellowGrad)"
        stroke="#d4a328"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Crochet Puff / Stitch Textured Marks on Star */}
      <g stroke="#c79218" strokeWidth="1.4" strokeDasharray="2 3" strokeLinecap="round" opacity="0.75">
        <circle cx="58" cy="54" r="8" fill="none" />
        <circle cx="58" cy="54" r="14" fill="none" />
      </g>

      {/* Star Cute Face */}
      {/* Safety Eyes */}
      <circle cx="51" cy="51" r="3.2" fill="#1e1822" />
      <circle cx="50" cy="50" r="1.1" fill="#ffffff" />
      <circle cx="65" cy="51" r="3.2" fill="#1e1822" />
      <circle cx="64" cy="50" r="1.1" fill="#ffffff" />

      {/* Embroidered U-Shaped Smile */}
      <path
        d="M55 57 C56.5 60 59.5 60 61 57"
        stroke="#1e1822"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Blush Cheeks */}
      <ellipse cx="46" cy="55" rx="3.5" ry="2" fill="#f89cb1" fillOpacity="0.6" />
      <ellipse cx="70" cy="55" rx="3.5" ry="2" fill="#f89cb1" fillOpacity="0.6" />

      {/* Gradients */}
      <defs>
        <linearGradient id="starYellowGrad" x1="40" y1="28" x2="78" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fde068" />
          <stop offset="0.7" stopColor="#f7cc42" />
          <stop offset="1" stopColor="#eebf32" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Sus Space Crewmate Amigurumi Vector (From Real PDF Pattern)
export function SusCrewmateIcon({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Soft floor shadow */}
      <ellipse cx="50" cy="88" rx="26" ry="5" fill="#4d1b2a" fillOpacity="0.22" />

      {/* Red Backpack (on left side) */}
      <rect x="18" y="38" width="15" height="34" rx="7" fill="#c91e30" stroke="#8a111e" strokeWidth="2.5" />
      {/* Backpack stitch highlights */}
      <path d="M22 46V62" stroke="#e84d5d" strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" />

      {/* Main Red Amigurumi Body (with two cute legs) */}
      <path
        d="M32 78
           C28 78 26 73 26 66
           L26 38
           C26 22 36 12 50 12
           C64 12 74 22 74 38
           L74 66
           C74 73 72 78 68 78
           C64 78 61 74 61 68
           L61 64
           C61 62 59 60 56 60
           C53 60 51 62 51 64
           L51 68
           C51 74 48 78 44 78
           C40 78 37 74 37 68
           L37 64
           C37 60 36 78 32 78 Z"
        fill="url(#crewmateRedGrad)"
        stroke="#8a111e"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Amigurumi Stitch Texture on Body */}
      <g stroke="#b81d2e" strokeWidth="1.6" strokeDasharray="2.5 3.5" strokeLinecap="round" opacity="0.85">
        <path d="M34 26C42 22 58 22 66 26" />
        <path d="M32 35C40 31 60 31 68 35" />
        <path d="M30 46C34 44 38 44 42 46" />
        <path d="M30 56C34 54 38 54 42 56" />
        <path d="M32 66H42" />
        <path d="M58 66H68" />
      </g>

      {/* Visor Outer Black Border (Thick felt/yarn outline) */}
      <ellipse cx="58" cy="42" rx="19" ry="13" fill="#181822" stroke="#0e0e14" strokeWidth="1" />

      {/* Visor Light Blue Glass */}
      <ellipse cx="58" cy="42" rx="15" ry="9.5" fill="url(#visorBlueGrad)" />

      {/* Visor subtle crochet rows */}
      <path d="M48 42H68" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="2 2" />

      {/* Visor White Highlight (Key feature from pattern) */}
      <ellipse cx="64" cy="38" rx="5.5" ry="2.4" transform="rotate(-6 64 38)" fill="#ffffff" />
      <circle cx="52" cy="44" r="1.2" fill="#ffffff" fillOpacity="0.6" />

      {/* Gradients */}
      <defs>
        <linearGradient id="crewmateRedGrad" x1="30" y1="12" x2="70" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ee2c40" />
          <stop offset="0.65" stopColor="#d91a2d" />
          <stop offset="1" stopColor="#b81324" />
        </linearGradient>
        <linearGradient id="visorBlueGrad" x1="44" y1="34" x2="72" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#aae1fd" />
          <stop offset="0.45" stopColor="#6dc7f7" />
          <stop offset="1" stopColor="#45a6de" />
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

// Graduate Doll Amigurumi Vector (From Real PDF Pattern - Cap, Gown, Gold Stole & Bouquet)
export function GraduateDollIcon({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Soft floor shadow */}
      <ellipse cx="50" cy="93" rx="28" ry="5" fill="#321e3c" fillOpacity="0.18" />

      {/* Confetti / celebration sparkles */}
      <circle cx="16" cy="22" r="2" fill="#ffd15c" />
      <circle cx="84" cy="18" r="2" fill="#e8829b" />
      <circle cx="88" cy="40" r="1.5" fill="#ffd15c" />
      <polygon points="18,36 20,32 22,36 18,36" fill="#be6c87" />
      <polygon points="82,60 85,57 84,62 82,60" fill="#733c76" />

      {/* Graduation Gown Body */}
      <path
        d="M32 54 L26 89 C26 91 28 92 30 92 L70 92 C72 92 74 91 74 89 L68 54 Z"
        fill="url(#gownGrad)"
        stroke="#1c1622"
        strokeWidth="1.5"
      />
      {/* Gown center seam / pleats */}
      <line x1="50" y1="58" x2="50" y2="92" stroke="#1c1622" strokeWidth="1.2" strokeDasharray="3 2" />
      <path d="M42 62 L40 92" stroke="#372c3f" strokeWidth="1" />
      <path d="M58 62 L60 92" stroke="#372c3f" strokeWidth="1" />

      {/* Gold Stole / Sash around neck and down front */}
      <path
        d="M40 52 L42 78 C42 80 44 81 46 81 L47 81 L45 52 Z"
        fill="url(#stoleGrad)"
        stroke="#b8860b"
        strokeWidth="0.8"
      />
      <path
        d="M60 52 L58 78 C58 80 56 81 54 81 L53 81 L55 52 Z"
        fill="url(#stoleGrad)"
        stroke="#b8860b"
        strokeWidth="0.8"
      />

      {/* Doll Head & Hair */}
      {/* Back Hair */}
      <ellipse cx="50" cy="42" rx="20" ry="18" fill="#5c3826" />
      {/* Face */}
      <circle cx="50" cy="43" r="15" fill="#fdeee2" />

      {/* Front Strands & Bangs */}
      <path d="M35 38 C38 46 44 42 47 38 C49 46 62 44 65 38 C64 34 36 34 35 38 Z" fill="#6d432e" />
      <path d="M34 40 C33 46 36 53 38 56 C39 52 38 45 37 40 Z" fill="#6d432e" />
      <path d="M66 40 C67 46 64 53 62 56 C61 52 62 45 63 40 Z" fill="#6d432e" />

      {/* Cheeks */}
      <ellipse cx="42" cy="46" rx="2.5" ry="1.5" fill="#f7a8b8" fillOpacity="0.65" />
      <ellipse cx="58" cy="46" rx="2.5" ry="1.5" fill="#f7a8b8" fillOpacity="0.65" />

      {/* Eyes (Amigurumi style with sparkle highlight) */}
      <circle cx="43" cy="43" r="2.8" fill="#1e131d" />
      <circle cx="42" cy="42" r="1" fill="#ffffff" />
      <circle cx="57" cy="43" r="2.8" fill="#1e131d" />
      <circle cx="56" cy="42" r="1" fill="#ffffff" />

      {/* Eyebrows & Smile */}
      <path d="M40 39 Q43 38 45 39" stroke="#4a2c1d" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      <path d="M55 39 Q57 38 60 39" stroke="#4a2c1d" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      <path d="M48 48 Q50 50 52 48" stroke="#a84358" strokeWidth="1" strokeLinecap="round" fill="none" />

      {/* Right Hand holding Diploma Scroll */}
      <ellipse cx="32" cy="68" rx="3.5" ry="3.5" fill="#fdeee2" />
      {/* Diploma Scroll */}
      <g transform="rotate(-15 30 68)">
        <rect x="25" y="64" width="12" height="7" rx="2" fill="#fffdfa" stroke="#d5c8b2" strokeWidth="1" />
        <rect x="30" y="64" width="2.5" height="7" fill="#f3ba2f" />
      </g>

      {/* Left Hand holding Mini Bouquet */}
      <ellipse cx="68" cy="68" rx="3.5" ry="3.5" fill="#fdeee2" />
      {/* Bouquet Wrap & Flowers */}
      <g transform="translate(64, 58)">
        {/* Wrap cone */}
        <polygon points="4,10 9,18 1,18" fill="#e8dacb" stroke="#baa794" strokeWidth="0.8" />
        {/* Sunflower */}
        <circle cx="3" cy="8" r="3.2" fill="#fab82c" />
        <circle cx="3" cy="8" r="1.5" fill="#5c3826" />
        {/* Lavender sprig */}
        <circle cx="7" cy="6" r="1.6" fill="#a77ec9" />
        <circle cx="8" cy="4" r="1.4" fill="#8f60b4" />
      </g>

      {/* Graduation Cap (Mortarboard) on top of head */}
      {/* Cap Skull Underlayer */}
      <path d="M38 31 C38 27 62 27 62 31 Z" fill="#1b1622" />
      {/* Flat Diamond Top */}
      <polygon points="50,15 82,24 50,33 18,24" fill="url(#capGrad)" stroke="#110d16" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Top Button */}
      <ellipse cx="50" cy="24" rx="2.5" ry="1.8" fill="#ffd15c" />
      {/* Gold Tassel Ribbon hanging down the left side */}
      <path
        d="M50 24 C56 24 68 28 69 34 L71 44"
        stroke="#ffd15c"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Tassel brush */}
      <polygon points="69,44 73,44 74,52 68,52" fill="#e5af22" stroke="#b8860b" strokeWidth="0.6" />
      <line x1="68" y1="52" x2="74" y2="52" stroke="#fff3a8" strokeWidth="1" />

      {/* Gradients */}
      <defs>
        <linearGradient id="gownGrad" x1="50" y1="54" x2="50" y2="92" gradientUnits="userSpaceOnUse">
          <stop stopColor="#35293d" />
          <stop offset="0.5" stopColor="#251d2c" />
          <stop offset="1" stopColor="#18121d" />
        </linearGradient>
        <linearGradient id="capGrad" x1="18" y1="24" x2="82" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3d3046" />
          <stop offset="0.5" stopColor="#261e2c" />
          <stop offset="1" stopColor="#1a141f" />
        </linearGradient>
        <linearGradient id="stoleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffd868" />
          <stop offset="1" stopColor="#e5aa1f" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Helper to render matching vector artwork by key
export function ProductIcon({ iconKey, size = 80 }) {
  switch (iconKey) {
    case 'graduate':
    case 'graduate-doll':   return <GraduateDollIcon size={size} />;
    case 'crewmate':
    case 'sus-crewmate':    return <SusCrewmateIcon size={size} />;
    case 'star':
    case 'shooting-star':   return <ShootingStarIcon size={size} />;
    case 'eyeglass':
    case 'eyeglass-holder': return <EyeglassHolderIcon size={size} />;
    case 'sunflower':       return <SunflowerSquareIcon size={size} />;
    case 'bear':          return <BearAmigurumiIcon size={size} />;
    case 'tote':          return <BohoToteIcon size={size} />;
    case 'bible':         return <CrochetBibleIcon size={size} />;
    case 'top':           return <LacyTopIcon size={size} />;
    case 'zoo':           return <ZooBundleIcon size={size} />;
    case 'video':         return <VideoMasterclassIcon size={size} />;
    case 'blanket':       return <ChunkyBlanketIcon size={size} />;
    case 'cactus':        return <CactusMiniIcon size={size} />;
    default:              return <YarnLogoIcon size={size} />;
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

