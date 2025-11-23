import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-blue-100 to-white opacity-100 transition-colors duration-[5000ms]"></div>
      
      {/* Floating Orbs/Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`orb-${i}`}
          className="absolute rounded-full blur-xl opacity-40 animate-pulse"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            backgroundColor: ['#FFC0CB', '#87CEEB', '#FFFFFF'][Math.floor(Math.random() * 3)],
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 5 + 5}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        ></div>
      ))}

      {/* Dolls - Positioned absolutely with slow float animation */}
      {/* Doll 1: Bottom Left */}
      <div className="absolute bottom-10 -left-10 md:left-10 w-32 md:w-48 opacity-80 floating-doll" style={{animationDelay: '0s'}}>
        <img src="./doll1.png" alt="" onError={(e) => e.currentTarget.style.display = 'none'} />
      </div>
      
      {/* Doll 2: Top Right */}
      <div className="absolute top-20 -right-10 md:right-10 w-28 md:w-40 opacity-80 floating-doll" style={{animationDelay: '2s'}}>
        <img src="./doll2.png" alt="" onError={(e) => e.currentTarget.style.display = 'none'} />
      </div>

      {/* Doll 3: Bottom Right (hidden on small mobile maybe?) */}
      <div className="absolute bottom-32 right-4 md:right-20 w-24 md:w-36 opacity-80 floating-doll" style={{animationDelay: '4s'}}>
         <img src="./doll3.png" alt="" onError={(e) => e.currentTarget.style.display = 'none'} />
      </div>
    </div>
  );
};
