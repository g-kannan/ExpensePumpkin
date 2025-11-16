# ExpensePumpkin - Manual Testing Guide

This document provides comprehensive manual testing procedures for the ExpensePumpkin application. Follow these test cases to verify all core functionality.

## Prerequisites

Before testing, ensure:
- The application is running (`npm run dev`)
- You have access to a modern browser (Chrome, Firefox, Safari, or Edge)
- Browser DevTools are available for inspecting local storage

## Test Suite

### 1. Adding Expenses with Month, Description, and Amount

#### Test Case 1.1: Add Valid Expense
**Steps:**
1. Open the application
2. Select a month from the month picker (e.g., "2024-11")
3. Enter a description (e.g., "Groceries")
4. Enter an amount (e.g., "150.50")
5. Click "Add Expense 🎃"

**Expected Results:**
- Form clears after submission
- Expense appears in the corresponding month card
- Month card shows updated total
- Month card shows expense count incremented
- No error messages displayed

#### Test Case 1.2: Form Validation - Missing Month
**Steps:**
1. Leave month field empty
2. Enter description "Test"
3. Enter amount "100"
4. Click "Add Expense 🎃"

**Expected Results:**
- Error message: "⚠️ Please select a month"
- Form does not submit
- No expense is added

#### Test Case 1.3: Form Validation - Missing Description
**Steps:**
1. Select a month
2. Leave description field empty
3. Enter amount "100"
4. Click "Add Expense 🎃"

**Expected Results:**
- Error message: "⚠️ Please enter a description"
- Form does not submit
- No expense is added

#### Test Case 1.4: Form Validation - Invalid Amount
**Steps:**
1. Select a month
2. Enter description "Test"
3. Enter amount "0" or negative number
4. Click "Add Expense 🎃"

**Expected Results:**
- Error message: "⚠️ Amount must be greater than zero"
- Form does not submit
- No expense is added

#### Test Case 1.5: Form Validation - Non-numeric Amount
**Steps:**
1. Select a month
2. Enter description "Test"
3. Enter amount "abc"
4. Click "Add Expense 🎃"

**Expected Results:**
- Error message: "⚠️ Please enter a valid number"
- Form does not submit
- No expense is added

#### Test Case 1.6: Add Multiple Expenses to Same Month
**Steps:**
1. Add expense: Month "2024-11", Description "Groceries", Amount "150"
2. Add expense: Month "2024-11", Description "Utilities", Amount "200"
3. Add expense: Month "2024-11", Description "Rent", Amount "1200"

**Expected Results:**
- All three expenses appear in November 2024 card
- Month card shows total: $1,550.00
- Month card shows "3 expenses"

#### Test Case 1.7: Add Expenses to Different Months
**Steps:**
1. Add expense: Month "2024-01", Description "January Expense", Amount "100"
2. Add expense: Month "2024-06", Description "June Expense", Amount "200"
3. Add expense: Month "2024-12", Description "December Expense", Amount "300"

**Expected Results:**
- January card shows $100.00, 1 expense
- June card shows $200.00, 1 expense
- December card shows $300.00, 1 expense
- Other months show "No expenses"

### 2. CSV Export Functionality

#### Test Case 2.1: Export with Multiple Expenses
**Steps:**
1. Add at least 3 expenses with different months and descriptions
2. Click "Export CSV 📊" button

**Expected Results:**
- CSV file downloads automatically
- Filename format: `expense-pumpkin-export-YYYY-MM-DD.csv`
- Success toast: "Expenses exported successfully! 📊"

#### Test Case 2.2: Verify CSV Content
**Steps:**
1. Add expenses:
   - Month "2024-11", Description "Groceries", Amount "150.50"
   - Month "2024-11", Description "Utilities", Amount "200.00"
   - Month "2024-12", Description "Rent", Amount "1200.00"
2. Export to CSV
3. Open the downloaded CSV file in a text editor or spreadsheet

**Expected Results:**
CSV should contain:
```
Month,Year,Description,Amount
11,2024,Groceries,150.50
11,2024,Utilities,200.00
12,2024,Rent,1200.00
```

#### Test Case 2.3: Export with Special Characters in Description
**Steps:**
1. Add expense with description containing special characters:
   - Description: `Groceries, "Fresh" produce & more`
   - Amount: "100"
2. Export to CSV
3. Open CSV file

**Expected Results:**
- Special characters are properly escaped
- CSV format remains valid
- Description field is wrapped in quotes if necessary

#### Test Case 2.4: Export with Empty Expense List
**Steps:**
1. Clear all expenses (or start with empty state)
2. Click "Export CSV 📊" button

**Expected Results:**
- Warning toast: "No expenses to export. Add some expenses first! 🎃"
- No file is downloaded

### 3. Year Navigation in MonthlyView

#### Test Case 3.1: Navigate to Previous Year
**Steps:**
1. Note the current year displayed
2. Click the left arrow button (Previous year)

**Expected Results:**
- Year decreases by 1
- All 12 month cards update to show the previous year
- Expenses for that year are displayed correctly

#### Test Case 3.2: Navigate to Next Year
**Steps:**
1. Note the current year displayed
2. Click the right arrow button (Next year)

**Expected Results:**
- Year increases by 1
- All 12 month cards update to show the next year
- Expenses for that year are displayed correctly

#### Test Case 3.3: Return to Current Year
**Steps:**
1. Navigate to a different year (e.g., 2023)
2. Click "Current Year" button

**Expected Results:**
- Year changes back to current year (2024)
- Current month is highlighted with orange border
- All month cards show current year data

#### Test Case 3.4: Navigate Multiple Years
**Steps:**
1. Click previous year button 3 times
2. Click next year button 2 times
3. Verify year changes correctly each time

**Expected Results:**
- Year updates correctly with each click
- No errors or glitches
- Month cards update appropriately

#### Test Case 3.5: Year Navigation with Expenses Across Years
**Steps:**
1. Add expense in "2023-12"
2. Add expense in "2024-01"
3. Add expense in "2024-12"
4. Navigate to 2023
5. Navigate to 2024

**Expected Results:**
- 2023 view shows December expense only
- 2024 view shows January and December expenses
- Totals are calculated correctly for each year

### 4. Data Persistence Across Page Reloads

#### Test Case 4.1: Basic Persistence
**Steps:**
1. Add 3-5 expenses with various months and descriptions
2. Note the total amounts and expense counts
3. Refresh the page (F5 or Ctrl+R)

**Expected Results:**
- All expenses are still present after reload
- Totals match pre-reload values
- Expense counts match pre-reload values
- No data loss

#### Test Case 4.2: Persistence After Browser Close
**Steps:**
1. Add several expenses
2. Close the browser completely
3. Reopen browser and navigate to the application

**Expected Results:**
- All expenses are restored
- Data persists across browser sessions

#### Test Case 4.3: Local Storage Verification
**Steps:**
1. Add expenses
2. Open Browser DevTools (F12)
3. Go to Application/Storage tab
4. Check Local Storage for the domain
5. Look for key: `expense-pumpkin-data`

**Expected Results:**
- `expense-pumpkin-data` key exists
- Value contains JSON array of expenses
- Each expense has: id, month, description, amount, timestamp

#### Test Case 4.4: Clear All and Persistence
**Steps:**
1. Add expenses
2. Click "Clear All 🧹"
3. Confirm in modal
4. Refresh page

**Expected Results:**
- After clear: all expenses removed
- After refresh: expenses remain cleared (empty state)
- Local storage is empty or contains empty array

### 5. Responsive Design on Different Screen Sizes

#### Test Case 5.1: Mobile View (320px - 640px)
**Steps:**
1. Open Browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device (e.g., iPhone SE, 375px width)
4. Test all functionality

**Expected Results:**
- Month cards display in 1 column
- Form inputs are full width and easily tappable
- Buttons stack vertically
- Text is readable without zooming
- Navigation controls are accessible
- No horizontal scrolling

#### Test Case 5.2: Tablet View (640px - 1024px)
**Steps:**
1. Set viewport to tablet size (e.g., iPad, 768px width)
2. Test all functionality

**Expected Results:**
- Month cards display in 2 columns
- Form layout adjusts appropriately
- Buttons may be in a row or stacked based on space
- All interactive elements are easily tappable
- Good use of screen space

#### Test Case 5.3: Desktop View (1024px+)
**Steps:**
1. Set viewport to desktop size (1920px width)
2. Test all functionality

**Expected Results:**
- Month cards display in 4 columns (on XL screens)
- Form is well-proportioned
- Buttons are in a row
- Maximum width container centers content
- Decorative elements (bats, spider web) visible

#### Test Case 5.4: Responsive Interactions
**Steps:**
1. Test on mobile: Expand a month card
2. Test on tablet: Expand a month card
3. Test on desktop: Expand a month card

**Expected Results:**
- Expand/collapse works smoothly on all sizes
- Expense list is scrollable if needed
- Touch interactions work on mobile/tablet
- Hover effects work on desktop

### 6. Month Card Functionality

#### Test Case 6.1: Current Month Highlighting
**Steps:**
1. Navigate to current year
2. Locate the current month card

**Expected Results:**
- Current month has orange border
- Current month has glow effect
- Month name is in orange color
- Other months have purple border

#### Test Case 6.2: Most Expensive Month Indicator
**Steps:**
1. Add expenses to multiple months with different totals
2. Identify the month with highest total
3. Look for ghost indicator

**Expected Results:**
- Ghost icon appears on top-right of most expensive month card
- Ghost has floating animation
- Only one ghost appears (on the highest total month)

#### Test Case 6.3: Expand/Collapse Month Card
**Steps:**
1. Add 2-3 expenses to a month
2. Click on the month card header
3. Click again to collapse

**Expected Results:**
- First click: card expands, shows expense list
- Down arrow rotates 180 degrees
- Second click: card collapses, hides expense list
- Arrow rotates back
- Smooth animation

#### Test Case 6.4: Empty Month Display
**Steps:**
1. View a month with no expenses

**Expected Results:**
- Shows "$0.00"
- Shows "No expenses" message
- No expand/collapse arrow
- Card is not clickable

### 7. Statistics Display

#### Test Case 7.1: Current Month Total
**Steps:**
1. Add expenses to current month
2. Check "Current Month" stat card

**Expected Results:**
- Shows correct total for current month
- Displays current month name (e.g., "November 2024")
- Updates immediately when expenses added

#### Test Case 7.2: Most Expensive Month Stat
**Steps:**
1. Add expenses to multiple months
2. Check "Most Expensive" stat card

**Expected Results:**
- Shows highest monthly total
- Displays the month name
- Updates when a new highest month is created

#### Test Case 7.3: Total Expense Count
**Steps:**
1. Add several expenses
2. Check "Total Expenses" stat card

**Expected Results:**
- Shows correct count of all expenses
- Updates immediately when expenses added
- Shows "expense" (singular) or "expenses" (plural) correctly

#### Test Case 7.4: Monthly Average
**Steps:**
1. Add expenses across multiple months
2. Check "Monthly Average" stat card

**Expected Results:**
- Shows average spending per month (only months with expenses)
- Calculation: Total amount ÷ Number of months with expenses
- Updates when expenses added

### 8. Data Migration (If Applicable)

#### Test Case 8.1: Migrate Old Data
**Steps:**
1. Open Browser DevTools → Application → Local Storage
2. Manually add old format data with key `halloween-expenses`:
```json
[
  {"id":"1","date":"2024-10-15","amount":100,"timestamp":1697385600000},
  {"id":"2","date":"2024-10-20","amount":150,"timestamp":1697817600000},
  {"id":"3","date":"2024-11-05","amount":200,"timestamp":1699142400000}
]
```
3. Refresh the page

**Expected Results:**
- Success toast: "Your old expenses have been migrated successfully! 🎃"
- Old expenses are grouped by month
- October shows $250 (100 + 150)
- November shows $200
- Old data key is removed from local storage

### 9. Error Handling

#### Test Case 9.1: Storage Unavailable
**Steps:**
1. Open Browser DevTools → Application → Local Storage
2. Disable local storage (browser settings or incognito with storage disabled)
3. Reload application

**Expected Results:**
- Warning banner appears at top
- Application still functions (in-memory only)
- Data won't persist across reloads

#### Test Case 9.2: Storage Quota Exceeded
**Steps:**
1. This is difficult to test manually
2. Check that error handling code exists in App.tsx

**Expected Results:**
- Code listens for 'storage-quota-exceeded' event
- Would show error toast if triggered

## Test Results Template

Use this template to record your test results:

```
Test Case: [Test Case Number and Name]
Date: [Date]
Tester: [Your Name]
Browser: [Browser Name and Version]
Result: [PASS/FAIL]
Notes: [Any observations or issues]
```

## Automated Testing Recommendations

For future automated testing, consider:
- **Vitest** for unit tests (hooks, utilities)
- **React Testing Library** for component tests
- **Playwright** or **Cypress** for E2E tests
- **Testing focus areas:**
  - Form validation logic
  - CSV generation and escaping
  - Data calculations (totals, averages)
  - Local storage operations
  - Migration logic

## Known Limitations

- No automated tests currently implemented
- Manual testing required for all scenarios
- Browser compatibility testing needed for older browsers
- Performance testing not included in this guide
