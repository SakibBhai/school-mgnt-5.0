"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowRightLeft, RefreshCw, TrendingUp } from "lucide-react"
import { SUPPORTED_CURRENCIES, convertCurrency, formatCurrency, getExchangeRate } from "@/utils/currency"
import { toast } from "sonner"

interface CurrencyConverterProps {
  defaultAmount?: number
  defaultFromCurrency?: string
  defaultToCurrency?: string
  onConversionComplete?: (result: {
    amount: number
    fromCurrency: string
    toCurrency: string
    convertedAmount: number
  }) => void
}

export function CurrencyConverter({
  defaultAmount = 0,
  defaultFromCurrency = "BDT",
  defaultToCurrency = "USD",
  onConversionComplete,
}: CurrencyConverterProps) {
  const [amount, setAmount] = useState(defaultAmount.toString())
  const [fromCurrency, setFromCurrency] = useState(defaultFromCurrency)
  const [toCurrency, setToCurrency] = useState(defaultToCurrency)
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [exchangeRate, setExchangeRate] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const handleConvert = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount")
      return
    }

    setIsLoading(true)
    try {
      const rate = await getExchangeRate(fromCurrency, toCurrency)
      const converted = await convertCurrency(Number.parseFloat(amount), fromCurrency, toCurrency)

      setExchangeRate(rate)
      setConvertedAmount(converted)
      setLastUpdated(new Date())

      onConversionComplete?.({
        amount: Number.parseFloat(amount),
        fromCurrency,
        toCurrency,
        convertedAmount: converted,
      })

      toast.success("Currency converted successfully")
    } catch (error) {
      toast.error("Failed to convert currency")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    if (convertedAmount > 0) {
      setAmount(convertedAmount.toString())
      setConvertedAmount(Number.parseFloat(amount))
    }
  }

  useEffect(() => {
    if (amount && Number.parseFloat(amount) > 0) {
      handleConvert()
    }
  }, [fromCurrency, toCurrency])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Currency Converter
        </CardTitle>
        <CardDescription>Convert between supported currencies with real-time exchange rates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="from-currency">From Currency</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SUPPORTED_CURRENCIES).map(([code, config]) => (
                  <SelectItem key={code} value={code}>
                    {config.symbol} {config.name} ({code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="outline" size="sm" onClick={handleSwapCurrencies}>
            <ArrowRightLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="converted-amount">Converted Amount</Label>
            <div className="p-3 bg-gray-50 rounded-md border">
              <div className="text-lg font-semibold">
                {convertedAmount > 0 ? formatCurrency(convertedAmount, toCurrency) : formatCurrency(0, toCurrency)}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="to-currency">To Currency</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SUPPORTED_CURRENCIES).map(([code, config]) => (
                  <SelectItem key={code} value={code}>
                    {config.symbol} {config.name} ({code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button onClick={handleConvert} disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Converting...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Convert
              </>
            )}
          </Button>

          {exchangeRate > 0 && (
            <div className="text-right">
              <Badge variant="outline">
                1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
              </Badge>
              {lastUpdated && (
                <div className="text-xs text-muted-foreground mt-1">Updated: {lastUpdated.toLocaleTimeString()}</div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
