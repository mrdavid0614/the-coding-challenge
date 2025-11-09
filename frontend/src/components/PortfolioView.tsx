import { useState, useEffect } from 'react';
import { OrdersResponse, LivePricesResponse } from '../types';
import {
  calculatePositions,
  getOpenOrders,
  getClosedOrders,
  calculateDailyPL,
  formatCurrency,
} from '../utils/portfolio-calculations';
import { PortfolioTable } from './PortfolioTable';
import { OrdersTable } from './OrdersTable';
import { CalendarView } from './CalendarView';
import { PortfolioStats } from './PortfolioStats';
import './PortfolioView.css';

export function PortfolioView() {
  const [historicalOrders, setHistoricalOrders] = useState<OrdersResponse>({
    Orders: [],
    NextToken: null,
    Errors: [],
  });
  const [openOrders, setOpenOrders] = useState<OrdersResponse>({
    Orders: [],
    NextToken: null,
    Errors: [],
  });
  const [livePrices, setLivePrices] = useState<LivePricesResponse>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'positions' | 'open-orders' | 'closed-orders' | 'calendar' | 'stats'>('positions');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [historicalRes, openOrdersRes, livePricesRes] = await Promise.all([
          fetch('/api/historical-orders'),
          fetch('/api/open-orders'),
          fetch('/api/live-prices'),
        ]);

        if (!historicalRes.ok || !openOrdersRes.ok || !livePricesRes.ok) {
          throw new Error('Error loading API data');
        }

        const [historicalData, openOrdersData, livePricesData] = await Promise.all([
          historicalRes.json(),
          openOrdersRes.json(),
          livePricesRes.json(),
        ]);

        setHistoricalOrders(historicalData);
        setOpenOrders(openOrdersData);
        setLivePrices(livePricesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error fetching portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Actualizar precios en vivo cada 30 segundos
    const priceInterval = setInterval(async () => {
      try {
        const response = await fetch('/api/live-prices');
        if (response.ok) {
          const data = await response.json();
          setLivePrices(data);
        }
      } catch (err) {
        console.error('Error updating live prices:', err);
      }
    }, 30000);

    return () => clearInterval(priceInterval);
  }, []);

  if (loading) {
    return (
      <div className="portfolio-loading">
        <p>Loading portfolio data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portfolio-error">
        <p>Error: {error}</p>
      </div>
    );
  }

  // Calcular datos del portafolio
  const positions = calculatePositions(historicalOrders.Orders, livePrices);
  const processedOpenOrders = getOpenOrders(openOrders.Orders);
  const processedClosedOrders = getClosedOrders(historicalOrders.Orders);
  const dailyPL = calculateDailyPL(processedClosedOrders);

  // Calcular totales
  const totalUnrealizedPL = positions.reduce((sum, p) => sum + p.unrealizedPL, 0);
  const totalCostBasis = positions.reduce((sum, p) => sum + p.costBasis, 0);

  return (
    <div className="portfolio-view">
      <div className="portfolio-header">
        <h2>Portfolio View</h2>
        <div className="portfolio-summary">
          <div className="summary-item">
            <span className="summary-label">Total Cost Basis:</span>
            <span className="summary-value">{formatCurrency(totalCostBasis)}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Unrealized P/L:</span>
            <span className={`summary-value ${totalUnrealizedPL >= 0 ? 'profit' : 'loss'}`}>
              {formatCurrency(totalUnrealizedPL)}
            </span>
          </div>
        </div>
      </div>

      <div className="portfolio-tabs">
        <button
          className={`tab-button ${activeTab === 'positions' ? 'active' : ''}`}
          onClick={() => setActiveTab('positions')}
        >
          Open Positions ({positions.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'open-orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('open-orders')}
        >
          Open Orders ({processedOpenOrders.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'closed-orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('closed-orders')}
        >
          Closed Orders ({processedClosedOrders.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          P/L Calendar
        </button>
        <button
          className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Portfolio Stats
        </button>
      </div>

      <div className="portfolio-content">
        {activeTab === 'positions' && <PortfolioTable positions={positions} />}
        {activeTab === 'open-orders' && <OrdersTable orders={processedOpenOrders} showLegs={true} />}
        {activeTab === 'closed-orders' && <OrdersTable orders={processedClosedOrders} showLegs={true} />}
        {activeTab === 'calendar' && <CalendarView dailyPL={dailyPL} />}
        {activeTab === 'stats' && <PortfolioStats positions={positions} dailyPL={dailyPL} />}
      </div>
    </div>
  );
}

