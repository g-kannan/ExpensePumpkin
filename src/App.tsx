import { useState, useEffect } from 'react';
import { useExpenses } from './hooks/useExpenses';
import { ExpenseForm } from './components/ExpenseForm';
import { MonthlyView } from './components/MonthlyView';
import { MonthStats } from './components/MonthStats';
import { EmptyState } from './components/EmptyState';
import { StorageWarning } from './components/StorageWarning';
import { Toast } from './components/Toast';
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
      {/* Spider Web Background Pattern */}
      <div className="spider-web-svg absolute inset-0 opacity-10 pointer-events-none" />
      
      {/* Fog/Mist Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-halloween-purple-dark/50 via-transparent to-transparent pointer-events-none" />
      
      {/* Bat Decorations */}
      <div className="bat-decoration bat-left absolute top-20 left-10 opacity-30 animate-pulse pointer-events-none">
        <svg width="60" height="40" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 30 20 
               C 25 15, 20 12, 15 15
               C 10 18, 8 22, 10 25
               C 12 28, 15 28, 18 26
               L 22 22
               L 30 25
               L 38 22
               L 42 26
               C 45 28, 48 28, 50 25
               C 52 22, 50 18, 45 15
               C 40 12, 35 15, 30 20 Z"
            fill="#1A1A1D"
            opacity="0.8"
          />
          <circle cx="30" cy="20" r="3" fill="#1A1A1D" />
        </svg>
      </div>
      
      <div className="bat-decoration bat-right absolute top-32 right-16 opacity-25 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}>
        <svg width="50" height="35" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 30 20 
               C 25 15, 20 12, 15 15
               C 10 18, 8 22, 10 25
               C 12 28, 15 28, 18 26
               L 22 22
               L 30 25
               L 38 22
               L 42 26
               C 45 28, 48 28, 50 25
               C 52 22, 50 18, 45 15
               C 40 12, 35 15, 30 20 Z"
            fill="#1A1A1D"
            opacity="0.8"
          />
          <circle cx="30" cy="20" r="3" fill="#1A1A1D" />
        </svg>
      </div>
      
      <div className="bat-decoration bat-bottom absolute bottom-40 left-1/4 opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}>
        <svg width="45" height="30" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 30 20 
               C 25 15, 20 12, 15 15
               C 10 18, 8 22, 10 25
               C 12 28, 15 28, 18 26
               L 22 22
               L 30 25
               L 38 22
               L 42 26
               C 45 28, 48 28, 50 25
               C 52 22, 50 18, 45 15
               C 40 12, 35 15, 30 20 Z"
            fill="#1A1A1D"
            opacity="0.8"
          />
          <circle cx="30" cy="20" r="3" fill="#1A1A1D" />
        </svg>
      </div>

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
