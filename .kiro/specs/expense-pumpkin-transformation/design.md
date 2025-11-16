# Design Document: ExpensePumpkin Transformation

## Overview

This design document outlines the transformation of the Halloween Expense Calendar into ExpensePumpkin, a monthly expense planning application. The transformation involves:

1. Rebranding the application to "ExpensePumpkin"
2. Shifting from day-level to month-level expense tracking
3. Replacing the daily calendar view with a monthly planning interface
4. Adding CSV export functionality

The application will maintain its React + TypeScript + Vite architecture while refactoring the data model and UI components to support monthly planning rather than daily tracking.

## Architecture

### Current Architecture
- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 with custom Halloween theme
- **State Management**: React hooks with local storage persistence
- **Date Handling**: date-fns library

### Architectural Changes
The core architecture remains unchanged, but the following modifications will be made:

1. **Data Model**: Refactor `Expense` interface to store month/year instead of specific dates
2. **UI Components**: Replace calendar grid with monthly list/card view
3. **Export Module**: Add new CSV generation and download functionality
4. **Storage Key**: Update local storage key from `halloween-expenses` to `expense-pumpkin-data`

## Components and Interfaces

### Data Models

#### Updated Expense Interface
```typescript
export interface Expense {
  id: string;
  month: string;        // Format: "YYYY-MM"
  description: string;  // New field for expense description
  amount: number;
  timestamp: number;
}
```

**Changes from current model:**
- Replace `date: string` (YYYY-MM-DD) with `month: string` (YYYY-MM)
- Add `description: string` field for expense details
- Keep `id`, `amount`, and `timestamp` unchanged

#### Monthly Summary Interface
```typescript
interface MonthlySummary {
  month: string;        // Format: "YYYY-MM"
  expenses: Expense[];
  total: number;
  count: number;
}
```

### Component Architecture

#### 1. ExpenseForm Component (Modified)
**Current**: Accepts date picker and amount input
**New**: Accepts month/year picker, description input, and amount input

**Props:**
```typescript
interface ExpenseFormProps {
  onAddExpense: (month: string, description: string, amount: number) => void;
  onClearAll: () => void;
  onExportCSV: () => void;  // New prop
}
```

**UI Changes:**
- Replace date input (`<input type="date">`) with month input (`<input type="month">`)
- Add description text input field
- Add "Export to CSV" button alongside "Clear All" button
- Update form validation to check for month and description

#### 2. MonthlyView Component (New - Replaces Calendar)
**Purpose**: Display expenses organized by month in a list or card layout

**Props:**
```typescript
interface MonthlyViewProps {
  expenses: Expense[];
  currentYear: number;
  onYearChange: (year: number) => void;
}
```

**Structure:**
- Year navigation controls (previous/next year, current year button)
- Grid or list of 12 month cards (Jan-Dec)
- Each month card shows:
  - Month name
  - Total expenses for that month
  - Count of expenses
  - Visual indicator if it's the current month
  - Visual indicator if it's the most expensive month (ghost icon)
  - Expandable section to show individual expense items

#### 3. MonthCard Component (New)
**Purpose**: Display summary and details for a single month

**Props:**
```typescript
interface MonthCardProps {
  month: string;           // Format: "YYYY-MM"
  expenses: Expense[];
  isCurrentMonth: boolean;
  isMostExpensive: boolean;
  onExpenseClick?: (expense: Expense) => void;
}
```

**Features:**
- Collapsible/expandable to show expense list
- Displays month name, total, and count
- Shows ghost indicator if most expensive month
- Highlights current month with special styling
- Lists individual expenses with descriptions and amounts

#### 4. MonthStats Component (Modified)
**Current**: Shows current month total, most expensive month, total count, daily average
**New**: Shows current month total, most expensive month, total count, monthly average

**Changes:**
- Replace "Daily Average" with "Monthly Average"
- Update calculation logic to compute average per month instead of per day
- Keep other stats unchanged

#### 5. ExportService (New Utility)
**Purpose**: Generate and download CSV files

**Functions:**
```typescript
export function generateCSV(expenses: Expense[]): string;
export function downloadCSV(csvContent: string, filename: string): void;
export function exportExpensesToCSV(expenses: Expense[]): void;
```

**CSV Format:**
```
Month,Year,Description,Amount
2024,01,Groceries,150.00
2024,01,Utilities,200.00
2024,02,Rent,1200.00
```

### Hook Modifications

#### useExpenses Hook (Modified)
**Current functionality:**
- Add expense with date
- Get expenses by date
- Calculate monthly totals
- Find most expensive month

**New functionality:**
```typescript
export function useExpenses() {
  const [expenses, setExpenses, storageAvailable] = useLocalStorage<Expense[]>(
    'expense-pumpkin-data',  // Updated key
    []
  );

  const addExpense = (month: string, description: string, amount: number) => {
    // Implementation
  };

  const getExpensesByMonth = (month: string): Expense[] => {
    // Implementation
  };

  const getMonthlySummaries = (): MonthlySummary[] => {
    // Implementation
  };

  const getMostExpensiveMonth = (): MonthlySummary | null => {
    // Implementation
  };

  const exportToCSV = () => {
    // Implementation using ExportService
  };

  return {
    expenses,
    addExpense,
    clearExpenses,
    getExpensesByMonth,
    getMonthlySummaries,
    getMostExpensiveMonth,
    exportToCSV,
    storageAvailable,
  };
}
```

## User Interface Design

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│  🎃 ExpensePumpkin 🎃                               │
├─────────────────────────────────────────────────────┤
│  Add Your Monthly Expenses 👻                       │
│  ┌─────────────────────────────────────────────┐   │
│  │ Month: [Month Picker]                       │   │
│  │ Description: [Text Input]                   │   │
│  │ Amount: [Number Input]                      │   │
│  │ [Add Expense] [Export CSV] [Clear All]      │   │
│  └─────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────┤
│  Year Navigation: [< 2024 >] [Current Year]        │
├─────────────────────────────────────────────────────┤
│  Monthly View (Grid of 12 months)                  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐             │
│  │ Jan  │ │ Feb  │ │ Mar  │ │ Apr  │             │
│  │$1,200│ │ $800 │ │$1,500│ │ $950 │             │
│  │ 3 exp│ │ 2 exp│ │ 4 exp│ │ 2 exp│             │
│  └──────┘ └──────┘ └──────┘ └──────┘             │
│  ... (8 more months)                               │
├─────────────────────────────────────────────────────┤
│  Statistics Cards                                   │
│  [Current Month] [Most Expensive] [Total] [Avg]    │
└─────────────────────────────────────────────────────┘
```

### Visual Design Updates

1. **Branding**
   - Update title to "ExpensePumpkin" with pumpkin emoji
   - Maintain Halloween color scheme (orange, purple, charcoal)
   - Keep decorative elements (bats, spider webs)

2. **Monthly View Cards**
   - Card-based design with rounded corners
   - Hover effects for interactivity
   - Expandable sections for expense details
   - Current month highlighted with orange border
   - Most expensive month shows ghost indicator

3. **Responsive Design**
   - Mobile: 1-2 month cards per row
   - Tablet: 3 month cards per row
   - Desktop: 4 month cards per row

## Data Flow

### Adding an Expense
1. User selects month/year from month picker
2. User enters description and amount
3. Form validates inputs (month, description, amount > 0)
4. `addExpense` called with month, description, amount
5. New expense created with unique ID and timestamp
6. Expense added to state and persisted to local storage
7. UI updates to show new expense in appropriate month card

### Exporting to CSV
1. User clicks "Export to CSV" button
2. `exportToCSV` function called
3. All expenses retrieved from state
4. CSV content generated with headers and data rows
5. Special characters in descriptions escaped
6. Filename generated with current date: `expense-pumpkin-export-YYYY-MM-DD.csv`
7. Browser download triggered with CSV file

### Viewing Monthly Data
1. Application loads with current year displayed
2. `getMonthlySummaries` calculates totals for each month
3. 12 month cards rendered (Jan-Dec)
4. Each card shows summary data
5. User can expand cards to see individual expenses
6. User can navigate to previous/next year

## Error Handling

### Form Validation Errors
- **Missing month**: Display "Please select a month" error
- **Missing description**: Display "Please enter a description" error
- **Invalid amount**: Display "Please enter a valid amount greater than zero" error
- **Validation errors**: Show inline error messages with orange color and warning icon

### Storage Errors
- **Local storage unavailable**: Display warning banner at top of page
- **Storage quota exceeded**: Show error message and suggest exporting data
- **Data corruption**: Attempt to recover valid expenses, log errors to console

### Export Errors
- **No expenses to export**: Show informational message "No expenses to export"
- **Browser doesn't support download**: Show error message with fallback instructions
- **CSV generation fails**: Log error and show user-friendly message

## Testing Strategy

### Unit Testing Focus
- **Data Model**: Test expense creation, validation, and month formatting
- **CSV Generation**: Test CSV formatting, special character escaping, header generation
- **Calculations**: Test monthly totals, most expensive month logic, averages

### Component Testing Focus
- **ExpenseForm**: Test form submission, validation, error display
- **MonthCard**: Test expand/collapse, data display, styling conditions
- **MonthlyView**: Test year navigation, month card rendering, empty states

### Integration Testing Focus
- **Add and Display**: Add expense and verify it appears in correct month
- **Export Flow**: Add expenses, export CSV, verify file content
- **Clear All**: Add expenses, clear all, verify empty state
- **Year Navigation**: Navigate years and verify correct data displayed

### Manual Testing Checklist
- Verify responsive design on mobile, tablet, desktop
- Test with no expenses (empty state)
- Test with expenses across multiple months and years
- Test CSV export with special characters in descriptions
- Test local storage persistence across page reloads
- Verify ghost indicator appears on most expensive month
- Test current month highlighting

## Migration Strategy

### Data Migration
Since the data model is changing from day-level to month-level, existing user data needs to be migrated:

1. **Detection**: Check for old data format in local storage (`halloween-expenses` key)
2. **Transformation**: 
   - Group expenses by month (YYYY-MM)
   - Combine expenses from same month
   - Generate generic descriptions like "Expenses for [Month]"
   - Sum amounts for each month
3. **Storage**: Save transformed data to new key (`expense-pumpkin-data`)
4. **Cleanup**: Optionally remove old data key
5. **User Notification**: Show one-time message about data migration

### Migration Function
```typescript
function migrateOldExpenses(): void {
  const oldData = localStorage.getItem('halloween-expenses');
  if (!oldData) return;
  
  const oldExpenses: OldExpense[] = JSON.parse(oldData);
  const monthlyMap = new Map<string, number>();
  
  // Group by month and sum amounts
  oldExpenses.forEach(expense => {
    const month = expense.date.substring(0, 7); // Extract YYYY-MM
    const current = monthlyMap.get(month) || 0;
    monthlyMap.set(month, current + expense.amount);
  });
  
  // Create new expense entries
  const newExpenses: Expense[] = Array.from(monthlyMap.entries()).map(
    ([month, amount]) => ({
      id: `migrated-${Date.now()}-${Math.random()}`,
      month,
      description: 'Migrated expenses',
      amount,
      timestamp: Date.now(),
    })
  );
  
  localStorage.setItem('expense-pumpkin-data', JSON.stringify(newExpenses));
  localStorage.removeItem('halloween-expenses'); // Optional cleanup
}
```

## Performance Considerations

1. **Rendering Optimization**: Use React.memo for MonthCard components to prevent unnecessary re-renders
2. **Data Calculations**: Use useMemo for expensive calculations (monthly totals, most expensive month)
3. **CSV Generation**: Generate CSV on-demand rather than keeping it in state
4. **Local Storage**: Debounce writes to local storage if needed for performance

## Accessibility

1. **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
2. **ARIA Labels**: Add appropriate ARIA labels to month picker, buttons, and cards
3. **Focus Management**: Maintain logical focus order through form and month cards
4. **Screen Reader Support**: Ensure expense data is announced properly
5. **Color Contrast**: Verify text meets WCAG AA standards against backgrounds

## Browser Compatibility

- **Target Browsers**: Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- **Month Input**: `<input type="month">` supported in all modern browsers
- **CSV Download**: Use Blob API with fallback for older browsers
- **Local Storage**: Check for availability and handle gracefully if unavailable
