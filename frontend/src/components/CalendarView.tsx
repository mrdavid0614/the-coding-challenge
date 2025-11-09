import { useState } from 'react';
import { DailyPL } from '../types/portfolio';
import { formatCurrency } from '../utils/portfolio-calculations';
import './CalendarView.css';

interface CalendarViewProps {
  dailyPL: DailyPL[];
}

export function CalendarView({ dailyPL }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  if (dailyPL.length === 0) {
    return (
      <div className="calendar-empty-state">
        <p>No hay datos de P/L diario disponibles</p>
      </div>
    );
  }

  // Agrupar por mes para mejor visualización
  const groupedByMonth = dailyPL.reduce((acc, day) => {
    const monthKey = day.date.substring(0, 7); // YYYY-MM
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(day);
    return acc;
  }, {} as Record<string, DailyPL[]>);

  const formatMonthLabel = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="calendar-view-container">
      <h3>Realized P/L Diario</h3>
      <div className="calendar-grid">
        {Object.entries(groupedByMonth).map(([monthKey, days]) => (
          <div key={monthKey} className="calendar-month">
            <h4 className="calendar-month-title">{formatMonthLabel(monthKey)}</h4>
            <div className="calendar-days">
              {days.map((day) => {
                const date = new Date(day.date);
                const dayNumber = date.getDate();
                const isSelected = selectedDate === day.date;
                const isProfit = day.realizedPL >= 0;

                return (
                  <div
                    key={day.date}
                    className={`calendar-day ${isSelected ? 'selected' : ''} ${isProfit ? 'profit' : 'loss'}`}
                    onClick={() => setSelectedDate(day.date === selectedDate ? null : day.date)}
                    title={`${day.date}: ${formatCurrency(day.realizedPL)} - ${day.tradeCount} trades`}
                  >
                    <div className="calendar-day-number">{dayNumber}</div>
                    <div className={`calendar-day-pl ${isProfit ? 'profit' : 'loss'}`}>
                      {formatCurrency(day.realizedPL)}
                    </div>
                    <div className="calendar-day-trades">{day.tradeCount} trades</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {selectedDate && (
        <div className="calendar-detail">
          <h4>Detalle - {selectedDate}</h4>
          {(() => {
            const selectedDay = dailyPL.find(d => d.date === selectedDate);
            return selectedDay ? (
              <div className="calendar-detail-content">
                <p><strong>Realized P/L:</strong> {formatCurrency(selectedDay.realizedPL)}</p>
                <p><strong>Trades ejecutados:</strong> {selectedDay.tradeCount}</p>
              </div>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
}

