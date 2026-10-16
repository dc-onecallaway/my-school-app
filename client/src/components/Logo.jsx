export default function Logo({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 100 100" className={`${className} rounded-[14px] bg-amber-950`}>
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" /><stop offset="50%" stopColor="#facc15" /><stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" strokeDasharray="6 3" />
      <ellipse cx="50" cy="52" rx="40" ry="16" fill="none" stroke="url(#goldGrad)" strokeWidth="2" transform="rotate(-28 50 52)" opacity="0.85" />
      <ellipse cx="50" cy="52" rx="40" ry="16" fill="none" stroke="url(#goldGrad)" strokeWidth="2" transform="rotate(28 50 52)" opacity="0.85" />
      <polygon points="50,12 72,21 50,30 28,21" fill="url(#goldGrad)" />
      <rect x="41" y="28" width="18" height="4" rx="1.5" fill="#fde047" />
      <path d="M68,23 L68,34" stroke="#facc15" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="68" cy="35" r="2.2" fill="#facc15" />
      <text x="50" y="64" textAnchor="middle" fill="url(#goldGrad)" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="28" letterSpacing="-1">TH</text>
      <text x="50" y="84" textAnchor="middle" fill="#fef08a" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="7.5" letterSpacing="1.5">TUTORS HUB</text>
    </svg>
  );
}
