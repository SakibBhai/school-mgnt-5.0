"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import {
  Package,
  Layers,
  AlertTriangle,
  DollarSign,
  Search,
  TrendingUp,
  MoreHorizontal,
  Plus,
  Minus,
  History,
  Eye,
  Edit,
  RefreshCw,
  X,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for inventory value trend
const inventoryValueData = [
  { month: "Jan", value: 118000 },
  { month: "Feb", value: 122000 },
  { month: "Mar", value: 119000 },
  { month: "Apr", value: 125400 },
  { month: "May", value: 123000 },
  { month: "Jun", value: 125400 },
]

// Mock data for inventory items
const initialInventoryItems = [
  {
    id: 1,
    name: "Classroom Desks",
    category: "Furniture",
    quantity: 150,
    status: "In Stock",
    lastUpdated: "2024-01-15",
    dateAdded: "2023-08-15",
    unitPrice: 120,
    vendor: "Office Furniture Co.",
    description: "High-quality wooden desks suitable for classroom use. Includes storage compartment and adjustable height feature.",
  },
  {
    id: 2,
    name: "Whiteboard Markers",
    category: "Stationery",
    quantity: 8,
    status: "Low",
    lastUpdated: "2024-01-14",
    dateAdded: "2023-09-10",
    unitPrice: 2.5,
    vendor: "Stationery Plus",
    description: "Dry erase markers in assorted colors. Non-toxic and easy to erase.",
  },
  {
    id: 3,
    name: "Projectors",
    category: "Electronics",
    quantity: 25,
    status: "In Stock",
    lastUpdated: "2024-01-13",
    dateAdded: "2023-07-20",
    unitPrice: 450,
    vendor: "Tech Solutions",
    description: "HD multimedia projectors with wireless connectivity and long lamp life.",
  },
  {
    id: 4,
    name: "Laboratory Equipment",
    category: "Science",
    quantity: 0,
    status: "Out",
    lastUpdated: "2024-01-12",
    dateAdded: "2023-06-05",
    unitPrice: 200,
    vendor: "Science Supply Co.",
    description: "Complete laboratory equipment set including microscopes, beakers, and measurement tools.",
  },
  {
    id: 5,
    name: "Sports Equipment",
    category: "Physical Education",
    quantity: 45,
    status: "In Stock",
    lastUpdated: "2024-01-11",
    dateAdded: "2023-08-30",
    unitPrice: 35,
    vendor: "Sports World",
    description: "Assorted sports equipment including balls, cones, and training accessories.",
  },
  {
    id: 6,
    name: "Art Supplies",
    category: "Creative",
    quantity: 12,
    status: "Low",
    lastUpdated: "2024-01-10",
    dateAdded: "2023-09-15",
    unitPrice: 15,
    vendor: "Creative Arts",
    description: "Complete art supply kit with paints, brushes, canvas, and drawing materials.",
  },
]

// Mock data for history
const initialAddHistory = [
  {
    id: 1,
    date: "2024-01-15",
    itemName: "Classroom Desks",
    quantity: 50,
    vendor: "Office Furniture Co.",
    addedBy: "Admin User",
  },
  {
    id: 2,
    date: "2024-01-14",
    itemName: "Whiteboard Markers",
    quantity: 100,
    vendor: "Stationery Plus",
    addedBy: "Admin User",
  },
]

const initialDisbursementHistory = [
  {
    id: 1,
    date: "2024-01-16",
    itemName: "Whiteboard Markers",
    quantity: 20,
    receiver: "Grade 5 Teachers",
    purpose: "Monthly classroom supplies",
    disbursedBy: "Admin User",
  },
  {
    id: 2,
    date: "2024-01-15",
    itemName: "Sports Equipment",
    quantity: 5,
    receiver: "PE Department",
    purpose: "Physical education classes",
    disbursedBy: "Admin User",
  },
]

const categories = [
  "Furniture",
  "Stationery",
  "Electronics",
  "Science",
  "Physical Education",
  "Creative",
  "Books",
  "Maintenance",
]

function getStatusColor(status: string) {
  switch (status) {
    case "In Stock":
      return "bg-green-100 text-green-800"
    case "Low":
      return "bg-orange-100 text-orange-800"
    case "Out":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems)
  const [addHistory, setAddHistory] = useState(initialAddHistory)
  const [disbursementHistory, setDisbursementHistory] = useState(initialDisbursementHistory)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDisburseModalOpen, setIsDisburseModalOpen] = useState(false)
  
  // New modal states for dropdown actions
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isUpdateStockModalOpen, setIsUpdateStockModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  
  // Add Item Form State
  const [addForm, setAddForm] = useState({
    name: "",
    category: "",
    quantity: "",
    unitPrice: "",
    vendor: "",
    description: "",
  })
  
  // Disburse Item Form State
  const [disburseForm, setDisburseForm] = useState({
    itemId: "",
    quantity: "",
    receiver: "",
    purpose: "",
  })
  
  // Edit Item Form State
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    vendor: "",
    description: "",
    unitPrice: "",
  })
  
  // Update Stock Form State
  const [stockForm, setStockForm] = useState({
    adjustment: "",
    reason: "",
  })
  
  const itemsPerPage = 5

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage)
  
  const getItemStatus = (quantity: number) => {
    if (quantity === 0) return "Out"
    if (quantity <= 15) return "Low"
    return "In Stock"
  }
  
  const handleAddItem = () => {
    if (!addForm.name || !addForm.category || !addForm.quantity || !addForm.unitPrice || !addForm.vendor) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }
    
    const newItem = {
      id: inventoryItems.length + 1,
      name: addForm.name,
      category: addForm.category,
      quantity: parseInt(addForm.quantity),
      status: getItemStatus(parseInt(addForm.quantity)),
      lastUpdated: new Date().toISOString().split('T')[0],
      unitPrice: parseFloat(addForm.unitPrice),
      vendor: addForm.vendor,
    }
    
    setInventoryItems([...inventoryItems, {
      ...newItem,
      dateAdded: new Date().toISOString().split('T')[0],
      description: addForm.description || ""
    }])
    
    const newAddHistory = {
      id: addHistory.length + 1,
      date: new Date().toISOString().split('T')[0],
      itemName: addForm.name,
      quantity: parseInt(addForm.quantity),
      vendor: addForm.vendor,
      addedBy: "Admin User",
    }
    
    setAddHistory([newAddHistory, ...addHistory])
    
    setAddForm({
      name: "",
      category: "",
      quantity: "",
      unitPrice: "",
      vendor: "",
      description: "",
    })
    
    setIsAddModalOpen(false)
    
    toast({
      title: "Success",
      description: "Item successfully added to inventory.",
    })
  }
  
  const handleDisburseItem = () => {
    if (!disburseForm.itemId || !disburseForm.quantity || !disburseForm.receiver || !disburseForm.purpose) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }
    
    const selectedItem = inventoryItems.find(item => item.id === parseInt(disburseForm.itemId))
    const disburseQuantity = parseInt(disburseForm.quantity)
    
    if (!selectedItem) {
      toast({
        title: "Error",
        description: "Selected item not found.",
        variant: "destructive",
      })
      return
    }
    
    if (disburseQuantity > selectedItem.quantity) {
      toast({
        title: "Error",
        description: `Cannot disburse ${disburseQuantity} items. Only ${selectedItem.quantity} available in stock.`,
        variant: "destructive",
      })
      return
    }
    
    const updatedItems = inventoryItems.map(item => {
      if (item.id === parseInt(disburseForm.itemId)) {
        const newQuantity = item.quantity - disburseQuantity
        return {
          ...item,
          quantity: newQuantity,
          status: getItemStatus(newQuantity),
          lastUpdated: new Date().toISOString().split('T')[0],
        }
      }
      return item
    })
    
    setInventoryItems(updatedItems)
    
    const newDisbursement = {
      id: disbursementHistory.length + 1,
      date: new Date().toISOString().split('T')[0],
      itemName: selectedItem.name,
      quantity: disburseQuantity,
      receiver: disburseForm.receiver,
      purpose: disburseForm.purpose,
      disbursedBy: "Admin User",
    }
    
    setDisbursementHistory([newDisbursement, ...disbursementHistory])
    
    setDisburseForm({
      itemId: "",
      quantity: "",
      receiver: "",
      purpose: "",
    })
    
    setIsDisburseModalOpen(false)
    
    toast({
      title: "Success",
      description: "Item disbursed successfully.",
    })
  }
  
  // Handle View Details
  const handleViewDetails = (item: any) => {
    setSelectedItem(item)
    setIsViewDetailsModalOpen(true)
  }
  
  // Handle Edit Item
  const handleEditItem = (item: any) => {
    setSelectedItem(item)
    setEditForm({
      name: item.name,
      category: item.category,
      vendor: item.vendor,
      description: item.description || "",
      unitPrice: item.unitPrice.toString(),
    })
    setIsEditModalOpen(true)
  }
  
  // Handle Update Stock
  const handleUpdateStock = (item: any) => {
    setSelectedItem(item)
    setStockForm({
      adjustment: "",
      reason: "",
    })
    setIsUpdateStockModalOpen(true)
  }
  
  // Save Edit Changes
  const handleSaveEdit = () => {
    if (!editForm.name || !editForm.category || !editForm.vendor || !editForm.unitPrice) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }
    
    const updatedItems = inventoryItems.map(item => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          name: editForm.name,
          category: editForm.category,
          vendor: editForm.vendor,
          description: editForm.description,
          unitPrice: parseFloat(editForm.unitPrice),
          lastUpdated: new Date().toISOString().split('T')[0],
        }
      }
      return item
    })
    
    setInventoryItems(updatedItems)
    setIsEditModalOpen(false)
    
    toast({
      title: "Success",
      description: "Item updated successfully.",
    })
  }
  
  // Save Stock Update
  const handleSaveStockUpdate = () => {
    if (!stockForm.adjustment) {
      toast({
        title: "Error",
        description: "Please enter a quantity adjustment.",
        variant: "destructive",
      })
      return
    }
    
    const adjustment = parseInt(stockForm.adjustment)
    const newQuantity = selectedItem.quantity + adjustment
    
    if (newQuantity < 0) {
      toast({
        title: "Error",
        description: "Stock adjustment would result in negative inventory.",
        variant: "destructive",
      })
      return
    }
    
    const updatedItems = inventoryItems.map(item => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          quantity: newQuantity,
          status: getItemStatus(newQuantity),
          lastUpdated: new Date().toISOString().split('T')[0],
        }
      }
      return item
    })
    
    setInventoryItems(updatedItems)
    setIsUpdateStockModalOpen(false)
    
    toast({
      title: "Success",
      description: "Stock successfully updated.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,532</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+58</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Updated regularly
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17</div>
            <p className="text-xs text-muted-foreground">
              Check reorder levels
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125,400</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+4.3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Inventory Items List</CardTitle>
              <CardDescription>Manage and track all inventory items</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Item</DialogTitle>
                    <DialogDescription>
                      Add a new item to the inventory. Fill in all required fields.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Item Name *
                      </Label>
                      <Input
                        id="name"
                        value={addForm.name}
                        onChange={(e) => setAddForm({...addForm, name: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Category *
                      </Label>
                      <Select value={addForm.category} onValueChange={(value) => setAddForm({...addForm, category: value})}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="quantity" className="text-right">
                        Quantity *
                      </Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={addForm.quantity}
                        onChange={(e) => setAddForm({...addForm, quantity: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="unitPrice" className="text-right">
                        Unit Price *
                      </Label>
                      <Input
                        id="unitPrice"
                        type="number"
                        step="0.01"
                        value={addForm.unitPrice}
                        onChange={(e) => setAddForm({...addForm, unitPrice: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="vendor" className="text-right">
                        Vendor *
                      </Label>
                      <Input
                        id="vendor"
                        value={addForm.vendor}
                        onChange={(e) => setAddForm({...addForm, vendor: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={addForm.description}
                        onChange={(e) => setAddForm({...addForm, description: e.target.value})}
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddItem}>
                      Add Item
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog open={isDisburseModalOpen} onOpenChange={setIsDisburseModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Minus className="h-4 w-4 mr-2" />
                    Disburse Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Disburse Item</DialogTitle>
                    <DialogDescription>
                      Remove items from inventory for distribution or use.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="itemSelect" className="text-right">
                        Select Item *
                      </Label>
                      <Select value={disburseForm.itemId} onValueChange={(value) => setDisburseForm({...disburseForm, itemId: value})}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select item" />
                        </SelectTrigger>
                        <SelectContent>
                          {inventoryItems.filter(item => item.quantity > 0).map((item) => (
                            <SelectItem key={item.id} value={item.id.toString()}>
                              {item.name} (Available: {item.quantity})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="disburseQuantity" className="text-right">
                        Quantity *
                      </Label>
                      <Input
                        id="disburseQuantity"
                        type="number"
                        value={disburseForm.quantity}
                        onChange={(e) => setDisburseForm({...disburseForm, quantity: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="receiver" className="text-right">
                        Receiver *
                      </Label>
                      <Input
                        id="receiver"
                        value={disburseForm.receiver}
                        onChange={(e) => setDisburseForm({...disburseForm, receiver: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="purpose" className="text-right">
                        Purpose *
                      </Label>
                      <Textarea
                        id="purpose"
                        value={disburseForm.purpose}
                        onChange={(e) => setDisburseForm({...disburseForm, purpose: e.target.value})}
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleDisburseItem}>
                      Disburse Item
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              {/* View Details Modal */}
              <Dialog open={isViewDetailsModalOpen} onOpenChange={setIsViewDetailsModalOpen}>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Item Details
                    </DialogTitle>
                    <DialogDescription>
                      View complete information about this inventory item.
                    </DialogDescription>
                  </DialogHeader>
                  {selectedItem && (
                    <div className="grid grid-cols-2 gap-6 py-4">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Item Name</Label>
                          <p className="text-sm font-medium">{selectedItem.name}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Category</Label>
                          <p className="text-sm">{selectedItem.category}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Quantity</Label>
                          <p className="text-sm font-medium">{selectedItem.quantity}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Unit Price</Label>
                          <p className="text-sm">${selectedItem.unitPrice}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Total Value</Label>
                          <p className="text-sm font-medium">${(selectedItem.quantity * selectedItem.unitPrice).toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Vendor</Label>
                          <p className="text-sm">{selectedItem.vendor}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                          <Badge className={getStatusColor(selectedItem.status)}>
                            {selectedItem.status}
                          </Badge>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Date Added</Label>
                          <p className="text-sm">{selectedItem.dateAdded}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Last Modified</Label>
                          <p className="text-sm">{selectedItem.lastUpdated}</p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                        <p className="text-sm mt-1">{selectedItem.description || "No description available"}</p>
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsViewDetailsModalOpen(false)}>
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              {/* Edit Item Modal */}
              <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Edit className="h-5 w-5" />
                      Edit Item
                    </DialogTitle>
                    <DialogDescription>
                      Update item information. Quantity changes should be made via "Update Stock".
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="editName" className="text-right">
                        Item Name *
                      </Label>
                      <Input
                        id="editName"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="editCategory" className="text-right">
                        Category *
                      </Label>
                      <Select value={editForm.category} onValueChange={(value) => setEditForm({...editForm, category: value})}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="editVendor" className="text-right">
                        Vendor *
                      </Label>
                      <Input
                        id="editVendor"
                        value={editForm.vendor}
                        onChange={(e) => setEditForm({...editForm, vendor: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="editUnitPrice" className="text-right">
                        Unit Price *
                      </Label>
                      <Input
                        id="editUnitPrice"
                        type="number"
                        step="0.01"
                        value={editForm.unitPrice}
                        onChange={(e) => setEditForm({...editForm, unitPrice: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="editDescription" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="editDescription"
                        value={editForm.description}
                        onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveEdit}>
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              {/* Update Stock Modal */}
              <Dialog open={isUpdateStockModalOpen} onOpenChange={setIsUpdateStockModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <RefreshCw className="h-5 w-5" />
                      Update Stock
                    </DialogTitle>
                    <DialogDescription>
                      Adjust inventory quantity for {selectedItem?.name}. Current stock: {selectedItem?.quantity}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="stockAdjustment" className="text-right">
                        Adjustment *
                      </Label>
                      <Input
                        id="stockAdjustment"
                        type="number"
                        placeholder="e.g., +10 or -5"
                        value={stockForm.adjustment}
                        onChange={(e) => setStockForm({...stockForm, adjustment: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="stockReason" className="text-right">
                        Reason
                      </Label>
                      <Textarea
                        id="stockReason"
                        placeholder="Optional reason for stock adjustment"
                        value={stockForm.reason}
                        onChange={(e) => setStockForm({...stockForm, reason: e.target.value})}
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                    {selectedItem && stockForm.adjustment && (
                      <div className="col-span-4 p-3 bg-muted rounded-md">
                        <p className="text-sm">
                          <span className="font-medium">New quantity:</span>{" "}
                          {selectedItem.quantity + parseInt(stockForm.adjustment || "0")} 
                          <span className="text-muted-foreground">
                            (Current: {selectedItem.quantity}, Adjustment: {stockForm.adjustment})
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsUpdateStockModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveStockUpdate}>
                      Update Stock
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[300px]"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(item)} className="cursor-pointer">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditItem(item)} className="cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Item
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStock(item)} className="cursor-pointer">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Update Stock
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredItems.length)} of {filteredItems.length} items
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Inventory History
          </CardTitle>
          <CardDescription>Track all inventory additions and disbursements</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="add" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="add">Add History</TabsTrigger>
              <TabsTrigger value="disburse">Disbursement History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="add" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date Added</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Added By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {addHistory.slice(0, 5).map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell className="font-medium">{record.itemName}</TableCell>
                      <TableCell>{record.quantity}</TableCell>
                      <TableCell>{record.vendor}</TableCell>
                      <TableCell>{record.addedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="disburse" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date Disbursed</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Receiver</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Disbursed By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {disbursementHistory.slice(0, 5).map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell className="font-medium">{record.itemName}</TableCell>
                      <TableCell>{record.quantity}</TableCell>
                      <TableCell>{record.receiver}</TableCell>
                      <TableCell>{record.purpose}</TableCell>
                      <TableCell>{record.disbursedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Inventory Value Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Value Trend</CardTitle>
          <CardDescription>Inventory value over past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={inventoryValueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip formatter={(value) => [`$${value}`, "Inventory Value"]} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2, fill: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}