"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Search,
  Plus,
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  BookOpen,
  Clock,
  Calendar,
  School,
  Users,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Award,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Enhanced teacher data with more comprehensive information
const teachers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@school.edu",
    phone: "+1 234 567 8901",
    employeeId: "TCH001",
    department: "Mathematics",
    subjects: ["Algebra", "Calculus", "Statistics"],
    classes: ["10A", "11B", "12A"],
    qualification: "PhD in Mathematics",
    experience: "12 years",
    joiningDate: "2012-08-15",
    status: "Active",
    address: "123 Oak Street, City",
    salary: "$65,000",
    performance: "Excellent",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Dr. Sarah Johnson is a dedicated mathematics educator with over 12 years of experience in teaching advanced mathematics concepts.",
    achievements: ["Teacher of the Year 2023", "Best Innovation Award 2022"],
    emergencyContact: {
      name: "John Johnson",
      relationship: "Spouse",
      phone: "+1 234 567 8902",
    },
    routine: [
      { day: "Monday", time: "08:00-08:45", subject: "Mathematics", class: "10A", room: "Room 101" },
      { day: "Monday", time: "09:30-10:15", subject: "Algebra", class: "11B", room: "Room 101" },
      { day: "Monday", time: "11:15-12:00", subject: "Calculus", class: "12A", room: "Room 101" },
      { day: "Tuesday", time: "08:00-08:45", subject: "Statistics", class: "12A", room: "Room 101" },
      { day: "Tuesday", time: "10:30-11:15", subject: "Mathematics", class: "10A", room: "Room 101" },
      { day: "Wednesday", time: "08:45-09:30", subject: "Algebra", class: "11B", room: "Room 101" },
      { day: "Wednesday", time: "11:15-12:00", subject: "Mathematics", class: "10A", room: "Room 101" },
      { day: "Thursday", time: "09:30-10:15", subject: "Calculus", class: "12A", room: "Room 101" },
      { day: "Thursday", time: "10:30-11:15", subject: "Statistics", class: "12A", room: "Room 101" },
      { day: "Friday", time: "08:00-08:45", subject: "Algebra", class: "11B", room: "Room 101" },
    ],
  },
  {
    id: 2,
    name: "Mr. David Wilson",
    email: "david.wilson@school.edu",
    phone: "+1 234 567 8902",
    employeeId: "TCH002",
    department: "Physics",
    subjects: ["Physics", "Applied Physics"],
    classes: ["9A", "10B", "11A"],
    qualification: "MSc in Physics",
    experience: "8 years",
    joiningDate: "2016-01-10",
    status: "Active",
    address: "456 Pine Avenue, City",
    salary: "$58,000",
    performance: "Good",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Mr. David Wilson brings practical physics knowledge to the classroom with hands-on experiments and real-world applications.",
    achievements: ["Perfect Attendance Award 2023"],
    emergencyContact: {
      name: "Mary Wilson",
      relationship: "Spouse",
      phone: "+1 234 567 8903",
    },
    routine: [
      { day: "Monday", time: "08:45-09:30", subject: "Physics", class: "9A", room: "Lab 1" },
      { day: "Monday", time: "10:30-11:15", subject: "Applied Physics", class: "11A", room: "Lab 1" },
      { day: "Tuesday", time: "09:30-10:15", subject: "Physics", class: "10B", room: "Lab 1" },
      { day: "Tuesday", time: "11:15-12:00", subject: "Physics", class: "9A", room: "Lab 1" },
      { day: "Wednesday", time: "08:00-08:45", subject: "Applied Physics", class: "11A", room: "Lab 1" },
      { day: "Wednesday", time: "10:30-11:15", subject: "Physics", class: "10B", room: "Lab 1" },
      { day: "Thursday", time: "08:45-09:30", subject: "Physics", class: "9A", room: "Lab 1" },
      { day: "Friday", time: "09:30-10:15", subject: "Applied Physics", class: "11A", room: "Lab 1" },
      { day: "Friday", time: "11:15-12:00", subject: "Physics", class: "10B", room: "Lab 1" },
    ],
  },
  {
    id: 3,
    name: "Ms. Emily Davis",
    email: "emily.davis@school.edu",
    phone: "+1 234 567 8903",
    employeeId: "TCH003",
    department: "English",
    subjects: ["English Literature", "Creative Writing"],
    classes: ["9B", "10A"],
    qualification: "MA in English Literature",
    experience: "6 years",
    joiningDate: "2018-09-01",
    status: "Active",
    address: "789 Maple Drive, City",
    salary: "$52,000",
    performance: "Excellent",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Ms. Emily Davis inspires students through literature and creative expression, fostering a love for reading and writing.",
    achievements: ["Student Choice Award 2023", "Creative Writing Workshop Leader"],
    emergencyContact: {
      name: "Robert Davis",
      relationship: "Father",
      phone: "+1 234 567 8904",
    },
    routine: [
      { day: "Monday", time: "09:30-10:15", subject: "English Literature", class: "9B", room: "Room 201" },
      { day: "Monday", time: "11:15-12:00", subject: "Creative Writing", class: "10A", room: "Room 201" },
      { day: "Tuesday", time: "08:45-09:30", subject: "English Literature", class: "9B", room: "Room 201" },
      { day: "Wednesday", time: "10:30-11:15", subject: "Creative Writing", class: "10A", room: "Room 201" },
      { day: "Thursday", time: "09:30-10:15", subject: "English Literature", class: "9B", room: "Room 201" },
      { day: "Friday", time: "08:45-09:30", subject: "Creative Writing", class: "10A", room: "Room 201" },
    ],
  },
]

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
  "Computer Science",
  "Art",
  "Music",
  "Physical Education",
]

const classes = ["9A", "9B", "10A", "10B", "11A", "11B", "12A", "12B"]
const departments = ["Mathematics", "Science", "English", "Social Studies", "Arts", "Physical Education"]

const timeSlots = [
  "08:00-08:45",
  "08:45-09:30",
  "09:30-10:15",
  "10:15-10:30",
  "10:30-11:15",
  "11:15-12:00",
  "12:00-12:45",
  "12:45-13:30",
  "13:30-14:15",
  "14:15-15:00",
]

const rooms = [
  "Room 101",
  "Room 102",
  "Room 103",
  "Room 201",
  "Room 202",
  "Room 203",
  "Lab 1",
  "Lab 2",
  "Lab 3",
  "Computer Lab",
  "Art Studio",
  "Gymnasium",
]

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isRoutineDialogOpen, setIsRoutineDialogOpen] = useState(false)
  const [isEditRoutineDialogOpen, setIsEditRoutineDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState(null)

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    employeeId: "",
    department: "",
    qualification: "",
    experience: "",
    salary: "",
    address: "",
    bio: "",
  })

  // Enhanced filtering with memoization for performance
  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchesSearch =
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subjects.some((subject) => subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
        teacher.department.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesDepartment = selectedDepartment === "all" || teacher.department === selectedDepartment
      const matchesStatus = selectedStatus === "all" || teacher.status === selectedStatus

      return matchesSearch && matchesDepartment && matchesStatus
    })
  }, [searchTerm, selectedDepartment, selectedStatus])

  // Enhanced error handling
  const handleError = (message) => {
    setError(message)
    setTimeout(() => setError(""), 5000)
  }

  const handleSuccess = (message) => {
    setSuccess(message)
    setTimeout(() => setSuccess(""), 3000)
  }

  // Action handlers with error handling
  const handleViewTeacher = (teacher) => {
    try {
      setSelectedTeacher(teacher)
      setIsViewDialogOpen(true)
    } catch (err) {
      handleError("Failed to load teacher details")
    }
  }

  const handleEditTeacher = (teacher) => {
    try {
      setSelectedTeacher(teacher)
      setFormData({
        name: teacher.name,
        email: teacher.email,
        phone: teacher.phone,
        employeeId: teacher.employeeId,
        department: teacher.department,
        qualification: teacher.qualification,
        experience: teacher.experience,
        salary: teacher.salary,
        address: teacher.address,
        bio: teacher.bio || "",
      })
      setIsEditDialogOpen(true)
    } catch (err) {
      handleError("Failed to load teacher information for editing")
    }
  }

  const handleViewRoutine = (teacher) => {
    try {
      setSelectedTeacher(teacher)
      setIsRoutineDialogOpen(true)
    } catch (err) {
      handleError("Failed to load teacher routine")
    }
  }

  const handleEditRoutine = (teacher) => {
    try {
      setSelectedTeacher(teacher)
      setIsEditRoutineDialogOpen(true)
    } catch (err) {
      handleError("Failed to load routine for editing")
    }
  }

  const handleAssignClasses = (teacher) => {
    try {
      setSelectedTeacher(teacher)
      setIsAssignDialogOpen(true)
    } catch (err) {
      handleError("Failed to load class assignment interface")
    }
  }

  const handleDeleteTeacher = (teacher) => {
    try {
      setSelectedTeacher(teacher)
      setIsDeleteDialogOpen(true)
    } catch (err) {
      handleError("Failed to initiate delete process")
    }
  }

  const confirmDelete = async () => {
    try {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsDeleteDialogOpen(false)
      setSelectedTeacher(null)
      handleSuccess(`Teacher ${selectedTeacher?.name} has been deleted successfully`)
    } catch (err) {
      handleError("Failed to delete teacher. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveTeacher = async () => {
    try {
      setIsLoading(true)
      // Validate form data
      if (!formData.name || !formData.email || !formData.employeeId) {
        throw new Error("Please fill in all required fields")
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsEditDialogOpen(false)
      setSelectedTeacher(null)
      handleSuccess("Teacher information updated successfully")
    } catch (err) {
      handleError(err.message || "Failed to save teacher information")
    } finally {
      setIsLoading(false)
    }
  }

  const getDayRoutine = (routine, day) => {
    return routine?.filter((item) => item.day === day) || []
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  return (
    <div className="space-y-6">
      {/* Error and Success Messages */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Management</h1>
          <p className="text-gray-600">Manage teacher records, assignments, and performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled={isLoading}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm" disabled={isLoading}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" disabled={isLoading}>
                <Plus className="h-4 w-4 mr-2" />
                Add Teacher
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
                <DialogDescription>Enter the teacher's information to create a new record.</DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="professional">Professional</TabsTrigger>
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" placeholder="Enter full name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employeeId">Employee ID *</Label>
                      <Input id="employeeId" placeholder="TCH001" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="teacher@school.edu" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="+1 234 567 8900" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" placeholder="Enter full address" />
                  </div>
                </TabsContent>

                <TabsContent value="professional" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="qualification">Qualification</Label>
                      <Input id="qualification" placeholder="PhD, MSc, etc." />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience</Label>
                      <Input id="experience" placeholder="5 years" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salary">Salary</Label>
                      <Input id="salary" placeholder="$50,000" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="joiningDate">Joining Date</Label>
                    <Input id="joiningDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Brief description about the teacher" />
                  </div>
                </TabsContent>

                <TabsContent value="assignments" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Subjects</Label>
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded p-2">
                      {subjects.map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                          <Checkbox id={subject} />
                          <Label htmlFor={subject} className="text-sm">
                            {subject}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Classes</Label>
                    <div className="grid grid-cols-4 gap-2 border rounded p-2">
                      {classes.map((className) => (
                        <div key={className} className="flex items-center space-x-2">
                          <Checkbox id={className} />
                          <Label htmlFor={className} className="text-sm">
                            {className}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" onClick={() => setIsAddDialogOpen(false)} disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add Teacher"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers.filter((t) => t.status === "Active").length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((teachers.filter((t) => t.status === "Active").length / teachers.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(teachers.map((t) => t.department)).size}</div>
            <p className="text-xs text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(teachers.reduce((acc, t) => acc + Number.parseInt(t.experience), 0) / teachers.length)}
            </div>
            <p className="text-xs text-muted-foreground">Years</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Teacher Records</CardTitle>
          <CardDescription>
            View and manage all teacher information ({filteredTeachers.length} of {teachers.length} teachers shown)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, employee ID, subject, or department..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search teachers"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Enhanced Teachers Table */}
          <div className="rounded-md border">
            {isLoading ? (
              <div className="p-4 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredTeachers.length === 0 ? (
              <div className="p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No teachers found</h3>
                <p className="text-gray-500">
                  {searchTerm || selectedDepartment !== "all" || selectedStatus !== "all"
                    ? "Try adjusting your search criteria or filters"
                    : "Get started by adding your first teacher"}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Subjects</TableHead>
                    <TableHead>Classes</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers.map((teacher) => (
                    <TableRow key={teacher.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={teacher.avatar || "/placeholder.svg?height=40&width=40"}
                            alt={`${teacher.name} avatar`}
                            className="w-8 h-8 rounded-full object-cover"
                            onError={(e) => {
                              e.target.src = "/placeholder.svg?height=40&width=40"
                            }}
                          />
                          <div>
                            <div className="font-medium">{teacher.name}</div>
                            <div className="text-sm text-gray-500">{teacher.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">{teacher.employeeId}</TableCell>
                      <TableCell>{teacher.department}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {teacher.subjects.slice(0, 2).map((subject) => (
                            <Badge key={subject} variant="secondary" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                          {teacher.subjects.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{teacher.subjects.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {teacher.classes.slice(0, 3).map((className) => (
                            <Badge key={className} variant="outline" className="text-xs">
                              {className}
                            </Badge>
                          ))}
                          {teacher.classes.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{teacher.classes.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{teacher.experience}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            teacher.status === "Active"
                              ? "default"
                              : teacher.status === "On Leave"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {teacher.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0" aria-label={`Actions for ${teacher.name}`}>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewTeacher(teacher)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditTeacher(teacher)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewRoutine(teacher)}>
                              <Clock className="mr-2 h-4 w-4" />
                              View Routine
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditRoutine(teacher)}>
                              <Calendar className="mr-2 h-4 w-4" />
                              Edit Routine
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAssignClasses(teacher)}>
                              <BookOpen className="mr-2 h-4 w-4" />
                              Assign Classes
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteTeacher(teacher)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced View Teacher Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Teacher Details</DialogTitle>
            <DialogDescription>Complete information about the teacher</DialogDescription>
          </DialogHeader>
          {selectedTeacher && (
            <div className="space-y-6">
              {/* Enhanced Personal Information */}
              <div className="flex items-start space-x-4">
                <img
                  src={selectedTeacher.avatar || "/placeholder.svg?height=80&width=80"}
                  alt={`${selectedTeacher.name} avatar`}
                  className="w-20 h-20 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=80&width=80"
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedTeacher.name}</h3>
                  <p className="text-gray-600">{selectedTeacher.qualification}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedTeacher.bio}</p>
                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {selectedTeacher.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {selectedTeacher.phone}
                    </div>
                  </div>
                </div>
                <Badge
                  variant={
                    selectedTeacher.status === "Active"
                      ? "default"
                      : selectedTeacher.status === "On Leave"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {selectedTeacher.status}
                </Badge>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="academic">Academic</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <GraduationCap className="h-5 w-5 mr-2" />
                          Professional Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium">Employee ID</Label>
                          <p className="font-mono">{selectedTeacher.employeeId}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Department</Label>
                          <p>{selectedTeacher.department}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Experience</Label>
                          <p>{selectedTeacher.experience}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Joining Date</Label>
                          <p>{new Date(selectedTeacher.joiningDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Performance</Label>
                          <Badge variant={selectedTeacher.performance === "Excellent" ? "default" : "secondary"}>
                            {selectedTeacher.performance}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <MapPin className="h-5 w-5 mr-2" />
                          Contact Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium">Address</Label>
                          <p>{selectedTeacher.address}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Salary</Label>
                          <p className="font-semibold">{selectedTeacher.salary}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Emergency Contact</Label>
                          <p>{selectedTeacher.emergencyContact?.name}</p>
                          <p className="text-sm text-gray-500">
                            {selectedTeacher.emergencyContact?.relationship} - {selectedTeacher.emergencyContact?.phone}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="academic" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <BookOpen className="h-5 w-5 mr-2" />
                          Subjects Teaching
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedTeacher.subjects.map((subject) => (
                            <Badge key={subject} variant="secondary">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <Users className="h-5 w-5 mr-2" />
                          Classes Assigned
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedTeacher.classes.map((className) => (
                            <Badge key={className} variant="outline">
                              {className}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Email</Label>
                          <p className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            {selectedTeacher.email}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Phone</Label>
                          <p className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {selectedTeacher.phone}
                          </p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Address</Label>
                        <p className="flex items-start">
                          <MapPin className="h-4 w-4 mr-2 mt-1" />
                          {selectedTeacher.address}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="achievements" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="h-5 w-5 mr-2" />
                        Achievements & Recognition
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedTeacher.achievements?.map((achievement, index) => (
                          <div
                            key={index}
                            className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                          >
                            <Award className="h-4 w-4 text-yellow-600 mr-3" />
                            <span className="text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setIsViewDialogOpen(false)
                handleEditTeacher(selectedTeacher)
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Teacher
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Enhanced Edit Teacher Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
            <DialogDescription>Update teacher information</DialogDescription>
          </DialogHeader>
          {selectedTeacher && (
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Full Name *</Label>
                    <Input
                      id="edit-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-employeeId">Employee ID *</Label>
                    <Input
                      id="edit-employeeId"
                      value={formData.employeeId}
                      onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email *</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Phone</Label>
                    <Input
                      id="edit-phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-address">Address</Label>
                  <Textarea
                    id="edit-address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </TabsContent>

              <TabsContent value="professional" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-department">Department</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => setFormData({ ...formData, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-qualification">Qualification</Label>
                    <Input
                      id="edit-qualification"
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-experience">Experience</Label>
                    <Input
                      id="edit-experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-salary">Salary</Label>
                    <Input
                      id="edit-salary"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-bio">Bio</Label>
                  <Textarea
                    id="edit-bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Brief description about the teacher"
                  />
                </div>
              </TabsContent>

              <TabsContent value="assignments" className="space-y-4">
                <div className="space-y-2">
                  <Label>Subjects</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded p-2">
                    {subjects.map((subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox id={`edit-${subject}`} defaultChecked={selectedTeacher.subjects.includes(subject)} />
                        <Label htmlFor={`edit-${subject}`} className="text-sm">
                          {subject}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Classes</Label>
                  <div className="grid grid-cols-4 gap-2 border rounded p-2">
                    {classes.map((className) => (
                      <div key={className} className="flex items-center space-x-2">
                        <Checkbox
                          id={`edit-class-${className}`}
                          defaultChecked={selectedTeacher.classes.includes(className)}
                        />
                        <Label htmlFor={`edit-class-${className}`} className="text-sm">
                          {className}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleSaveTeacher} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Enhanced Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <AlertCircle className="h-5 w-5 mr-2" />
              Delete Teacher
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the teacher record.
            </DialogDescription>
          </DialogHeader>
          {selectedTeacher && (
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedTeacher.avatar || "/placeholder.svg?height=40&width=40"}
                    alt={selectedTeacher.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{selectedTeacher.name}</p>
                    <p className="text-sm text-gray-600">
                      {selectedTeacher.employeeId} • {selectedTeacher.department}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>This will also remove:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>All class assignments</li>
                  <li>Teaching schedule and routine</li>
                  <li>Performance records</li>
                  <li>Associated data and history</li>
                </ul>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete Teacher"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Teacher Routine Dialog */}
      <Dialog open={isRoutineDialogOpen} onOpenChange={setIsRoutineDialogOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              {selectedTeacher?.name} - Teaching Schedule
            </DialogTitle>
            <DialogDescription>Weekly teaching routine and class assignments</DialogDescription>
          </DialogHeader>
          {selectedTeacher && (
            <div className="space-y-6">
              {/* Teacher Info Header */}
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                <img
                  src={selectedTeacher.avatar || "/placeholder.svg?height=48&width=48"}
                  alt={selectedTeacher.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{selectedTeacher.name}</h3>
                  <p className="text-sm text-gray-600">
                    {selectedTeacher.department} | {selectedTeacher.employeeId}
                  </p>
                </div>
              </div>

              {/* Weekly Teaching Schedule */}
              <div className="space-y-4">
                {days.map((day) => {
                  const daySchedule = getDayRoutine(selectedTeacher.routine, day)
                  return (
                    <Card key={day}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{day}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {daySchedule.length > 0 ? (
                          <div className="space-y-2">
                            {daySchedule.map((period, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-4">
                                  <div className="text-sm font-medium text-green-600">{period.time}</div>
                                  <div className="flex items-center space-x-2">
                                    <BookOpen className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">{period.subject}</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <div className="flex items-center space-x-1">
                                    <Users className="h-4 w-4" />
                                    <span>{period.class}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <School className="h-4 w-4" />
                                    <span>{period.room}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-center py-4">No classes scheduled for {day}</p>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRoutineDialogOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setIsRoutineDialogOpen(false)
                handleEditRoutine(selectedTeacher)
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Routine
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Teacher Routine Dialog */}
      <Dialog open={isEditRoutineDialogOpen} onOpenChange={setIsEditRoutineDialogOpen}>
        <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Edit Teaching Schedule - {selectedTeacher?.name}
            </DialogTitle>
            <DialogDescription>Modify the weekly teaching routine and class assignments</DialogDescription>
          </DialogHeader>
          {selectedTeacher && (
            <div className="space-y-6">
              {/* Teacher Info */}
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                <img
                  src={selectedTeacher.avatar || "/placeholder.svg?height=48&width=48"}
                  alt={selectedTeacher.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{selectedTeacher.name}</h3>
                  <p className="text-sm text-gray-600">
                    {selectedTeacher.department} | {selectedTeacher.employeeId}
                  </p>
                </div>
              </div>

              {/* Editable Schedule */}
              <Tabs defaultValue="Monday" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  {days.map((day) => (
                    <TabsTrigger key={day} value={day}>
                      {day}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {days.map((day) => (
                  <TabsContent key={day} value={day} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{day} Schedule</h3>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Class
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {timeSlots.map((timeSlot, index) => {
                        const existingPeriod = getDayRoutine(selectedTeacher.routine, day).find(
                          (p) => p.time === timeSlot,
                        )
                        return (
                          <Card key={index} className="p-4">
                            <div className="grid grid-cols-5 gap-4 items-center">
                              <div className="font-medium text-green-600">{timeSlot}</div>
                              <Select defaultValue={existingPeriod?.subject || "None"}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Subject" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="None">No Class</SelectItem>
                                  {selectedTeacher.subjects.map((subject) => (
                                    <SelectItem key={subject} value={subject}>
                                      {subject}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select defaultValue={existingPeriod?.class || "None"}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Class" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="None">No Class</SelectItem>
                                  {selectedTeacher.classes.map((className) => (
                                    <SelectItem key={className} value={className}>
                                      {className}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select defaultValue={existingPeriod?.room || "None"}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Room" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="None">No Room</SelectItem>
                                  {rooms.map((room) => (
                                    <SelectItem key={room} value={room}>
                                      {room}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Button variant="ghost" size="sm" aria-label="Remove class">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </Card>
                        )
                      })}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRoutineDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditRoutineDialogOpen(false)} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Classes Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assign Classes & Subjects</DialogTitle>
            <DialogDescription>Manage class and subject assignments for {selectedTeacher?.name}</DialogDescription>
          </DialogHeader>
          {selectedTeacher && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-medium">Current Assignments</Label>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-2">
                    <div>
                      <Label className="text-sm font-medium">Subjects:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedTeacher.subjects.map((subject) => (
                          <Badge key={subject} variant="secondary" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Classes:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedTeacher.classes.map((className) => (
                          <Badge key={className} variant="outline" className="text-xs">
                            {className}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Update Subjects</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded p-2">
                    {subjects.map((subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox
                          id={`assign-${subject}`}
                          defaultChecked={selectedTeacher.subjects.includes(subject)}
                        />
                        <Label htmlFor={`assign-${subject}`} className="text-sm">
                          {subject}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Update Classes</Label>
                  <div className="grid grid-cols-4 gap-2 border rounded p-2">
                    {classes.map((className) => (
                      <div key={className} className="flex items-center space-x-2">
                        <Checkbox
                          id={`assign-class-${className}`}
                          defaultChecked={selectedTeacher.classes.includes(className)}
                        />
                        <Label htmlFor={`assign-class-${className}`} className="text-sm">
                          {className}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={() => setIsAssignDialogOpen(false)} disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Assignments"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
