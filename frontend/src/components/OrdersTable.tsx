import { ProcessedOrder } from '../types/portfolio';
import { formatCurrency, formatDate } from '../utils/portfolio-calculations';
import './OrdersTable.css';

interface OrdersTableProps {
  orders: ProcessedOrder[];
  showLegs?: boolean;
}

export function OrdersTable({ orders, showLegs = false }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="orders-empty-state">
        <p>No orders to show</p>
      </div>
    );
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'FLL':
      case 'FLP':
        return 'status-filled';
      case 'OUT':
        return 'status-open';
      case 'EXP':
        return 'status-expired';
      case 'REJ':
        return 'status-rejected';
      default:
        return 'status-default';
    }
  };

  return (
    <div className="orders-table-container">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Type</th>
            <th>Opened</th>
            <th>Closed</th>
            <th className="text-right">Filled Price</th>
            <th className="text-right">Commission</th>
            <th className="text-right">Spread</th>
            {showLegs && <th>Legs</th>}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const hasRejectReason = order.status === 'REJ' && order.rejectReason;
            return (
              <tr 
                key={order.orderId} 
                className={hasRejectReason ? 'order-row-with-tooltip' : ''}
              >
                <td className="font-mono text-sm">
                  {hasRejectReason && (
                    <div className="order-tooltip font-comic-sans">{order.rejectReason}</div>
                  )}
                  {order.orderId}
                </td>
              <td>
                <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                  {order.statusDescription}
                </span>
              </td>
              <td>{order.orderType}</td>
              <td className="text-sm">{formatDate(order.openedDateTime)}</td>
              <td className="text-sm">
                {order.closedDateTime ? formatDate(order.closedDateTime) : '-'}
              </td>
              <td className="text-right font-comic-sans">{formatCurrency(parseFloat(order.filledPrice))}</td>
              <td className="text-right font-comic-sans">{formatCurrency(parseFloat(order.commissionFee))}</td>
              <td className="text-right font-comic-sans">{order.spread || '-'}</td>
              {showLegs && (
                <td>
                  <div className="legs-container">
                    {order.legs.map((leg, idx) => (
                      <div key={idx} className="leg-item">
                        <span className="text-sm font-comic-sans">
                          {leg.buyOrSell} {leg.execQuantity} {leg.symbol}
                          {leg.assetType === 'STOCKOPTION' && leg.optionType && (
                            <> ({leg.optionType})</>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
              )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

