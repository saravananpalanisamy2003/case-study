import { useState } from 'react';

type ClientLogoProps = {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
};

export function ClientLogo({ src, alt, className = 'h-10 w-10 object-contain', fallbackClassName }: ClientLogoProps) {
  const [failed, setFailed] = useState(false);
  const initials = alt
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  if (failed) {
    return (
      <span
        className={`grid place-items-center rounded-xl bg-[#FF6600]/10 font-display text-sm font-extrabold text-[#FF6600] ${fallbackClassName ?? 'h-10 w-10'}`}
      >
        {initials}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={`${alt} logo`}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
