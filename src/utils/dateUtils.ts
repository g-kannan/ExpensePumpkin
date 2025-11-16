import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  isSameMonth,
  addMonths,
  subMonths
} from 'date-fns';

/**
 * Format a date for display in various formats
 */
export function formatDateForDisplay(date: Date, formatString: string = 'MMMM yyyy'): string {
  return format(date, formatString);
}

/**
 * Format a date to ISO string (YYYY-MM-DD) for storage
 */
export function formatDateToISO(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Format a date to month key (YYYY-MM) for grouping
 */
export function formatDateToMonthKey(date: Date): string {
  return format(date, 'yyyy-MM');
}

/**
 * Parse a month key (YYYY-MM) to a Date object
 */
export function parseMonthKeyToDate(monthKey: string): Date {
  const [year, month] = monthKey.split('-');
  return new Date(parseInt(year), parseInt(month) - 1);
}

/**
 * Get all calendar days for a given month (including padding days from adjacent months)
 * Returns exactly 42 days (6 weeks) for consistent calendar grid
 */
export function getCalendarDaysForMonth(currentMonth: Date): Date[] {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  
  // Get the start of the week for the first day of the month
  const calendarStart = startOfWeek(monthStart);
  
  // Get the end of the week for the last day of the month
  const calendarEnd = endOfWeek(monthEnd);
  
  // Generate all days in the calendar view
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  
  // Ensure we always have 42 cells (6 weeks)
  const totalCells = 42;
  return days.slice(0, totalCells);
}

/**
 * Check if a date belongs to the current month
 */
export function isDateInMonth(date: Date, month: Date): boolean {
  return isSameMonth(date, month);
}

/**
 * Get the previous month
 */
export function getPreviousMonth(date: Date): Date {
  return subMonths(date, 1);
}

/**
 * Get the next month
 */
export function getNextMonth(date: Date): Date {
  return addMonths(date, 1);
}

/**
 * Get today's date with time set to midnight
 */
export function getToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

/**
 * Format a month key to a readable month name
 */
export function formatMonthKeyToName(monthKey: string): string {
  const date = parseMonthKeyToDate(monthKey);
  return formatDateForDisplay(date, 'MMMM yyyy');
}
