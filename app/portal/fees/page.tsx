"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DollarSign,
  CreditCard,
  Calendar,
  Download,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  Receipt,
  Smartphone,
  Wallet,
  Building,
} from "lucide-react"
import { toast } from "sonner"
import { formatCurrency } from "@/utils/currency"

// Mock data for student fees
const mockFeeStructure = [
  {
    id: "1",
    feeType: "Tuition Fee",
    amount: 15000,
    dueDate: "2024-01-31",
    status: "Paid",
    paidDate: "2024-01-25",
    paymentMethod: "Credit Card",
    transactionId: "TXN123456789",
  },
  {
    id: "2",
    feeType: "Activity Fee",
    amount: 2500,
    dueDate: "2024-02-15",
    status: "Pending",
    paidDate: null,
    paymentMethod: null,
    transactionId: null,
  },
  {
    id: "3",
    feeType: "Lab Fee",
    amount: 3000,
    dueDate: "2024-02-28",
    status: "Due Soon",
    paidDate: null,
    paymentMethod: null,
    transactionId: null,
  },
  {
    id: "4",
    feeType: "Transport Fee",
    amount: 1800,
    dueDate: "2024-01-15",
    status: "Overdue",
    paidDate: null,
    paymentMethod: null,
    transactionId: null,
  },
]

const mockPaymentHistory = [
  {
    id: "PAY001",
    date: "2024-01-25",
    feeType: "Tuition Fee",
    amount: 15000,
    paymentMethod: "Credit Card",
    status: "Completed",
    transactionId: "TXN123456789",
    receiptUrl: "#",
  },
  {
    id: "PAY002",
    date: "2023-12-20",
    feeType: "Tuition Fee",
    amount: 15000,
    paymentMethod: "Bank Transfer",
    status: "Completed",
    transactionId: "TXN123456788",
    receiptUrl: "#",
  },
  {
    id: "PAY003",
    date: "2023-11-25",
    feeType: "Activity Fee",
    amount: 2500,
    paymentMethod: "UPI",
    status: "Completed",
    transactionId: "TXN123456787",
    receiptUrl: "#",
  },
]

export default function StudentFeesPage() {
  const [selectedFee, setSelectedFee] = useState<any>(null)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Paid
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="border-blue-300 text-blue-700">
            Pending
          </Badge>
        )
      case "due soon":
        return (
          <Badge variant="outline" className="border-yellow-300 text-yellow-700">
            Due Soon
          </Badge>
        )
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handlePayNow = (fee: any) => {
    setSelectedFee(fee)
    setIsPaymentDialogOpen(true)
  }

  const handleProcessPayment = async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method")
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsPaymentDialogOpen(false)
      setPaymentMethod("")
      setSelectedFee(null)
      toast.success("Payment processed successfully!")
    }, 3000)
  }

  const totalPending = mockFeeStructure.filter((fee) => fee.status !== "Paid").reduce((sum, fee) => sum + fee.amount, 0)

  const totalPaid = mockFeeStructure.filter((fee) => fee.status === "Paid").reduce((sum, fee) => sum + fee.amount, 0)

  const overdueCount = mockFeeStructure.filter((fee) => fee.status === "Overdue").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fees & Payments</h1>
          <p className="text-muted-foreground">View your fee structure, make payments, and track payment history</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download Statement
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPending, "BDT")}</div>
            <p className="text-xs text-muted-foreground">
              {mockFeeStructure.filter((f) => f.status !== "Paid").length} pending payments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPaid, "BDT")}</div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueCount}</div>
            <p className="text-xs text-muted-foreground">
              {overdueCount > 0 ? "Requires immediate attention" : "No overdue payments"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Due</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Feb 15</div>
            <p className="text-xs text-muted-foreground">Activity Fee - ₹2,500</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="current-fees" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current-fees">Current Fees</TabsTrigger>
          <TabsTrigger value="payment-history">Payment History</TabsTrigger>
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
        </TabsList>

        {/* Current Fees */}
        <TabsContent value="current-fees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fee Structure - Academic Year 2024-25</CardTitle>
              <CardDescription>Your current fee structure and payment status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fee Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFeeStructure.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell className="font-medium">{fee.feeType}</TableCell>
                      <TableCell>{formatCurrency(fee.amount, "BDT")}</TableCell>
                      <TableCell>{new Date(fee.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(fee.status)}</TableCell>
                      <TableCell>
                        {fee.paymentMethod ? (
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                            {fee.paymentMethod}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {fee.status === "Paid" ? (
                          <Button variant="outline" size="sm">
                            <Receipt className="h-4 w-4 mr-2" />
                            Receipt
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handlePayNow(fee)}
                            className={fee.status === "Overdue" ? "bg-red-600 hover:bg-red-700" : ""}
                          >
                            <DollarSign className="h-4 w-4 mr-2" />
                            Pay Now
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment History */}
        <TabsContent value="payment-history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your complete payment transaction history</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Fee Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPaymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{payment.feeType}</TableCell>
                      <TableCell>{formatCurrency(payment.amount, "BDT")}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                          {payment.paymentMethod}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{payment.transactionId}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Receipt
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Receipts */}
        <TabsContent value="receipts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Receipts</CardTitle>
              <CardDescription>Download and manage your payment receipts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Receipt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Receipt Management</h3>
                <p className="text-muted-foreground mb-4">All your payment receipts are available for download</p>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download All Receipts
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Make Payment</DialogTitle>
            <DialogDescription>Complete your fee payment securely</DialogDescription>
          </DialogHeader>
          {selectedFee && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Fee Type:</span>
                  <span>{selectedFee.feeType}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Amount:</span>
                  <span className="text-lg font-bold">{formatCurrency(selectedFee.amount, "BDT")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Due Date:</span>
                  <span>{new Date(selectedFee.dueDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-method">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bkash">
                      <div className="flex items-center">
                        <Smartphone className="h-4 w-4 mr-2" />
                        bKash
                      </div>
                    </SelectItem>
                    <SelectItem value="nagad">
                      <div className="flex items-center">
                        <Smartphone className="h-4 w-4 mr-2" />
                        Nagad
                      </div>
                    </SelectItem>
                    <SelectItem value="rocket">
                      <div className="flex items-center">
                        <Smartphone className="h-4 w-4 mr-2" />
                        Rocket
                      </div>
                    </SelectItem>
                    <SelectItem value="upay">
                      <div className="flex items-center">
                        <Smartphone className="h-4 w-4 mr-2" />
                        Upay
                      </div>
                    </SelectItem>
                    <SelectItem value="credit-card">
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Credit Card
                      </div>
                    </SelectItem>
                    <SelectItem value="debit-card">
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Debit Card
                      </div>
                    </SelectItem>
                    <SelectItem value="net-banking">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2" />
                        Net Banking
                      </div>
                    </SelectItem>
                    <SelectItem value="wallet">
                      <div className="flex items-center">
                        <Wallet className="h-4 w-4 mr-2" />
                        Digital Wallet
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {paymentMethod === "credit-card" || paymentMethod === "debit-card" ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" maxLength={19} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" maxLength={5} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" maxLength={3} type="password" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Cardholder Name</Label>
                    <Input id="card-name" placeholder="John Doe" />
                  </div>
                </div>
              ) : null}

              <div className="text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Secure payment powered by industry-standard encryption</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button onClick={handleProcessPayment} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Pay {formatCurrency(selectedFee?.amount || 0, "BDT")}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
