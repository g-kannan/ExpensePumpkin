import type { Expense } from '../hooks/useExpenses';

/**
 * Escape special characters in CSV fields
 * Handles quotes, commas, and newlines according to CSV RFC 4180
 */
function escapeCSVField(field: string): string {
  // If field contains quotes, commas, or newlines, wrap in quotes and escape internal quotes
  if (field.includes('"') || field.includes(',') || field.includes('\n') || field.includes('\r')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

/**
 * Generate CSV content from expense data
 * Format: Month,Year,Description,Amount,Currency
 */
export function generateCSV(expenses: Expense[]): string {
  // CSV headers
  const headers = ['Month', 'Year', 'Description', 'Amount', 'Currency'];
  const csvRows: string[] = [headers.join(',')];

  // Add data rows
  expenses.forEach((expense) => {
    // Split month string (YYYY-MM) into year and month
    const [year, month] = expense.month.split('-');
    
    const row = [
      escapeCSVField(month),
      escapeCSVField(year),
      escapeCSVField(expense.description),
      expense.amount.toFixed(2), // Format amount with 2 decimal places
      escapeCSVField(expense.currency || 'USD'), // Include currency code
    ];
    
    csvRows.push(row.join(','));
  });

  return csvRows.join('\n');
}

/**
 * Download CSV content as a file
 * Uses Blob API to trigger browser download
 */
export function downloadCSV(csvContent: string, filename: string): void {
  try {
    // Check if Blob is supported
    if (typeof Blob === 'undefined') {
      throw new Error('Your browser does not support file downloads');
    }

    // Create a Blob with CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Check if URL.createObjectURL is supported
    if (typeof URL.createObjectURL === 'undefined') {
      throw new Error('Your browser does not support file downloads');
    }

    // Create a temporary download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading CSV:', error);
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Failed to download CSV file. Please try again.');
  }
}

/**
 * Export expenses to CSV file
 * Generates filename with current date and triggers download
 */
export function exportExpensesToCSV(expenses: Expense[]): void {
  if (expenses.length === 0) {
    throw new Error('No expenses to export');
  }

  // Generate CSV content
  const csvContent = generateCSV(expenses);
  
  // Generate filename with current date
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const filename = `expense-pumpkin-export-${year}-${month}-${day}.csv`;
  
  // Trigger download
  downloadCSV(csvContent, filename);
}
