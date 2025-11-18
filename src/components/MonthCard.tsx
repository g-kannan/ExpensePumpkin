import { useState } from 'react';
import { format, parse } from 'date-fns';
import type { Expense } from '../hooks/useExpenses';
import { getCurrencySymbol } from '../utils/currencyConfig';

interface MonthCardProps {
  month: string; // Format: "YYYY-MM"
  expenses: Expense[];
  isCurrentMonth: boolean;
  isMostExpensive: boolean;
}

export function MonthCard({ month, expenses, isCurrentMonth, isMostExpensive }: MonthCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Parse month string to get month name
  const monthDate = parse(month, 'yyyy-MM', new Date());
  const monthName = format(monthDate, 'MMMM');
  const year = format(monthDate, 'yyyy');

  // Calculate total and count
  const count = expenses.length;
  
  // Group expenses by currency
  const expensesByCurrency = expenses.reduce((acc, expense) => {
    const currency = expense.currency || 'USD';
    if (!acc[currency]) {
      acc[currency] = [];
    }
    acc[currency].push(expense);
    return acc;
  }, {} as Record<string, Expense[]>);

  // Calculate totals by currency
  const currencyTotals = Object.entries(expensesByCurrency).map(([currency, expenseList]) => ({
    currency,
    total: expenseList.reduce((sum, expense) => sum + expense.amount, 0),
    symbol: getCurrencySymbol(currency),
  }));

  // Determine if we have multiple currencies
  const hasMultipleCurrencies = currencyTotals.length > 1;
  
  // Primary currency (the one with the highest total or first one)
  const primaryCurrency = currencyTotals.length > 0 
    ? currencyTotals.sort((a, b) => b.total - a.total)[0]
    : null;

  return (
    <div
      className={`
        bg-halloween-gray-dark rounded-lg shadow-lg border-2 p-4
        transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
        ${isCurrentMonth ? 'border-halloween-orange glow-orange-strong' : 'border-halloween-purple/30 hover:border-halloween-purple/50'}
        ${isExpanded ? 'ring-2 ring-halloween-purple/50' : ''}
        relative overflow-visible
      `}
    >
      {/* Ghost Indicator for Most Expensive Month */}
      {isMostExpensive && (
        <div className="absolute -top-4 -right-4 z-10" title="Most Expensive Month">
          <svg
            width="48"
            height="60"
            viewBox="0 0 80 100"
            className="float-animation pulse-glow-animation drop-shadow-lg"
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
              fill="rgba(232, 232, 232, 0.95)"
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth="2"
            />
            
            {/* Left eye */}
            <circle cx="30" cy="45" r="5" fill="#1A1A1D" />
            
            {/* Right eye */}
            <circle cx="50" cy="45" r="5" fill="#1A1A1D" />
            
            {/* Mouth */}
            <ellipse cx="40" cy="60" rx="8" ry="5" fill="#1A1A1D" />
          </svg>
        </div>
      )}

      {/* Month Header - Clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-halloween-orange rounded transition-all duration-200 hover:opacity-90"
        aria-label={`${monthName} ${year} - ${count} expense${count !== 1 ? 's' : ''}`}
        aria-expanded={isExpanded}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isCurrentMonth ? 'text-halloween-orange' : 'text-halloween-text-light'}`}>
            {monthName}
          </h3>
          <span className="text-xs text-halloween-text-muted">{year}</span>
        </div>

        <div className="flex justify-between items-center">
          <div>
            {hasMultipleCurrencies ? (
              <div className="text-2xl font-bold text-halloween-orange">
                Mixed
              </div>
            ) : primaryCurrency ? (
              <div className="text-2xl font-bold text-halloween-orange">
                {primaryCurrency.symbol}{primaryCurrency.total.toFixed(2)}
              </div>
            ) : (
              <div className="text-2xl font-bold text-halloween-orange">
                $0.00
              </div>
            )}
            <div className="text-sm text-halloween-text-muted">
              {count} expense{count !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Expand/Collapse Icon */}
          {count > 0 && (
            <div className="text-halloween-purple">
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          )}
        </div>
      </button>

      {/* Expanded Expense List */}
      {isExpanded && count > 0 && (
        <div className="mt-4 pt-4 border-t border-halloween-purple/30 space-y-3 fade-in-animation max-h-64 overflow-y-auto">
          {hasMultipleCurrencies ? (
            // Group by currency when multiple currencies exist
            Object.entries(expensesByCurrency).map(([currency, currencyExpenses]) => (
              <div key={currency} className="space-y-2">
                <div className="text-xs font-semibold text-halloween-purple uppercase tracking-wide">
                  {currency} ({getCurrencySymbol(currency)})
                </div>
                {currencyExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="bg-halloween-gray-medium rounded p-2 sm:p-3 hover:bg-halloween-purple/20 transition-all duration-200 hover:scale-[1.01]"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-halloween-text-light font-medium text-sm sm:text-base truncate">
                          {expense.description}
                        </div>
                        <div className="text-xs text-halloween-text-muted mt-1">
                          {new Date(expense.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-halloween-orange font-bold text-sm sm:text-base whitespace-nowrap">
                        {getCurrencySymbol(expense.currency || 'USD')}{expense.amount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            // Single currency - no grouping needed
            expenses.map((expense) => (
              <div
                key={expense.id}
                className="bg-halloween-gray-medium rounded p-2 sm:p-3 hover:bg-halloween-purple/20 transition-all duration-200 hover:scale-[1.01]"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-halloween-text-light font-medium text-sm sm:text-base truncate">
                      {expense.description}
                    </div>
                    <div className="text-xs text-halloween-text-muted mt-1">
                      {new Date(expense.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-halloween-orange font-bold text-sm sm:text-base whitespace-nowrap">
                    {getCurrencySymbol(expense.currency || 'USD')}{expense.amount.toFixed(2)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Empty State */}
      {count === 0 && (
        <div className="text-center text-halloween-text-muted text-sm mt-2 py-2 opacity-60">
          No expenses
        </div>
      )}
    </div>
  );
}
