"use client"

import { useState } from "react"
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
  CreditCard,
  FileText,
  GraduationCap,
  Calendar,
  School,
  Clock,
  BookOpen,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const students = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    class: "10A",
    rollNumber: "2024001",
    phone: "+1 234 567 8901",
    status: "Active",
    admissionDate: "2024-01-15",
    dateOfBirth: "2008-05-15",
    gender: "Male",
    address: "123 Main Street, City, State 12345",
    parentName: "Robert Doe",
    parentPhone: "+1 234 567 8900",
    parentEmail: "robert.doe@email.com",
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Mother",
      phone: "+1 234 567 8902",
    },
    medicalInfo: {
      allergies: ["Peanuts", "Shellfish"],
      conditions: ["Asthma"],
      medications: ["Inhaler"],
      bloodGroup: "O+",
    },
    previousSchool: {
      name: "ABC Elementary School",
      address: "456 Oak Street, City",
      lastGrade: "9th Grade",
      reasonForTransfer: "Family relocation",
    },
    careerInfo: {
      interests: ["Computer Science", "Mathematics"],
      goals: "Software Engineer",
      aspirations: "Work at a tech company",
    },
    avatar: "/placeholder.svg?height=40&width=40",
    gpa: 3.85,
    attendanceRate: 92,
    feeBalance: 0,
    totalFees: 12000,
    routine: [
      { day: "Monday", time: "08:00-08:45", subject: "Mathematics", teacher: "Ms. Sarah Johnson", room: "Room 101" },
      { day: "Monday", time: "08:45-09:30", subject: "Physics", teacher: "Dr. Michael Chen", room: "Lab 1" },
      { day: "Monday", time: "09:30-10:15", subject: "English", teacher: "Ms. Lisa Garcia", room: "Room 203" },
      { day: "Monday", time: "10:30-11:15", subject: "Chemistry", teacher: "Dr. Robert Wilson", room: "Lab 2" },
      { day: "Monday", time: "11:15-12:00", subject: "History", teacher: "Mr. David Brown", room: "Room 105" },
      { day: "Tuesday", time: "08:00-08:45", subject: "Biology", teacher: "Ms. Jennifer Lee", room: "Lab 3" },
      { day: "Tuesday", time: "08:45-09:30", subject: "Mathematics", teacher: "Ms. Sarah Johnson", room: "Room 101" },
      {
        day: "Tuesday",
        time: "09:30-10:15",
        subject: "Computer Science",
        teacher: "Mr. Alex Thompson",
        room: "Computer Lab",
      },
      {
        day: "Tuesday",
        time: "10:30-11:15",
        subject: "Physical Education",
        teacher: "Coach Mike Davis",
        room: "Gymnasium",
      },
      { day: "Tuesday", time: "11:15-12:00", subject: "Art", teacher: "Ms. Emma Wilson", room: "Art Studio" },
    ],
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah.smith@email.com",
    class: "9B",
    rollNumber: "2024002",
    phone: "+1 234 567 8903",
    status: "Active",
    admissionDate: "2024-01-16",
    dateOfBirth: "2009-03-22",
    gender: "Female",
    address: "789 Pine Avenue, City, State 12345",
    parentName: "Michael Smith",
    parentPhone: "+1 234 567 8904",
    parentEmail: "michael.smith@email.com",
    emergencyContact: {
      name: "Lisa Smith",
      relationship: "Mother",
      phone: "+1 234 567 8905",
    },
    medicalInfo: {
      allergies: [],
      conditions: [],
      medications: [],
      bloodGroup: "A+",
    },
    previousSchool: {
      name: "XYZ Middle School",
      address: "321 Elm Street, City",
      lastGrade: "8th Grade",
      reasonForTransfer: "Better academic opportunities",
    },
    careerInfo: {
      interests: ["Biology", "Medicine"],
      goals: "Doctor",
      aspirations: "Help people and save lives",
    },
    avatar: "/placeholder.svg?height=40&width=40",
    gpa: 3.92,
    attendanceRate: 95,
    feeBalance: 500,
    totalFees: 12000,
    routine: [
      { day: "Monday", time: "08:00-08:45", subject: "English", teacher: "Ms. Lisa Garcia", room: "Room 203" },
      { day: "Monday", time: "08:45-09:30", subject: "Mathematics", teacher: "Ms. Sarah Johnson", room: "Room 101" },
      { day: "Monday", time: "09:30-10:15", subject: "Science", teacher: "Dr. Michael Chen", room: "Lab 1" },
      { day: "Monday", time: "10:30-11:15", subject: "Social Studies", teacher: "Mr. David Brown", room: "Room 105" },
      { day: "Monday", time: "11:15-12:00", subject: "Art", teacher: "Ms. Emma Wilson", room: "Art Studio" },
    ],
  },
]

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
const relationships = ["Mother", "Father", "Guardian", "Grandparent", "Uncle", "Aunt", "Sibling", "Other"]
const classes = ["9A", "9B", "10A", "10B", "11A", "11B", "12A", "12B"]

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

const teachers = [
  "Ms. Sarah Johnson",
  "Dr. Michael Chen",
  "Ms. Lisa Garcia",
  "Dr. Robert Wilson",
  "Mr. David Brown",
  "Ms. Jennifer Lee",
  "Mr. Alex Thompson",
  "Coach Mike Davis",
  "Ms. Emma Wilson",
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

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isIdCardDialogOpen, setIsIdCardDialogOpen] = useState(false)
  const [isRoutineDialogOpen, setIsRoutineDialogOpen] = useState(false)
  const [isEditRoutineDialogOpen, setIsEditRoutineDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [selectedStudents, setSelectedStudents] = useState([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAcademicReportDialogOpen, setIsAcademicReportDialogOpen] = useState(false)

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.includes(searchTerm)
    const matchesClass = selectedClass === "all" || student.class === selectedClass
    const matchesStatus = selectedStatus === "all" || student.status === selectedStatus
    return matchesSearch && matchesClass && matchesStatus
  })

  const handleViewStudent = (student) => {
    setSelectedStudent(student)
    setIsViewDialogOpen(true)
  }

  const handleEditStudent = (student) => {
    setSelectedStudent(student)
    setIsEditDialogOpen(true)
  }

  const handleGenerateIdCard = (student) => {
    setSelectedStudent(student)
    setIsIdCardDialogOpen(true)
  }

  const handleViewRoutine = (student) => {
    setSelectedStudent(student)
    setIsRoutineDialogOpen(true)
  }

  const handleEditRoutine = (student) => {
    setSelectedStudent(student)
    setIsEditRoutineDialogOpen(true)
  }

  const handleBulkIdGeneration = () => {
    setIsIdCardDialogOpen(true)
    setSelectedStudent(null)
  }

  const getDayRoutine = (routine, day) => {
    return routine?.filter((item) => item.day === day) || []
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  const handleDeleteStudent = (student) => {
    setSelectedStudent(student)
    setIsDeleteDialogOpen(true)
  }

  const handleAcademicReport = (student) => {
    setSelectedStudent(student)
    setIsAcademicReportDialogOpen(true)
  }

  const confirmDeleteStudent = () => {
    // Here you would typically make an API call to delete the student
    console.log("Deleting student:", selectedStudent)
    setIsDeleteDialogOpen(false)
    setSelectedStudent(null)
    // Show success message or refresh data
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600">Comprehensive student records and profile management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={handleBulkIdGeneration}>
            <CreditCard className="h-4 w-4 mr-2" />
            Generate ID Cards
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>Enter comprehensive student information to create a new record.</DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                  <TabsTrigger value="emergency">Emergency</TabsTrigger>
                  <TabsTrigger value="medical">Medical</TabsTrigger>
                  <TabsTrigger value="academic">Academic</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" placeholder="Enter full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rollNumber">Roll Number *</Label>
                      <Input id="rollNumber" placeholder="2024001" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input id="dateOfBirth" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodGroups.map((group) => (
                            <SelectItem key={group} value={group}>
                              {group}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="student@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="+1 234 567 8900" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea id="address" placeholder="Enter complete address" />
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="font-medium">Parent/Guardian Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                        <Input id="parentName" placeholder="Enter parent name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="parentRelationship">Relationship *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            {relationships.map((rel) => (
                              <SelectItem key={rel} value={rel.toLowerCase()}>
                                {rel}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="parentPhone">Parent Phone *</Label>
                        <Input id="parentPhone" placeholder="+1 234 567 8900" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="parentEmail">Parent Email</Label>
                        <Input id="parentEmail" type="email" placeholder="parent@email.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parentAddress">Parent Address</Label>
                      <Textarea id="parentAddress" placeholder="If different from student address" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="emergency" className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="font-medium">Emergency Contact Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyName">Emergency Contact Name *</Label>
                        <Input id="emergencyName" placeholder="Enter emergency contact name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyRelationship">Relationship *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            {relationships.map((rel) => (
                              <SelectItem key={rel} value={rel.toLowerCase()}>
                                {rel}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyPhone">Emergency Phone *</Label>
                        <Input id="emergencyPhone" placeholder="+1 234 567 8900" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyEmail">Emergency Email</Label>
                        <Input id="emergencyEmail" type="email" placeholder="emergency@email.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyAddress">Emergency Contact Address</Label>
                      <Textarea id="emergencyAddress" placeholder="Enter emergency contact address" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="medical" className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="font-medium">Medical Information</h4>
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Textarea id="allergies" placeholder="List any known allergies (comma separated)" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medicalConditions">Medical Conditions</Label>
                      <Textarea id="medicalConditions" placeholder="List any medical conditions" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medications">Current Medications</Label>
                      <Textarea id="medications" placeholder="List current medications" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctorName">Family Doctor</Label>
                      <Input id="doctorName" placeholder="Doctor's name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctorPhone">Doctor's Phone</Label>
                      <Input id="doctorPhone" placeholder="Doctor's contact number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medicalNotes">Additional Medical Notes</Label>
                      <Textarea id="medicalNotes" placeholder="Any additional medical information" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="academic" className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="font-medium">Academic Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="class">Class *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            {classes.map((cls) => (
                              <SelectItem key={cls} value={cls}>
                                {cls}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admissionDate">Admission Date *</Label>
                        <Input id="admissionDate" type="date" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="font-medium">Previous School Information</h5>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="previousSchool">Previous School Name</Label>
                          <Input id="previousSchool" placeholder="Enter previous school name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastGrade">Last Grade Completed</Label>
                          <Input id="lastGrade" placeholder="e.g., 9th Grade" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="previousSchoolAddress">Previous School Address</Label>
                        <Textarea id="previousSchoolAddress" placeholder="Enter previous school address" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="transferReason">Reason for Transfer</Label>
                        <Textarea id="transferReason" placeholder="Reason for changing schools" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="font-medium">Career Information</h5>
                      <div className="space-y-2">
                        <Label htmlFor="interests">Academic Interests</Label>
                        <Textarea id="interests" placeholder="List academic interests (comma separated)" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="careerGoals">Career Goals</Label>
                        <Input id="careerGoals" placeholder="e.g., Software Engineer, Doctor" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="aspirations">Future Aspirations</Label>
                        <Textarea id="aspirations" placeholder="Describe future aspirations and goals" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
                  Add Student
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,198</div>
            <p className="text-xs text-muted-foreground">96.1% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.72</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.05</span> this semester
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,500</div>
            <p className="text-xs text-muted-foreground">49 students</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Student Records</CardTitle>
          <CardDescription>Comprehensive student information management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, roll number, or parent name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
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
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Enhanced Students Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Checkbox />
                  </TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Parent Contact</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Fee Status</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={student.avatar || "/placeholder.svg"}
                          alt={student.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">{student.rollNumber}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{student.parentName}</div>
                        <div className="text-sm text-gray-500">{student.parentPhone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={student.gpa >= 3.5 ? "default" : student.gpa >= 3.0 ? "secondary" : "destructive"}
                      >
                        {student.gpa}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            student.attendanceRate >= 90
                              ? "bg-green-500"
                              : student.attendanceRate >= 80
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                        <span>{student.attendanceRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={student.feeBalance === 0 ? "default" : "destructive"}>
                        {student.feeBalance === 0 ? "Paid" : `$${student.feeBalance} Due`}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={student.status === "Active" ? "default" : "secondary"}>{student.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewStudent(student)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditStudent(student)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewRoutine(student)}>
                            <Clock className="mr-2 h-4 w-4" />
                            View Routine
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditRoutine(student)}>
                            <Calendar className="mr-2 h-4 w-4" />
                            Edit Routine
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleGenerateIdCard(student)}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Generate ID Card
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAcademicReport(student)}>
                            <FileText className="mr-2 h-4 w-4" />
                            Academic Report
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteStudent(student)} className="text-red-600">
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
          </div>
        </CardContent>
      </Card>

      {/* View Student Routine Dialog */}
      <Dialog open={isRoutineDialogOpen} onOpenChange={setIsRoutineDialogOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              {selectedStudent?.name} - Class Schedule
            </DialogTitle>
            <DialogDescription>Weekly routine for {selectedStudent?.class}</DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              {/* Student Info Header */}
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                <img
                  src={selectedStudent.avatar || "/placeholder.svg"}
                  alt={selectedStudent.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{selectedStudent.name}</h3>
                  <p className="text-sm text-gray-600">
                    Roll: {selectedStudent.rollNumber} | Class: {selectedStudent.class}
                  </p>
                </div>
              </div>

              {/* Weekly Schedule */}
              <div className="space-y-4">
                {days.map((day) => {
                  const daySchedule = getDayRoutine(selectedStudent.routine, day)
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
                                  <div className="text-sm font-medium text-blue-600">{period.time}</div>
                                  <div className="flex items-center space-x-2">
                                    <BookOpen className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">{period.subject}</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <div className="flex items-center space-x-1">
                                    <GraduationCap className="h-4 w-4" />
                                    <span>{period.teacher}</span>
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
                handleEditRoutine(selectedStudent)
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Routine
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Student Routine Dialog */}
      <Dialog open={isEditRoutineDialogOpen} onOpenChange={setIsEditRoutineDialogOpen}>
        <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Edit Routine - {selectedStudent?.name}
            </DialogTitle>
            <DialogDescription>Modify the weekly schedule for {selectedStudent?.class}</DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              {/* Student Info */}
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                <img
                  src={selectedStudent.avatar || "/placeholder.svg"}
                  alt={selectedStudent.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{selectedStudent.name}</h3>
                  <p className="text-sm text-gray-600">
                    Roll: {selectedStudent.rollNumber} | Class: {selectedStudent.class}
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
                        Add Period
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {timeSlots.map((timeSlot, index) => {
                        const existingPeriod = getDayRoutine(selectedStudent.routine, day).find(
                          (p) => p.time === timeSlot,
                        )
                        return (
                          <Card key={index} className="p-4">
                            <div className="grid grid-cols-5 gap-4 items-center">
                              <div className="font-medium text-blue-600">{timeSlot}</div>
                              <Select defaultValue={existingPeriod?.subject || "No Class"}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Subject" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="No Class">No Class</SelectItem>
                                  {subjects.map((subject) => (
                                    <SelectItem key={subject} value={subject}>
                                      {subject}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select defaultValue={existingPeriod?.teacher || "No Teacher"}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Teacher" />
                                </SelectTrigger>
                                <SelectContent>
                                  {teachers.map((teacher) => (
                                    <SelectItem key={teacher} value={teacher}>
                                      {teacher}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select defaultValue={existingPeriod?.room || "No Room"}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Room" />
                                </SelectTrigger>
                                <SelectContent>
                                  {rooms.map((room) => (
                                    <SelectItem key={room} value={room}>
                                      {room}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Button variant="ghost" size="sm">
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
            <Button variant="outline" onClick={() => setIsEditRoutineDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditRoutineDialogOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detailed Student Profile Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Student Profile</DialogTitle>
            <DialogDescription>Comprehensive student information and records</DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="fees">Fees</TabsTrigger>
                <TabsTrigger value="medical">Medical</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Student Header */}
                <div className="flex items-start space-x-6">
                  <img
                    src={selectedStudent.avatar || "/placeholder.svg"}
                    alt={selectedStudent.name}
                    className="w-24 h-24 rounded-full border-4 border-blue-100"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">{selectedStudent.name}</h3>
                    <p className="text-gray-600">Roll Number: {selectedStudent.rollNumber}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant="outline">{selectedStudent.class}</Badge>
                      <Badge variant={selectedStudent.status === "Active" ? "default" : "secondary"}>
                        {selectedStudent.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{selectedStudent.gpa}</div>
                        <div className="text-sm text-gray-600">GPA</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{selectedStudent.attendanceRate}%</div>
                        <div className="text-sm text-gray-600">Attendance</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          ${selectedStudent.totalFees - selectedStudent.feeBalance}
                        </div>
                        <div className="text-sm text-gray-600">Fees Paid</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">Date of Birth</Label>
                        <p>{selectedStudent.dateOfBirth}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Gender</Label>
                        <p>{selectedStudent.gender}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Blood Group</Label>
                        <p>{selectedStudent.medicalInfo.bloodGroup}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Address</Label>
                        <p className="text-sm">{selectedStudent.address}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Career Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">Interests</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedStudent.careerInfo.interests.map((interest) => (
                            <Badge key={interest} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Career Goals</Label>
                        <p>{selectedStudent.careerInfo.goals}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Aspirations</Label>
                        <p className="text-sm">{selectedStudent.careerInfo.aspirations}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="academic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Mathematics</span>
                        <Badge variant="default">A+</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Physics</span>
                        <Badge variant="default">A</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Chemistry</span>
                        <Badge variant="secondary">B+</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>English</span>
                        <Badge variant="default">A</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="attendance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Attendance Records</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">156</div>
                        <div className="text-sm text-gray-600">Present Days</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">14</div>
                        <div className="text-sm text-gray-600">Absent Days</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">3</div>
                        <div className="text-sm text-gray-600">Late Arrivals</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="fees" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Fee Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">${selectedStudent.totalFees}</div>
                        <div className="text-sm text-gray-600">Total Fees</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          ${selectedStudent.totalFees - selectedStudent.feeBalance}
                        </div>
                        <div className="text-sm text-gray-600">Paid</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">${selectedStudent.feeBalance}</div>
                        <div className="text-sm text-gray-600">Outstanding</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medical" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Blood Group</Label>
                      <p className="font-semibold text-red-600">{selectedStudent.medicalInfo.bloodGroup}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Allergies</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedStudent.medicalInfo.allergies.length > 0 ? (
                          selectedStudent.medicalInfo.allergies.map((allergy) => (
                            <Badge key={allergy} variant="destructive" className="text-xs">
                              {allergy}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-gray-500">No known allergies</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Medical Conditions</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedStudent.medicalInfo.conditions.length > 0 ? (
                          selectedStudent.medicalInfo.conditions.map((condition) => (
                            <Badge key={condition} variant="secondary" className="text-xs">
                              {condition}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-gray-500">No medical conditions</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Parent/Guardian</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">Name</Label>
                        <p>{selectedStudent.parentName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Phone</Label>
                        <p>{selectedStudent.parentPhone}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Email</Label>
                        <p>{selectedStudent.parentEmail}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Emergency Contact</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">Name</Label>
                        <p>{selectedStudent.emergencyContact.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Relationship</Label>
                        <p>{selectedStudent.emergencyContact.relationship}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Phone</Label>
                        <p className="font-semibold text-red-600">{selectedStudent.emergencyContact.phone}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>Update student information</DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editName">Full Name</Label>
                  <Input id="editName" defaultValue={selectedStudent.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editRollNumber">Roll Number</Label>
                  <Input id="editRollNumber" defaultValue={selectedStudent.rollNumber} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editEmail">Email</Label>
                  <Input id="editEmail" type="email" defaultValue={selectedStudent.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editPhone">Phone</Label>
                  <Input id="editPhone" defaultValue={selectedStudent.phone} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editClass">Class</Label>
                  <Select defaultValue={selectedStudent.class}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editStatus">Status</Label>
                  <Select defaultValue={selectedStudent.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editAddress">Address</Label>
                <Textarea id="editAddress" defaultValue={selectedStudent.address} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Academic Report Dialog */}
      <Dialog open={isAcademicReportDialogOpen} onOpenChange={setIsAcademicReportDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Academic Report</DialogTitle>
            <DialogDescription>Comprehensive academic performance report for {selectedStudent?.name}</DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              {/* Student Info Header */}
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                <img
                  src={selectedStudent.avatar || "/placeholder.svg"}
                  alt={selectedStudent.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{selectedStudent.name}</h3>
                  <p className="text-sm text-gray-600">
                    Roll: {selectedStudent.rollNumber} | Class: {selectedStudent.class}
                  </p>
                </div>
              </div>

              {/* Academic Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedStudent.gpa}</div>
                  <div className="text-sm text-gray-600">Current GPA</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedStudent.attendanceRate}%</div>
                  <div className="text-sm text-gray-600">Attendance</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">A-</div>
                  <div className="text-sm text-gray-600">Overall Grade</div>
                </div>
              </div>

              {/* Subject Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { subject: "Mathematics", grade: "A+", score: 95 },
                      { subject: "Physics", grade: "A", score: 88 },
                      { subject: "Chemistry", grade: "B+", score: 82 },
                      { subject: "English", grade: "A", score: 90 },
                      { subject: "History", grade: "B+", score: 85 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{item.subject}</span>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-600">{item.score}%</span>
                          <Badge variant={item.grade.startsWith("A") ? "default" : "secondary"}>{item.grade}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Teacher Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>Mathematics:</strong> Excellent problem-solving skills. Recommend advanced mathematics
                        course.
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Physics:</strong> Strong conceptual understanding. Could benefit from more practical
                        experiments.
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Chemistry:</strong> Good progress. Needs more focus on organic chemistry concepts.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAcademicReportDialogOpen(false)}>
              Close
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Student</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedStudent?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="flex items-center space-x-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <img
                src={selectedStudent.avatar || "/placeholder.svg"}
                alt={selectedStudent.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{selectedStudent.name}</h3>
                <p className="text-sm text-gray-600">
                  Roll: {selectedStudent.rollNumber} | Class: {selectedStudent.class}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteStudent}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ID Card Generation Dialog */}
      <Dialog open={isIdCardDialogOpen} onOpenChange={setIsIdCardDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Generate ID Cards</DialogTitle>
            <DialogDescription>
              {selectedStudent
                ? `Generate ID card for ${selectedStudent.name}`
                : "Generate ID cards for selected students"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* ID Card Preview */}
            <div className="flex justify-center">
              <div className="w-80 h-48 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-4 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">EduManage Pro</h3>
                    <p className="text-xs opacity-90">Excellence in Education</p>
                  </div>
                  <School className="h-8 w-8 opacity-80" />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                    <img
                      src={selectedStudent?.avatar || "/placeholder.svg"}
                      alt="Student"
                      className="w-14 h-14 rounded object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{selectedStudent?.name || "Student Name"}</h4>
                    <p className="text-sm opacity-90">Roll: {selectedStudent?.rollNumber || "2024001"}</p>
                    <p className="text-sm opacity-90">Class: {selectedStudent?.class || "10A"}</p>
                    <p className="text-xs opacity-75 mt-1">Valid: 2024-2025</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customization Options */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="template">ID Card Template</Label>
                <Select defaultValue="default">
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Blue</SelectItem>
                    <SelectItem value="green">Green Theme</SelectItem>
                    <SelectItem value="purple">Purple Theme</SelectItem>
                    <SelectItem value="red">Red Theme</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="schoolName">School Name</Label>
                  <Input id="schoolName" defaultValue="EduManage Pro" />
                </div>
                <div>
                  <Label htmlFor="academicYear">Academic Year</Label>
                  <Input id="academicYear" defaultValue="2024-2025" />
                </div>
              </div>

              <div>
                <Label>Include Information</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="includePhoto" defaultChecked />
                    <Label htmlFor="includePhoto" className="text-sm">
                      Student Photo
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="includeRoll" defaultChecked />
                    <Label htmlFor="includeRoll" className="text-sm">
                      Roll Number
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="includeClass" defaultChecked />
                    <Label htmlFor="includeClass" className="text-sm">
                      Class
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="includeBlood" />
                    <Label htmlFor="includeBlood" className="text-sm">
                      Blood Group
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="includeEmergency" />
                    <Label htmlFor="includeEmergency" className="text-sm">
                      Emergency Contact
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="includeBarcode" defaultChecked />
                    <Label htmlFor="includeBarcode" className="text-sm">
                      QR Code
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsIdCardDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsIdCardDialogOpen(false)}>
              {selectedStudent ? "Generate ID Card" : "Generate Bulk ID Cards"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
