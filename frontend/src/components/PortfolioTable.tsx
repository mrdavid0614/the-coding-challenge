import { Position } from '../types/portfolio';
import { formatCurrency, formatPercent } from '../utils/portfolio-calculations';
import './PortfolioTable.css';

interface PortfolioTableProps {
  positions: Position[];
}

export function PortfolioTable({ positions }: PortfolioTableProps) {
  if (positions.length === 0) {
    return (
      <div className="portfolio-empty-state">
        <p>No open positions</p>
      </div>
    );
  }

  return (
    <div className="portfolio-table-container">
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Underlying</th>
            <th>Type</th>
            <th className="text-right">Quantity</th>
            <th className="text-right">Cost Basis</th>
            <th className="text-right">Unrealized P/L</th>
            <th className="text-right">Unrealized P/L %</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr key={position.symbol}>
              <td className="font-mono font-semibold">{position.symbol}</td>
              <td>{position.underlying || '-'}</td>
              <td>
                <span className={`asset-type-badge ${position.assetType.toLowerCase()}`}>
                  {position.assetType === 'STOCKOPTION' ? 'Option' : 'Stock'}
                </span>
              </td>
              <td className="text-right font-mono">{position.quantity}</td>
              <td className="text-right font-mono">{formatCurrency(position.costBasis)}</td>
              <td className={`text-right font-mono ${position.unrealizedPL >= 0 ? 'profit' : 'loss'}`}>
                {formatCurrency(position.unrealizedPL)}
              </td>
              <td className={`text-right font-mono ${position.unrealizedPLPercent >= 0 ? 'profit' : 'loss'}`}>
                {formatPercent(position.unrealizedPLPercent)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

