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
    - Add `currency: string` field for ISO 4217 currency codes
    - Keep existing `id`, `amount`, and `timestamp` fields
    - _Requirements: 2.1, 2.3, 6.4_
  

  - [x] 2.2 Update useExpenses hook functions

    - Modify `addExpense` to accept month, description, amount, and currency parameters
    - Update local storage key from "halloween-expenses" to "expense-pumpkin-data"
    - Replace `getExpensesByDate` with `getExpensesByMonth`
    - Update `getMonthlyTotals` to work with new month field
    - Update `getMostExpensiveMonth` logic for new data structure
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 6.4_
  

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
    - Add currency dropdown selector with supported currencies (INR, USD, EUR, GBP, JPY, CAD)
    - Update form state to handle month, description, and currency
    - Display currency symbol next to amount input
    - _Requirements: 2.2, 4.3, 6.1, 6.2_
  

  - [x] 3.2 Update form validation


    - Add validation for month selection
    - Add validation for description field
    - Add validation for currency selection
    - Update error messages for new fields
    - _Requirements: 2.2, 6.1_
  

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
    - Add CSV headers (Month, Year, Description, Amount, Currency)
    - Include currency field in CSV export
    - _Requirements: 4.2, 4.3, 4.5, 4.6, 6.7_
  
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

- [x] 11. Implement currency support infrastructure




  - [x] 11.1 Create currency configuration



    - Create `currencyConfig.ts` utility file
    - Define `CurrencyOption` interface
    - Create `SUPPORTED_CURRENCIES` array with INR, USD, EUR, GBP, JPY, CAD
    - Set `DEFAULT_CURRENCY` to 'INR'
    - Implement `getCurrencySymbol` helper function
    - _Requirements: 6.2, 6.3_
  
  - [x] 11.2 Add currency persistence


    - Create hook or utility to manage currency selection in local storage
    - Store last selected currency with key `expense-pumpkin-currency`
    - Load saved currency on app initialization
    - Default to INR if no saved currency exists
    - _Requirements: 6.3, 6.6_
  
  - [x] 11.3 Update MonthCard to display currency symbols


    - Import `getCurrencySymbol` helper
    - Display currency symbol with each expense amount
    - Group expenses by currency if multiple currencies exist in a month
    - Update total display to show primary currency or mixed indicator
    - _Requirements: 6.5_

- [x] 12. Create animated bats component






  - [x] 12.1 Create AnimatedBats component

    - Create `AnimatedBats.tsx` component file
    - Design bat SVG silhouette (simple bat shape)
    - Render 5 bat elements with unique keys
    - Position bats with `position: fixed` and negative z-index
    - Apply CSS classes for animation
    - _Requirements: 7.1, 7.4_
  


  - [x] 12.2 Implement bat animations

    - Create CSS keyframe animations for horizontal flight
    - Add sine wave motion for natural flight pattern
    - Randomize animation duration (15-30s) for each bat
    - Stagger animation delays (0-10s) to avoid clustering
    - Use `transform` and `translateX/Y` for GPU acceleration
    - Set `animation-iteration-count: infinite`
    - _Requirements: 7.2, 7.5, 7.6_
  


  - [x] 12.3 Ensure bats don't interfere with UI

    - Set `pointer-events: none` on bat elements
    - Position bats in background layer (z-index: -10 or lower)
    - Test that bats don't block clicks or interactions
    - Add `@media (prefers-reduced-motion)` to disable animations
    - _Requirements: 7.3, 7.4_

- [x] 13. Create Halloween decorations component




  - [x] 13.1 Create HalloweenDecorations component

    - Create `HalloweenDecorations.tsx` component file
    - Design spider web SVG for corners
    - Create small particle elements (ghosts, sparkles)
    - Position decorations with `position: fixed` or `absolute`
    - Set background layer z-index
    - _Requirements: 8.1, 8.2, 8.4_
  

  - [x] 13.2 Implement spider web decorations
    - Add spider web SVGs to top-left and top-right corners
    - Style with subtle opacity (0.2-0.3)
    - Mirror right web with `transform: scaleX(-1)`
    - Add small spider elements on webs
    - Make responsive (smaller on mobile)
    - _Requirements: 8.1, 8.4_

  
  - [x] 13.3 Add floating particle effects
    - Create 3-5 small floating particle elements
    - Implement CSS keyframe for upward float with drift
    - Add fade in/out during animation
    - Stagger animation start times
    - Use `transform` and `opacity` for performance
    - _Requirements: 8.3, 8.6_

  
  - [x] 13.4 Add additional themed elements

    - Add small pumpkin icons in margins or corners
    - Include ghost or other Halloween icons
    - Ensure all elements use Halloween color palette
    - Position elements to not distract from content
    - Test visual hierarchy and readability
    - _Requirements: 8.2, 8.5_


- [x] 14. Integrate decorative components into App




  - Integrate AnimatedBats component into App.tsx
  - Integrate HalloweenDecorations component into App.tsx
  - Position components in layout structure
  - Verify z-index layering is correct
  - Test that decorations don't interfere with functionality
  - _Requirements: 7.1, 7.3, 7.4, 8.1, 8.5_

-

- [x] 15. Test currency and decoration features



  - Test currency dropdown selection and persistence
  - Verify currency symbols display correctly for all currencies
  - Test expenses with different currencies in same month
  - Test CSV export includes currency field
  - Verify bat animations are smooth across browsers
  - Test decorations on mobile, tablet, and desktop
  - Verify `prefers-reduced-motion` disables animations
  - Test that decorations don't block interactions
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_
