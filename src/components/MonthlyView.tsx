import { useMemo } from 'react';
import { format } from 'date-fns';
import type { Expense } from '../hooks/useExpenses';
import { MonthCard } from './MonthCard';

interface MonthlyViewProps {
  expenses: Expense[];
  currentYear: number;
  onYearChange: (year: number) => void;
  mostExpensiveMonth: string | null; // Format: "YYYY-MM"
}

interface MonthlySummary {
  month: string; // Format: "YYYY-MM"
  expenses: Expense[];
}

export function MonthlyView({ expenses, currentYear, onYearChange, mostExpensiveMonth }: MonthlyViewProps) {
  // Get current month for highlighting
  const currentMonth = format(new Date(), 'yyyy-MM');

  // Calculate monthly summaries for the current year
  const monthlySummaries = useMemo((): MonthlySummary[] => {
    const summaries: MonthlySummary[] = [];

    // Generate all 12 months for the current year
    for (let month = 1; month <= 12; month++) {
      const monthKey = `${currentYear}-${month.toString().padStart(2, '0')}`;
      const monthExpenses = expenses.filter(expense => expense.month === monthKey);

      summaries.push({
        month: monthKey,
        expenses: monthExpenses,
      });
    }

    return summaries;
  }, [expenses, currentYear]);

  // Navigation handlers
  const handlePreviousYear = () => {
    onYearChange(currentYear - 1);
  };

  const handleNextYear = () => {
    onYearChange(currentYear + 1);
  };

  const handleCurrentYear = () => {
    onYearChange(new Date().getFullYear());
  };

  return (
    <div className="bg-halloween-gray-dark rounded-lg shadow-xl border border-halloween-purple/30 p-3 sm:p-4 md:p-6 responsive-padding fade-in-animation">
      {/* Year Navigation */}
      <div className="flex items-center justify-between mb-6 gap-2 sm:gap-4">
        <button
          onClick={handlePreviousYear}
          className="bg-halloween-purple hover:bg-halloween-purple-dark text-white font-bold py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-halloween-purple/50"
          aria-label="Previous year"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
          <h2 className="text-2xl sm:text-3xl font-creepy text-halloween-orange glow-orange">
            {currentYear}
          </h2>
          <button
            onClick={handleCurrentYear}
            className="bg-halloween-gray-medium hover:bg-halloween-purple text-halloween-text-light font-bold py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 text-xs sm:text-sm shadow-md hover:shadow-lg"
          >
            Current Year
          </button>
        </div>

        <button
          onClick={handleNextYear}
          className="bg-halloween-purple hover:bg-halloween-purple-dark text-white font-bold py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-halloween-purple/50"
          aria-label="Next year"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Monthly Grid - Responsive: 1 column on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {monthlySummaries.map((summary) => (
          <MonthCard
            key={summary.month}
            month={summary.month}
            expenses={summary.expenses}
            isCurrentMonth={summary.month === currentMonth}
            isMostExpensive={summary.month === mostExpensiveMonth}
          />
        ))}
      </div>
    </div>
  );
}
