import { useState, useMemo } from 'react';
import { DailyPL } from '../types/portfolio';
import { formatCurrency } from '../utils/portfolio-calculations';
import './CalendarView.css';

interface CalendarViewProps {
  dailyPL: DailyPL[];
}

interface DayData {
  date: Date;
  dateString: string;
  dayNumber: number;
  pl: number;
  tradeCount: number;
  hasTrades: boolean;
}

interface WeekData {
  days: DayData[];
  weekPL: number;
  weekNumber: number;
}

export function CalendarView({ dailyPL }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Crear mapa de datos diarios para acceso rápido
  const dailyPLMap = useMemo(() => {
    const map = new Map<string, DailyPL>();
    dailyPL.forEach(day => {
      map.set(day.date, day);
    });
    return map;
  }, [dailyPL]);

  // Obtener todos los días del mes actual
  const monthData = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Primer día del mes
    const firstDay = new Date(year, month, 1);
    // Último día del mes
    const lastDay = new Date(year, month + 1, 0);
    
    // Día de la semana del primer día (0 = domingo, 1 = lunes, etc.)
    const firstDayOfWeek = firstDay.getDay();
    // Ajustar para que la semana empiece en lunes (0 = lunes)
    const adjustedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    const days: DayData[] = [];
    
    // Agregar días del mes anterior para completar la primera semana
    const daysBefore = adjustedFirstDay;
    for (let i = daysBefore - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      const dateString = date.toISOString().split('T')[0];
      const dayData = dailyPLMap.get(dateString);
      days.push({
        date,
        dateString,
        dayNumber: date.getDate(),
        pl: dayData?.realizedPL || 0,
        tradeCount: dayData?.tradeCount || 0,
        hasTrades: !!dayData,
      });
    }
    
    // Agregar todos los días del mes actual
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      const dayData = dailyPLMap.get(dateString);
      days.push({
        date,
        dateString,
        dayNumber: day,
        pl: dayData?.realizedPL || 0,
        tradeCount: dayData?.tradeCount || 0,
        hasTrades: !!dayData,
      });
    }
    
    // Agregar días del mes siguiente para completar la última semana
    const totalDays = days.length;
    const remainingDays = 7 - (totalDays % 7);
    if (remainingDays < 7) {
      for (let day = 1; day <= remainingDays; day++) {
        const date = new Date(year, month + 1, day);
        const dateString = date.toISOString().split('T')[0];
        const dayData = dailyPLMap.get(dateString);
        days.push({
          date,
          dateString,
          dayNumber: day,
          pl: dayData?.realizedPL || 0,
          tradeCount: dayData?.tradeCount || 0,
          hasTrades: !!dayData,
        });
      }
    }
    
    return days;
  }, [currentMonth, dailyPLMap]);

  // Agrupar días por semanas
  const weeks = useMemo(() => {
    const weekList: WeekData[] = [];
    for (let i = 0; i < monthData.length; i += 7) {
      const weekDays = monthData.slice(i, i + 7);
      const weekPL = weekDays.reduce((sum, day) => sum + day.pl, 0);
      weekList.push({
        days: weekDays,
        weekPL,
        weekNumber: Math.floor(i / 7) + 1,
      });
    }
    return weekList;
  }, [monthData]);

  // Calcular P/L del mes actual
  const monthlyPL = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
    
    return dailyPL
      .filter(day => day.date.startsWith(monthKey))
      .reduce((sum, day) => sum + day.realizedPL, 0);
  }, [currentMonth, dailyPL]);

  const formatMonthLabel = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const goToCurrentMonth = () => {
    setCurrentMonth(new Date());
    setSelectedDate(null);
  };

  const isCurrentMonth = useMemo(() => {
    const now = new Date();
    return currentMonth.getFullYear() === now.getFullYear() && 
           currentMonth.getMonth() === now.getMonth();
  }, [currentMonth]);

  return (
    <div className="calendar-view-container">
      <div className="calendar-header">
        <div className="calendar-header-left">
          <h3>Trades Calendar ({formatMonthLabel(currentMonth)})</h3>
          <span className={`monthly-pl-badge ${monthlyPL === 0 ? 'even' : monthlyPL >= 0 ? 'success' : 'error'}`}>
            {formatCurrency(monthlyPL)}
          </span>
        </div>
        <div className="calendar-navigation">
          <button 
            className="calendar-nav-button"
            onClick={goToPreviousMonth}
            title="Previous Month"
          >
            ‹
          </button>
          <button 
            className="calendar-nav-button calendar-month-button"
            onClick={goToCurrentMonth}
            disabled={isCurrentMonth}
            title="Current Month"
          >
            {formatMonthLabel(currentMonth)}
          </button>
          <button 
            className="calendar-nav-button"
            onClick={goToNextMonth}
            title="Next Month"
          >
            ›
          </button>
        </div>
      </div>

      <div className="calendar-table-container">
        <table className="calendar-table">
          <thead>
            <tr>
              <th>Mon</th>
              <th>Mar</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
              <th className="week-total-header">Week</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, weekIdx) => (
              <tr key={weekIdx}>
                {week.days.map((day, dayIdx) => {
                  const isCurrentMonthDay = day.date.getMonth() === currentMonth.getMonth();
                  const isSelected = selectedDate === day.dateString;
                  const isProfit = day.pl >= 0;

                  return (
                    <td
                      key={dayIdx}
                      className={`calendar-cell ${!isCurrentMonthDay ? 'other-month' : ''} ${isSelected ? 'selected' : ''} ${day.hasTrades ? (day.pl === 0 ? 'has-trades even' : isProfit ? 'has-trades profit' : 'has-trades loss') : 'no-trades'}`}
                      onClick={() => setSelectedDate(day.dateString === selectedDate ? null : day.dateString)}
                      title={day.hasTrades ? `${day.dateString}: ${formatCurrency(day.pl)} - ${day.tradeCount} trades` : day.dateString}
                    >
                      <div className="calendar-cell-content">
                        <div className="calendar-day-number">{day.dayNumber}</div>
                        {day.hasTrades && (
                          <>
                            <div className={`calendar-day-pl font-comic-sans ${day.pl === 0 ? 'even' : isProfit ? 'profit' : 'loss'}`}>
                              {formatCurrency(day.pl)}
                            </div>
                            <div className="calendar-day-trades">{day.tradeCount} trades</div>
                          </>
                        )}
                      </div>
                    </td>
                  );
                })}
                <td className="week-total-cell">
                  <div className="week-total-content">
                    <div className={`week-total-pl font-comic-sans ${week.weekPL === 0 ? 'even' : week.weekPL >= 0 ? 'profit' : 'loss'}`}>
                      {formatCurrency(week.weekPL)}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedDate && (
        <div className="calendar-detail">
          <h4>Detail - {selectedDate}</h4>
          {(() => {
            const selectedDay = dailyPL.find(d => d.date === selectedDate);
            return selectedDay ? (
              <div className="calendar-detail-content">
                <p><strong>Realized P/L:</strong> {formatCurrency(selectedDay.realizedPL)}</p>
                <p><strong>Executed Trades:</strong> {selectedDay.tradeCount}</p>
                {selectedDay.symbols && selectedDay.symbols.length > 0 && (
                  <div className="calendar-detail-symbols">
                    <p><strong>Traded Symbols:</strong></p>
                    <div className="symbols-list">
                      {selectedDay.symbols.map((symbol, idx) => (
                        <span key={idx} className="symbol-badge">
                          {symbol}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="calendar-detail-content">
                <p>No executed trades on this day</p>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
