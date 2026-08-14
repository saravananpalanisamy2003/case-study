import type { ReactNode } from 'react';

type PremiumImageHoverProps = {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  variant?: 'default' | 'hero';
  children?: ReactNode;
};

export function PremiumImageHover({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  variant = 'default',
  children,
}: PremiumImageHoverProps) {
  return (
    <div className={`premium-image-hover ${variant === 'hero' ? 'premium-image-hover--hero' : ''} ${className}`}>
      <img src={src} alt={alt} className={imgClassName} loading="lazy" />
      <span className="premium-image-hover__overlay" aria-hidden="true" />
      <span className="premium-image-hover__shine" aria-hidden="true" />
      {children}
    </div>
  );
}
