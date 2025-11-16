import type { Expense } from '../hooks/useExpenses';
import { formatDateToMonthKey } from './dateUtils';

/**
 * Format a number as currency (USD)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Calculate the total amount for an array of expenses
 */
export function calculateTotal(expenses: Expense[]): number {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

/**
 * Group expenses by date (YYYY-MM-DD)
 */
export function groupExpensesByDate(expenses: Expense[]): Record<string, Expense[]> {
  const grouped: Record<string, Expense[]> = {};
  
  expenses.forEach(expense => {
    if (!grouped[expense.date]) {
      grouped[expense.date] = [];
    }
    grouped[expense.date].push(expense);
  });
  
  return grouped;
}

/**
 * Group expenses by month (YYYY-MM)
 */
export function groupExpensesByMonth(expenses: Expense[]): Record<string, Expense[]> {
  const grouped: Record<string, Expense[]> = {};
  
  expenses.forEach(expense => {
    const monthKey = expense.date.substring(0, 7); // Extract YYYY-MM
    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }
    grouped[monthKey].push(expense);
  });
  
  return grouped;
}

/**
 * Calculate monthly totals from expenses
 */
export function calculateMonthlyTotals(expenses: Expense[]): Record<string, number> {
  const totals: Record<string, number> = {};
  
  expenses.forEach(expense => {
    const monthKey = expense.date.substring(0, 7); // Extract YYYY-MM
    if (!totals[monthKey]) {
      totals[monthKey] = 0;
    }
    totals[monthKey] += expense.amount;
  });
  
  return totals;
}

/**
 * Get expenses for a specific date
 */
export function getExpensesForDate(expenses: Expense[], date: string): Expense[] {
  return expenses.filter(expense => expense.date === date);
}

/**
 * Get expenses for a specific month
 */
export function getExpensesForMonth(expenses: Expense[], monthDate: Date): Expense[] {
  const monthKey = formatDateToMonthKey(monthDate);
  return expenses.filter(expense => expense.date.startsWith(monthKey));
}

/**
 * Calculate the total for a specific date
 */
export function calculateDateTotal(expenses: Expense[], date: string): number {
  const dateExpenses = getExpensesForDate(expenses, date);
  return calculateTotal(dateExpenses);
}

/**
 * Calculate the total for a specific month
 */
export function calculateMonthTotal(expenses: Expense[], monthDate: Date): number {
  const monthExpenses = getExpensesForMonth(expenses, monthDate);
  return calculateTotal(monthExpenses);
}

/**
 * Calculate average daily spending (only counting days with expenses)
 */
export function calculateAverageDailySpending(expenses: Expense[]): number {
  if (expenses.length === 0) return 0;
  
  // Get unique dates
  const uniqueDates = new Set(expenses.map(expense => expense.date));
  const daysWithExpenses = uniqueDates.size;
  
  if (daysWithExpenses === 0) return 0;
  
  const totalAmount = calculateTotal(expenses);
  return totalAmount / daysWithExpenses;
}

/**
 * Get the count of unique days with expenses
 */
export function getUniqueDaysWithExpenses(expenses: Expense[]): number {
  const uniqueDates = new Set(expenses.map(expense => expense.date));
  return uniqueDates.size;
}

/**
 * Sort expenses by date (ascending)
 */
export function sortExpensesByDate(expenses: Expense[]): Expense[] {
  return [...expenses].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

/**
 * Sort expenses by amount (descending)
 */
export function sortExpensesByAmount(expenses: Expense[]): Expense[] {
  return [...expenses].sort((a, b) => b.amount - a.amount);
}
