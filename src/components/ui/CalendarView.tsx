
import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  events?: {
    date: Date;
    title: string;
    status: 'available' | 'booked' | 'pending';
  }[];
  onDateSelect?: (date: Date) => void;
  className?: string;
}

const CalendarView = ({
  events = [],
  onDateSelect,
  className,
}: CalendarViewProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get day names
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Find events for a specific day
  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(day, event.date));
  };
  
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'booked':
        return 'bg-red-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-300';
    }
  };
  
  return (
    <div className={cn("bg-card rounded-lg shadow-sm p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <div className="flex space-x-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((day, i) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isCurrentDay = isToday(day);
          
          return (
            <div 
              key={i}
              className={cn(
                "min-h-[60px] p-1 border border-border rounded-md transition-colors",
                !isCurrentMonth && "opacity-40",
                isCurrentDay && "border-primary",
                dayEvents.length > 0 && "cursor-pointer hover:bg-secondary",
                dayEvents.length === 0 && "cursor-pointer hover:bg-secondary/50"
              )}
              onClick={() => onDateSelect && onDateSelect(day)}
            >
              <div className="text-xs font-medium mb-1">
                {format(day, 'd')}
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 2).map((event, index) => (
                  <div 
                    key={index}
                    className="flex items-center"
                  >
                    <span className={cn("w-1.5 h-1.5 rounded-full mr-1", getStatusColor(event.status))}></span>
                    <span className="text-xs truncate">{event.title}</span>
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
