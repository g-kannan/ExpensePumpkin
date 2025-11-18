import { useState, useEffect } from 'react';
import { useExpenses } from './hooks/useExpenses';
import { ExpenseForm } from './components/ExpenseForm';
import { MonthlyView } from './components/MonthlyView';
import { MonthStats } from './components/MonthStats';
import { EmptyState } from './components/EmptyState';
import { StorageWarning } from './components/StorageWarning';
import { Toast } from './components/Toast';
import { AnimatedBats } from './components/AnimatedBats';
import { HalloweenDecorations } from './components/HalloweenDecorations';
import type { ToastType } from './components/Toast';

interface ToastState {
  message: string;
  type: ToastType;
}

function App() {
  const { expenses, addExpense, clearExpenses, getMostExpensiveMonth, exportToCSV, storageAvailable, migrationStatus } = useExpenses();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [toast, setToast] = useState<ToastState | null>(null);

  // Show migration notification
  useEffect(() => {
    if (migrationStatus === 'success') {
      setToast({
        message: 'Your old expenses have been migrated successfully! 🎃',
        type: 'success',
      });
    } else if (migrationStatus === 'error') {
      setToast({
        message: 'Failed to migrate old expenses. Your data is safe but may need manual review.',
        type: 'warning',
      });
    }
  }, [migrationStatus]);

  // Listen for storage quota exceeded events
  useEffect(() => {
    const handleQuotaExceeded = () => {
      setToast({
        message: 'Storage quota exceeded! Please export your data and clear old entries.',
        type: 'error',
      });
    };

    window.addEventListener('storage-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('storage-quota-exceeded', handleQuotaExceeded);
  }, []);

  // Get most expensive month data
  const mostExpensiveMonth = getMostExpensiveMonth;

  // Handle export with error handling
  const handleExport = () => {
    try {
      exportToCSV();
      setToast({
        message: 'Expenses exported successfully! 📊',
        type: 'success',
      });
    } catch (error) {
      console.error('Export failed:', error);
      
      // Check if it's the "no expenses" error
      if (error instanceof Error && error.message === 'No expenses to export') {
        setToast({
          message: 'No expenses to export. Add some expenses first! 🎃',
          type: 'warning',
        });
      } else {
        setToast({
          message: 'Failed to export expenses. Please try again.',
          type: 'error',
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-halloween-charcoal to-halloween-purple-dark p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Animated Bats - Flying across screen */}
      <AnimatedBats count={5} />
      
      {/* Halloween Decorations - Spider webs, particles, and themed elements */}
      <HalloweenDecorations showSpiderWebs={true} showParticles={true} />
      
      {/* Spider Web Background Pattern */}
      <div className="spider-web-svg absolute inset-0 opacity-10 pointer-events-none" />
      
      {/* Fog/Mist Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-halloween-purple-dark/50 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 responsive-container">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-creepy text-halloween-orange text-center mb-6 sm:mb-8 glow-orange responsive-title slide-up-animation">
          🎃 ExpensePumpkin 🎃
        </h1>
        
        {/* Storage Warning */}
        {!storageAvailable && <StorageWarning />}
        
        <ExpenseForm onAddExpense={addExpense} onClearAll={clearExpenses} onExportCSV={handleExport} />
        
        {expenses.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="mt-6 sm:mt-8">
              <MonthlyView 
                expenses={expenses}
                currentYear={currentYear}
                onYearChange={setCurrentYear}
                mostExpensiveMonth={mostExpensiveMonth?.month || null}
              />
            </div>

            <MonthStats
              currentMonth={new Date()}
              expenses={expenses}
              mostExpensiveMonth={mostExpensiveMonth}
            />
          </>
        )}
      </div>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default App
