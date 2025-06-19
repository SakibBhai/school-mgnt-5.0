"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import {
  Download,
  FileText,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Filter,
  BarChart3,
  PieChartIcon,
  LineChartIcon,
} from "lucide-react"
import { toast } from "sonner"
import { formatCurrency } from "@/utils/currency"

// Mock data for charts
const monthlyRevenueData = [
  { month: "Jan", revenue: 125000, collections: 118000, outstanding: 7000 },
  { month: "Feb", revenue: 132000, collections: 128000, outstanding: 4000 },
  { month: "Mar", revenue: 145000, collections: 142000, outstanding: 3000 },
  { month: "Apr", revenue: 138000, collections: 135000, outstanding: 3000 },
  { month: "May", revenue: 155000, collections: 150000, outstanding: 5000 },
  { month: "Jun", revenue: 162000, collections: 158000, outstanding: 4000 },
]

const feeTypeDistribution = [
  { name: "Tuition Fees", value: 65, amount: 812500 },
  { name: "Activity Fees", value: 15, amount: 187500 },
  { name: "Lab Fees", value: 10, amount: 125000 },
  { name: "Transport Fees", value: 7, amount: 87500 },
  { name: "Other Fees", value: 3, amount: 37500 },
]

const paymentMethodData = [
  { method: "Online Payment", count: 245, percentage: 68 },
  { method: "Bank Transfer", count: 78, percentage: 22 },
  { method: "Cash", count: 28, percentage: 8 },
  { method: "Cheque", count: 9, percentage: 2 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function FeesReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedFeeType, setSelectedFeeType] = useState("all")

  const handleExportReport = (reportType: string) => {
    toast.success(`${reportType} report exported successfully`)
  }

  const handleGenerateReport = () => {
    toast.success("Custom report generated successfully")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Reports</h1>
          <p className="text-muted-foreground">Comprehensive financial analytics and reporting dashboard</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => handleExportReport("Summary")}>
            <Download className="h-4 w-4 mr-2" />
            Export Summary
          </Button>
          <Button variant="outline" onClick={() => handleExportReport("Detailed")}>
            <FileText className="h-4 w-4 mr-2" />
            Detailed Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
          <CardDescription>Customize your financial reports with specific filters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="period">Time Period</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Class/Grade</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="grade-1">Grade 1</SelectItem>
                  <SelectItem value="grade-2">Grade 2</SelectItem>
                  <SelectItem value="grade-3">Grade 3</SelectItem>
                  <SelectItem value="grade-4">Grade 4</SelectItem>
                  <SelectItem value="grade-5">Grade 5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fee-type">Fee Type</Label>
              <Select value={selectedFeeType} onValueChange={setSelectedFeeType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fee type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fee Types</SelectItem>
                  <SelectItem value="tuition">Tuition Fees</SelectItem>
                  <SelectItem value="activity">Activity Fees</SelectItem>
                  <SelectItem value="lab">Lab Fees</SelectItem>
                  <SelectItem value="transport">Transport Fees</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date Range</Label>
              <DatePickerWithRange />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleGenerateReport}>
              <Filter className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(1257000, "BDT")}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.2%</span> from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Payment Time</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 days</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-0.8 days</span> from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="distribution">Fee Distribution</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        {/* Revenue Analysis */}
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Monthly Revenue vs Collections
              </CardTitle>
              <CardDescription>Comparison of expected revenue and actual collections</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Expected Revenue",
                    color: "hsl(var(--chart-1))",
                  },
                  collections: {
                    label: "Actual Collections",
                    color: "hsl(var(--chart-2))",
                  },
                  outstanding: {
                    label: "Outstanding",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" name="Expected Revenue" />
                    <Bar dataKey="collections" fill="var(--color-collections)" name="Actual Collections" />
                    <Bar dataKey="outstanding" fill="var(--color-outstanding)" name="Outstanding" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fee Distribution */}
        <TabsContent value="distribution" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChartIcon className="h-5 w-5 mr-2" />
                  Fee Type Distribution
                </CardTitle>
                <CardDescription>Breakdown of revenue by fee categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Percentage",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={feeTypeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {feeTypeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fee Category Details</CardTitle>
                <CardDescription>Detailed breakdown with amounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feeTypeDistribution.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{formatCurrency(item.amount, "BDT")}</div>
                        <div className="text-xs text-muted-foreground">{item.value}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment Methods */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method Analysis</CardTitle>
              <CardDescription>Distribution of payment methods used by students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethodData.map((method, index) => (
                  <div key={method.method} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{method.method}</span>
                      <div className="text-right">
                        <span className="text-sm font-medium">{method.count} transactions</span>
                        <span className="text-xs text-muted-foreground ml-2">({method.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${method.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends */}
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChartIcon className="h-5 w-5 mr-2" />
                Collection Trends
              </CardTitle>
              <CardDescription>Monthly collection trends and patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  collections: {
                    label: "Collections",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="collections"
                      stroke="var(--color-collections)"
                      strokeWidth={2}
                      dot={{ fill: "var(--color-collections)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
