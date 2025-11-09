import { Order, OrderLeg, LivePricesResponse } from '../types';
import { Position, ProcessedOrder, DailyPL } from '../types/portfolio';

/**
 * Obtiene el multiplicador para un asset (1 para stocks, 100 para opciones)
 */
export function getMultiplier(assetType: 'STOCK' | 'STOCKOPTION'): number {
  return assetType === 'STOCKOPTION' ? 100 : 1;
}

/**
 * Obtiene el precio de ejecución de un leg, usando fallbacks si es necesario
 */
export function getExecutionPrice(leg: OrderLeg, order: Order): number {
  // Prioridad: ExecutionPrice > FilledPrice > PriceUsedForBuyingPower > LimitPrice
  if (leg.ExecutionPrice) {
    return parseFloat(leg.ExecutionPrice);
  }
  if (order.FilledPrice) {
    return parseFloat(order.FilledPrice);
  }
  if (order.PriceUsedForBuyingPower) {
    return parseFloat(order.PriceUsedForBuyingPower);
  }
  if (order.LimitPrice) {
    return parseFloat(order.LimitPrice);
  }
  return 0;
}

/**
 * Calcula el cost basis para un leg de orden
 */
export function calculateLegCostBasis(leg: OrderLeg, order: Order): number {
  const execPrice = getExecutionPrice(leg, order);
  const execQuantity = parseFloat(leg.ExecQuantity) || 0;
  const multiplier = getMultiplier(leg.AssetType);
  const baseCost = execQuantity * execPrice * multiplier;
  
  // Buy orders incrementan cost basis, Sell orders lo decrementan
  return leg.BuyOrSell === 'Buy' ? baseCost : -baseCost;
}

/**
 * Procesa una orden y la convierte en formato ProcessedOrder
 */
export function processOrder(order: Order): ProcessedOrder {
  return {
    orderId: order.OrderID,
    accountId: order.AccountID,
    status: order.Status,
    statusDescription: order.StatusDescription,
    orderType: order.OrderType,
    openedDateTime: order.OpenedDateTime,
    closedDateTime: order.ClosedDateTime,
    filledPrice: order.FilledPrice,
    limitPrice: order.LimitPrice,
    commissionFee: order.CommissionFee,
    currency: order.Currency,
    rejectReason: order.RejectReason,
    spread: order.Spread,
    legs: order.Legs.map(leg => ({
      symbol: leg.Symbol,
      underlying: leg.Underlying,
      assetType: leg.AssetType,
      buyOrSell: leg.BuyOrSell,
      openOrClose: leg.OpenOrClose,
      quantityOrdered: parseFloat(leg.QuantityOrdered) || 0,
      execQuantity: parseFloat(leg.ExecQuantity) || 0,
      quantityRemaining: parseFloat(leg.QuantityRemaining) || 0,
      executionPrice: getExecutionPrice(leg, order),
      expirationDate: leg.ExpirationDate,
      optionType: leg.OptionType,
      strikePrice: leg.StrikePrice,
    })),
  };
}

/**
 * Calcula las posiciones agregadas a partir de órdenes históricas
 */
export function calculatePositions(
  historicalOrders: Order[],
  livePrices: LivePricesResponse
): Position[] {
  // Mapa para agrupar posiciones por símbolo
  const positionMap = new Map<string, {
    symbol: string;
    underlying?: string;
    assetType: 'STOCK' | 'STOCKOPTION';
    totalQuantity: number;
    totalCostBasis: number; // Cost basis neto (puede ser negativo)
    totalBuyCost: number; // Solo costos de compras (para calcular average cost)
    totalBuyQuantity: number; // Solo cantidades compradas (para calcular average cost)
    multiplier: number;
  }>();

  // Procesar solo órdenes con status FLL o FLP y OpenOrClose = "Open"
  historicalOrders
    .filter(order => 
      (order.Status === 'FLL' || order.Status === 'FLP') &&
      order.ClosedDateTime === null
    )
    .forEach(order => {
      order.Legs.forEach(leg => {
        // Solo procesar legs con OpenOrClose = "Open"
        if (leg.OpenOrClose !== 'Open') return;

        const execQuantity = parseFloat(leg.ExecQuantity) || 0;
        if (execQuantity === 0) return;

        const symbol = leg.Symbol;
        const multiplier = getMultiplier(leg.AssetType);
        const costBasis = calculateLegCostBasis(leg, order);
        
        // Determinar quantity neta (Buy incrementa, Sell decrementa)
        const quantityDelta = leg.BuyOrSell === 'Buy' ? execQuantity : -execQuantity;

        if (!positionMap.has(symbol)) {
          positionMap.set(symbol, {
            symbol,
            underlying: leg.Underlying,
            assetType: leg.AssetType,
            totalQuantity: 0,
            totalCostBasis: 0,
            totalBuyCost: 0,
            totalBuyQuantity: 0,
            multiplier,
          });
        }

        const position = positionMap.get(symbol)!;
        position.totalQuantity += quantityDelta;
        position.totalCostBasis += costBasis;
        
        // Solo contar compras para calcular average cost
        if (leg.BuyOrSell === 'Buy') {
          position.totalBuyCost += Math.abs(costBasis);
          position.totalBuyQuantity += execQuantity;
        }
      });
    });

  // Convertir mapa a array de Position con cálculos de P/L
  const positions: Position[] = Array.from(positionMap.values())
    .filter(p => p.totalQuantity !== 0) // Solo posiciones con quantity != 0
    .map(p => {
      const currentPrice = parseFloat(livePrices[p.symbol] || '0');
      
      // Calcular average cost basado solo en las compras
      const averageCost = p.totalBuyQuantity > 0 && p.totalBuyCost > 0
        ? p.totalBuyCost / (p.totalBuyQuantity * p.multiplier)
        : 0;
      
      // Calcular P/L no realizado
      const unrealizedPL = (currentPrice - averageCost) * p.totalQuantity * p.multiplier;
      const unrealizedPLPercent = averageCost !== 0
        ? ((currentPrice - averageCost) / averageCost) * 100
        : 0;

      // Cost basis es el valor absoluto del cost basis neto
      // (representa el costo total de las posiciones actuales)
      const costBasis = p.totalQuantity > 0 
        ? averageCost * Math.abs(p.totalQuantity) * p.multiplier
        : 0;

      return {
        symbol: p.symbol,
        underlying: p.underlying,
        assetType: p.assetType,
        quantity: p.totalQuantity,
        costBasis,
        averageCost,
        currentPrice,
        unrealizedPL,
        unrealizedPLPercent,
        multiplier: p.multiplier,
      };
    });

  return positions;
}

/**
 * Filtra órdenes abiertas (status OUT)
 */
export function getOpenOrders(openOrders: Order[]): ProcessedOrder[] {
  return openOrders
    .filter(order => order.Status === 'OUT')
    .map(processOrder);
}

/**
 * Filtra posiciones abiertas (status FLL/FLP con OpenOrClose = "Open")
 */
export function getOpenPositions(historicalOrders: Order[]): ProcessedOrder[] {
  return historicalOrders
    .filter(order => 
      (order.Status === 'FLL' || order.Status === 'FLP') &&
      order.ClosedDateTime === null &&
      order.Legs.some(leg => leg.OpenOrClose === 'Open')
    )
    .map(processOrder);
}

/**
 * Filtra órdenes cerradas (status FLL, FLP, EXP, REJ)
 */
export function getClosedOrders(historicalOrders: Order[]): ProcessedOrder[] {
  return historicalOrders
    .filter(order => 
      ['FLL', 'FLP', 'EXP', 'REJ'].includes(order.Status) &&
      order.ClosedDateTime !== null
    )
    .map(processOrder);
}

/**
 * Calcula el Realized P/L diario
 */
export function calculateDailyPL(closedOrders: ProcessedOrder[]): DailyPL[] {
  const dailyMap = new Map<string, { realizedPL: number; tradeCount: number; symbols: Set<string> }>();

  closedOrders.forEach(order => {
    if (!order.closedDateTime) return;

    const date = new Date(order.closedDateTime).toISOString().split('T')[0];
    
    if (!dailyMap.has(date)) {
      dailyMap.set(date, { realizedPL: 0, tradeCount: 0, symbols: new Set<string>() });
    }

    const daily = dailyMap.get(date)!;
    
    // Calcular P/L realizado para esta orden
    // Para órdenes cerradas, el P/L realizado se calcula basándose en la comisión
    // En un sistema real, esto requeriría rastrear el cost basis original de cada posición
    // y calcular la diferencia entre el precio de venta y el cost basis original
    
    // Agregar la comisión total como costo (las comisiones reducen el P/L)
    const totalCommission = parseFloat(order.commissionFee) || 0;
    daily.realizedPL -= totalCommission;
    
    // Recopilar símbolos tradeados en esta orden
    order.legs.forEach(leg => {
      if (leg.symbol) {
        daily.symbols.add(leg.symbol);
      }
    });
    
    // Nota: Para un cálculo más preciso del P/L realizado, necesitaríamos:
    // 1. Rastrear el cost basis de cada posición cuando se abre
    // 2. Cuando se cierra una posición, calcular: (precio_venta - cost_basis_original) * cantidad
    // 3. Restar las comisiones
    // Por ahora, solo restamos las comisiones como aproximación

    daily.tradeCount += 1;
  });

  return Array.from(dailyMap.entries())
    .map(([date, data]) => ({
      date,
      realizedPL: data.realizedPL,
      tradeCount: data.tradeCount,
      symbols: Array.from(data.symbols).sort(),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Formatea un número como moneda USD
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formatea un número como porcentaje
 */
export function formatPercent(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

/**
 * Formatea una fecha
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateString;
  }
}

