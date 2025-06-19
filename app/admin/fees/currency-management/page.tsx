"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TrendingUp, RefreshCw, Settings, Globe, DollarSign, AlertCircle, CheckCircle, Clock, Plus } from "lucide-react"
import { CurrencyConverter } from "@/components/currency-converter"
import { SUPPORTED_CURRENCIES, formatCurrency } from "@/utils/currency"
import { toast } from "sonner"

// Mock exchange rate data
const mockExchangeRates = [
  { from: "BDT", to: "USD", rate: 0.0091, change: +0.0001, lastUpdated: "2024-01-15 10:30:00" },
  { from: "BDT", to: "EUR", rate: 0.0084, change: -0.0002, lastUpdated: "2024-01-15 10:30:00" },
  { from: "BDT", to: "GBP", rate: 0.0072, change: +0.0001, lastUpdated: "2024-01-15 10:30:00" },
  { from: "BDT", to: "INR", rate: 0.76, change: +0.01, lastUpdated: "2024-01-15 10:30:00" },
]

const mockCurrencySettings = [
  { currency: "BDT", enabled: true, isDefault: true, autoUpdate: true },
  { currency: "USD", enabled: true, isDefault: false, autoUpdate: true },
  { currency: "EUR", enabled: false, isDefault: false, autoUpdate: false },
  { currency: "GBP", enabled: false, isDefault: false, autoUpdate: false },
  { currency: "INR", enabled: true, isDefault: false, autoUpdate: true },
]

export default function CurrencyManagementPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isAddRateDialogOpen, setIsAddRateDialogOpen] = useState(false)
  const [newRate, setNewRate] = useState({ from: "BDT", to: "USD", rate: "" })

  const handleRefreshRates = async () => {
    setIsRefreshing(true)
    // Simulate API call to refresh exchange rates
    setTimeout(() => {
      setIsRefreshing(false)
      toast.success("Exchange rates updated successfully")
    }, 2000)
  }

  const handleAddCustomRate = () => {
    if (!newRate.rate || Number.parseFloat(newRate.rate) <= 0) {
      toast.error("Please enter a valid exchange rate")
      return
    }

    toast.success("Custom exchange rate added successfully")
    setIsAddRateDialogOpen(false)
    setNewRate({ from: "BDT", to: "USD", rate: "" })
  }

  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return <span className="text-green-600 text-sm">+{change.toFixed(4)}</span>
    } else if (change < 0) {
      return <span className="text-red-600 text-sm">{change.toFixed(4)}</span>
    }
    return <span className="text-gray-500 text-sm">0.0000</span>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Currency Management</h1>
          <p className="text-muted-foreground">
            Manage currencies, exchange rates, and conversion settings for the fees system
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleRefreshRates} disabled={isRefreshing}>
            {isRefreshing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2" />
                Updating...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Rates
              </>
            )}
          </Button>
          <Dialog open={isAddRateDialogOpen} onOpenChange={setIsAddRateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Custom Rate
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Custom Exchange Rate</DialogTitle>
                <DialogDescription>Set a custom exchange rate for specific currency pairs</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from-currency">From Currency</Label>
                    <Input
                      id="from-currency"
                      value={newRate.from}
                      onChange={(e) => setNewRate({ ...newRate, from: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to-currency">To Currency</Label>
                    <Input
                      id="to-currency"
                      value={newRate.to}
                      onChange={(e) => setNewRate({ ...newRate, to: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exchange-rate">Exchange Rate</Label>
                  <Input
                    id="exchange-rate"
                    type="number"
                    step="0.0001"
                    placeholder="0.0000"
                    value={newRate.rate}
                    onChange={(e) => setNewRate({ ...newRate, rate: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddRateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCustomRate}>Add Rate</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Currency Status Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Default Currency</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">BDT</div>
            <p className="text-xs text-muted-foreground">Bangladesh Taka (৳)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Currencies</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">BDT, USD, INR enabled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Rate Update</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10:30</div>
            <p className="text-xs text-muted-foreground">Today, automatic update</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rate Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">All rates up to date</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="exchange-rates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="exchange-rates">Exchange Rates</TabsTrigger>
          <TabsTrigger value="converter">Currency Converter</TabsTrigger>
          <TabsTrigger value="settings">Currency Settings</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        {/* Exchange Rates */}
        <TabsContent value="exchange-rates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Current Exchange Rates
              </CardTitle>
              <CardDescription>Real-time exchange rates for BDT against other supported currencies</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Currency Pair</TableHead>
                    <TableHead>Exchange Rate</TableHead>
                    <TableHead>24h Change</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockExchangeRates.map((rate, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {rate.from}/{rate.to}
                      </TableCell>
                      <TableCell>
                        <div className="font-mono">{rate.rate.toFixed(4)}</div>
                      </TableCell>
                      <TableCell>{getChangeIndicator(rate.change)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{rate.lastUpdated}</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Active
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rate Update Settings</CardTitle>
              <CardDescription>Configure how exchange rates are updated</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatic Rate Updates</Label>
                  <div className="text-sm text-muted-foreground">Automatically update exchange rates every hour</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Rate Change Notifications</Label>
                  <div className="text-sm text-muted-foreground">Notify when exchange rates change significantly</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekend Rate Updates</Label>
                  <div className="text-sm text-muted-foreground">Continue updating rates during weekends</div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Currency Converter */}
        <TabsContent value="converter" className="space-y-4">
          <CurrencyConverter
            defaultAmount={10000}
            defaultFromCurrency="BDT"
            defaultToCurrency="USD"
            onConversionComplete={(result) => {
              console.log("Conversion completed:", result)
            }}
          />

          <Card>
            <CardHeader>
              <CardTitle>Quick Conversions</CardTitle>
              <CardDescription>Common fee amounts converted to different currencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: "Monthly Tuition", bdt: 15000 },
                  { label: "Activity Fee", bdt: 2500 },
                  { label: "Lab Fee", bdt: 3000 },
                  { label: "Transport Fee", bdt: 1800 },
                  { label: "Exam Fee", bdt: 1200 },
                  { label: "Library Fee", bdt: 500 },
                ].map((fee, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="font-medium mb-2">{fee.label}</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>BDT:</span>
                        <span className="font-mono">{formatCurrency(fee.bdt, "BDT")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>USD:</span>
                        <span className="font-mono">${(fee.bdt * 0.0091).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>INR:</span>
                        <span className="font-mono">₹{(fee.bdt * 0.76).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Currency Settings */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Currency Configuration
              </CardTitle>
              <CardDescription>Manage which currencies are enabled and their settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Currency</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Auto Update</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCurrencySettings.map((setting, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{setting.currency}</div>
                          <div className="text-sm text-muted-foreground">
                            {SUPPORTED_CURRENCIES[setting.currency]?.name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-lg">
                        {SUPPORTED_CURRENCIES[setting.currency]?.symbol}
                      </TableCell>
                      <TableCell>
                        {setting.enabled ? (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Enabled
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Disabled</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {setting.isDefault ? (
                          <Badge variant="default">Default</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Switch defaultChecked={setting.autoUpdate} />
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance */}
        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bangladesh Regulatory Compliance</CardTitle>
              <CardDescription>Compliance status for BDT transactions and regulations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-800">Bangladesh Bank Compliance</div>
                    <div className="text-sm text-green-600">
                      All BDT transactions comply with Bangladesh Bank regulations
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-800">Digital Payment Compliance</div>
                    <div className="text-sm text-green-600">
                      bKash, Nagad, and Rocket integrations meet regulatory standards
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-800">Transaction Reporting</div>
                    <div className="text-sm text-blue-600">
                      Automated reporting for transactions above ৳50,000 as per regulations
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-800">Data Security</div>
                    <div className="text-sm text-green-600">
                      All financial data encrypted and stored according to local data protection laws
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regulatory Documentation</CardTitle>
              <CardDescription>Required documentation and compliance certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Bangladesh Bank License", status: "Valid", expiry: "2025-12-31" },
                  { name: "Digital Payment License", status: "Valid", expiry: "2024-06-30" },
                  { name: "Tax Registration Certificate", status: "Valid", expiry: "2024-12-31" },
                  { name: "Educational Institution License", status: "Valid", expiry: "2025-03-31" },
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{doc.name}</div>
                      <div className="text-sm text-muted-foreground">Expires: {doc.expiry}</div>
                    </div>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      {doc.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
