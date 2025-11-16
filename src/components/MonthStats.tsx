import { useMemo, useEffect, useState } from 'react';
import { format } from 'date-fns';
import type { Expense } from '../hooks/useExpenses';

interface MonthStatsProps {
  currentMonth: Date;
  expenses: Expense[];
  mostExpensiveMonth: { month: string; total: number } | null;
}

export function MonthStats({ currentMonth, expenses, mostExpensiveMonth }: MonthStatsProps) {
  // Calculate current month total
  const currentMonthTotal = useMemo(() => {
    const monthKey = format(currentMonth, 'yyyy-MM');
    return expenses
      .filter(expense => expense.date.startsWith(monthKey))
      .reduce((sum, expense) => sum + expense.amount, 0);
  }, [currentMonth, expenses]);

  // Calculate total expense count
  const totalExpenseCount = expenses.length;

  // Calculate average daily spending
  const averageDailySpending = useMemo(() => {
    if (expenses.length === 0) return 0;
    
    // Get unique dates
    const uniqueDates = new Set(expenses.map(expense => expense.date));
    const daysWithExpenses = uniqueDates.size;
    
    if (daysWithExpenses === 0) return 0;
    
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    return totalAmount / daysWithExpenses;
  }, [expenses]);

  // Animation state for numbers
  const [animatedCurrentTotal, setAnimatedCurrentTotal] = useState(currentMonthTotal);
  const [animatedAverage, setAnimatedAverage] = useState(averageDailySpending);

  // Animate number changes
  useEffect(() => {
    const duration = 500; // ms
    const steps = 20;
    const stepDuration = duration / steps;
    
    const startTotal = animatedCurrentTotal;
    const endTotal = currentMonthTotal;
    const totalDiff = endTotal - startTotal;
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      
      setAnimatedCurrentTotal(startTotal + totalDiff * easeProgress);
      
      if (currentStep >= steps) {
        setAnimatedCurrentTotal(endTotal);
        clearInterval(interval);
      }
    }, stepDuration);
    
    return () => clearInterval(interval);
  }, [currentMonthTotal]);

  useEffect(() => {
    const duration = 500;
    const steps = 20;
    const stepDuration = duration / steps;
    
    const startAvg = animatedAverage;
    const endAvg = averageDailySpending;
    const avgDiff = endAvg - startAvg;
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setAnimatedAverage(startAvg + avgDiff * easeProgress);
      
      if (currentStep >= steps) {
        setAnimatedAverage(endAvg);
        clearInterval(interval);
      }
    }, stepDuration);
    
    return () => clearInterval(interval);
  }, [averageDailySpending]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Format month name
  const formatMonthName = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return format(date, 'MMMM yyyy');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 fade-in-animation">
      {/* Current Month Total */}
      <div className="bg-halloween-gray-dark rounded-lg shadow-xl border border-halloween-purple/30 p-4 sm:p-6 hover:scale-105 active:scale-100 transition-transform duration-300">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs sm:text-sm font-semibold text-halloween-text-light/70 uppercase tracking-wide">
            Current Month
          </h3>
          <span className="text-xl sm:text-2xl">🎃</span>
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-halloween-orange glow-orange">
          {formatCurrency(animatedCurrentTotal)}
        </p>
        <p className="text-xs text-halloween-text-light/50 mt-1">
          {format(currentMonth, 'MMMM yyyy')}
        </p>
      </div>

      {/* Most Expensive Month */}
      <div className="bg-halloween-gray-dark rounded-lg shadow-xl border border-halloween-purple/30 p-4 sm:p-6 hover:scale-105 active:scale-100 transition-transform duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-halloween-purple/20 to-transparent rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16"></div>
        <div className="flex items-center justify-between mb-2 relative z-10">
          <h3 className="text-xs sm:text-sm font-semibold text-halloween-text-light/70 uppercase tracking-wide">
            Most Expensive
          </h3>
          <span className="text-xl sm:text-2xl glow-ghost">👻</span>
        </div>
        {mostExpensiveMonth ? (
          <>
            <p className="text-2xl sm:text-3xl font-bold text-halloween-ghost glow-ghost relative z-10">
              {formatCurrency(mostExpensiveMonth.total)}
            </p>
            <p className="text-xs text-halloween-text-light/50 mt-1 relative z-10">
              {formatMonthName(mostExpensiveMonth.month)}
            </p>
          </>
        ) : (
          <p className="text-base sm:text-lg text-halloween-text-light/50 relative z-10">
            No expenses yet
          </p>
        )}
      </div>

      {/* Total Expense Count */}
      <div className="bg-halloween-gray-dark rounded-lg shadow-xl border border-halloween-purple/30 p-4 sm:p-6 hover:scale-105 active:scale-100 transition-transform duration-300">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs sm:text-sm font-semibold text-halloween-text-light/70 uppercase tracking-wide">
            Total Expenses
          </h3>
          <span className="text-xl sm:text-2xl">🦇</span>
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-halloween-orange-bright">
          {totalExpenseCount}
        </p>
        <p className="text-xs text-halloween-text-light/50 mt-1">
          {totalExpenseCount === 1 ? 'expense' : 'expenses'} tracked
        </p>
      </div>

      {/* Average Daily Spending */}
      <div className="bg-halloween-gray-dark rounded-lg shadow-xl border border-halloween-purple/30 p-4 sm:p-6 hover:scale-105 active:scale-100 transition-transform duration-300">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs sm:text-sm font-semibold text-halloween-text-light/70 uppercase tracking-wide">
            Daily Average
          </h3>
          <span className="text-xl sm:text-2xl">🕷️</span>
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-halloween-purple">
          {formatCurrency(animatedAverage)}
        </p>
        <p className="text-xs text-halloween-text-light/50 mt-1">
          per day with expenses
        </p>
      </div>
    </div>
  );
}
