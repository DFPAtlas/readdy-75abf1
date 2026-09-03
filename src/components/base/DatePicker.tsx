import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toYYYYMMDD(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatDisplay(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  const options: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric", month: "short", year: "numeric" };
  return d.toLocaleDateString("en-GB", options);
}

function getToday(): string {
  return toYYYYMMDD(new Date());
}

function getTomorrow(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return toYYYYMMDD(d);
}

function getThisWeekend(): string {
  const d = new Date();
  const day = d.getDay();
  const daysUntilSaturday = day === 6 ? 0 : 6 - day;
  d.setDate(d.getDate() + daysUntilSaturday);
  return toYYYYMMDD(d);
}

function getNextWeek(): string {
  const d = new Date();
  const day = d.getDay();
  const daysUntilMonday = day === 0 ? 1 : 8 - day;
  d.setDate(d.getDate() + daysUntilMonday);
  return toYYYYMMDD(d);
}

function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  return new Date(dateStr + "T00:00:00");
}

export default function DatePicker({ value, onChange, placeholder = "Select date", className = "" }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const today = getToday();
  const current = parseDate(value) || new Date(today + "T00:00:00");
  const [viewYear, setViewYear] = useState(current.getFullYear());
  const [viewMonth, setViewMonth] = useState(current.getMonth());

  useEffect(() => {
    if (value) {
      const d = parseDate(value);
      if (d) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    }
  }, [value]);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const popoverWidth = 320;
    let left = rect.left;
    if (left + popoverWidth > window.innerWidth - 16) {
      left = window.innerWidth - popoverWidth - 16;
    }
    if (left < 16) left = 16;
    setPopoverPos({
      top: rect.bottom + 8,
      left,
    });
  }, []);

  useEffect(() => {
    if (open) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);
    }
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  const goToPrevMonth = useCallback(() => {
    setViewMonth((prev) => {
      if (prev === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setViewMonth((prev) => {
      if (prev === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      const insidePopover = popoverRef.current?.contains(target);
      const insideTrigger = triggerRef.current?.contains(target);
      if (!insidePopover && !insideTrigger) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const handleSelect = (day: number) => {
    const selected = toYYYYMMDD(new Date(viewYear, viewMonth, day));
    onChange(selected);
    setOpen(false);
  };

  const handleQuickSelect = (dateStr: string) => {
    onChange(dateStr);
    setOpen(false);
  };

  const quickOptions = [
    { label: "Today", value: getToday() },
    { label: "Tomorrow", value: getTomorrow() },
    { label: "This weekend", value: getThisWeekend() },
    { label: "Next week", value: getNextWeek() },
  ];

  return (
    <div className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => { setOpen(!open); }}
        className="w-full flex items-center gap-3 px-5 py-3.5 cursor-pointer hover:bg-background-100/60 transition-colors group"
      >
        <i className={`ri-calendar-line text-lg transition-colors ${open ? "text-primary-500" : "text-foreground-400 group-hover:text-primary-500"}`}></i>
        <span className={`text-sm flex-1 text-left truncate ${value ? "text-foreground-900 font-medium" : "text-foreground-400"}`}>
          {value ? formatDisplay(value) : placeholder}
        </span>
        {value && (
          <span
            onClick={(e) => { e.stopPropagation(); onChange(""); setOpen(false); }}
            className="w-5 h-5 flex items-center justify-center rounded-full bg-background-200 hover:bg-background-300 text-foreground-400 hover:text-foreground-600 transition-colors cursor-pointer flex-shrink-0"
            aria-label="Clear date"
          >
            <i className="ri-close-line text-xs"></i>
          </span>
        )}
        <i className={`ri-arrow-down-s-line text-sm text-foreground-400 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`}></i>
      </button>

      {open && createPortal(
        <div
          ref={popoverRef}
          style={{ top: popoverPos.top, left: popoverPos.left }}
          className="fixed w-[320px] bg-background-50 border border-background-200 rounded-2xl shadow-lg z-[9999] overflow-hidden"
        >
          <style>{`
            @keyframes dpFadeIn {
              from { opacity: 0; transform: translateY(-6px) scale(0.97); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
          <div style={{ animation: "dpFadeIn 0.18s ease-out" }}>

            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <button
                type="button"
                onClick={goToPrevMonth}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 text-foreground-500 hover:text-foreground-800 transition-colors cursor-pointer"
                aria-label="Previous month"
              >
                <i className="ri-arrow-left-s-line"></i>
              </button>
              <span className="text-sm font-semibold text-foreground-900">
                {MONTHS[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                onClick={goToNextMonth}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 text-foreground-500 hover:text-foreground-800 transition-colors cursor-pointer"
                aria-label="Next month"
              >
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>

            <div className="grid grid-cols-7 px-4 mb-1">
              {DAYS.map((d) => (
                <div key={d} className="text-center text-[11px] font-semibold text-foreground-400 uppercase tracking-wider py-2">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 px-4 pb-4">
              {calendarDays.map((day, i) => {
                if (day === null) return <div key={`empty-${i}`} className="aspect-square" />;

                const dateStr = toYYYYMMDD(new Date(viewYear, viewMonth, day));
                const isToday = dateStr === today;
                const isSelected = dateStr === value;
                const isPast = dateStr < today;

                return (
                  <button
                    key={dateStr}
                    type="button"
                    onClick={() => handleSelect(day)}
                    disabled={isPast}
                    className={`aspect-square flex items-center justify-center text-sm rounded-full transition-all cursor-pointer
                      ${isSelected
                        ? "bg-primary-600 text-background-50 font-semibold ring-2 ring-primary-200"
                        : isToday
                          ? "bg-primary-50 text-primary-700 font-semibold hover:bg-primary-100"
                          : isPast
                            ? "text-foreground-300 cursor-default"
                            : "text-foreground-700 hover:bg-background-100 hover:text-foreground-900"
                      }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-background-200 px-5 py-3.5">
              <p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wider mb-2.5">Quick select</p>
              <div className="flex flex-wrap gap-2">
                {quickOptions.map((opt) => {
                  const isActive = value === opt.value;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleQuickSelect(opt.value)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                        isActive
                          ? "bg-primary-600 text-background-50"
                          : "bg-background-100 text-foreground-600 hover:bg-background-200 hover:text-foreground-800"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}
    </div>
  );
}