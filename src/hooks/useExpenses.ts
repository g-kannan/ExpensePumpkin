import { useMemo, useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { exportExpensesToCSV } from '../utils/exportService';

export interface Expense {
  id: string;
  month: string; // Format: YYYY-MM
  description: string;
  amount: number;
  currency: string; // ISO 4217 currency code (e.g., "INR", "USD", "EUR")
  timestamp: number;
}

interface OldExpense {
  id: string;
  date: string; // ISO date format (YYYY-MM-DD)
  amount: number;
  timestamp: number;
}

interface MigrationResult {
  success: boolean;
  expenses: Expense[] | null;
  error?: string;
}

/**
 * Migrate old day-level expenses to month-level expenses
 * Detects old data format and transforms it to the new structure
 */
function migrateOldExpenses(): MigrationResult {
  try {
    const oldData = localStorage.getItem('halloween-expenses');
    if (!oldData) {
      return { success: false, expenses: null };
    }

    const oldExpenses: OldExpense[] = JSON.parse(oldData);
    if (!Array.isArray(oldExpenses) || oldExpenses.length === 0) {
      return { success: false, expenses: null };
    }

    // Validate old expense structure
    const isValidOldExpense = (expense: any): expense is OldExpense => {
      return (
        expense &&
        typeof expense.id === 'string' &&
        typeof expense.date === 'string' &&
        typeof expense.amount === 'number' &&
        typeof expense.timestamp === 'number'
      );
    };

    // Filter out invalid expenses
    const validOldExpenses = oldExpenses.filter(isValidOldExpense);
    
    if (validOldExpenses.length === 0) {
      return { 
        success: false, 
        expenses: null, 
        error: 'No valid expenses found in old data format' 
      };
    }

    // Group expenses by month and aggregate
    const monthlyMap = new Map<string, { total: number; count: number }>();

    validOldExpenses.forEach((expense) => {
      try {
        // Extract YYYY-MM from date
        const month = expense.date.substring(0, 7);
        
        // Validate month format
        if (!/^\d{4}-\d{2}$/.test(month)) {
          console.warn(`Invalid date format for expense ${expense.id}: ${expense.date}`);
          return;
        }

        const current = monthlyMap.get(month) || { total: 0, count: 0 };
        monthlyMap.set(month, {
          total: current.total + expense.amount,
          count: current.count + 1,
        });
      } catch (err) {
        console.warn(`Error processing expense ${expense.id}:`, err);
      }
    });

    if (monthlyMap.size === 0) {
      return { 
        success: false, 
        expenses: null, 
        error: 'Failed to process any expenses during migration' 
      };
    }

    // Create new expense entries
    const newExpenses: Expense[] = Array.from(monthlyMap.entries()).map(
      ([month, data]) => ({
        id: `migrated-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        month,
        description: `Migrated expenses (${data.count} expense${data.count > 1 ? 's' : ''})`,
        amount: data.total,
        currency: 'USD', // Default currency for migrated data
        timestamp: Date.now(),
      })
    );

    return { success: true, expenses: newExpenses };
  } catch (error) {
    console.error('Error migrating old expenses:', error);
    return { 
      success: false, 
      expenses: null, 
      error: error instanceof Error ? error.message : 'Unknown migration error' 
    };
  }
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
  const [expenses, setExpenses, storageAvailable] = useLocalStorage<Expense[]>('expense-pumpkin-data', []);
  const [migrationStatus, setMigrationStatus] = useState<'idle' | 'success' | 'error' | 'no-data'>('idle');

  // Run migration on first load if old data exists
  useEffect(() => {
    if (!storageAvailable) {
      setMigrationStatus('idle');
      return;
    }

    const currentData = localStorage.getItem('expense-pumpkin-data');
    const oldData = localStorage.getItem('halloween-expenses');
    
    // Only migrate if new storage is empty and old data exists
    if ((!currentData || currentData === '[]') && oldData) {
      const result = migrateOldExpenses();
      
      if (result.success && result.expenses && result.expenses.length > 0) {
        setExpenses(result.expenses);
        setMigrationStatus('success');
        
        // Remove old data after successful migration
        try {
          localStorage.removeItem('halloween-expenses');
        } catch (error) {
          console.warn('Could not remove old data:', error);
        }
      } else {
        setMigrationStatus('error');
        console.error('Migration failed:', result.error);
      }
    } else {
      setMigrationStatus('no-data');
    }
  }, [storageAvailable]); // Run when storage availability changes

  /**
   * Add a new expense
   */
  const addExpense = (month: string, description: string, amount: number, currency: string) => {
    const newExpense: Expense = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      month,
      description,
      amount,
      currency,
      timestamp: Date.now(),
    };

    setExpenses((prev) => [...prev, newExpense].sort((a, b) => 
      a.month.localeCompare(b.month)
    ));
  };

  /**
   * Clear all expenses
   */
  const clearExpenses = () => {
    setExpenses([]);
  };

  /**
   * Get expenses for a specific month
   */
  const getExpensesByMonth = (month: string): Expense[] => {
    return expenses.filter((expense) => expense.month === month);
  };

  /**
   * Calculate monthly totals
   */
  const getMonthlyTotals = useMemo((): MonthlyTotals => {
    const totals: MonthlyTotals = {};

    expenses.forEach((expense) => {
      const monthKey = expense.month;
      
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

  /**
   * Export expenses to CSV file
   * Handles empty expense list case
   */
  const exportToCSV = () => {
    if (expenses.length === 0) {
      console.warn('No expenses to export');
      return;
    }

    try {
      exportExpensesToCSV(expenses);
    } catch (error) {
      console.error('Failed to export expenses:', error);
      throw error;
    }
  };

  return {
    expenses,
    addExpense,
    clearExpenses,
    getExpensesByMonth,
    getMonthlyTotals,
    getMostExpensiveMonth,
    exportToCSV,
    storageAvailable,
    migrationStatus,
  };
}
