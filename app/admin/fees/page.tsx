"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  AlertCircle,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Users,
  Receipt,
  Bell,
  Settings,
  FileText,
  BarChart3,
  Clock,
  Send,
  X,
  QrCode,
  Printer,
} from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

import { formatCurrency, getCurrencySymbol } from "@/utils/currency"

// Mock data for fees and payments
const mockFeeStructures = [
  {
    id: "1",
    name: "Tuition Fee - Grade 10",
    category: "Tuition",
    amount: 15000,
    frequency: "Monthly",
    dueDate: "5th of every month",
    status: "Active",
    studentsCount: 45,
    description: "Monthly tuition fee for Grade 10 students",
  },
  {
    id: "2",
    name: "Activity Fee - Sports",
    category: "Activity",
    amount: 2500,
    frequency: "Quarterly",
    dueDate: "1st of quarter",
    status: "Active",
    studentsCount: 120,
    description: "Quarterly sports and extracurricular activities fee",
  },
  {
    id: "3",
    name: "Library Fee",
    category: "Facility",
    amount: 500,
    frequency: "Annual",
    dueDate: "April 1st",
    status: "Active",
    studentsCount: 200,
    description: "Annual library maintenance and book fee",
  },
  {
    id: "4",
    name: "Lab Fee - Science",
    category: "Laboratory",
    amount: 3000,
    frequency: "Semester",
    dueDate: "Start of semester",
    status: "Active",
    studentsCount: 80,
    description: "Semester laboratory equipment and materials fee",
  },
]

const mockRecentPayments = [
  {
    id: "PAY001",
    studentName: "John Doe",
    studentId: "STU001",
    amount: 15000,
    feeType: "Tuition Fee",
    paymentMethod: "Credit Card",
    status: "Completed",
    date: "2024-01-15",
    dueDate: "2024-01-10",
    transactionId: "TXN123456789",
    notes: "Payment received on time",
  },
  {
    id: "PAY002",
    studentName: "Jane Smith",
    studentId: "STU002",
    amount: 2500,
    feeType: "Activity Fee",
    paymentMethod: "Bank Transfer",
    status: "Completed",
    date: "2024-01-14",
    dueDate: "2024-01-12",
    transactionId: "TXN123456790",
    notes: "Sports activity fee for Q1",
  },
  {
    id: "PAY003",
    studentName: "Mike Johnson",
    studentId: "STU003",
    amount: 15000,
    feeType: "Tuition Fee",
    paymentMethod: "Debit Card",
    status: "Pending",
    date: "2024-01-13",
    dueDate: "2024-01-15",
    transactionId: "TXN123456791",
    notes: "Awaiting bank confirmation",
  },
]

const mockOutstandingPayments = [
  {
    id: "OUT001",
    studentName: "Sarah Wilson",
    studentId: "STU004",
    amount: 15000,
    feeType: "Tuition Fee",
    dueDate: "2024-01-05",
    daysOverdue: 10,
    status: "Overdue",
  },
  {
    id: "OUT002",
    studentName: "David Brown",
    studentId: "STU005",
    amount: 3000,
    feeType: "Lab Fee",
    dueDate: "2024-01-20",
    daysOverdue: 0,
    status: "Due Soon",
  },
]

export default function FeesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedFee, setSelectedFee] = useState<any>(null)
  
  // Payment-related modals
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false)
  const [isEditPaymentOpen, setIsEditPaymentOpen] = useState(false)
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [editPaymentForm, setEditPaymentForm] = useState({
    feeType: "",
    amount: "",
    dueDate: "",
    status: "",
    notes: "",
  })
  const [invoiceOptions, setInvoiceOptions] = useState({
    includeQR: false,
    includeSignature: true,
  })
  
  const [newFeeStructure, setNewFeeStructure] = useState({
    name: "",
    category: "",
    amount: "",
    frequency: "",
    dueDate: "",
    description: "",
    isRecurring: true,
    isActive: true,
  })

  // Filter fee structures based on search and filters
  const filteredFeeStructures = useMemo(() => {
    return mockFeeStructures.filter((fee) => {
      const matchesSearch =
        fee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fee.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === "all" || fee.category.toLowerCase() === selectedCategory.toLowerCase()
      const matchesStatus = selectedStatus === "all" || fee.status.toLowerCase() === selectedStatus.toLowerCase()

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [searchTerm, selectedCategory, selectedStatus])

  const handleCreateFeeStructure = () => {
    // Validate form
    if (!newFeeStructure.name || !newFeeStructure.category || !newFeeStructure.amount) {
      toast.error("Please fill in all required fields")
      return
    }

    // Simulate API call
    toast.success("Fee structure created successfully")
    setIsCreateDialogOpen(false)
    setNewFeeStructure({
      name: "",
      category: "",
      amount: "",
      frequency: "",
      dueDate: "",
      description: "",
      isRecurring: true,
      isActive: true,
    })
  }

  const handleEditFeeStructure = () => {
    toast.success("Fee structure updated successfully")
    setIsEditDialogOpen(false)
    setSelectedFee(null)
  }

  const handleDeleteFeeStructure = (feeId: string) => {
    toast.success("Fee structure deleted successfully")
  }

  const handleSendReminder = (paymentId: string) => {
    toast.success("Payment reminder sent successfully")
  }

  // Payment action handlers
  const handleViewPaymentDetails = (payment: any) => {
    setSelectedPayment(payment)
    setIsViewDetailsOpen(true)
  }

  const handleEditPayment = (payment: any) => {
    setSelectedPayment(payment)
    setEditPaymentForm({
      feeType: payment.feeType,
      amount: payment.amount.toString(),
      dueDate: payment.dueDate,
      status: payment.status,
      notes: payment.notes || "",
    })
    setIsEditPaymentOpen(true)
  }

  const handleSavePaymentEdit = () => {
    if (!editPaymentForm.feeType || !editPaymentForm.amount || !editPaymentForm.status) {
      toast.error("Please fill in all required fields")
      return
    }

    if (parseFloat(editPaymentForm.amount) <= 0) {
      toast.error("Amount must be positive")
      return
    }

    toast.success("Payment updated successfully")
    setIsEditPaymentOpen(false)
    setSelectedPayment(null)
  }

  const handleGenerateInvoice = (payment: any) => {
    setSelectedPayment(payment)
    setIsInvoiceModalOpen(true)
  }

  const handleDownloadInvoice = () => {
    toast.success("Invoice generated and downloaded successfully")
    setIsInvoiceModalOpen(false)
  }

  const handlePrintInvoice = () => {
    toast.success("Invoice sent to printer")
    setIsInvoiceModalOpen(false)
  }

  const handleDeletePayment = (payment: any) => {
    setSelectedPayment(payment)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeletePayment = () => {
    toast.success("Payment record deleted successfully")
    setIsDeleteDialogOpen(false)
    setSelectedPayment(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-300 text-yellow-700">
            Pending
          </Badge>
        )
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      case "due soon":
        return (
          <Badge variant="outline" className="border-orange-300 text-orange-700">
            Due Soon
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fees & Payments</h1>
          <p className="text-muted-foreground">
            Manage fee structures, process payments, and track financial transactions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href="/admin/fees/reports">
              <BarChart3 className="h-4 w-4 mr-2" />
              Reports
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/fees/settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Fee Structure
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Fee Structure</DialogTitle>
                <DialogDescription>
                  Define a new fee structure for students. All fields marked with * are required.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fee-name">Fee Name *</Label>
                    <Input
                      id="fee-name"
                      placeholder="e.g., Tuition Fee - Grade 10"
                      value={newFeeStructure.name}
                      onChange={(e) => setNewFeeStructure({ ...newFeeStructure, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fee-category">Category *</Label>
                    <Select
                      value={newFeeStructure.category}
                      onValueChange={(value) => setNewFeeStructure({ ...newFeeStructure, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tuition">Tuition</SelectItem>
                        <SelectItem value="activity">Activity</SelectItem>
                        <SelectItem value="facility">Facility</SelectItem>
                        <SelectItem value="laboratory">Laboratory</SelectItem>
                        <SelectItem value="transport">Transport</SelectItem>
                        <SelectItem value="examination">Examination</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fee-amount">Amount ({getCurrencySymbol("BDT")}) *</Label>
                    <Input
                      id="fee-amount"
                      type="number"
                      placeholder="0.00"
                      value={newFeeStructure.amount}
                      onChange={(e) => setNewFeeStructure({ ...newFeeStructure, amount: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fee-frequency">Payment Frequency</Label>
                    <Select
                      value={newFeeStructure.frequency}
                      onValueChange={(value) => setNewFeeStructure({ ...newFeeStructure, frequency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-time">One Time</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="semester">Semester</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fee-due-date">Due Date</Label>
                  <Input
                    id="fee-due-date"
                    placeholder="e.g., 5th of every month, Start of semester"
                    value={newFeeStructure.dueDate}
                    onChange={(e) => setNewFeeStructure({ ...newFeeStructure, dueDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fee-description">Description</Label>
                  <Textarea
                    id="fee-description"
                    placeholder="Brief description of the fee"
                    value={newFeeStructure.description}
                    onChange={(e) => setNewFeeStructure({ ...newFeeStructure, description: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is-recurring"
                      checked={newFeeStructure.isRecurring}
                      onCheckedChange={(checked) => setNewFeeStructure({ ...newFeeStructure, isRecurring: checked })}
                    />
                    <Label htmlFor="is-recurring">Recurring Fee</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is-active"
                      checked={newFeeStructure.isActive}
                      onCheckedChange={(checked) => setNewFeeStructure({ ...newFeeStructure, isActive: checked })}
                    />
                    <Label htmlFor="is-active">Active</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateFeeStructure}>Create Fee Structure</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(1245000, "BDT")}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(85000, "BDT")}</div>
            <p className="text-xs text-muted-foreground">45 outstanding invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(25000, "BDT")}</div>
            <p className="text-xs text-muted-foreground">12 overdue payments</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="structures" className="space-y-4">
        <TabsList>
          <TabsTrigger value="structures">Fee Structures</TabsTrigger>
          <TabsTrigger value="payments">Recent Payments</TabsTrigger>
          <TabsTrigger value="outstanding">Outstanding</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        {/* Fee Structures Tab */}
        <TabsContent value="structures" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Fee Structures</CardTitle>
                  <CardDescription>Manage different fee categories and payment schedules</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search fee structures..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="tuition">Tuition</SelectItem>
                      <SelectItem value="activity">Activity</SelectItem>
                      <SelectItem value="facility">Facility</SelectItem>
                      <SelectItem value="laboratory">Laboratory</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fee Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFeeStructures.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{fee.name}</div>
                          <div className="text-sm text-muted-foreground">{fee.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{fee.category}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{formatCurrency(fee.amount, "BDT")}</TableCell>
                      <TableCell>{fee.frequency}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          {fee.studentsCount}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(fee.status)}</TableCell>
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
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedFee(fee)
                                setIsEditDialogOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Receipt className="h-4 w-4 mr-2" />
                              Generate Invoices
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteFeeStructure(fee.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
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
        </TabsContent>

        {/* Recent Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>Latest payment transactions and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Fee Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRecentPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{payment.studentName}</div>
                          <div className="text-sm text-muted-foreground">{payment.studentId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{payment.feeType}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(payment.amount, "BDT")}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                          {payment.paymentMethod}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleViewPaymentDetails(payment)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditPayment(payment)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleGenerateInvoice(payment)}>
                              <Receipt className="h-4 w-4 mr-2" />
                              Generate Invoice
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600" 
                              onClick={() => handleDeletePayment(payment)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
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
        </TabsContent>

        {/* Outstanding Payments Tab */}
        <TabsContent value="outstanding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Outstanding Payments</CardTitle>
              <CardDescription>Payments that are due or overdue</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Fee Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Days Overdue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOutstandingPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{payment.studentName}</div>
                          <div className="text-sm text-muted-foreground">{payment.studentId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{payment.feeType}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(payment.amount, "BDT")}</TableCell>
                      <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {payment.daysOverdue > 0 ? (
                          <span className="text-red-600 font-medium">{payment.daysOverdue} days</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
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
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSendReminder(payment.id)}>
                              <Send className="h-4 w-4 mr-2" />
                              Send Reminder
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Receipt className="h-4 w-4 mr-2" />
                              Generate Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Bell className="h-4 w-4 mr-2" />
                              Set Alert
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
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Invoice Management</CardTitle>
                  <CardDescription>Generate, send, and track invoices</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Invoices
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Invoice Management</h3>
                <p className="text-muted-foreground mb-4">Generate and manage invoices for fee collections</p>
                <Button asChild>
                  <Link href="/admin/fees/invoices">View All Invoices</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Fee Structure Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Fee Structure</DialogTitle>
            <DialogDescription>
              Update the fee structure details. Changes will affect future billing cycles.
            </DialogDescription>
          </DialogHeader>
          {selectedFee && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-fee-name">Fee Name</Label>
                  <Input id="edit-fee-name" defaultValue={selectedFee.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-fee-category">Category</Label>
                  <Select defaultValue={selectedFee.category.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tuition">Tuition</SelectItem>
                      <SelectItem value="activity">Activity</SelectItem>
                      <SelectItem value="facility">Facility</SelectItem>
                      <SelectItem value="laboratory">Laboratory</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="examination">Examination</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-fee-amount">Amount (₹)</Label>
                  <Input id="edit-fee-amount" type="number" defaultValue={selectedFee.amount} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-fee-frequency">Payment Frequency</Label>
                  <Select defaultValue={selectedFee.frequency.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One Time</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="semester">Semester</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-fee-description">Description</Label>
                <Textarea id="edit-fee-description" defaultValue={selectedFee.description} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditFeeStructure}>Update Fee Structure</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Payment Details Modal */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4"
              onClick={() => setIsViewDetailsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          {selectedPayment && (
            <div className="grid grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Student Name</Label>
                  <p className="text-sm font-medium">{selectedPayment.studentName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Payment ID</Label>
                  <p className="text-sm font-medium">{selectedPayment.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Payment Type</Label>
                  <p className="text-sm">{selectedPayment.feeType}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Amount</Label>
                  <p className="text-sm font-medium">{formatCurrency(selectedPayment.amount, "BDT")}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Paid Date</Label>
                  <p className="text-sm">{new Date(selectedPayment.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Due Date</Label>
                  <p className="text-sm">{new Date(selectedPayment.dueDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedPayment.status)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Payment Method</Label>
                  <p className="text-sm">{selectedPayment.paymentMethod}</p>
                </div>
              </div>
              <div className="col-span-2">
                <Label className="text-sm font-medium text-muted-foreground">Notes / Remarks</Label>
                <p className="text-sm mt-1">{selectedPayment.notes || "No additional notes"}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Payment Modal */}
      <Dialog open={isEditPaymentOpen} onOpenChange={setIsEditPaymentOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Payment Entry</DialogTitle>
            <DialogDescription>
              Update payment details. Required fields are marked with *
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-payment-type">Payment Type *</Label>
              <Select
                value={editPaymentForm.feeType}
                onValueChange={(value) => setEditPaymentForm({ ...editPaymentForm, feeType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tuition Fee">Tuition Fee</SelectItem>
                  <SelectItem value="Activity Fee">Activity Fee</SelectItem>
                  <SelectItem value="Lab Fee">Lab Fee</SelectItem>
                  <SelectItem value="Library Fee">Library Fee</SelectItem>
                  <SelectItem value="Transport Fee">Transport Fee</SelectItem>
                  <SelectItem value="Examination Fee">Examination Fee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-payment-amount">Amount ({getCurrencySymbol("BDT")}) *</Label>
              <Input
                id="edit-payment-amount"
                type="number"
                placeholder="0.00"
                value={editPaymentForm.amount}
                onChange={(e) => setEditPaymentForm({ ...editPaymentForm, amount: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-payment-due-date">Due Date</Label>
              <Input
                id="edit-payment-due-date"
                type="date"
                value={editPaymentForm.dueDate}
                onChange={(e) => setEditPaymentForm({ ...editPaymentForm, dueDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-payment-status">Status *</Label>
              <Select
                value={editPaymentForm.status}
                onValueChange={(value) => setEditPaymentForm({ ...editPaymentForm, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Partial">Partial</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-payment-notes">Notes</Label>
              <Textarea
                id="edit-payment-notes"
                placeholder="Additional notes or remarks"
                value={editPaymentForm.notes}
                onChange={(e) => setEditPaymentForm({ ...editPaymentForm, notes: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditPaymentOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePaymentEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generate Invoice Modal */}
      <Dialog open={isInvoiceModalOpen} onOpenChange={setIsInvoiceModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Generate Invoice</DialogTitle>
            <DialogDescription>
              Review invoice details and download or print
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-6 py-4">
              {/* Invoice Preview */}
              <div className="border rounded-lg p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold">EduManage Pro</h3>
                    <p className="text-sm text-muted-foreground">School Management System</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Invoice #{selectedPayment.id}</p>
                    <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium mb-2">Student Details</h4>
                    <p className="text-sm">{selectedPayment.studentName}</p>
                    <p className="text-sm text-muted-foreground">{selectedPayment.studentId}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Payment Details</h4>
                    <p className="text-sm">Due: {new Date(selectedPayment.dueDate).toLocaleDateString()}</p>
                    <p className="text-sm">Method: {selectedPayment.paymentMethod}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">{selectedPayment.feeType}</span>
                    <span className="text-sm font-medium">{formatCurrency(selectedPayment.amount, "BDT")}</span>
                  </div>
                  <div className="flex justify-between items-center font-medium border-t pt-2">
                    <span>Total Amount</span>
                    <span>{formatCurrency(selectedPayment.amount, "BDT")}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm">Status</span>
                    <div>{getStatusBadge(selectedPayment.status)}</div>
                  </div>
                </div>
                
                {invoiceOptions.includeQR && (
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-dashed border-gray-300 rounded">
                      <QrCode className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">QR Code for Payment</p>
                  </div>
                )}
                
                {invoiceOptions.includeSignature && (
                  <div className="mt-6 border-t pt-4">
                    <div className="text-right">
                      <div className="border-b border-gray-300 w-48 ml-auto mb-2"></div>
                      <p className="text-sm text-muted-foreground">Authorized Signature</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Invoice Options */}
              <div className="space-y-4">
                <h4 className="font-medium">Invoice Options</h4>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="include-qr"
                      checked={invoiceOptions.includeQR}
                      onCheckedChange={(checked) => setInvoiceOptions({ ...invoiceOptions, includeQR: checked })}
                    />
                    <Label htmlFor="include-qr" className="text-sm">Include QR for payment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="include-signature"
                      checked={invoiceOptions.includeSignature}
                      onCheckedChange={(checked) => setInvoiceOptions({ ...invoiceOptions, includeSignature: checked })}
                    />
                    <Label htmlFor="include-signature" className="text-sm">Include signature block</Label>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInvoiceModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="outline" onClick={handlePrintInvoice}>
              <Printer className="h-4 w-4 mr-2" />
              Print Invoice
            </Button>
            <Button onClick={handleDownloadInvoice}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Payment Record</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this payment record? This action cannot be undone.
              {selectedPayment && (
                <div className="mt-2 p-3 bg-gray-50 rounded border">
                  <p className="text-sm font-medium">{selectedPayment.studentName}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedPayment.feeType} - {formatCurrency(selectedPayment.amount, "BDT")}
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeletePayment}
              className="bg-red-600 hover:bg-red-700"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
