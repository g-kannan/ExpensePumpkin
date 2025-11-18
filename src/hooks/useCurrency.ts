import { useState, useEffect } from 'react';
import { DEFAULT_CURRENCY } from '../utils/currencyConfig';

const CURRENCY_STORAGE_KEY = 'expense-pumpkin-currency';

/**
 * Custom hook to manage currency selection with local storage persistence
 * @returns Current currency code and setter function
 */
export function useCurrency(): [string, (currency: string) => void] {
  const [currency, setCurrencyState] = useState<string>(() => {
    // Load saved currency on initialization
    try {
      const saved = localStorage.getItem(CURRENCY_STORAGE_KEY);
      return saved || DEFAULT_CURRENCY;
    } catch (error) {
      console.warn('Failed to load saved currency:', error);
      return DEFAULT_CURRENCY;
    }
  });

  // Persist currency changes to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
    } catch (error) {
      console.warn('Failed to save currency to local storage:', error);
    }
  }, [currency]);

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);
  };

  return [currency, setCurrency];
}
