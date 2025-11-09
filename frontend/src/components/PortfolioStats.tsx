import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Position, DailyPL } from '../types/portfolio';
import {
  calculatePortfolioStats,
  calculateCumulativePerformance,
  formatCurrency,
  formatPercent,
} from '../utils/portfolio-calculations';
import './PortfolioStats.css';

interface PortfolioStatsProps {
  positions: Position[];
  dailyPL: DailyPL[];
}

export function PortfolioStats({ positions, dailyPL }: PortfolioStatsProps) {
  const stats = useMemo(
    () => calculatePortfolioStats(dailyPL, positions),
    [dailyPL, positions]
  );

  const performanceData = useMemo(
    () => calculateCumulativePerformance(dailyPL),
    [dailyPL]
  );

  // Formatear fechas para el gráfico
  const chartData = performanceData.map(point => ({
    ...point,
    dateFormatted: new Date(point.date).toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric',
    }),
  }));

  return (
    <div className="portfolio-stats">
      <div className="stats-header">
        <h3>General Portfolio Statistics</h3>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Trades</div>
          <div className="stat-value">{stats.totalTrades}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Realized P/L</div>
          <div className={`stat-value ${stats.totalRealizedPL >= 0 ? 'profit' : 'loss'}`}>
            {formatCurrency(stats.totalRealizedPL)}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Unrealized P/L</div>
          <div className={`stat-value ${stats.totalUnrealizedPL >= 0 ? 'profit' : 'loss'}`}>
            {formatCurrency(stats.totalUnrealizedPL)}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Total P/L</div>
          <div className={`stat-value ${stats.totalPL >= 0 ? 'profit' : 'loss'}`}>
            {formatCurrency(stats.totalPL)}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Win Rate</div>
          <div className="stat-value">{formatPercent(stats.winRate)}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Winning Days</div>
          <div className="stat-value profit">{stats.winningDays}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Losing Days</div>
          <div className="stat-value loss">{stats.losingDays}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Break Even Days</div>
          <div className="stat-value">{stats.breakEvenDays}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Average Daily P/L</div>
          <div className={`stat-value ${stats.averageDailyPL >= 0 ? 'profit' : 'loss'}`}>
            {formatCurrency(stats.averageDailyPL)}
          </div>
        </div>

        {stats.bestDay && (
          <div className="stat-card">
            <div className="stat-label">Best Day</div>
            <div className="stat-value profit">
              {formatCurrency(stats.bestDay.pl)}
            </div>
            <div className="stat-subtext">
              {new Date(stats.bestDay.date).toLocaleDateString('es-ES')}
            </div>
          </div>
        )}

        {stats.worstDay && (
          <div className="stat-card">
            <div className="stat-label">Worst Day</div>
            <div className="stat-value loss">
              {formatCurrency(stats.worstDay.pl)}
            </div>
            <div className="stat-subtext">
              {new Date(stats.worstDay.date).toLocaleDateString('es-ES')}
            </div>
          </div>
        )}
      </div>

      <div className="performance-chart-container">
        <h3>Cumulative Performance History</h3>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis
                dataKey="dateFormatted"
                angle={-45}
                textAnchor="end"
                height={80}
                interval="preserveStartEnd"
                stroke="rgba(255, 255, 255, 0.7)"
                tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              />
              <YAxis
                tickFormatter={(value) => formatCurrency(value)}
                domain={['auto', 'auto']}
                stroke="rgba(255, 255, 255, 0.7)"
                tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => {
                  const point = chartData.find((d) => d.dateFormatted === label);
                  return point ? new Date(point.date).toLocaleDateString('es-ES') : label;
                }}
                contentStyle={{
                  backgroundColor: 'rgba(36, 36, 36, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  color: 'rgba(255, 255, 255, 0.87)',
                }}
                labelStyle={{
                  color: 'rgba(255, 255, 255, 0.87)',
                }}
              />
              <Legend 
                wrapperStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
              />
              <Line
                type="monotone"
                dataKey="cumulativePL"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 3, fill: '#22c55e' }}
                activeDot={{ r: 6, fill: '#22c55e' }}
                name="Cumulative P/L"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="no-data-message">
            <p>No performance data available</p>
          </div>
        )}
      </div>
    </div>
  );
}

