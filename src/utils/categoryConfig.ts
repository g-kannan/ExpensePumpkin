/**
 * Expense category configuration for ExpensePumpkin
 */

export interface CategoryOption {
  value: string;
  label: string;
  icon: string;
}

export const EXPENSE_CATEGORIES: CategoryOption[] = [
  { value: 'rent', label: 'Rent', icon: '🏠' },
  { value: 'utilities', label: 'Utilities', icon: '💡' },
  { value: 'groceries', label: 'Groceries', icon: '🛒' },
  { value: 'transportation', label: 'Transportation', icon: '🚗' },
  { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
  { value: 'entertainment', label: 'Entertainment', icon: '🎬' },
  { value: 'dining', label: 'Dining Out', icon: '🍽️' },
  { value: 'shopping', label: 'Shopping', icon: '🛍️' },
  { value: 'subscriptions', label: 'Subscriptions', icon: '📱' },
  { value: 'insurance', label: 'Insurance', icon: '🛡️' },
  { value: 'education', label: 'Education', icon: '📚' },
  { value: 'fitness', label: 'Fitness', icon: '💪' },
  { value: 'travel', label: 'Travel', icon: '✈️' },
  { value: 'pets', label: 'Pets', icon: '🐾' },
  { value: 'gifts', label: 'Gifts', icon: '🎁' },
  { value: 'savings', label: 'Savings', icon: '💰' },
  { value: 'debt', label: 'Debt Payment', icon: '💳' },
  { value: 'other', label: 'Other', icon: '📝' },
];

export const DEFAULT_CATEGORY = 'other';

/**
 * Get category label and icon for a given category value
 */
export function getCategoryDisplay(categoryValue: string): { label: string; icon: string } {
  const category = EXPENSE_CATEGORIES.find(c => c.value === categoryValue);
  return category 
    ? { label: category.label, icon: category.icon }
    : { label: 'Other', icon: '📝' };
}
