import { useMemo } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth } from 'date-fns';
import type { Expense } from '../hooks/useExpenses';
import { CalendarDay } from './CalendarDay';
import { MonthNavigation } from './MonthNavigation';

interface CalendarProps {
  expenses: Expense[];
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}

interface CalendarDayData {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  expenses: Expense[];
  totalAmount: number;
}

export function Calendar({ expenses, currentMonth, onMonthChange }: CalendarProps) {
  // Calculate calendar days for the current month
  const calendarDays = useMemo((): CalendarDayData[] => {
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
    const daysToShow = days.slice(0, totalCells);
    
    // Map each day to its data
    return daysToShow.map(date => {
      const dateString = format(date, 'yyyy-MM-dd');
      const dayExpenses = expenses.filter(expense => expense.date === dateString);
      const totalAmount = dayExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      
      return {
        date,
        day: date.getDate(),
        isCurrentMonth: isSameMonth(date, currentMonth),
        expenses: dayExpenses,
        totalAmount,
      };
    });
  }, [currentMonth, expenses]);

  // Navigation handlers
  const handlePrevious = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    onMonthChange(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    onMonthChange(newDate);
  };

  const handleToday = () => {
    onMonthChange(new Date());
  };

  return (
    <div className="bg-halloween-gray-dark rounded-lg shadow-xl border border-halloween-purple/30 p-3 sm:p-4 md:p-6 responsive-padding fade-in-animation">
      {/* Month Navigation */}
      <MonthNavigation
        currentMonth={currentMonth}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
      />

      {/* Day of Week Headers */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="text-center text-xs sm:text-sm font-bold text-halloween-orange py-1 sm:py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {calendarDays.map((dayData, index) => (
          <CalendarDay
            key={index}
            day={dayData.day}
            date={dayData.date}
            expenses={dayData.expenses}
            totalAmount={dayData.totalAmount}
            isCurrentMonth={dayData.isCurrentMonth}
            onClick={() => {
              if (dayData.expenses.length > 0) {
                console.log('Day clicked:', dayData.date, dayData.expenses);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
