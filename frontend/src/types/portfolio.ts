// Tipos para la vista de portafolio

export interface Position {
  symbol: string;
  underlying?: string;
  assetType: 'STOCK' | 'STOCKOPTION';
  quantity: number;
  costBasis: number;
  averageCost: number;
  currentPrice: number;
  unrealizedPL: number;
  unrealizedPLPercent: number;
  multiplier: number; // 1 para stocks, 100 para opciones
}

export interface ProcessedOrder {
  orderId: string;
  accountId: string;
  status: string;
  statusDescription: string;
  orderType: string;
  openedDateTime: string;
  closedDateTime: string | null;
  filledPrice: string;
  limitPrice?: string;
  commissionFee: string;
  currency: string;
  rejectReason?: string;
  spread?: string;
  legs: Array<{
    symbol: string;
    underlying?: string;
    assetType: 'STOCK' | 'STOCKOPTION';
    buyOrSell: 'Buy' | 'Sell';
    openOrClose?: 'Open' | 'Close';
    quantityOrdered: number;
    execQuantity: number;
    quantityRemaining: number;
    executionPrice: number;
    expirationDate?: string;
    optionType?: 'CALL' | 'PUT';
    strikePrice?: string;
  }>;
}

export interface DailyPL {
  date: string;
  realizedPL: number;
  tradeCount: number;
  symbols: string[];
}

export interface PortfolioData {
  positions: Position[];
  openPositions: ProcessedOrder[];
  openOrders: ProcessedOrder[];
  closedOrders: ProcessedOrder[];
  dailyPL: DailyPL[];
}

