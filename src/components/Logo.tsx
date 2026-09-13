import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  currentLang?: string;
  variant?: 'light' | 'dark' | 'emerald' | 'gold';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  currentLang = 'en', 
  variant = 'emerald',
  size = 'md'
}) => {
  const normalizedLang = currentLang.split('-')[0];
  const isRTL = normalizedLang === 'ar' || normalizedLang === 'ur';
  const logoChar = isRTL ? 'ب' : 'K';
  
  // Choose text based on language
  let logoText = "KSA INSIGHTS • ";
  if (normalizedLang === 'ar') logoText = "بصائر السعودية • ";
  if (normalizedLang === 'ur') logoText = "سعودی بصیرتیں • ";

  // Use fewer repetitions to prevent overlapping text "The Saudi The Sauid Insights"
  const repetitions = normalizedLang === 'en' ? 2 : 3;
  const repeatedText = logoText.repeat(repetitions);

  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
    custom: ''
  };

  const variantStyles = {
    emerald: 'emerald-gradient text-secondary',
    light: 'bg-white text-primary border border-gray-100',
    dark: 'bg-primary text-secondary',
    gold: 'gold-gradient text-primary'
  };

  return (
    <div className={cn(
      "relative rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-300",
      sizeClasses[size as keyof typeof sizeClasses],
      variantStyles[variant],
      className
    )}>
      {/* Decorative inner border */}
      <div className="absolute inset-1 rounded-xl border border-white/10 pointer-events-none" />
      
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        <defs>
          <path id="circlePath" d="M 50, 50 m -30, 0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0" />
        </defs>
        
        {/* Rotating Circular Text */}
        <motion.g
          animate={{ rotate: isRTL ? -360 : 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <text 
            className="font-bold uppercase" 
            style={{ 
              fontSize: normalizedLang === 'en' ? '4.5px' : '6px',
              fill: 'currentColor',
              letterSpacing: normalizedLang === 'en' ? '2.5px' : '1.5px',
              fontFamily: isRTL ? 'inherit' : 'ui-serif, Georgia, serif',
            }}
          >
            <textPath 
              href="#circlePath" 
              startOffset="0%"
            >
              {repeatedText}
            </textPath>
          </text>
        </motion.g>

        <text 
          x="50" 
          y="50" 
          textAnchor="middle" 
          dominantBaseline="central" 
          className="font-serif font-bold text-shadow-sm"
          style={{ 
            fontSize: isRTL ? '30px' : '34px',
            fill: variant === 'light' ? 'var(--color-primary)' : 'currentColor',
          }}
        >
          {logoChar}
        </text>
        
        {/* Accent circles */}
        <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.05" />
      </svg>
    </div>
  );
};

export default Logo;
