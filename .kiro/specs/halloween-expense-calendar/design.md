# Design Document

## Overview

The Halloween Expense Calendar is a single-page frontend application built with HTML, CSS, and JavaScript. It provides an interactive calendar interface where users can input expenses and visualize their spending patterns with a festive Halloween theme. The app uses browser local storage for data persistence and requires no backend infrastructure.

## Architecture

### Technology Stack
- **React 18**: Component-based UI framework with hooks for state management
- **Tailwind CSS**: Utility-first CSS framework for rapid Halloween-themed styling
- **Vite**: Fast build tool and development server
- **Local Storage API**: Client-side data persistence
- **date-fns**: Date manipulation and formatting library

### Application Structure
```
halloween-expense-calendar/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ExpenseForm.jsx       # Input form component
│   │   ├── Calendar.jsx          # Main calendar view
│   │   ├── CalendarDay.jsx       # Individual day cell
│   │   ├── MonthNavigation.jsx   # Month navigation controls
│   │   ├── GhostIndicator.jsx    # Animated ghost for most expensive month
│   │   └── MonthStats.jsx        # Statistics display
│   ├── hooks/
│   │   ├── useExpenses.js        # Custom hook for expense management
│   │   └── useLocalStorage.js    # Custom hook for local storage
│   ├── utils/
│   │   ├── dateUtils.js          # Date calculation helpers
│   │   └── expenseUtils.js       # Expense calculation helpers
│   ├── App.jsx                   # Root component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Tailwind imports + custom Halloween styles
├── tailwind.config.js            # Tailwind configuration with Halloween theme
├── package.json
└── vite.config.js
```

## Components and Interfaces

### 1. ExpenseForm Component
**Purpose**: Capture user expense data

**Props**: 
- `onAddExpense`: Function to handle expense submission

**State**:
- `date`: Selected date (string)
- `amount`: Expense amount (string)
- `errors`: Validation error messages (object)

**Structure**:
- Date input with Tailwind-styled picker
- Amount input with currency formatting
- Submit button with Halloween hover effects
- Clear all data button with confirmation modal
- Error message display with Halloween styling

**Behavior**:
- Validates input before submission
- Shows inline error messages with spooky animations
- Clears form after successful submission
- Emits expense data to parent component

### 2. Calendar Component
**Purpose**: Main calendar container and orchestrator

**Props**:
- `expenses`: Array of expense objects
- `currentMonth`: Date object for displayed month
- `onMonthChange`: Function to handle month navigation

**State**:
- `selectedDay`: Currently selected day (for details view)

**Structure**:
- MonthNavigation component
- Calendar grid (7x6 Tailwind grid)
- CalendarDay components for each cell
- GhostIndicator component (conditionally rendered)
- MonthStats component

**Behavior**:
- Calculates calendar layout for current month
- Distributes expenses to appropriate day cells
- Identifies and highlights most expensive month
- Handles day selection for detail view

### 3. CalendarDay Component
**Purpose**: Individual day cell in calendar

**Props**:
- `day`: Day number (number or null for empty cells)
- `date`: Full date object
- `expenses`: Array of expenses for this day
- `totalAmount`: Sum of expenses for this day
- `isCurrentMonth`: Boolean for styling
- `onClick`: Handler for day selection

**Structure**:
- Day number display
- Expense total with pumpkin icon
- Visual intensity indicator (background gradient)
- Hover effects with Halloween animations

**Behavior**:
- Displays day number and expense total
- Applies visual intensity based on expense amount
- Shows hover effects with spooky transitions
- Emits click events for day selection

### 4. MonthNavigation Component
**Purpose**: Navigate between months

**Props**:
- `currentMonth`: Date object
- `onPrevious`: Handler for previous month
- `onNext`: Handler for next month

**Structure**:
- Month/Year display with creepy font
- Previous/Next buttons styled as bat wings or arrows
- Today button to return to current month

**Behavior**:
- Displays current month and year
- Handles navigation button clicks
- Animates transitions between months

### 5. GhostIndicator Component
**Purpose**: Animated ghost for most expensive month

**Props**:
- `isVisible`: Boolean to show/hide
- `monthTotal`: Total amount for the month
- `position`: Positioning data (optional)

**Structure**:
- SVG or CSS-drawn ghost shape
- Floating animation container
- Tooltip with expense total
- Glowing effect overlay

**Behavior**:
- Floats with CSS animation (translateY)
- Fades in/out based on visibility
- Shows tooltip on hover
- Pulses glow effect

### 6. MonthStats Component
**Purpose**: Display summary statistics

**Props**:
- `currentMonthTotal`: Total for displayed month
- `mostExpensiveMonth`: Object with month and total
- `expenses`: All expenses for calculations

**Structure**:
- Current month total card
- Most expensive month card with ghost icon
- Total expenses count
- Average daily spending

**Behavior**:
- Recalculates on expense changes
- Animates number changes
- Highlights most expensive month

## Data Models

### Expense Object
```javascript
{
  id: string,           // Unique identifier (timestamp-based)
  date: string,         // ISO date format (YYYY-MM-DD)
  amount: number,       // Expense amount (positive decimal)
  timestamp: number     // Creation timestamp for sorting
}
```

### Storage Structure
```javascript
{
  expenses: [Expense]   // Array of expense objects
}
```

### Derived Data Structures
```javascript
// Monthly totals map
{
  "2025-11": 1250.50,
  "2025-10": 2100.75,
  // ...
}

// Daily totals map
{
  "2025-11-15": 45.99,
  "2025-11-16": 120.00,
  // ...
}
```

## User Interface Design

### Halloween Theme Specifications

**Tailwind Configuration**:
```javascript
// Custom Halloween color palette in tailwind.config.js
colors: {
  halloween: {
    orange: '#FF6B35',
    'orange-bright': '#F7931E',
    purple: '#6B2D5C',
    'purple-dark': '#4A1942',
    charcoal: '#1A1A1D',
    'gray-dark': '#2E2E32',
    'gray-medium': '#3E3E42',
    ghost: '#E8E8E8',
    'text-light': '#F5F5F5',
  }
}
```

**Typography**:
- Headers: "Creepster" from Google Fonts (imported in index.css)
- Body: "Inter" or "Poppins" for readability
- Tailwind classes: `font-creepy` for headers, `font-sans` for body

**Visual Elements with Tailwind**:
- Pumpkin icons: SVG icons or emoji (🎃) with `text-halloween-orange`
- Bat decorations: Absolute positioned SVG with `animate-pulse`
- Spider web backgrounds: Custom CSS with Tailwind's `@layer` directive
- Glowing effects: `shadow-[0_0_15px_rgba(255,107,53,0.5)]` for orange glow
- Gradient overlays: `bg-gradient-to-b from-halloween-charcoal to-halloween-purple`
- Hover effects: `hover:scale-105 transition-transform duration-300`

**Component Styling Patterns**:
- Cards: `bg-halloween-gray-dark rounded-lg shadow-xl border border-halloween-purple/30`
- Buttons: `bg-halloween-orange hover:bg-halloween-orange-bright text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,107,53,0.6)]`
- Inputs: `bg-halloween-gray-medium border-2 border-halloween-purple focus:border-halloween-orange text-halloween-text-light rounded-lg px-4 py-2`
- Calendar grid: `grid grid-cols-7 gap-2 p-4`

### Ghost Indicator Design
- SVG ghost with Tailwind animations
- `animate-bounce` or custom `animate-float` keyframe
- Positioned with `absolute top-0 right-0` or centered over month header
- Glow effect: `drop-shadow-[0_0_10px_rgba(232,232,232,0.8)]`
- Tooltip: Tailwind's group hover pattern with `group-hover:opacity-100`
- Opacity transitions: `transition-opacity duration-500`

## Core Functionality

### Custom Hooks

#### useExpenses Hook
**Purpose**: Manage expense state and operations

**Returns**:
- `expenses`: Array of all expenses
- `addExpense`: Function to add new expense
- `clearExpenses`: Function to clear all expenses
- `getExpensesByDate`: Function to get expenses for specific date
- `getMonthlyTotals`: Function to calculate totals by month
- `getMostExpensiveMonth`: Function to identify highest spending month

**Implementation**:
- Uses `useState` for expense array
- Uses `useEffect` to sync with local storage
- Provides memoized calculation functions with `useMemo`

#### useLocalStorage Hook
**Purpose**: Sync state with browser local storage

**Parameters**:
- `key`: Storage key string
- `initialValue`: Default value if no stored data

**Returns**:
- `[storedValue, setValue]`: Similar to useState API

**Implementation**:
- Reads from local storage on mount
- Writes to local storage on value changes
- Handles JSON serialization/deserialization
- Catches and handles storage errors

### Expense Management Flow
1. **Add Expense**: 
   - User submits form → ExpenseForm validates
   - Generate unique ID (timestamp + random)
   - Call `addExpense` from useExpenses hook
   - Hook updates state and local storage
   - React re-renders Calendar with new data

2. **Load Expenses**: 
   - useLocalStorage hook reads on mount
   - Parses JSON and initializes state
   - Calendar renders with loaded data

3. **Clear Data**: 
   - User clicks clear button → Show confirmation modal
   - On confirm → Call `clearExpenses`
   - Hook clears state and local storage
   - Calendar re-renders empty state

### Calendar Rendering Logic
1. Use date-fns to calculate first day of month and total days
2. Generate array of 42 cells (6 weeks × 7 days) for consistent grid
3. Map expenses to dates using `getExpensesByDate`
4. Calculate daily totals for each day
5. Pass data to CalendarDay components
6. Apply Tailwind classes for visual intensity based on amounts

### Most Expensive Month Detection
1. `getMonthlyTotals` groups expenses by YYYY-MM format
2. Reduces to sum totals for each month
3. `getMostExpensiveMonth` finds maximum value
4. Handles ties by selecting most recent month (sort by date descending)
5. Calendar component checks if current month matches most expensive
6. Conditionally renders GhostIndicator with `isVisible` prop
7. Re-calculates on expense changes via React's dependency arrays

### Navigation Flow
1. App component maintains `currentMonth` state (Date object)
2. MonthNavigation emits prev/next events
3. App updates `currentMonth` using date-fns `addMonths`
4. Calendar receives new `currentMonth` prop
5. Calendar re-calculates days for new month
6. Ghost indicator visibility updates based on new month context

## Error Handling

### Input Validation Errors
- Empty amount: "Please enter an expense amount"
- Negative/zero amount: "Amount must be greater than zero"
- Invalid date: "Please select a valid date"
- Non-numeric amount: "Please enter a valid number"

### Storage Errors
- Local storage unavailable: Display warning, continue with in-memory storage
- Corrupted data: Clear storage and start fresh with error notification
- Storage quota exceeded: Notify user to clear old data

### Display Errors
- No expenses: Show friendly message with Halloween theme
- Invalid date calculations: Fallback to current month

## Testing Strategy

### Manual Testing Checklist
1. **Input Validation**
   - Test valid expense entries
   - Test invalid amounts (negative, zero, non-numeric)
   - Test invalid dates
   - Test empty submissions

2. **Calendar Display**
   - Verify correct month rendering
   - Check day alignment (first day of month)
   - Verify expense totals display correctly
   - Test month navigation (forward/backward)

3. **Ghost Indicator**
   - Add expenses to multiple months
   - Verify ghost appears on most expensive month
   - Test tie-breaking (equal totals)
   - Verify ghost updates when data changes

4. **Data Persistence**
   - Add expenses and reload page
   - Verify data persists
   - Test clear data functionality
   - Test with browser storage disabled

5. **Theme and Responsiveness**
   - Verify Halloween styling applied correctly
   - Test on different screen sizes
   - Check animations and transitions
   - Verify readability and contrast

### Browser Compatibility
- Test on Chrome, Firefox, Safari, Edge
- Verify local storage API support
- Test CSS Grid/Flexbox rendering
- Validate HTML5 input types

## Performance Considerations

### React Optimizations
- Use `React.memo` for CalendarDay components to prevent unnecessary re-renders
- Memoize expensive calculations with `useMemo` (monthly totals, most expensive month)
- Use `useCallback` for event handlers passed to child components
- Keep component tree shallow to minimize reconciliation time

### Rendering Optimizations
- Only render current month (42 day cells maximum)
- Virtualization not needed due to small dataset
- Use CSS transforms for animations (GPU-accelerated)
- Lazy load Google Fonts with `font-display: swap`

### Data Management
- Keep expense array sorted by date for efficient queries
- Use Map objects for O(1) lookups when grouping by date/month
- Debounce local storage writes if adding multiple expenses rapidly
- Limit stored expenses to reasonable number (e.g., 1000 entries)

### Tailwind Optimizations
- Use JIT mode for minimal CSS bundle size
- Purge unused styles in production build
- Use Tailwind's built-in animations instead of custom CSS when possible

## Future Enhancements (Out of Scope)

- Export/import expense data (CSV, JSON)
- Expense categories with different Halloween icons
- Budget tracking with warning indicators
- Charts and graphs with Halloween styling
- Multiple currency support
- Recurring expense templates
