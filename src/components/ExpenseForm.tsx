import { useState } from 'react';

interface ExpenseFormProps {
  onAddExpense: (date: string, amount: number) => void;
  onClearAll: () => void;
}

interface FormErrors {
  date?: string;
  amount?: string;
}

export function ExpenseForm({ onAddExpense, onClearAll }: ExpenseFormProps) {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showClearModal, setShowClearModal] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate date
    if (!date) {
      newErrors.date = 'Please select a valid date';
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
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onAddExpense(date, parseFloat(amount));
      // Clear form after successful submission
      setDate('');
      setAmount('');
      setErrors({});
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
          Add Your Spooky Expenses 👻
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="date" className="block text-halloween-text-light font-medium mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-halloween-gray-medium border-2 border-halloween-purple focus:border-halloween-orange text-halloween-text-light rounded-lg px-4 py-2 outline-none transition-colors duration-300"
            />
            {errors.date && (
              <p className="text-halloween-orange-bright text-sm mt-1 wiggle-animation">
                ⚠️ {errors.date}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="amount" className="block text-halloween-text-light font-medium mb-2">
              Amount ($)
            </label>
            <input
              type="number"
              id="amount"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-halloween-gray-medium border-2 border-halloween-purple focus:border-halloween-orange text-halloween-text-light rounded-lg px-4 py-2 outline-none transition-colors duration-300"
            />
            {errors.amount && (
              <p className="text-halloween-orange-bright text-sm mt-1 wiggle-animation">
                ⚠️ {errors.amount}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 responsive-button-group">
            <button
              type="submit"
              className="flex-1 bg-halloween-orange hover:bg-halloween-orange-bright text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 hover:glow-orange-strong transform hover:scale-105 active:scale-95"
            >
              Add Expense 🎃
            </button>
            
            <button
              type="button"
              onClick={() => setShowClearModal(true)}
              className="bg-halloween-purple hover:bg-halloween-purple-dark text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Clear All 🧹
            </button>
          </div>
        </form>
      </div>

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
