import React from 'react';

const DollOne = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg" style={{ filter: 'drop-shadow(0px 0px 5px rgba(255,255,255,0.5))' }}>
    <path d="M50 20 C60 20 65 25 65 35 C65 45 60 50 50 50 C40 50 35 45 35 35 C35 25 40 20 50 20 Z" fill="none" stroke="white" strokeWidth="2" />
    <path d="M50 50 L50 80 M30 60 L50 55 L70 60 M40 90 L50 80 L60 90" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M45 30 L45 35 M55 30 L55 35 M50 40 Q50 45 50 40" stroke="white" strokeWidth="2" strokeLinecap="round" />
    {/* Bow */}
    <path d="M40 20 L50 15 L60 20" fill="none" stroke="pink" strokeWidth="2" />
  </svg>
);

const DollTwo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg" style={{ filter: 'drop-shadow(0px 0px 5px rgba(255,255,255,0.5))' }}>
    <circle cx="50" cy="35" r="15" fill="none" stroke="white" strokeWidth="2" />
    <path d="M50 50 L50 75 M35 60 L50 55 L65 50 M45 90 L50 75 L55 90" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
    {/* Holding Balloon */}
    <line x1="65" y1="50" x2="75" y2="20" stroke="white" strokeWidth="1" />
    <circle cx="75" cy="20" r="10" fill="rgba(255,192,203,0.3)" stroke="pink" strokeWidth="2" />
  </svg>
);

const DollThree = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg" style={{ filter: 'drop-shadow(0px 0px 5px rgba(255,255,255,0.5))' }}>
    <rect x="35" y="20" width="30" height="25" rx="5" fill="none" stroke="white" strokeWidth="2" />
    <path d="M35 45 L30 60 M65 45 L70 60 M40 45 L40 70 M60 45 L60 70" fill="none" stroke="white" strokeWidth="2" />
    {/* Elephant features for Hathi */}
    <path d="M50 35 Q45 45 50 50" fill="none" stroke="white" strokeWidth="2" />
    <circle cx="42" cy="30" r="2" fill="white" />
    <circle cx="58" cy="30" r="2" fill="white" />
  </svg>
);

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-blue-100 to-white opacity-100 transition-colors duration-[5000ms]"></div>
      
      {/* Floating Orbs/Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`orb-${i}`}
          className="absolute rounded-full blur-xl opacity-30 animate-pulse"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            backgroundColor: ['#FFC0CB', '#87CEEB', '#E6E6FA'][Math.floor(Math.random() * 3)],
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 5 + 5}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        ></div>
      ))}

      {/* SVG Dolls with CSS Animation */}
      <div className="absolute bottom-20 left-5 w-32 h-32 opacity-80 floating-doll" style={{animationDelay: '0s', animationDuration: '7s'}}>
        <DollOne />
      </div>
      
      <div className="absolute top-32 right-5 w-32 h-32 opacity-80 floating-doll" style={{animationDelay: '2s', animationDuration: '8s'}}>
        <DollTwo />
      </div>

      <div className="absolute bottom-40 right-10 w-24 h-24 opacity-60 floating-doll" style={{animationDelay: '4s', animationDuration: '6s'}}>
         <DollThree />
      </div>
    </div>
  );
};