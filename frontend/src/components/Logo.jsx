export function CrownMark({ className = "", strokeWidth = 1.6 }) {
  return (
    <svg viewBox="0 0 48 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 26 L3 8 L14 15 L24 3 L34 15 L45 8 L42 26 Z"
        stroke="#D4AF37"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <line x1="8" y1="29.5" x2="40" y2="29.5" stroke="#D4AF37" strokeWidth={strokeWidth} />
      <circle cx="3" cy="8" r="2" fill="#D4AF37" />
      <circle cx="24" cy="3" r="2" fill="#D4AF37" />
      <circle cx="45" cy="8" r="2" fill="#D4AF37" />
    </svg>
  );
}

export function ShieldMark({ className = "" }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={className} aria-hidden="true">
      <path
        d="M60 8 L92 18 V44 C92 60 78 70 60 76 C42 70 28 60 28 44 V18 Z"
        stroke="#D4AF37"
        strokeWidth="1.5"
      />
      <path d="M10 30 Q26 14 40 22 Q28 26 30 38 Q20 36 10 30 Z" fill="#D4AF37" opacity="0.85" />
      <path d="M110 30 Q94 14 80 22 Q92 26 90 38 Q100 36 110 30 Z" fill="#D4AF37" opacity="0.85" />
      <g transform="translate(44,26) scale(0.68)">
        <path
          d="M6 26 L3 8 L14 15 L24 3 L34 15 L45 8 L42 26 Z"
          stroke="#D4AF37"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <line x1="8" y1="29.5" x2="40" y2="29.5" stroke="#D4AF37" strokeWidth="2.4" />
        <circle cx="3" cy="8" r="2.4" fill="#D4AF37" />
        <circle cx="24" cy="3" r="2.4" fill="#D4AF37" />
        <circle cx="45" cy="8" r="2.4" fill="#D4AF37" />
      </g>
    </svg>
  );
}

export default function Logo({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" data-testid="brand-logo" aria-label="Royal Shave Barbers logo">
      <defs>
        <path id="rsb-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
      </defs>
      <circle cx="50" cy="50" r="48.5" fill="#0D0D0D" stroke="#D4AF37" strokeWidth="1.4" />
      <circle cx="50" cy="50" r="27" fill="none" stroke="#D4AF37" strokeWidth="0.7" />
      <text fill="#D4AF37" fontSize="9.5" letterSpacing="1.5" fontFamily="Manrope, sans-serif" fontWeight="600">
        <textPath href="#rsb-circle" textLength="230" lengthAdjust="spacingAndGlyphs">
          ROYAL SHAVE • BARBERS • EST. HOLT •
        </textPath>
      </text>
      <g transform="translate(32,36) scale(0.75)">
        <path
          d="M6 26 L3 8 L14 15 L24 3 L34 15 L45 8 L42 26 Z"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        <line x1="8" y1="29.5" x2="40" y2="29.5" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="3" cy="8" r="2.2" fill="#D4AF37" />
        <circle cx="24" cy="3" r="2.2" fill="#D4AF37" />
        <circle cx="45" cy="8" r="2.2" fill="#D4AF37" />
      </g>
      {[0, 90, 180, 270].map((deg) => (
        <rect
          key={deg}
          x="48.4"
          y="1.2"
          width="3.2"
          height="3.2"
          fill="#D4AF37"
          transform={`rotate(${deg + 45} 50 50)`}
        />
      ))}
    </svg>
  );
}
