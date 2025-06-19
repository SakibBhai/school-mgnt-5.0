// Currency utility functions for BDT support
export interface CurrencyConfig {
  code: string
  symbol: string
  name: string
  decimalPlaces: number
  thousandsSeparator: string
  decimalSeparator: string
}

export const SUPPORTED_CURRENCIES: Record<string, CurrencyConfig> = {
  BDT: {
    code: "BDT",
    symbol: "৳",
    name: "Bangladesh Taka",
    decimalPlaces: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
  INR: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    decimalPlaces: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    decimalPlaces: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    decimalPlaces: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    decimalPlaces: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
}

// Format currency amount based on currency configuration
export function formatCurrency(amount: number, currencyCode = "BDT"): string {
  const config = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.BDT

  const formattedAmount = amount.toLocaleString("en-BD", {
    minimumFractionDigits: config.decimalPlaces,
    maximumFractionDigits: config.decimalPlaces,
  })

  return `${config.symbol}${formattedAmount}`
}

// Parse currency string to number
export function parseCurrency(currencyString: string, currencyCode = "BDT"): number {
  const config = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.BDT

  // Remove currency symbol and separators
  const cleanString = currencyString
    .replace(config.symbol, "")
    .replace(new RegExp(`\\${config.thousandsSeparator}`, "g"), "")
    .replace(config.decimalSeparator, ".")
    .trim()

  return Number.parseFloat(cleanString) || 0
}

// Currency conversion functionality
export interface ExchangeRate {
  from: string
  to: string
  rate: number
  lastUpdated: Date
}

// Mock exchange rates - in production, this would come from a real API
const MOCK_EXCHANGE_RATES: ExchangeRate[] = [
  { from: "BDT", to: "USD", rate: 0.0091, lastUpdated: new Date() },
  { from: "BDT", to: "EUR", rate: 0.0084, lastUpdated: new Date() },
  { from: "BDT", to: "GBP", rate: 0.0072, lastUpdated: new Date() },
  { from: "BDT", to: "INR", rate: 0.76, lastUpdated: new Date() },
  { from: "USD", to: "BDT", rate: 110.0, lastUpdated: new Date() },
  { from: "EUR", to: "BDT", rate: 119.0, lastUpdated: new Date() },
  { from: "GBP", to: "BDT", rate: 138.0, lastUpdated: new Date() },
  { from: "INR", to: "BDT", rate: 1.32, lastUpdated: new Date() },
]

export async function getExchangeRate(from: string, to: string): Promise<number> {
  // In production, this would fetch from a real exchange rate API
  const rate = MOCK_EXCHANGE_RATES.find((r) => r.from === from && r.to === to)
  return rate?.rate || 1
}

export async function convertCurrency(amount: number, from: string, to: string): Promise<number> {
  if (from === to) return amount

  const rate = await getExchangeRate(from, to)
  return amount * rate
}

// Get currency symbol
export function getCurrencySymbol(currencyCode: string): string {
  return SUPPORTED_CURRENCIES[currencyCode]?.symbol || "৳"
}

// Validate currency code
export function isValidCurrency(currencyCode: string): boolean {
  return currencyCode in SUPPORTED_CURRENCIES
}

// Get default currency (BDT for Bangladesh)
export function getDefaultCurrency(): string {
  return "BDT"
}
