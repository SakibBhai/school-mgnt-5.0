"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  FileText,
  Download,
  Send,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  Calendar,
  DollarSign,
  CheckCircle,
} from "lucide-react"
import { formatCurrency } from "@/utils/currency"
import { toast } from "sonner"

// Mock invoice data with BDT amounts
const mockInvoices = [
  {
    id: "INV-2024-001",
    studentName: "Rashid Ahmed",
    studentId: "STU001",
    class: "Grade 10-A",
    feeType: "Tuition Fee",
    amount: 15000,
    issueDate: "2024-01-01",
    dueDate: "2024-01-31",
    status: "Paid",
    paidDate: "2024-01-25",
    paymentMethod: "bKash",
  },
  {
    id: "INV-2024-002",
    studentName: "Fatima Khan",
    studentId: "STU002",
    class: "Grade 9-B",
    feeType: "Activity Fee",
    amount: 2500,
    issueDate: "2024-01-01",
    dueDate: "2024-02-15",
    status: "Pending",
    paidDate: null,
    paymentMethod: null,
  },
  {
    id: "INV-2024-003",
    studentName: "Mohammad Rahman",
    studentId: "STU003",
    class: "Grade 11-A",
    feeType: "Lab Fee",
    amount: 3000,
    issueDate: "2024-01-01",
    dueDate: "2024-02-28",
    status: "Overdue",
    paidDate: null,
    paymentMethod: null,
  },
  {
    id: "INV-2024-004",
    studentName: "Ayesha Begum",
    studentId: "STU004",
    class: "Grade 8-C",
    feeType: "Transport Fee",
    amount: 1800,
    issueDate: "2024-01-01",
    dueDate: "2024-01-15",
    status: "Paid",
    paidDate: "2024-01-10",
    paymentMethod: "Nagad",
  },
]

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch =
      invoice.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || invoice.status.toLowerCase() === selectedStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })

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
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handlePreviewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice)
    setIsPreviewOpen(true)
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    toast.success(`Invoice ${invoiceId} downloaded successfully`)
  }

  const handleSendInvoice = (invoiceId: string) => {
    toast.success(`Invoice ${invoiceId} sent successfully`)
  }

  const totalInvoices = mockInvoices.length
  const paidInvoices = mockInvoices.filter((inv) => inv.status === "Paid").length
  const pendingAmount = mockInvoices.filter((inv) => inv.status !== "Paid").reduce((sum, inv) => sum + inv.amount, 0)
  const totalAmount = mockInvoices.reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoice Management</h1>
          <p className="text-muted-foreground">Generate, send, and track invoices for fee collections</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Generate Invoices
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInvoices}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paidInvoices}</div>
            <p className="text-xs text-muted-foreground">{((paidInvoices / totalInvoices) * 100).toFixed(1)}% paid</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAmount, "BDT")}</div>
            <p className="text-xs text-muted-foreground">All invoices combined</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(pendingAmount, "BDT")}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice List</CardTitle>
          <CardDescription>Manage and track all generated invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Fee Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{invoice.studentName}</div>
                      <div className="text-sm text-muted-foreground">
                        {invoice.studentId} • {invoice.class}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{invoice.feeType}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(invoice.amount, "BDT")}</TableCell>
                  <TableCell>{new Date(invoice.issueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handlePreviewInvoice(invoice)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownloadInvoice(invoice.id)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSendInvoice(invoice.id)}>
                          <Send className="h-4 w-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Invoice Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Invoice Preview</DialogTitle>
            <DialogDescription>Preview of invoice {selectedInvoice?.id}</DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-6">
              {/* Invoice Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">EduManage Pro School</h2>
                  <p className="text-muted-foreground">
                    123 Education Street
                    <br />
                    Dhaka, Bangladesh
                    <br />
                    Phone: +880-1234-567890
                  </p>
                </div>
                <div className="text-right">
                  <h3 className="text-xl font-bold">INVOICE</h3>
                  <p className="text-muted-foreground">
                    Invoice #: {selectedInvoice.id}
                    <br />
                    Date: {new Date(selectedInvoice.issueDate).toLocaleDateString()}
                    <br />
                    Due Date: {new Date(selectedInvoice.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Bill To */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-2">Bill To:</h4>
                  <p>
                    {selectedInvoice.studentName}
                    <br />
                    Student ID: {selectedInvoice.studentId}
                    <br />
                    Class: {selectedInvoice.class}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Payment Status:</h4>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(selectedInvoice.status)}
                    {selectedInvoice.paidDate && (
                      <span className="text-sm text-muted-foreground">
                        Paid on {new Date(selectedInvoice.paidDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Invoice Items */}
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>{selectedInvoice.feeType}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(selectedInvoice.amount, "BDT")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Total */}
              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between py-2 border-t">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="font-bold text-lg">{formatCurrency(selectedInvoice.amount, "BDT")}</span>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Payment Information:</h4>
                <p className="text-sm text-muted-foreground">
                  Please make payment through any of the following methods:
                  <br />• bKash: 01234-567890
                  <br />• Nagad: 01234-567890
                  <br />• Rocket: 01234-567890
                  <br />• Bank Transfer: Dutch-Bangla Bank, Account: 1234567890
                </p>
              </div>

              {/* Footer */}
              <div className="text-center text-sm text-muted-foreground border-t pt-4">
                <p>Thank you for your payment. For any queries, please contact us at fees@edumanagepro.com</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
