import React from 'react';
import logoImg from '../assets/libaah-logo.png';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  lightMode?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  lightMode = false,
}) => {
  // Enhanced, prominent sizing so LIBAAH and its subtitle are clearly visible and legible
  const heights = {
    sm: 'h-11 sm:h-12 max-w-[180px]',
    md: 'h-14 sm:h-16 lg:h-18 max-w-[240px]',
    lg: 'h-18 sm:h-22 lg:h-24 max-w-[300px]',
    xl: 'h-22 sm:h-28 max-w-[360px]',
  };

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <img
        src={logoImg}
        alt="LIBAAH - Women's Comfort & Modest Essentials"
        className={`${heights[size]} w-auto object-contain transition-all duration-200 ${
          lightMode ? 'brightness-0 invert' : ''
        }`}
        loading="eager"
      />
    </div>
  );
};
