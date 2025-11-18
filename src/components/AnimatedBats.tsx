import React from 'react';

interface AnimatedBatsProps {
  count?: number; // Number of bats to display (default: 5)
}

export const AnimatedBats: React.FC<AnimatedBatsProps> = ({ count = 5 }) => {
  // Generate array of bat elements with unique keys
  const bats = Array.from({ length: count }, (_, index) => index);

  return (
    <>
      {bats.map((batIndex) => (
        <div
          key={`bat-${batIndex}`}
          className={`bat-animated bat-${batIndex}`}
          style={{
            position: 'fixed',
            zIndex: 5,
            pointerEvents: 'none',
            top: `${10 + batIndex * 15}%`, // Stagger vertical positions
            left: '-60px', // Start off-screen left
            width: '48px',
            height: '48px',
          }}
        >
          {/* Bat SVG silhouette */}
          <svg
            viewBox="0 0 64 64"
            fill="currentColor"
            className="text-halloween-purple"
            style={{ width: '100%', height: '100%', opacity: 0.7 }}
          >
            <path d="M32,20 Q28,16 24,18 Q20,20 18,24 L16,28 Q14,30 12,28 Q10,26 8,28 Q6,30 8,32 L12,36 Q16,38 20,36 L24,32 Q28,28 32,26 Q36,28 40,32 L44,36 Q48,38 52,36 L56,32 Q58,30 56,28 Q54,26 52,28 Q50,30 48,28 L46,24 Q44,20 40,18 Q36,16 32,20 Z M32,26 L30,30 L32,34 L34,30 Z" />
          </svg>
        </div>
      ))}
    </>
  );
};
