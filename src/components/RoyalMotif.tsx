import React from 'react';

/**
 * Royal Indian Heritage SVG Motifs & Dividers
 * Handcrafted vector artwork inspired by Rajasthani jharokhas, lotus crests & jali fretwork
 */

export const RoyalCrest: React.FC<{ className?: string; size?: number }> = ({ 
  className = "text-[#B99560]", 
  size = 40 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Outer royal arch */}
    <path 
      d="M24 3C16 3 9 10 9 19C9 27 15 32 24 45C33 32 39 27 39 19C39 10 32 3 24 3Z" 
      stroke="currentColor" 
      strokeWidth="1.2" 
      strokeMiterlimit="10"
    />
    {/* Inner cusped arch */}
    <path 
      d="M24 7C18.5 7 13.5 12.5 13.5 19.5C13.5 25.5 18 30 24 39C30 30 34.5 25.5 34.5 19.5C34.5 12.5 29.5 7 24 7Z" 
      stroke="currentColor" 
      strokeWidth="0.8" 
      strokeDasharray="2 1.5"
    />
    {/* Royal Lotus Crown */}
    <path 
      d="M24 13L25.8 17.5L30.5 18L26.8 21.2L28 25.8L24 23.2L20 25.8L21.2 21.2L17.5 18L22.2 17.5L24 13Z" 
      fill="currentColor" 
      opacity="0.85"
    />
    {/* Lotus Petal base */}
    <path 
      d="M19 28C21 30 24 31 24 31C24 31 27 30 29 28C28 32 24 34 24 34C24 34 20 32 19 28Z" 
      fill="currentColor"
    />
    {/* Monogram V */}
    <text 
      x="24" 
      y="24" 
      textAnchor="middle" 
      fill="#FBFAF6" 
      fontFamily="Cinzel, serif" 
      fontSize="8" 
      fontWeight="700"
    >
      V
    </text>
  </svg>
);

export const RoyalDivider: React.FC<{ className?: string }> = ({ className = "my-6" }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#B99560]/40" />
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#B99560]">
      <path 
        d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" 
        stroke="currentColor" 
        strokeWidth="1.2" 
        fill="currentColor" 
        fillOpacity="0.2"
      />
    </svg>
    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#B99560]/40" />
  </div>
);

export const JaliPatternBackground: React.FC<{ opacity?: number }> = ({ opacity = 0.04 }) => (
  <div 
    className="absolute inset-0 pointer-events-none" 
    style={{
      opacity,
      backgroundImage: `radial-gradient(circle at 12px 12px, #B99560 1.5px, transparent 0), radial-gradient(circle at 36px 36px, #B99560 1.5px, transparent 0)`,
      backgroundSize: '48px 48px'
    }}
  />
);

export const CuspedArchBorder: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "" 
}) => (
  <div className={`relative rounded-t-[40px] border border-[#B99560]/30 p-4 ${className}`}>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-[#FBFAF6] text-[#B99560]">
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
        <path d="M1 11C6 11 8 1 10 1C12 1 14 11 19 11" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </svg>
    </div>
    {children}
  </div>
);

export const RoyalCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}> = ({ position, className = "text-[#D4AF37]", size = 16 }) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-1.5 left-1.5';
      case 'top-right':
        return 'top-1.5 right-1.5 rotate-90';
      case 'bottom-right':
        return 'bottom-1.5 right-1.5 rotate-180';
      case 'bottom-left':
        return 'bottom-1.5 left-1.5 -rotate-90';
    }
  };

  return (
    <div className={`absolute ${getPositionClasses()} pointer-events-none ${className}`}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 3H14C14 3 14 8 9 9C8 14 3 14 3 14V3Z"
          fill="currentColor"
          fillOpacity="0.25"
        />
        <path
          d="M2 12V2H12M4 7C6 7 7 6 7 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="3" cy="3" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
};
