import { useState, useEffect } from 'react';
import { SUPPORTED_CURRENCIES, DEFAULT_CURRENCY, getCurrencySymbol } from '../utils/currencyConfig';
import { EXPENSE_CATEGORIES, DEFAULT_CATEGORY, getCategoryDisplay } from '../utils/categoryConfig';

interface ExpenseFormProps {
  onAddExpense: (month: string, description: string, amount: number, currency: string) => void;
  onClearAll: () => void;
  onExportCSV?: () => void;
}

interface FormErrors {
  month?: string;
  category?: string;
  amount?: string;
  currency?: string;
}

const CURRENCY_STORAGE_KEY = 'expense-pumpkin-currency';

interface RepeatableExpense {
  category: string;
  amount: string;
  currency: string;
}

const REPEATABLE_EXPENSES_KEY = 'expense-pumpkin-repeatable';

export function ExpenseForm({ onAddExpense, onClearAll, onExportCSV }: ExpenseFormProps) {
  const [month, setMonth] = useState('');
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [isRepeatable, setIsRepeatable] = useState(false);
  const [repeatableExpenses, setRepeatableExpenses] = useState<RepeatableExpense[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showClearModal, setShowClearModal] = useState(false);
  const [showRepeatableList, setShowRepeatableList] = useState(false);

  // Load saved currency preference and repeatable expenses on mount
  useEffect(() => {
    try {
      const savedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (savedCurrency && SUPPORTED_CURRENCIES.some(c => c.code === savedCurrency)) {
        setCurrency(savedCurrency);
      }
      
      const savedRepeatable = localStorage.getItem(REPEATABLE_EXPENSES_KEY);
      if (savedRepeatable) {
        setRepeatableExpenses(JSON.parse(savedRepeatable));
      }
    } catch (error) {
      console.warn('Could not load saved preferences:', error);
    }
  }, []);

  // Save currency preference when it changes
  useEffect(() => {
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
    } catch (error) {
      console.warn('Could not save currency preference:', error);
    }
  }, [currency]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate month
    if (!month) {
      newErrors.month = 'Please select a month';
    } else {
      // Validate month format (YYYY-MM)
      const monthRegex = /^\d{4}-\d{2}$/;
      if (!monthRegex.test(month)) {
        newErrors.month = 'Invalid month format';
      } else {
        // Validate month is not in the future (optional check)
        const [year, monthNum] = month.split('-').map(Number);
        const selectedDate = new Date(year, monthNum - 1);
        const today = new Date();
        const currentMonth = new Date(today.getFullYear(), today.getMonth());
        
        // Allow current and past months, but warn about future months
        if (selectedDate > currentMonth) {
          // This is just a warning, not blocking validation
          // You could add a warning state if needed
        }
      }
    }

    // Validate category
    if (!category) {
      newErrors.category = 'Please select a category';
    } else if (!EXPENSE_CATEGORIES.some(c => c.value === category)) {
      newErrors.category = 'Invalid category selected';
    }

    // Validate currency
    if (!currency) {
      newErrors.currency = 'Please select a currency';
    } else if (!SUPPORTED_CURRENCIES.some(c => c.code === currency)) {
      newErrors.currency = 'Invalid currency selected';
    }

    // Validate amount
    if (!amount) {
      newErrors.amount = 'Please enter an expense amount';
    } else {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount)) {
        newErrors.amount = 'Please enter a valid number';
      } else if (numAmount <= 0) {
        newErrors.amount = 'Amount must be greater than zero';
      } else if (numAmount > 999999999) {
        newErrors.amount = 'Amount is too large';
      } else if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
        newErrors.amount = 'Amount can have at most 2 decimal places';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Get category display name for the expense
      const categoryDisplay = getCategoryDisplay(category);
      const description = `${categoryDisplay.icon} ${categoryDisplay.label}`;
      
      onAddExpense(month, description, parseFloat(amount), currency);
      
      // Save as repeatable if checkbox is checked
      if (isRepeatable) {
        const newRepeatable: RepeatableExpense = {
          category,
          amount,
          currency,
        };
        
        // Check if this expense already exists in repeatables
        const exists = repeatableExpenses.some(
          exp => exp.category === newRepeatable.category && 
                 exp.amount === newRepeatable.amount && 
                 exp.currency === newRepeatable.currency
        );
        
        if (!exists) {
          const updated = [...repeatableExpenses, newRepeatable];
          setRepeatableExpenses(updated);
          try {
            localStorage.setItem(REPEATABLE_EXPENSES_KEY, JSON.stringify(updated));
          } catch (error) {
            console.warn('Could not save repeatable expense:', error);
          }
        }
      }
      
      // Clear form after successful submission
      setMonth('');
      setCategory(DEFAULT_CATEGORY);
      setAmount('');
      setIsRepeatable(false);
      // Keep currency selected for next entry
      setErrors({});
    }
  };

  const handleQuickAdd = (repeatable: RepeatableExpense) => {
    setCategory(repeatable.category);
    setAmount(repeatable.amount);
    setCurrency(repeatable.currency);
    setShowRepeatableList(false);
  };

  const handleRemoveRepeatable = (index: number) => {
    const updated = repeatableExpenses.filter((_, i) => i !== index);
    setRepeatableExpenses(updated);
    try {
      localStorage.setItem(REPEATABLE_EXPENSES_KEY, JSON.stringify(updated));
    } catch (error) {
      console.warn('Could not update repeatable expenses:', error);
    }
  };

  const handleClearConfirm = () => {
    onClearAll();
    setShowClearModal(false);
  };

  return (
    <>
      <div className="bg-halloween-gray-dark rounded-lg shadow-xl border border-halloween-purple/30 p-4 sm:p-6 mb-6 sm:mb-8 responsive-padding fade-in-animation">
        <h2 className="text-xl sm:text-2xl font-creepy text-halloween-orange mb-4 sm:mb-6 text-center">
          Add Your Monthly Expenses 👻
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="month" className="block text-halloween-text-light font-medium mb-2">
              Month
            </label>
            <input
              type="month"
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full bg-halloween-gray-medium border-2 border-halloween-purple focus:border-halloween-orange text-halloween-text-light rounded-lg px-4 py-2 outline-none transition-colors duration-300"
            />
            {errors.month && (
              <p className="text-halloween-orange-bright text-sm mt-1 wiggle-animation">
                ⚠️ {errors.month}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block text-halloween-text-light font-medium mb-2">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-halloween-gray-medium border-2 border-halloween-purple focus:border-halloween-orange text-halloween-text-light rounded-lg px-4 py-2 outline-none transition-colors duration-300 cursor-pointer"
            >
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-halloween-orange-bright text-sm mt-1 wiggle-animation">
                ⚠️ {errors.category}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="currency" className="block text-halloween-text-light font-medium mb-2">
              Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full bg-halloween-gray-medium border-2 border-halloween-purple focus:border-halloween-orange text-halloween-text-light rounded-lg px-4 py-2 outline-none transition-colors duration-300 cursor-pointer"
            >
              {SUPPORTED_CURRENCIES.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.code} - {curr.name} ({curr.symbol})
                </option>
              ))}
            </select>
            {errors.currency && (
              <p className="text-halloween-orange-bright text-sm mt-1 wiggle-animation">
                ⚠️ {errors.currency}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="amount" className="block text-halloween-text-light font-medium mb-2">
              Amount ({getCurrencySymbol(currency)})
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-halloween-text-muted text-lg">
                {getCurrencySymbol(currency)}
              </span>
              <input
                type="number"
                id="amount"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-halloween-gray-medium border-2 border-halloween-purple focus:border-halloween-orange text-halloween-text-light rounded-lg pl-12 pr-4 py-2 outline-none transition-colors duration-300"
              />
            </div>
            {errors.amount && (
              <p className="text-halloween-orange-bright text-sm mt-1 wiggle-animation">
                ⚠️ {errors.amount}
              </p>
            )}
          </div>

          {/* Repeatable Expense Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="repeatable"
              checked={isRepeatable}
              onChange={(e) => setIsRepeatable(e.target.checked)}
              className="w-4 h-4 bg-halloween-gray-medium border-2 border-halloween-purple rounded cursor-pointer accent-halloween-orange"
            />
            <label htmlFor="repeatable" className="text-halloween-text-light text-sm cursor-pointer">
              Save as repeatable expense (e.g., Rent, Subscriptions)
            </label>
          </div>

          <div className="flex flex-col gap-3">
            {/* Quick Add Repeatable Button */}
            {repeatableExpenses.length > 0 && (
              <button
                type="button"
                onClick={() => setShowRepeatableList(!showRepeatableList)}
                className="w-full bg-halloween-gray-medium hover:bg-halloween-purple/50 text-halloween-text-light font-medium py-2 px-4 rounded-lg transition-all duration-300 border border-halloween-purple/30 hover:border-halloween-purple"
              >
                🔄 Quick Add Repeatable ({repeatableExpenses.length})
              </button>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 responsive-button-group">
              <button
                type="submit"
                className="flex-1 bg-halloween-orange hover:bg-halloween-orange-bright text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 hover:glow-orange-strong transform hover:scale-105 active:scale-95"
              >
                Add Expense 🎃
              </button>
              
              {onExportCSV && (
                <button
                  type="button"
                  onClick={onExportCSV}
                  className="flex-1 bg-halloween-purple hover:bg-halloween-purple-dark text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Export CSV 📊
                </button>
              )}
              
              <button
                type="button"
                onClick={() => setShowClearModal(true)}
                className="bg-halloween-purple hover:bg-halloween-purple-dark text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Clear All 🧹
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Repeatable Expenses List */}
      {showRepeatableList && repeatableExpenses.length > 0 && (
        <div className="bg-halloween-gray-dark rounded-lg shadow-xl border border-halloween-purple/30 p-4 mb-4 fade-in-animation">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-halloween-orange">Repeatable Expenses</h3>
            <button
              onClick={() => setShowRepeatableList(false)}
              className="text-halloween-text-muted hover:text-halloween-text-light transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2">
            {repeatableExpenses.map((repeatable, index) => {
              const categoryDisplay = getCategoryDisplay(repeatable.category);
              return (
                <div
                  key={index}
                  className="bg-halloween-gray-medium rounded-lg p-3 flex justify-between items-center hover:bg-halloween-purple/20 transition-all duration-200"
                >
                  <div className="flex-1">
                    <div className="text-halloween-text-light font-medium">
                      {categoryDisplay.icon} {categoryDisplay.label}
                    </div>
                    <div className="text-sm text-halloween-text-muted">
                      {getCurrencySymbol(repeatable.currency)}{parseFloat(repeatable.amount).toFixed(2)} ({repeatable.currency})
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleQuickAdd(repeatable)}
                      className="bg-halloween-orange hover:bg-halloween-orange-bright text-white px-3 py-1 rounded transition-all duration-200 text-sm"
                    >
                      Use
                    </button>
                    <button
                      onClick={() => handleRemoveRepeatable(index)}
                      className="bg-halloween-purple hover:bg-halloween-purple-dark text-white px-3 py-1 rounded transition-all duration-200 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Clear Confirmation Modal */}
      {showClearModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 fade-in-animation">
          <div className="bg-halloween-gray-dark border-2 border-halloween-orange rounded-lg shadow-2xl max-w-md w-full p-4 sm:p-6 glow-orange slide-up-animation">
            <h3 className="text-xl sm:text-2xl font-creepy text-halloween-orange mb-3 sm:mb-4 text-center">
              ⚠️ Clear All Data? ⚠️
            </h3>
            <p className="text-halloween-text-light text-center mb-4 sm:mb-6 text-sm sm:text-base">
              This will permanently delete all your expense data. This action cannot be undone!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => setShowClearModal(false)}
                className="flex-1 bg-halloween-gray-medium hover:bg-halloween-purple text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleClearConfirm}
                className="flex-1 bg-halloween-orange hover:bg-halloween-orange-bright text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 glow-orange-strong active:scale-95"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
