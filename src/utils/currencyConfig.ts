/**
 * Currency configuration and utilities for ExpensePumpkin
 */

export interface CurrencyOption {
  code: string;         // ISO 4217 code (e.g., "INR", "USD")
  symbol: string;       // Currency symbol (e.g., "₹", "$")
  name: string;         // Display name (e.g., "Indian Rupee")
}

export const SUPPORTED_CURRENCIES: CurrencyOption[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
];

export const DEFAULT_CURRENCY = 'INR';

/**
 * Get the currency symbol for a given currency code
 * @param currencyCode - ISO 4217 currency code
 * @returns Currency symbol or the code itself if not found
 */
export function getCurrencySymbol(currencyCode: string): string {
  const currency = SUPPORTED_CURRENCIES.find(c => c.code === currencyCode);
  return currency ? currency.symbol : currencyCode;
}
