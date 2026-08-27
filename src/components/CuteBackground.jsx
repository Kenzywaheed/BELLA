import React from 'react';

function CuteBackground() {
  // Generate 20 random sparkles
  const sparkles = Array.from({ length: 20 });

  return (
    <div className="cute-bg-container">
      {/* Floating Sparkles */}
      {sparkles.map((_, i) => {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = 10 + Math.random() * 15;
        const size = 0.5 + Math.random() * 1.5;
        const isHeart = Math.random() > 0.7; // 30% chance to be a heart instead of sparkle
        
        return (
          <div 
            key={i} 
            className="bg-floating-item" 
            style={{
              left: `${left}vw`,
              top: `${top}vh`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              transform: `scale(${size})`,
              opacity: 0.15 + Math.random() * 0.2
            }}
          >
            {isHeart ? '❤️' : '✨'}
          </div>
        );
      })}
    </div>
  );
}

export default CuteBackground;
