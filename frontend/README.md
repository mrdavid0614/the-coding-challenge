# 📊 The Portfolio View Challenge

#### Tools used to develop the challenge:

- Cowboy Prompt.
- Cursor AI (Sonnet 4 model and Auto select model option).

## Prompts:

### Initial prompt:

Estoy creando una vista de portafolio de inversiones en el cual quiero mostrar un listado con cada uno de los assets del usuario, digase:

- name o symbol (el ticker/symbol del asset).
- quantity (la cantidad de posiciones en dicho asset).
- Cost basis (el costo total de adquirir dichas posiciones).
- Unrealized P/L (el actual profit or loss que debe mostrarse en USD).
- Unrealized P/L % (el actual profit or loss en porcentaje).

Para lograr esto, poseo los siguientes 3 endpoints los cuales son mis proveedores de data:

- Open orders (Ordenes abiertas actualmente y posiciones no cerradas).
Estructura del response:
```JSON
{
  "Orders": [
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "GTC",
      "FilledPrice": "0",
      "GoodTillDate": "2025-08-29T00:00:00Z",
      "Legs": [
        {
          "ExpirationDate": "2025-08-29T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "2",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "AMD 250829C170",
          "Underlying": "AMD",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "170"
        }
      ],
      "LimitPrice": "1.3",
      "OrderID": "908794653",
      "OpenedDateTime": "2025-08-26T13:30:03Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "1.3",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "GTC",
      "FilledPrice": "0",
      "GoodTillDate": "2025-08-29T00:00:00Z",
      "Legs": [
        {
          "ExpirationDate": "2025-08-29T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "1",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Sell",
          "Symbol": "AMD 250829C165",
          "Underlying": "AMD",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "165"
        }
      ],
      "LimitPrice": "5.75",
      "OrderID": "908636891",
      "OpenedDateTime": "2025-08-25T13:30:00Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "5.75",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "GTC",
      "FilledPrice": "0",
      "GoodTillDate": "2025-08-29T00:00:00Z",
      "Legs": [
        {
          "ExpirationDate": "2025-08-29T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "4",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "AMD 250829C165",
          "Underlying": "AMD",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "165"
        }
      ],
      "LimitPrice": "5.55",
      "OrderID": "908571651",
      "OpenedDateTime": "2025-08-22T17:01:08Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "5.55",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "0",
      "Legs": [
        {
          "ExpirationDate": "2025-08-15T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "10",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "AMD 250815C180",
          "Underlying": "AMD",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "180"
        }
      ],
      "LimitPrice": "1",
      "OrderID": "907262315",
      "OpenedDateTime": "2025-08-13T15:21:52Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "1",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "0",
      "Legs": [
        {
          "ExpirationDate": "2025-08-15T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "5",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "AMD 250815P182.5",
          "Underlying": "AMD",
          "AssetType": "STOCKOPTION",
          "OptionType": "PUT",
          "StrikePrice": "182.5"
        }
      ],
      "LimitPrice": "1",
      "OrderID": "907263763",
      "OpenedDateTime": "2025-08-13T15:24:27Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "1",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "0",
      "Legs": [
        {
          "ExpirationDate": "2025-08-15T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "5",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "AMD 250815P180",
          "Underlying": "AMD",
          "AssetType": "STOCKOPTION",
          "OptionType": "PUT",
          "StrikePrice": "180"
        }
      ],
      "LimitPrice": "1.87",
      "OrderID": "907199156",
      "OpenedDateTime": "2025-08-13T13:37:44Z",
      "OrderType": "StopLimit",
      "PriceUsedForBuyingPower": "1.87",
      "RejectReason": "Invalid Stop Price - Stop Price must be above current market.",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "StopPrice": "1.87",
      "AdvancedOptions": "STPTRG=SBA;",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "0",
      "Legs": [
        {
          "ExpirationDate": "2025-08-15T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "1",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "AAPL 250815C232.5",
          "Underlying": "AAPL",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "232.5"
        }
      ],
      "LimitPrice": "1.32",
      "OrderID": "907191875",
      "OpenedDateTime": "2025-08-13T13:30:01Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "1.32",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "0",
      "Legs": [
        {
          "ExpirationDate": "2025-08-15T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "10",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "AMD 250815C180",
          "Underlying": "AMD",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "180"
        }
      ],
      "LimitPrice": "1",
      "OrderID": "907189822",
      "OpenedDateTime": "2025-08-13T13:15:54Z",
      "OrderType": "StopLimit",
      "PriceUsedForBuyingPower": "1",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "StopPrice": "3",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "GTC",
      "FilledPrice": "0",
      "GoodTillDate": "2025-08-22T00:00:00Z",
      "Legs": [
        {
          "ExpirationDate": "2025-08-22T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "5",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Sell",
          "Symbol": "AMD 250822C177.5",
          "Underlying": "AMD",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "177.5"
        }
      ],
      "LimitPrice": "2.75",
      "OrderID": "907931406",
      "OpenedDateTime": "2025-08-19T12:57:01Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "2.75",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "1",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "GTC",
      "FilledPrice": "0",
      "GoodTillDate": "2025-09-12T00:00:00Z",
      "Legs": [
        {
          "ExpirationDate": "2025-09-12T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "100",
          "ExecQuantity": "0",
          "QuantityRemaining": "100",
          "BuyOrSell": "Buy",
          "Symbol": "AAPL 250912C200",
          "Underlying": "AAPL",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "200"
        }
      ],
      "LimitPrice": "5.50",
      "OrderID": "911999999",
      "OpenedDateTime": "2025-09-17T10:00:00Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "5.50",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "0",
      "Legs": [
        {
          "OpenOrClose": "Open",
          "QuantityOrdered": "50",
          "ExecQuantity": "0",
          "QuantityRemaining": "50",
          "BuyOrSell": "Buy",
          "Symbol": "TSLA",
          "AssetType": "STOCK"
        }
      ],
      "LimitPrice": "350.00",
      "OrderID": "912000000",
      "OpenedDateTime": "2025-09-17T11:00:00Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "350.00",
      "Routing": "Intelligent",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "2",
      "ClosedDateTime": null,
      "Currency": "USD",
      "Duration": "GTC",
      "FilledPrice": "0",
      "GoodTillDate": "2025-09-19T00:00:00Z",
      "Legs": [
        {
          "ExpirationDate": "2025-09-19T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "2",
          "ExecQuantity": "0",
          "QuantityRemaining": "2",
          "BuyOrSell": "Buy",
          "Symbol": "NVDA 250919C190",
          "Underlying": "NVDA",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "190"
        },
        {
          "ExpirationDate": "2025-09-19T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "2",
          "ExecQuantity": "0",
          "QuantityRemaining": "2",
          "BuyOrSell": "Sell",
          "Symbol": "NVDA 250919C195",
          "Underlying": "NVDA",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "195"
        }
      ],
      "LimitPrice": "2.50",
      "OrderID": "912000001",
      "OpenedDateTime": "2025-09-17T12:00:00Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "2.50",
      "Routing": "Intelligent",
      "Spread": "Vertical",
      "Status": "OUT",
      "StatusDescription": "UROut",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    }
  ],
  "NextToken": null,
  "Errors": []
}
```

- Historical orders (Ordenes cerradas con los detalles de su ejecución).
Estructura del response:

```JSON
{
  "Orders": [
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "4",
      "ClosedDateTime": "2025-09-15T14:00:41Z",
      "Currency": "USD",
      "Duration": "GTC",
      "FilledPrice": "13.4",
      "GoodTillDate": "2025-12-14T00:00:00Z",
      "Legs": [
        {
          "ExpirationDate": "2026-01-16T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "4",
          "ExecQuantity": "4",
          "QuantityRemaining": "0",
          "BuyOrSell": "Sell",
          "Symbol": "NVDA 260116P175",
          "Underlying": "NVDA",
          "AssetType": "STOCKOPTION",
          "ExecutionPrice": "13.4",
          "OptionType": "PUT",
          "StrikePrice": "175"
        }
      ],
      "OrderID": "911249493",
      "OpenedDateTime": "2025-09-15T14:00:31Z",
      "OrderType": "Market",
      "PriceUsedForBuyingPower": "13.5",
      "Routing": "Intelligent",
      "Status": "FLL",
      "StatusDescription": "Filled",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "1",
      "ClosedDateTime": "2025-09-12T16:17:17Z",
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "1.97",
      "Legs": [
        {
          "ExpirationDate": "2025-09-12T00:00:00Z",
          "OpenOrClose": "Close",
          "QuantityOrdered": "1",
          "ExecQuantity": "1",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "PLTR 250912C165",
          "Underlying": "PLTR",
          "AssetType": "STOCKOPTION",
          "ExecutionPrice": "1.97",
          "OptionType": "CALL",
          "StrikePrice": "165"
        }
      ],
      "OrderID": "911128864",
      "OpenedDateTime": "2025-09-12T16:17:17Z",
      "OrderType": "Market",
      "PriceUsedForBuyingPower": "1.85",
      "Routing": "Intelligent",
      "Status": "FLL",
      "StatusDescription": "Filled",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "1",
      "ClosedDateTime": "2025-09-10T17:07:07Z",
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "500.47",
      "Legs": [
        {
          "OpenOrClose": "Open",
          "QuantityOrdered": "30",
          "ExecQuantity": "30",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "MSFT",
          "AssetType": "STOCK",
          "ExecutionPrice": "500.47"
        }
      ],
      "OrderID": "910783932",
      "OpenedDateTime": "2025-09-10T17:07:06Z",
      "OrderType": "Market",
      "PriceUsedForBuyingPower": "500.43",
      "Routing": "Intelligent",
      "Status": "FLL",
      "StatusDescription": "Filled",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "2",
      "ClosedDateTime": "2025-09-09T17:05:50Z",
      "Currency": "USD",
      "Duration": "GTC",
      "FilledPrice": "1.71",
      "GoodTillDate": "2025-09-12T00:00:00Z",
      "Legs": [
        {
          "ExpirationDate": "2025-09-12T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "1",
          "ExecQuantity": "1",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "GOOG 250912C235",
          "Underlying": "GOOG",
          "AssetType": "STOCKOPTION",
          "ExecutionPrice": "4.7",
          "OptionType": "CALL",
          "StrikePrice": "235"
        },
        {
          "ExpirationDate": "2025-09-12T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "1",
          "ExecQuantity": "1",
          "QuantityRemaining": "0",
          "BuyOrSell": "Sell",
          "Symbol": "GOOG 250912C237.5",
          "Underlying": "GOOG",
          "AssetType": "STOCKOPTION",
          "ExecutionPrice": "2.99",
          "OptionType": "CALL",
          "StrikePrice": "237.5"
        }
      ],
      "OrderID": "910570658",
      "OpenedDateTime": "2025-09-09T17:05:22Z",
      "OrderType": "Market",
      "PriceUsedForBuyingPower": "4.55",
      "Routing": "Intelligent",
      "Spread": "Vertical",
      "Status": "FLL",
      "StatusDescription": "Filled",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": "2025-09-16T21:58:50Z",
      "Currency": "USD",
      "Duration": "GTC+",
      "FilledPrice": "0",
      "GoodTillDate": "2025-12-15T00:00:00Z",
      "Legs": [
        {
          "QuantityOrdered": "10",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "FICO",
          "AssetType": "STOCK"
        }
      ],
      "OrderID": "911520499",
      "OpenedDateTime": "2025-09-16T21:58:50Z",
      "OrderType": "Market",
      "PriceUsedForBuyingPower": "1553.54",
      "RejectReason": "No market or stop orders with TIF of 'Day+','GTC+','GTD+', or 'Fill-or-Kill'",
      "Routing": "Intelligent",
      "Status": "REJ",
      "StatusDescription": "Rejected",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": "2025-08-15T20:00:00Z",
      "Currency": "USD",
      "Duration": "GTC",
      "FilledPrice": "0",
      "GoodTillDate": "2025-08-15T00:00:00Z",
      "Legs": [
        {
          "ExpirationDate": "2025-08-15T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "5",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "TSLA 250815C342.5",
          "Underlying": "TSLA",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "342.5"
        },
        {
          "ExpirationDate": "2025-08-15T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "5",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Sell",
          "Symbol": "TSLA 250815C347.5",
          "Underlying": "TSLA",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "347.5"
        }
      ],
      "LimitPrice": "1.54",
      "OrderID": "907385144",
      "OpenedDateTime": "2025-08-14T10:37:29Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "3.54",
      "Routing": "Intelligent",
      "Spread": "Vertical",
      "Status": "EXP",
      "StatusDescription": "Expired",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "1.2",
      "ClosedDateTime": "2025-08-11T13:32:22Z",
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "339.79",
      "Legs": [
        {
          "OpenOrClose": "Close",
          "QuantityOrdered": "120",
          "ExecQuantity": "120",
          "QuantityRemaining": "0",
          "BuyOrSell": "Sell",
          "Symbol": "TSLA",
          "AssetType": "STOCK",
          "ExecutionPrice": "339.79"
        }
      ],
      "OrderID": "906842861",
      "OpenedDateTime": "2025-08-11T13:32:21Z",
      "OrderType": "Market",
      "PriceUsedForBuyingPower": "339.9701",
      "Routing": "Intelligent",
      "Status": "FLL",
      "StatusDescription": "Filled",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "20",
      "ClosedDateTime": "2025-08-07T15:08:30Z",
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "1.7",
      "Legs": [
        {
          "ExpirationDate": "2025-08-08T00:00:00Z",
          "OpenOrClose": "Close",
          "QuantityOrdered": "20",
          "ExecQuantity": "20",
          "QuantityRemaining": "0",
          "BuyOrSell": "Sell",
          "Symbol": "NVDA 250808C180",
          "Underlying": "NVDA",
          "AssetType": "STOCKOPTION",
          "ExecutionPrice": "1.7",
          "OptionType": "CALL",
          "StrikePrice": "180"
        }
      ],
      "OrderID": "906538665",
      "OpenedDateTime": "2025-08-07T15:08:30Z",
      "OrderType": "Market",
      "PriceUsedForBuyingPower": "2.69",
      "Routing": "Intelligent",
      "Status": "FLL",
      "StatusDescription": "Filled",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "5",
      "ClosedDateTime": "2025-08-26T16:21:33Z",
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "3.8",
      "Legs": [
        {
          "ExpirationDate": "2025-08-29T00:00:00Z",
          "OpenOrClose": "Open",
          "QuantityOrdered": "3",
          "ExecQuantity": "1",
          "QuantityRemaining": "0",
          "BuyOrSell": "Buy",
          "Symbol": "GOOG 250829C207.5",
          "Underlying": "GOOG",
          "AssetType": "STOCKOPTION",
          "ExecutionPrice": "3.8",
          "OptionType": "CALL",
          "StrikePrice": "207.5"
        }
      ],
      "LimitPrice": "3.8",
      "OrderID": "908868778",
      "OpenedDateTime": "2025-08-26T16:21:03Z",
      "OrderType": "Limit",
      "PriceUsedForBuyingPower": "3.8",
      "Routing": "Intelligent",
      "Status": "FLP",
      "StatusDescription": "Partial Fill (UROut)",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    },
    {
      "AccountID": "SIMXXXXXXM",
      "CommissionFee": "0",
      "ClosedDateTime": "2025-08-13T15:38:47Z",
      "Currency": "USD",
      "Duration": "DAY",
      "FilledPrice": "0",
      "Legs": [
        {
          "ExpirationDate": "2025-08-15T00:00:00Z",
          "OpenOrClose": "Close",
          "QuantityOrdered": "5",
          "ExecQuantity": "0",
          "QuantityRemaining": "0",
          "BuyOrSell": "Sell",
          "Symbol": "TSLA 250815C342.5",
          "Underlying": "TSLA",
          "AssetType": "STOCKOPTION",
          "OptionType": "CALL",
          "StrikePrice": "342.5"
        }
      ],
      "LimitPrice": "4.85",
      "OrderID": "907270639",
      "OpenedDateTime": "2025-08-13T15:38:47Z",
      "OrderType": "StopLimit",
      "PriceUsedForBuyingPower": "4.89",
      "RejectReason": "Invalid Stop Price - Stop Price must be below current market.",
      "Routing": "Intelligent",
      "Status": "REJ",
      "StatusDescription": "Rejected",
      "StopPrice": "4.9",
      "AdvancedOptions": "STPTRG=SBA;",
      "ConversionRate": "1",
      "UnbundledRouteFee": "0"
    }
  ],
  "NextToken": "eyJvcmRlcklkIjoiOTA3MjcwNjM5IiwiYWNjb3VudElkIjoiU0lNWFhYWFhYTSJ9",
  "Errors": []
}
```

- Live Prices (Un listado de los precios actuales de diferentes assets aleatorios).
Estructura del response:

```JSON
{
  "AAPL": "226.60",
  "AAPL 250815C232.5": "1.20",
  "AAPL 250912C200": "4.69",
  "AMD": "177.36",
  "AMD 250815C180": "0.89",
  "AMD 250815P180": "1.83",
  "AMD 250815P182.5": "0.99",
  "AMD 250822C177.5": "2.51",
  "AMD 250829C165": "5.75",
  "AMD 250829C170": "1.56",
  "FICO": "1354.66",
  "GOOG": "233.83",
  "GOOG 250829C207.5": "3.41",
  "GOOG 250912C235": "5.41",
  "GOOG 250912C237.5": "2.60",
  "MSFT": "566.73",
  "NVDA": "206.39",
  "NVDA 250808C180": "1.60",
  "NVDA 250919C190": "2.12",
  "NVDA 250919C195": "2.57",
  "NVDA 260116P175": "15.66",
  "PLTR": "183.15",
  "PLTR 250912C165": "2.09",
  "TSLA": "333.61"
}
```

Agrégame tabs en esta vista, de manera que el usuario pueda filtrar lo que ve en 3 tabs:
- Posiciones abiertas.
- Ordenes abiertas.
- Ordenes cerradas.

También agrégame un feature de calendario donde el usuario pueda ver su realized P/L diario y la cantidad de posiciones (o trades) ejecutados por día basado en el response de historical orders.

### Improved prompt (Cowboy Prompt)

**Situación**

Estás desarrollando una aplicación de gestión de portafolio de inversiones que consume tres endpoints de una API de trading: órdenes abiertas, órdenes históricas y precios en vivo. La aplicación debe presentar información financiera compleja de manera clara y organizada, permitiendo a los usuarios monitorear sus posiciones activas, órdenes pendientes, historial de transacciones y rendimiento diario. El sistema maneja tanto acciones (stocks) como opciones (stock options), incluyendo spreads verticales con múltiples legs.

**Tarea**

Desarrollar un componente React completo que implemente una vista de portafolio con las siguientes funcionalidades:

1. Una tabla principal que muestre para cada asset único:
   - Symbol/Name del asset
   - Quantity (cantidad total de posiciones)
   - Cost Basis (costo total de adquisición en USD)
   - Unrealized P/L (ganancia/pérdida no realizada en USD)
   - Unrealized P/L % (ganancia/pérdida no realizada en porcentaje)

2. Sistema de tabs con tres vistas filtradas:
   - Posiciones abiertas (órdenes ejecutadas que aún están activas)
   - Órdenes abiertas (órdenes pendientes de ejecución)
   - Órdenes cerradas (órdenes completadas o expiradas)

3. Un componente de calendario que visualice:
   - Realized P/L diario
   - Cantidad de trades ejecutados por día

**Objetivo**

Crear una interfaz de usuario profesional, intuitiva y visualmente atractiva que permita a los traders monitorear eficientemente su portafolio, tomar decisiones informadas y analizar su rendimiento histórico. La solución debe manejar correctamente la complejidad de diferentes tipos de órdenes (market, limit, stop-limit), estados (filled, partial fill, rejected, expired), y estructuras de trading (single leg, spreads).

**Conocimiento**

Estructura de datos de los endpoints:

Open Orders Response:
```JSON
{
  "Orders": [
    {
      "AccountID": "string",
      "CommissionFee": "string",
      "ClosedDateTime": "string | null",
      "Currency": "string",
      "Duration": "string",
      "FilledPrice": "string",
      "GoodTillDate": "string",
      "Legs": [
        {
          "ExpirationDate": "string",
          "OpenOrClose": "string",
          "QuantityOrdered": "string",
          "ExecQuantity": "string",
          "QuantityRemaining": "string",
          "BuyOrSell": "string",
          "Symbol": "string",
          "Underlying": "string",
          "AssetType": "string",
          "OptionType": "string",
          "StrikePrice": "string"
        }
      ],
      "LimitPrice": "string",
      "OrderID": "string",
      "OpenedDateTime": "string",
      "OrderType": "string",
      "PriceUsedForBuyingPower": "string",
      "Routing": "string",
      "Status": "string",
      "StatusDescription": "string",
      "ConversionRate": "string",
      "UnbundledRouteFee": "string"
    }
  ],
  "NextToken": "string | null",
  "Errors": []
}
```

Historical Orders Response:
```JSON
{
  "Orders": [
    {
      "AccountID": "string",
      "CommissionFee": "string",
      "ClosedDateTime": "string",
      "Currency": "string",
      "Duration": "string",
      "FilledPrice": "string",
      "GoodTillDate": "string",
      "Legs": [
        {
          "ExpirationDate": "string",
          "OpenOrClose": "string",
          "QuantityOrdered": "string",
          "ExecQuantity": "string",
          "QuantityRemaining": "string",
          "BuyOrSell": "string",
          "Symbol": "string",
          "Underlying": "string",
          "AssetType": "string",
          "ExecutionPrice": "string",
          "OptionType": "string",
          "StrikePrice": "string"
        }
      ],
      "OrderID": "string",
      "OpenedDateTime": "string",
      "OrderType": "string",
      "PriceUsedForBuyingPower": "string",
      "Routing": "string",
      "Status": "string",
      "StatusDescription": "string",
      "ConversionRate": "string",
      "UnbundledRouteFee": "string"
    }
  ],
  "NextToken": "string | null",
  "Errors": []
}
```

Live Prices Response:
```JSON
{
  "SYMBOL": "price_string"
}
```

Reglas de cálculo:

- Cost Basis para Buy orders: `QuantityOrdered × ExecutionPrice × 100` (para opciones) o `QuantityOrdered × ExecutionPrice` (para stocks)
- Cost Basis para Sell orders: negativo del cálculo anterior
- Unrealized P/L: `(Current Price - Average Cost) × Total Quantity × Multiplier`
- Unrealized P/L %: `((Current Price - Average Cost) / Average Cost) × 100`
- Realized P/L diario: suma de todas las ganancias/pérdidas de órdenes cerradas en ese día
- Para spreads (múltiples legs): calcular cada leg por separado y sumar

Estados de órdenes relevantes:

- Posiciones abiertas: Status "FLL" o "FLP" con OpenOrClose "Open" en Historical Orders
- Órdenes abiertas: Status "OUT" en Open Orders
- Órdenes cerradas: Status "FLL", "FLP", "EXP", "REJ" en Historical Orders

Consideraciones técnicas:

- Las opciones tienen un multiplicador de 100 (cada contrato representa 100 acciones)
- Los stocks tienen multiplicador de 1
- Buy orders incrementan quantity, Sell orders la decrementan
- Manejar casos donde ExecQuantity < QuantityOrdered (fills parciales)
- Agrupar por symbol/underlying para consolidar posiciones
- Formatear montos en USD con 2 decimales
- Formatear porcentajes con 2 decimales

Estructura de archivos esperada:

```
components/
  portfolio-view.tsx (componente principal)
  portfolio-table.tsx (tabla de posiciones)
  orders-table.tsx (tabla de órdenes)
  calendar-view.tsx (vista de calendario con P/L)
utils/
  portfolio-calculations.ts (lógica de cálculos)
types/
  portfolio.ts (tipos TypeScript)
```

Manejo de edge cases:

- Órdenes sin ExecutionPrice (usar PriceUsedForBuyingPower o LimitPrice)
- Símbolos sin precio en Live Prices (mostrar "N/A")
- Órdenes rechazadas o expiradas (no incluir en posiciones abiertas)
- Spreads con múltiples legs (consolidar correctamente)
- Divisiones por cero en cálculos de porcentaje
- Fechas inválidas o nulas

### Bonus features

#### P/L Calendar
I chose P/L Calendar because it allows users to track all their trades within the same portfolio management application. By providing a clearer history of all their transactions, it also displays daily, weekly, and monthly profits and losses to help them understand their profitability path.

##### Initial prompt
Agrégame un feature de calendario donde el usuario pueda ver su realized P/L diario y la cantidad de posiciones (o trades) ejecutados por día basado en el response de historical orders.

#### Portfolio Stats
I chose the Portfolio Stats feature because it shows the users a detailed summary of their trading trajectory by showing them the total amount of trades (historically), realized p/l, unrealized p/l, total p/l, win rate, winning days streak, losing days streak, break even days, average daily p/l, best trading day p/l and worst trading day p/l.

It also includes a chart showing the evolution of their trading history over time.

All this information provides great value to traders because it allows them to track their performance throughout their trading journey.

##### Initial prompt
Agrega un tab que tenga los stats generales del portafolio (como best day, worst day, etc.), junto con un gráfico que muestre el performance del histórico de la cuenta.

### Improvements prompts

- En el calendario de P/L diario agrega también los días en los que no se hicieron trades. Agrega todos los días del mes sin excepción.

- Agrega al final de cada semana un recuento del P/L semanal.

- Cambia el texto de Realized P/L Diario por: Trades Calendar y al lado agrega en un badge el realized p/l del mes actual para el usuario color success si está en profit y color error si está en loss.

- Haz que el calendario te muestre solo el mes actual y trades del mes actual, agrega botones para cambiar el mes que se muestra.

- Agrega al detalle de cada día de trading el o los symbols tradeados. Muéstrame la información en inglés.

- Cuando se le haga hover a las ordenes rejected muéstrame un tooltip con el rejectReason para dicha orden.

- Haz que el tooltip se muestre a nivel de la fila de la tabla y no como un child del badge.

- Agrégale distancia del margen izquierdo de la tabla a los tooltips para que no se vean por detrás del fondo, y agrégale la clase `.font-comic-sans` al texto del tooltip.
Cambia el theme del tab de portfolio stats, actualmente está mostrando un light theme, pero el resto de la app usa un dark theme.

#### Error fixing prompt
Estoy teniendo este error luego de hacer la instalación de recharts, está buscando un paquete de radix-ui, pero yo eliminé la librería porque no está siendo usada así que puede ser un error de caché de parte de vite:

[vite] (client) error while updating dependencies:
[1] Error: ENOENT: no such file or directory, open '/project_dir/node_modules/@radix-ui/react-tabs/dist/index.mjs'