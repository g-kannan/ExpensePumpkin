# Implementation Plan: ExpensePumpkin Transformation

- [x] 1. Update branding and application metadata





  - Update package.json name to "expense-pumpkin"
  - Update index.html title to "ExpensePumpkin"
  - Update README.md with new application name and purpose
  - Update App.tsx header title to "ExpensePumpkin"
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Refactor data model for month-level expenses






  - [x] 2.1 Update Expense interface in useExpenses.ts

    - Change `date: string` to `month: string` (YYYY-MM format)
    - Add `description: string` field
    - Keep existing `id`, `amount`, and `timestamp` fields
    - _Requirements: 2.1, 2.3_
  

  - [x] 2.2 Update useExpenses hook functions

    - Modify `addExpense` to accept month, description, and amount parameters
    - Update local storage key from "halloween-expenses" to "expense-pumpkin-data"
    - Replace `getExpensesByDate` with `getExpensesByMonth`
    - Update `getMonthlyTotals` to work with new month field
    - Update `getMostExpensiveMonth` logic for new data structure
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  

  - [x] 2.3 Create data migration utility

    - Implement function to detect old data format in local storage
    - Transform old day-level expenses to month-level expenses
    - Group expenses by month and aggregate amounts
    - Save migrated data to new storage key
    - _Requirements: 2.3_

- [x] 3. Update ExpenseForm component for monthly input





  - [x] 3.1 Modify form inputs


    - Replace date input with month input (`<input type="month">`)
    - Add description text input field
    - Update form state to handle month and description
    - _Requirements: 2.2, 4.3_
  

  - [x] 3.2 Update form validation


    - Add validation for month selection
    - Add validation for description field
    - Update error messages for new fields
    - _Requirements: 2.2_
  

  - [x] 3.3 Add Export CSV button


    - Add "Export to CSV" button to form
    - Wire button to export handler
    - Style button consistently with existing buttons
    - _Requirements: 4.1_

- [x] 4. Create CSV export functionality




  - [x] 4.1 Implement CSV generation utility


    - Create `exportService.ts` utility file
    - Implement `generateCSV` function to format expense data
    - Handle special character escaping in descriptions
    - Add CSV headers (Month, Year, Description, Amount)
    - _Requirements: 4.2, 4.3, 4.5, 4.6_
  
  - [x] 4.2 Implement CSV download functionality

    - Create `downloadCSV` function using Blob API
    - Generate filename with current date (expense-pumpkin-export-YYYY-MM-DD.csv)
    - Trigger browser download
    - _Requirements: 4.2, 4.4_
  
  - [x] 4.3 Integrate export into useExpenses hook


    - Add `exportToCSV` function to hook
    - Call export service functions
    - Handle empty expense list case
    - _Requirements: 4.1, 4.2_

- [x] 5. Create MonthlyView component to replace Calendar



  - [x] 5.1 Create MonthCard component


    - Display month name, total, and expense count
    - Implement expand/collapse functionality for expense list
    - Show individual expenses with descriptions and amounts
    - Add styling for current month highlight
    - Add ghost indicator for most expensive month
    - _Requirements: 3.1, 3.2, 3.4, 5.1, 5.2_
  -

  - [x] 5.2 Create MonthlyView component






    - Implement year navigation controls (previous/next/current)
    - Render 12 MonthCard components (Jan-Dec)
    - Calculate monthly summaries from expenses
    - Pass appropriate props to each MonthCard
    - Implement responsive grid layout (1-2-4 columns)
    - _Requirements: 3.1, 3.2, 3.3, 3.5, 5.3_
  
  - [x] 5.3 Replace Calendar component in App.tsx


    - Remove Calendar component import and usage
    - Import and use MonthlyView component
    - Update state management for year navigation instead of month
    - Remove GhostIndicator component (now integrated in MonthCard)
    - _Requirements: 3.1, 3.5_


- [x] 6. Update MonthStats component for monthly averages




  - Replace "Daily Average" stat with "Monthly Average"
  - Update calculation to compute average per month
  - Update stat card label and description text
  - _Requirements: 5.4_
-

- [x] 7. Update App.tsx integration




  - Update expense addition flow to use new parameters
  - Update most expensive month detection for new data structure
  - Remove day-level calendar logic
  - Ensure proper data flow between components
  - _Requirements: 2.1, 2.4, 3.1_


- [x] 8. Update styling and theme




  - Ensure MonthlyView matches Halloween theme
  - Update responsive breakpoints for month cards
  - Verify current month highlighting works correctly
  - Verify ghost indicator styling on most expensive month
  - Test mobile, tablet, and desktop layouts
  - _Requirements: 5.1, 5.2, 5.3_


- [x] 9. Add error handling and edge cases




  - Handle local storage unavailable scenario
  - Handle empty expense list in export
  - Add validation error displays
  - Handle data migration errors gracefully
  - _Requirements: 2.2, 4.1_


- [x] 10. Test core functionality




  - Test adding expenses with month, description, and amount
  - Test CSV export with various expense data
  - Test year navigation in MonthlyView
  - Test data persistence across page reloads
  - Test responsive design on different screen sizes
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_
