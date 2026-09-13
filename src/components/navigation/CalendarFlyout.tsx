import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useSystemClock } from '../../hooks/useSystemClock';

interface CalendarFlyoutProps {
  onClose: () => void;
}

export const CalendarFlyout: React.FC<CalendarFlyoutProps> = ({ onClose }) => {
  const flyoutRef = useRef<HTMLDivElement>(null);
  const { timeStr, dateStr } = useSystemClock();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (flyoutRef.current && !flyoutRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const todayDate = now.getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Days in month calculation
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarCells = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push(i);
  }

  return (
    <div
      ref={flyoutRef}
      className="fixed bottom-14 right-3 z-[80] w-80 rounded-2xl bg-[#242424]/95 backdrop-blur-2xl border border-white/10 shadow-win-flyout p-4 text-white select-none space-y-4 font-sans animate-in fade-in slide-in-from-bottom-2 duration-150"
    >
      {/* Time & Date Header */}
      <div className="border-b border-white/10 pb-3 flex items-start justify-between">
        <div>
          <div className="text-2xl font-bold tracking-tight text-white font-mono">
            {timeStr}
          </div>
          <div className="text-xs text-white/70 font-medium mt-0.5">
            {dateStr}
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Month Navigator Header */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-white">
            {monthNames[currentMonth]} {currentYear}
          </span>
          <div className="flex items-center space-x-1 text-white/70">
            <button className="p-1 rounded hover:bg-white/10 transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 rounded hover:bg-white/10 transition-colors">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Day names header */}
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-white/40">
          {dayNames.map((d) => (
            <div key={d} className="py-0.5">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Day Grid */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {calendarCells.map((day, idx) => {
            if (!day) {
              return <div key={`empty-${idx}`} className="h-7" />;
            }
            const isToday = day === todayDate;

            return (
              <div
                key={`day-${day}`}
                className={`h-7 flex items-center justify-center rounded-full text-[11px] transition-colors ${
                  isToday
                    ? 'bg-[#0078d4] text-white font-bold shadow-sm'
                    : 'text-white/80 hover:bg-white/10 cursor-pointer'
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
