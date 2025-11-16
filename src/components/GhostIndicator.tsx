interface GhostIndicatorProps {
  isVisible: boolean;
  monthTotal: number;
}

export function GhostIndicator({ isVisible, monthTotal }: GhostIndicatorProps) {
  return (
    <div className={`
      absolute top-0 right-0 group
      transition-opacity duration-500
      ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    `}>
      {/* Ghost SVG */}
      <svg
        width="80"
        height="100"
        viewBox="0 0 80 100"
        className="animate-float pulse-glow-animation"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ghost body */}
        <path
          d="M 40 20 
             C 20 20, 10 35, 10 55
             L 10 85
             L 15 80
             L 20 85
             L 25 80
             L 30 85
             L 35 80
             L 40 85
             L 45 80
             L 50 85
             L 55 80
             L 60 85
             L 65 80
             L 70 85
             L 70 55
             C 70 35, 60 20, 40 20 Z"
          fill="rgba(232, 232, 232, 0.9)"
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="2"
        />
        
        {/* Left eye */}
        <circle cx="30" cy="45" r="5" fill="#1A1A1D" />
        
        {/* Right eye */}
        <circle cx="50" cy="45" r="5" fill="#1A1A1D" />
        
        {/* Mouth */}
        <ellipse cx="40" cy="60" rx="8" ry="5" fill="#1A1A1D" />
      </svg>

      {/* Tooltip */}
      <div className="
        absolute top-full left-1/2 transform -translate-x-1/2 mt-2
        bg-halloween-gray-dark border-2 border-halloween-orange
        rounded-lg px-4 py-2 shadow-xl
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        pointer-events-none
        whitespace-nowrap
        z-10
      ">
        <div className="text-sm font-bold text-halloween-orange-bright">
          Most Expensive Month
        </div>
        <div className="text-lg font-bold text-halloween-text-light">
          ${monthTotal.toFixed(2)}
        </div>
        {/* Tooltip arrow */}
        <div className="
          absolute bottom-full left-1/2 transform -translate-x-1/2
          border-8 border-transparent border-b-halloween-orange
        " />
      </div>
    </div>
  );
}
