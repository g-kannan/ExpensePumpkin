import React from 'react';

interface HalloweenDecorationsProps {
  showSpiderWebs?: boolean;
  showParticles?: boolean;
}

export const HalloweenDecorations: React.FC<HalloweenDecorationsProps> = ({
  showSpiderWebs = true,
  showParticles = true,
}) => {
  // Generate array of particle elements
  const particles = Array.from({ length: 5 }, (_, index) => index);

  return (
    <>
      {/* Spider Web Decorations */}
      {showSpiderWebs && (
        <>
          {/* Top-left spider web */}
          <div
            className="spider-web top-left"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '200px',
              height: '200px',
              opacity: 0.25,
              pointerEvents: 'none',
              zIndex: -5,
            }}
          >
            <svg
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
              className="text-halloween-ghost"
              style={{ width: '100%', height: '100%' }}
            >
              {/* Radial web strands */}
              <line x1="10" y1="10" x2="100" y2="100" strokeWidth="1.5" />
              <line x1="50" y1="5" x2="100" y2="100" strokeWidth="1.5" />
              <line x1="100" y1="5" x2="100" y2="100" strokeWidth="1.5" />
              <line x1="150" y1="10" x2="100" y2="100" strokeWidth="1.5" />
              <line x1="190" y1="50" x2="100" y2="100" strokeWidth="1.5" />
              <line x1="5" y1="50" x2="100" y2="100" strokeWidth="1.5" />
              <line x1="5" y1="100" x2="100" y2="100" strokeWidth="1.5" />
              <line x1="10" y1="150" x2="100" y2="100" strokeWidth="1.5" />
              
              {/* Concentric circles */}
              <circle cx="100" cy="100" r="20" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="40" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="60" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="80" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="95" strokeWidth="1.5" />
            </svg>
            
            {/* Small spider on web */}
            <div
              style={{
                position: 'absolute',
                top: '30%',
                left: '35%',
                width: '16px',
                height: '16px',
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="text-halloween-purple">
                <circle cx="12" cy="12" r="4" />
                <circle cx="12" cy="8" r="2" />
                {/* Spider legs */}
                <line x1="12" y1="12" x2="6" y2="8" stroke="currentColor" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="18" y2="8" stroke="currentColor" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="6" y2="16" stroke="currentColor" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="18" y2="16" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* Top-right spider web (mirrored) */}
          <div
            className="spider-web top-right"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '200px',
              height: '200px',
              opacity: 0.25,
              pointerEvents: 'none',
              zIndex: -5,
              transform: 'scaleX(-1)',
            }}
          >
            <svg
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
              className="text-halloween-ghost"
              style={{ width: '100%', height: '100%' }}
            >
              {/* Radial web strands */}
              <line x1="10" y1="10" x2="100" y2="100" strokeWidth="1.5" />
              <line x1="50" y1="5" x2="100" y2="100" strokeWidth="1.5" />
              <line x1="100" y1="5" x2="100" y2="100" strokeWidth="1.5" />
              <line x1="150" y1="10" x2="100" y2="100" strokeWidth="1.5" />
              <line x1="190" y1="50" x2="100" y2="100" strokeWidth="1.5" />
              <line x1="5" y1="50" x2="100" y2="100" strokeWidth="1.5" />
              <line x1="5" y1="100" x2="100" y2="100" strokeWidth="1.5" />
              <line x1="10" y1="150" x2="100" y2="100" strokeWidth="1.5" />
              
              {/* Concentric circles */}
              <circle cx="100" cy="100" r="20" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="40" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="60" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="80" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="95" strokeWidth="1.5" />
            </svg>
            
            {/* Small spider on web */}
            <div
              style={{
                position: 'absolute',
                top: '30%',
                left: '35%',
                width: '16px',
                height: '16px',
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="text-halloween-purple">
                <circle cx="12" cy="12" r="4" />
                <circle cx="12" cy="8" r="2" />
                {/* Spider legs */}
                <line x1="12" y1="12" x2="6" y2="8" stroke="currentColor" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="18" y2="8" stroke="currentColor" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="6" y2="16" stroke="currentColor" strokeWidth="1.5" />
                <line x1="12" y1="12" x2="18" y2="16" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </>
      )}

      {/* Floating Particle Effects */}
      {showParticles && (
        <>
          {particles.map((particleIndex) => (
            <div
              key={`particle-${particleIndex}`}
              className={`floating-particle particle-${particleIndex}`}
              style={{
                position: 'fixed',
                zIndex: -8,
                pointerEvents: 'none',
                bottom: '-20px',
                left: `${15 + particleIndex * 18}%`,
                width: '16px',
                height: '16px',
                opacity: 0,
                animation: `float-particle-${particleIndex} ${8 + particleIndex * 2}s ease-in-out infinite`,
                animationDelay: `${particleIndex * 1.5}s`,
              }}
            >
              {/* Alternate between ghost and sparkle */}
              {particleIndex % 2 === 0 ? (
                // Ghost particle
                <svg viewBox="0 0 24 24" fill="currentColor" className="text-halloween-ghost">
                  <path d="M12 2C8.5 2 6 4.5 6 8v8c0 1 .5 2 1.5 2.5.5.5 1 .5 1.5.5s1 0 1.5-.5c.5-.5 1-.5 1.5-.5s1 0 1.5.5c.5.5 1 .5 1.5.5s1 0 1.5-.5c1-.5 1.5-1.5 1.5-2.5V8c0-3.5-2.5-6-6-6zm-2 6c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1zm4 0c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1z" />
                </svg>
              ) : (
                // Sparkle particle
                <svg viewBox="0 0 24 24" fill="currentColor" className="text-halloween-orange-bright">
                  <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z" />
                </svg>
              )}
            </div>
          ))}
        </>
      )}

      {/* Additional Themed Elements - Pumpkins in corners */}
      <div
        className="pumpkin-decoration bottom-left"
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          width: '40px',
          height: '40px',
          opacity: 0.4,
          pointerEvents: 'none',
          zIndex: -6,
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="text-halloween-orange">
          <path d="M12 2c-.5 0-1 .5-1 1v1c-3 0-5.5 2.5-5.5 5.5 0 1.5.5 2.5 1.5 3.5v5c0 2 1.5 3.5 3.5 3.5h2c2 0 3.5-1.5 3.5-3.5v-5c1-.5 1.5-2 1.5-3.5C17 6.5 14.5 4 11.5 4V3c0-.5-.5-1-1-1zm-1 6c.5 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .5-1 1-1zm2 0c.5 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .5-1 1-1zm-2 4h2l-1 2-1-2z" />
        </svg>
      </div>

      <div
        className="pumpkin-decoration bottom-right"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '40px',
          height: '40px',
          opacity: 0.4,
          pointerEvents: 'none',
          zIndex: -6,
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="text-halloween-orange">
          <path d="M12 2c-.5 0-1 .5-1 1v1c-3 0-5.5 2.5-5.5 5.5 0 1.5.5 2.5 1.5 3.5v5c0 2 1.5 3.5 3.5 3.5h2c2 0 3.5-1.5 3.5-3.5v-5c1-.5 1.5-2 1.5-3.5C17 6.5 14.5 4 11.5 4V3c0-.5-.5-1-1-1zm-1 6c.5 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .5-1 1-1zm2 0c.5 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .5-1 1-1zm-2 4h2l-1 2-1-2z" />
        </svg>
      </div>

      {/* Floating ghost decoration - top center */}
      <div
        className="ghost-decoration"
        style={{
          position: 'fixed',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '32px',
          height: '32px',
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: -7,
          animation: 'float-slow 5s ease-in-out infinite',
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="text-halloween-ghost">
          <path d="M12 2C8.5 2 6 4.5 6 8v8c0 1 .5 2 1.5 2.5.5.5 1 .5 1.5.5s1 0 1.5-.5c.5-.5 1-.5 1.5-.5s1 0 1.5.5c.5.5 1 .5 1.5.5s1 0 1.5-.5c1-.5 1.5-1.5 1.5-2.5V8c0-3.5-2.5-6-6-6zm-2 6c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1zm4 0c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1z" />
        </svg>
      </div>

      {/* CSS for particle animations */}
      <style>{`
        @keyframes float-particle-0 {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }

        @keyframes float-particle-1 {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100vh) translateX(-15px);
            opacity: 0;
          }
        }

        @keyframes float-particle-2 {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(25px);
            opacity: 0;
          }
        }

        @keyframes float-particle-3 {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) translateX(-20px);
            opacity: 0;
          }
        }

        @keyframes float-particle-4 {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100vh) translateX(10px);
            opacity: 0;
          }
        }

        /* Responsive adjustments for mobile */
        @media (max-width: 640px) {
          .spider-web {
            width: 120px !important;
            height: 120px !important;
          }
          
          .pumpkin-decoration {
            width: 28px !important;
            height: 28px !important;
          }
          
          .ghost-decoration {
            width: 24px !important;
            height: 24px !important;
          }
        }

        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .floating-particle,
          .ghost-decoration {
            animation: none !important;
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
