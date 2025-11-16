import { memo } from 'react';
import type { Expense } from '../hooks/useExpenses';

interface CalendarDayProps {
  day: number | null;
  date: Date | null;
  expenses: Expense[];
  totalAmount: number;
  isCurrentMonth: boolean;
  onClick?: () => void;
}

function CalendarDayComponent({ 
  day, 
  date, 
  expenses, 
  totalAmount, 
  isCurrentMonth, 
  onClick 
}: CalendarDayProps) {
  // Empty cell for days outside current month
  if (!day || !date) {
    return <div className="aspect-square" />;
  }

  // Calculate visual intensity based on expense amount
  // Using a logarithmic scale for better visual distribution
  const getIntensityClass = (amount: number): string => {
    if (amount === 0) return 'bg-halloween-gray-dark';
    if (amount < 50) return 'bg-halloween-purple/30';
    if (amount < 100) return 'bg-halloween-purple/50';
    if (amount < 200) return 'bg-halloween-purple/70';
    return 'bg-halloween-orange/40';
  };

  const intensityClass = getIntensityClass(totalAmount);
  const hasExpenses = expenses.length > 0;

  return (
    <div
      onClick={onClick}
      className={`
        aspect-square p-1 sm:p-2 rounded-lg border-2 
        ${intensityClass}
        ${isCurrentMonth ? 'border-halloween-purple/30' : 'border-halloween-gray-medium/20'}
        ${hasExpenses ? 'cursor-pointer hover:scale-105 hover:glow-orange-strong active:scale-95' : ''}
        transition-all duration-300
        flex flex-col items-center justify-between
        ${!isCurrentMonth ? 'opacity-40' : ''}
        responsive-calendar-day
      `}
    >
      {/* Day Number */}
      <div className={`
        text-xs sm:text-sm font-semibold
        ${isCurrentMonth ? 'text-halloween-text-light' : 'text-halloween-gray-medium'}
      `}>
        {day}
      </div>

      {/* Expense Total with Pumpkin Icon */}
      {hasExpenses && (
        <div className="flex flex-col items-center">
          <span className="text-base sm:text-xl">🎃</span>
          <span className="text-[0.6rem] sm:text-xs font-bold text-halloween-orange-bright mt-0.5 sm:mt-1">
            ${totalAmount.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}

// Use React.memo for performance optimization
export const CalendarDay = memo(CalendarDayComponent);
