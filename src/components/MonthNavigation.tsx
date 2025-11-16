import { format } from 'date-fns';

interface MonthNavigationProps {
  currentMonth: Date;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
}

export function MonthNavigation({ currentMonth, onPrevious, onNext, onToday }: MonthNavigationProps) {
  return (
    <div className="flex items-center justify-between mb-4 sm:mb-6 px-2 sm:px-4">
      {/* Previous Month Button */}
      <button
        onClick={onPrevious}
        className="bg-halloween-purple hover:bg-halloween-purple-dark text-halloween-text-light font-bold py-1.5 sm:py-2 px-2 sm:px-4 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 glow-orange"
        aria-label="Previous month"
      >
        <span className="text-xl sm:text-2xl">🦇</span>
      </button>

      {/* Month/Year Display */}
      <div className="flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-creepy text-halloween-orange-bright text-center">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={onToday}
          className="mt-1 sm:mt-2 text-xs sm:text-sm text-halloween-ghost hover:text-halloween-orange transition-colors duration-200 underline"
        >
          Today
        </button>
      </div>

      {/* Next Month Button */}
      <button
        onClick={onNext}
        className="bg-halloween-purple hover:bg-halloween-purple-dark text-halloween-text-light font-bold py-1.5 sm:py-2 px-2 sm:px-4 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 glow-orange"
        aria-label="Next month"
      >
        <span className="text-xl sm:text-2xl">🦇</span>
      </button>
    </div>
  );
}
