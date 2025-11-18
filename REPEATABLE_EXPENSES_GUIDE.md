# ExpensePumpkin - Category & Repeatable Expenses Guide

## Overview

The ExpensePumpkin application now uses **predefined expense categories** with icons and includes a **Repeatable Expenses** feature that allows you to save frequently recurring expenses (like rent, subscriptions, utilities) and quickly add them each month.

## Expense Categories

### Available Categories

The application includes 18 predefined expense categories with icons:

- 🏠 **Rent** - Housing rent payments
- 💡 **Utilities** - Electricity, water, gas, internet
- 🛒 **Groceries** - Food and household items
- 🚗 **Transportation** - Gas, public transit, car maintenance
- 🏥 **Healthcare** - Medical expenses, prescriptions
- 🎬 **Entertainment** - Movies, concerts, streaming
- 🍽️ **Dining Out** - Restaurants, takeout
- 🛍️ **Shopping** - Clothing, electronics, general shopping
- 📱 **Subscriptions** - Netflix, Spotify, software subscriptions
- 🛡️ **Insurance** - Health, car, home insurance
- 📚 **Education** - Tuition, books, courses
- 💪 **Fitness** - Gym memberships, sports equipment
- ✈️ **Travel** - Flights, hotels, vacation expenses
- 🐾 **Pets** - Pet food, vet visits, supplies
- 🎁 **Gifts** - Birthday, holiday gifts
- 💰 **Savings** - Savings transfers, investments
- 💳 **Debt Payment** - Credit card, loan payments
- 📝 **Other** - Miscellaneous expenses

### Using Categories

**Steps:**
1. Select a category from the dropdown (defaults to "Other")
2. The category icon and label will be used as the expense description
3. Fill in the month, currency, and amount
4. Click "Add Expense 🎃"

**Benefits:**
- Consistent naming across all expenses
- Visual icons make expenses easy to identify
- Better organization and categorization
- Easier to track spending by category

## Repeatable Expenses Feature

### 1. Save Repeatable Expenses

When adding an expense, you can mark it as "repeatable" by checking the checkbox:

**Steps:**
1. Fill in the expense form (Month, Category, Currency, Amount)
2. Check the box: ☑️ "Save as repeatable expense (e.g., Rent, Subscriptions)"
3. Click "Add Expense 🎃"
4. The expense is added AND saved to your repeatable list

**What Gets Saved:**
- Category (e.g., "🏠 Rent", "📱 Subscriptions")
- Amount (e.g., "1200.00")
- Currency (e.g., "USD")

**Note:** The month is NOT saved because repeatable expenses are meant to be added to different months.

### 2. Quick Add from Repeatable List

Once you have saved repeatable expenses, a new button appears:

**"🔄 Quick Add Repeatable (X)"** - where X is the number of saved repeatable expenses

**Steps:**
1. Click the "🔄 Quick Add Repeatable" button
2. A list of your saved repeatable expenses appears
3. Each expense shows:
   - Category with icon (e.g., "🏠 Rent")
   - Amount with currency symbol
   - Currency code
4. Click "Use" on any expense to auto-fill the form
5. Select the month
6. Click "Add Expense 🎃"

### 3. Manage Repeatable Expenses

In the repeatable expenses list, you can:

- **Use**: Auto-fills the form with that expense's details
- **Remove**: Deletes the expense from your repeatable list
- **Close (✕)**: Closes the repeatable list without making changes

### 4. Persistence

Repeatable expenses are saved in browser local storage under the key `expense-pumpkin-repeatable`.

This means:
- ✅ They persist across page reloads
- ✅ They persist across browser sessions
- ✅ They're stored locally (not sent to any server)
- ❌ They don't sync across different browsers/devices

## Use Cases

### Example 1: Monthly Rent
1. Add your first rent payment:
   - Month: 2024-11
   - Category: 🏠 Rent
   - Currency: USD
   - Amount: 1200
   - ☑️ Save as repeatable
2. Next month, click "🔄 Quick Add Repeatable"
3. Click "Use" on "🏠 Rent"
4. Select Month: 2024-12
5. Click "Add Expense 🎃"

### Example 2: Multiple Subscriptions
Save all your subscriptions as repeatable:
- 📱 Subscriptions - $15.99 USD (Netflix)
- 📱 Subscriptions - $9.99 USD (Spotify)
- 💪 Fitness - $50.00 USD (Gym)

Each month, quickly add all three by:
1. Click "🔄 Quick Add Repeatable"
2. Click "Use" on Netflix subscription → Select month → Add
3. Click "🔄 Quick Add Repeatable"
4. Click "Use" on Spotify subscription → Select month → Add
5. Click "🔄 Quick Add Repeatable"
6. Click "Use" on Gym membership → Select month → Add

### Example 3: Utilities with Variable Amounts
For expenses that recur but vary in amount (like electricity):
1. Save "💡 Utilities" as repeatable with an approximate amount
2. When adding it each month, use the repeatable to auto-fill
3. Manually adjust the amount before submitting

## Technical Details

### Storage Format
```json
[
  {
    "category": "rent",
    "amount": "1200.00",
    "currency": "USD"
  },
  {
    "category": "subscriptions",
    "amount": "15.99",
    "currency": "USD"
  }
]
```

### Duplicate Prevention
The system prevents saving duplicate repeatable expenses. If you try to save an expense with the exact same category, amount, and currency as an existing repeatable, it won't create a duplicate.

### Data Management
- Repeatable expenses are stored separately from actual expenses
- Removing a repeatable expense does NOT remove any actual expenses you've already added
- Clearing all expenses does NOT clear your repeatable list

## Benefits

1. **Time Saving**: No need to re-type recurring expenses each month
2. **Accuracy**: Reduces typos and ensures consistent descriptions
3. **Convenience**: Perfect for fixed monthly expenses
4. **Flexibility**: Can still modify amounts before adding if needed

## Animated Bats Fix

The animated bats are now visible! Changes made:
- Increased z-index from -10 to 5 (brings them above background)
- Increased opacity from 0.6 to 0.7 (makes them more visible)
- Bats still have `pointer-events: none` so they don't interfere with clicks

You should now see 5 bats flying across the screen at different heights and speeds, creating a spooky Halloween atmosphere! 🦇

## Browser Compatibility

This feature works in all modern browsers that support:
- Local Storage API
- ES6 JavaScript
- CSS3

Tested on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Privacy & Security

- All data is stored locally in your browser
- No data is sent to external servers
- Clearing browser data will remove repeatable expenses
- Each browser/device has its own separate list
