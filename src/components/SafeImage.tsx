import { useState } from 'react';
import { AudioLines } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export function SafeImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F0EDFF] to-[#EAF1FF] text-[#7138D4] p-4 text-center ${className}`}
      >
        <AudioLines className="w-8 h-8 mb-2 opacity-70" />
        <span className="text-xs font-medium text-[#5425AE] line-clamp-2 max-w-[160px]">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
