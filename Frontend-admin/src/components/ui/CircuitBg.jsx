import React from 'react';

const InstitutionBg = () => (
  <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
    {/* Soft glowing ambient backgrounds */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-secondary/5 to-primary/5 blur-[120px]"/>
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary/5 to-secondary/5 blur-[120px]"/>
    
    <svg className="w-full h-full opacity-[0.35]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dotGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="var(--color-primary)" opacity="0.15" />
        </pattern>
        <linearGradient id="inst-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.1"/>
        </linearGradient>
      </defs>
      
      {/* Structural Dot Grid Background */}
      <rect width="100%" height="100%" fill="url(#dotGrid)" />
      
      {/* Abstract Structural Arches / Pillars (Left Side) */}
      <path d="M 150 1200 L 150 300 Q 150 150 350 150 L 550 150 Q 750 150 750 300 L 750 1200" stroke="url(#inst-g)" strokeWidth="1.5" fill="none" opacity="0.6" strokeDasharray="12 6" />
      <path d="M 220 1200 L 220 380 Q 220 230 420 230 L 480 230 Q 680 230 680 380 L 680 1200" stroke="url(#inst-g)" strokeWidth="2" fill="none" opacity="0.3" />
      
      {/* Concentric Circles representing Community/Institution reach (Right Side) */}
      <circle cx="85%" cy="25%" r="400" stroke="url(#inst-g)" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="8 8" />
      <circle cx="85%" cy="25%" r="280" stroke="url(#inst-g)" strokeWidth="2" fill="none" opacity="0.2" />
      <circle cx="85%" cy="25%" r="160" stroke="url(#inst-g)" strokeWidth="1.5" fill="none" opacity="0.5" />
      
      {/* Base Foundation Lines */}
      <line x1="0" y1="85%" x2="100%" y2="85%" stroke="var(--color-primary)" strokeWidth="2" opacity="0.15" />
      <line x1="0" y1="88%" x2="100%" y2="88%" stroke="var(--color-secondary)" strokeWidth="1" opacity="0.15" />
      <line x1="0" y1="91%" x2="100%" y2="91%" stroke="var(--color-primary)" strokeWidth="3" opacity="0.08" />
    </svg>
  </div>
);

export default InstitutionBg;

