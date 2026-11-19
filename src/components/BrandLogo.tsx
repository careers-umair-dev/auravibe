import { Link } from 'react-router-dom';

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className = '' }: BrandLogoProps) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7138D4] rounded-lg ${className}`}
      aria-label="AURAVIBE Home"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl aura-gradient shadow-xs shrink-0">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <rect x="3" y="9" width="2.5" height="6" rx="1.25" fill="#FFFFFF" />
          <rect x="8" y="4" width="2.5" height="16" rx="1.25" fill="#FFFFFF" />
          <rect x="13" y="7" width="2.5" height="10" rx="1.25" fill="#FFFFFF" />
          <rect x="18" y="10" width="2.5" height="4" rx="1.25" fill="#FFFFFF" />
        </svg>
      </span>
      <span className="font-display text-[17px] font-extrabold tracking-[0.06em] text-[#171923]">
        AURAVIBE
      </span>
    </Link>
  );
}
