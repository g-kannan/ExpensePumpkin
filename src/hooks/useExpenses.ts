import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface Expense {
  id: string;
  date: string; // ISO date format (YYYY-MM-DD)
  amount: number;
  timestamp: number;
}

interface MonthlyTotals {
  [key: string]: number; // key format: "YYYY-MM"
}

interface MostExpensiveMonth {
  month: string; // format: "YYYY-MM"
  total: number;
}

/**
 * Custom hook for managing expenses with local storage persistence
 */
export function useExpenses() {
  const [expenses, setExpenses, storageAvailable] = useLocalStorage<Expense[]>('halloween-expenses', []);

  /**
   * Add a new expense
   */
  const addExpense = (date: string, amount: number) => {
    const newExpense: Expense = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date,
      amount,
      timestamp: Date.now(),
    };

    setExpenses((prev) => [...prev, newExpense].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    ));
  };

  /**
   * Clear all expenses
   */
  const clearExpenses = () => {
    setExpenses([]);
  };

  /**
   * Get expenses for a specific date
   */
  const getExpensesByDate = (date: string): Expense[] => {
    return expenses.filter((expense) => expense.date === date);
  };

  /**
   * Calculate monthly totals
   */
  const getMonthlyTotals = useMemo((): MonthlyTotals => {
    const totals: MonthlyTotals = {};

    expenses.forEach((expense) => {
      // Extract YYYY-MM from date
      const monthKey = expense.date.substring(0, 7);
      
      if (!totals[monthKey]) {
        totals[monthKey] = 0;
      }
      
      totals[monthKey] += expense.amount;
    });

    return totals;
  }, [expenses]);

  /**
   * Get the most expensive month with tie-breaking logic
   * If multiple months have equal highest totals, returns the most recent month
   */
  const getMostExpensiveMonth = useMemo((): MostExpensiveMonth | null => {
    const monthlyTotals = getMonthlyTotals;
    const months = Object.keys(monthlyTotals);

    if (months.length === 0) {
      return null;
    }

    // Find the maximum total
    const maxTotal = Math.max(...Object.values(monthlyTotals));

    // Get all months with the maximum total
    const topMonths = months.filter((month) => monthlyTotals[month] === maxTotal);

    // Sort by date descending and take the most recent
    const mostRecentMonth = topMonths.sort((a, b) => b.localeCompare(a))[0];

    return {
      month: mostRecentMonth,
      total: maxTotal,
    };
  }, [getMonthlyTotals]);

  return {
    expenses,
    addExpense,
    clearExpenses,
    getExpensesByDate,
    getMonthlyTotals,
    getMostExpensiveMonth,
    storageAvailable,
  };
}
