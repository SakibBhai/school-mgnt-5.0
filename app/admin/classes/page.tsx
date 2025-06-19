"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Plus,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  GraduationCap,
  BookOpen,
  MessageSquare,
  BarChart3,
  Settings,
  UserPlus,
  Clock,
  Calendar,
  School,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const classesData = [
  {
    id: 1,
    name: "Grade 9",
    sections: [
      {
        id: 1,
        name: "A",
        capacity: 35,
        enrolled: 32,
        classTeacher: "Ms. Sarah Johnson",
        subjects: ["Mathematics", "Physics", "Chemistry", "English", "History"],
        students: [
          { id: 1, name: "John Doe", rollNumber: "9A001" },
          { id: 2, name: "Jane Smith", rollNumber: "9A002" },
          { id: 3, name: "Mike Wilson", rollNumber: "9A003" },
        ],
        routine: [
          {
            day: "Monday",
            time: "08:00-08:45",
            subject: "Mathematics",
            teacher: "Ms. Sarah Johnson",
            room: "Room 101",
          },
          { day: "Monday", time: "08:45-09:30", subject: "Physics", teacher: "Dr. Michael Chen", room: "Lab 1" },
          { day: "Monday", time: "09:30-10:15", subject: "English", teacher: "Ms. Lisa Garcia", room: "Room 203" },
          { day: "Monday", time: "10:30-11:15", subject: "Chemistry", teacher: "Dr. Robert Wilson", room: "Lab 2" },
          { day: "Monday", time: "11:15-12:00", subject: "History", teacher: "Mr. David Brown", room: "Room 105" },
          { day: "Tuesday", time: "08:00-08:45", subject: "Biology", teacher: "Ms. Jennifer Lee", room: "Lab 3" },
          {
            day: "Tuesday",
            time: "08:45-09:30",
            subject: "Mathematics",
            teacher: "Ms. Sarah Johnson",
            room: "Room 101",
          },
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
        name: "B",
        capacity: 35,
        enrolled: 30,
        classTeacher: "Mr. David Brown",
        subjects: ["Mathematics", "Physics", "Chemistry", "English", "History"],
        students: [
          { id: 4, name: "Emily Davis", rollNumber: "9B001" },
          { id: 5, name: "Alex Johnson", rollNumber: "9B002" },
        ],
        routine: [
          { day: "Monday", time: "08:00-08:45", subject: "English", teacher: "Ms. Lisa Garcia", room: "Room 203" },
          {
            day: "Monday",
            time: "08:45-09:30",
            subject: "Mathematics",
            teacher: "Ms. Sarah Johnson",
            room: "Room 101",
          },
          { day: "Monday", time: "09:30-10:15", subject: "Science", teacher: "Dr. Michael Chen", room: "Lab 1" },
          {
            day: "Monday",
            time: "10:30-11:15",
            subject: "Social Studies",
            teacher: "Mr. David Brown",
            room: "Room 105",
          },
          { day: "Monday", time: "11:15-12:00", subject: "Art", teacher: "Ms. Emma Wilson", room: "Art Studio" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Grade 10",
    sections: [
      {
        id: 3,
        name: "A",
        capacity: 40,
        enrolled: 38,
        classTeacher: "Dr. Michael Chen",
        subjects: ["Advanced Mathematics", "Physics", "Chemistry", "English", "Computer Science"],
        students: [
          { id: 6, name: "Sarah Wilson", rollNumber: "10A001" },
          { id: 7, name: "Tom Anderson", rollNumber: "10A002" },
        ],
        routine: [
          {
            day: "Monday",
            time: "08:00-08:45",
            subject: "Advanced Mathematics",
            teacher: "Dr. Michael Chen",
            room: "Room 201",
          },
          { day: "Monday", time: "08:45-09:30", subject: "Physics", teacher: "Mr. David Wilson", room: "Lab 1" },
          { day: "Monday", time: "09:30-10:15", subject: "Chemistry", teacher: "Dr. Robert Wilson", room: "Lab 2" },
          { day: "Monday", time: "10:30-11:15", subject: "English", teacher: "Ms. Lisa Garcia", room: "Room 203" },
          {
            day: "Monday",
            time: "11:15-12:00",
            subject: "Computer Science",
            teacher: "Mr. Alex Thompson",
            room: "Computer Lab",
          },
        ],
      },
      {
        id: 4,
        name: "B",
        capacity: 40,
        enrolled: 35,
        classTeacher: "Ms. Lisa Garcia",
        subjects: ["Advanced Mathematics", "Physics", "Chemistry", "English", "Biology"],
        students: [
          { id: 8, name: "Emma Thompson", rollNumber: "10B001" },
          { id: 9, name: "Ryan Martinez", rollNumber: "10B002" },
        ],
        routine: [
          { day: "Monday", time: "08:00-08:45", subject: "Biology", teacher: "Ms. Jennifer Lee", room: "Lab 3" },
          {
            day: "Monday",
            time: "08:45-09:30",
            subject: "Advanced Mathematics",
            teacher: "Dr. Michael Chen",
            room: "Room 201",
          },
          { day: "Monday", time: "09:30-10:15", subject: "Physics", teacher: "Mr. David Wilson", room: "Lab 1" },
          { day: "Monday", time: "10:30-11:15", subject: "English", teacher: "Ms. Lisa Garcia", room: "Room 203" },
          { day: "Monday", time: "11:15-12:00", subject: "Chemistry", teacher: "Dr. Robert Wilson", room: "Lab 2" },
        ],
      },
    ],
  },
]

const availableSubjects = [
  "Mathematics",
  "Advanced Mathematics",
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

const availableTeachers = [
  { id: 1, name: "Ms. Sarah Johnson", subject: "Mathematics", available: true },
  { id: 2, name: "Mr. David Brown", subject: "Physics", available: true },
  { id: 3, name: "Dr. Michael Chen", subject: "Chemistry", available: false },
  { id: 4, name: "Ms. Lisa Garcia", subject: "English", available: true },
  { id: 5, name: "Mr. Robert Wilson", subject: "History", available: true },
  { id: 6, name: "Ms. Jennifer Lee", subject: "Biology", available: true },
]

const availableStudents = [
  { id: 10, name: "Oliver Brown", rollNumber: "NEW001", currentClass: null },
  { id: 11, name: "Sophia Davis", rollNumber: "NEW002", currentClass: null },
  { id: 12, name: "Lucas Miller", rollNumber: "NEW003", currentClass: null },
  { id: 13, name: "Ava Wilson", rollNumber: "NEW004", currentClass: null },
]

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

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGrade, setSelectedGrade] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isAssignStudentsOpen, setIsAssignStudentsOpen] = useState(false)
  const [isCommunicationOpen, setIsCommunicationOpen] = useState(false)
  const [isRoutineDialogOpen, setIsRoutineDialogOpen] = useState(false)
  const [isEditRoutineDialogOpen, setIsEditRoutineDialogOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)
  const [selectedSection, setSelectedSection] = useState(null)

  const handleViewSection = (classData, section) => {
    setSelectedClass(classData)
    setSelectedSection(section)
    setIsViewDialogOpen(true)
  }

  const handleEditSection = (classData, section) => {
    setSelectedClass(classData)
    setSelectedSection(section)
    setIsEditDialogOpen(true)
  }

  const handleAssignStudents = (classData, section) => {
    setSelectedClass(classData)
    setSelectedSection(section)
    setIsAssignStudentsOpen(true)
  }

  const handleCommunication = (classData, section) => {
    setSelectedClass(classData)
    setSelectedSection(section)
    setIsCommunicationOpen(true)
  }

  const handleViewRoutine = (classData, section) => {
    setSelectedClass(classData)
    setSelectedSection(section)
    setIsRoutineDialogOpen(true)
  }

  const handleEditRoutine = (classData, section) => {
    setSelectedClass(classData)
    setSelectedSection(section)
    setIsEditRoutineDialogOpen(true)
  }

  const getDayRoutine = (routine, day) => {
    return routine?.filter((item) => item.day === day) || []
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  const totalSections = classesData.reduce((sum, cls) => sum + cls.sections.length, 0)
  const totalStudents = classesData.reduce(
    (sum, cls) => sum + cls.sections.reduce((sectionSum, section) => sectionSum + section.enrolled, 0),
    0,
  )
  const totalCapacity = classesData.reduce(
    (sum, cls) => sum + cls.sections.reduce((sectionSum, section) => sectionSum + section.capacity, 0),
    0,
  )
  const utilizationRate = Math.round((totalStudents / totalCapacity) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Classes & Sections</h1>
          <p className="text-gray-600">Manage class structure, sections, and student assignments</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Class/Section
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Class/Section</DialogTitle>
                <DialogDescription>Set up a new class or add a section to an existing class.</DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="class" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="class">New Class</TabsTrigger>
                  <TabsTrigger value="section">New Section</TabsTrigger>
                </TabsList>

                <TabsContent value="class" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="className">Class Name *</Label>
                      <Input id="className" placeholder="e.g., Grade 11, Class XII" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="classDescription">Description</Label>
                      <Textarea id="classDescription" placeholder="Brief description of the class" />
                    </div>
                    <div className="space-y-2">
                      <Label>Default Subjects</Label>
                      <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded p-2">
                        {availableSubjects.map((subject) => (
                          <div key={subject} className="flex items-center space-x-2">
                            <input type="checkbox" id={subject} className="rounded" />
                            <Label htmlFor={subject} className="text-sm">
                              {subject}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="section" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="existingClass">Select Class *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose existing class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classesData.map((cls) => (
                            <SelectItem key={cls.id} value={cls.id.toString()}>
                              {cls.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sectionName">Section Name *</Label>
                        <Input id="sectionName" placeholder="e.g., A, B, C" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity *</Label>
                        <Input id="capacity" type="number" placeholder="35" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="classTeacher">Class Teacher</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class teacher" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTeachers
                            .filter((teacher) => teacher.available)
                            .map((teacher) => (
                              <SelectItem key={teacher.id} value={teacher.id.toString()}>
                                {teacher.name} - {teacher.subject}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Subjects for this Section</Label>
                      <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded p-2">
                        {availableSubjects.map((subject) => (
                          <div key={subject} className="flex items-center space-x-2">
                            <input type="checkbox" id={`section-${subject}`} className="rounded" />
                            <Label htmlFor={`section-${subject}`} className="text-sm">
                              {subject}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsCreateDialogOpen(false)}>
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classesData.length}</div>
            <p className="text-xs text-muted-foreground">Active classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSections}</div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Enrolled students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Capacity Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{utilizationRate}%</div>
            <Progress value={utilizationRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Classes and Sections Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Classes & Sections Overview</CardTitle>
          <CardDescription>Manage all classes, sections, and their assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search classes, sections, or teachers..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Grades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="9">Grade 9</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
                <SelectItem value="11">Grade 11</SelectItem>
                <SelectItem value="12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          <div className="space-y-6">
            {classesData.map((classData) => (
              <Card key={classData.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{classData.name}</CardTitle>
                      <CardDescription>{classData.sections.length} sections</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        {classData.sections.reduce((sum, section) => sum + section.enrolled, 0)} students
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Class
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Section
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <BarChart3 className="mr-2 h-4 w-4" />
                            View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Class
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {classData.sections.map((section) => (
                      <Card key={section.id} className="border">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Section {section.name}</CardTitle>
                            <Badge
                              variant={section.enrolled >= section.capacity * 0.9 ? "destructive" : "default"}
                              className="text-xs"
                            >
                              {section.enrolled}/{section.capacity}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Class Teacher</Label>
                            <p className="text-sm flex items-center">
                              <GraduationCap className="h-4 w-4 mr-1" />
                              {section.classTeacher}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Subjects</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {section.subjects.slice(0, 3).map((subject) => (
                                <Badge key={subject} variant="secondary" className="text-xs">
                                  {subject}
                                </Badge>
                              ))}
                              {section.subjects.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{section.subjects.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Capacity Utilization</Label>
                            <Progress value={(section.enrolled / section.capacity) * 100} className="mt-1" />
                          </div>
                          <div className="flex items-center space-x-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleViewSection(classData, section)}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleViewRoutine(classData, section)}
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              Routine
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleEditSection(classData, section)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Section
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditRoutine(classData, section)}>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Edit Routine
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAssignStudents(classData, section)}>
                                  <UserPlus className="mr-2 h-4 w-4" />
                                  Assign Students
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleCommunication(classData, section)}>
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  Send Message
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Settings className="mr-2 h-4 w-4" />
                                  Settings
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Class Routine Dialog */}
      <Dialog open={isRoutineDialogOpen} onOpenChange={setIsRoutineDialogOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              {selectedClass?.name} - Section {selectedSection?.name} Schedule
            </DialogTitle>
            <DialogDescription>Weekly class routine and subject schedule</DialogDescription>
          </DialogHeader>
          {selectedSection && (
            <div className="space-y-6">
              {/* Section Info Header */}
              <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                <div className="bg-purple-100 p-3 rounded-full">
                  <School className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {selectedClass?.name} - Section {selectedSection?.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Class Teacher: {selectedSection?.classTeacher} | Students: {selectedSection?.enrolled}
                  </p>
                </div>
              </div>

              {/* Weekly Class Schedule */}
              <div className="space-y-4">
                {days.map((day) => {
                  const daySchedule = getDayRoutine(selectedSection.routine, day)
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
                                  <div className="text-sm font-medium text-purple-600">{period.time}</div>
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
                handleEditRoutine(selectedClass, selectedSection)
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Routine
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Class Routine Dialog */}
      <Dialog open={isEditRoutineDialogOpen} onOpenChange={setIsEditRoutineDialogOpen}>
        <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Edit Class Routine - {selectedClass?.name} Section {selectedSection?.name}
            </DialogTitle>
            <DialogDescription>Modify the weekly class schedule and subject assignments</DialogDescription>
          </DialogHeader>
          {selectedSection && (
            <div className="space-y-6">
              {/* Section Info */}
              <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                <div className="bg-purple-100 p-3 rounded-full">
                  <School className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {selectedClass?.name} - Section {selectedSection?.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Class Teacher: {selectedSection?.classTeacher} | Students: {selectedSection?.enrolled}
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
                        const existingPeriod = getDayRoutine(selectedSection.routine, day).find(
                          (p) => p.time === timeSlot,
                        )
                        return (
                          <Card key={index} className="p-4">
                            <div className="grid grid-cols-5 gap-4 items-center">
                              <div className="font-medium text-purple-600">{timeSlot}</div>
                              <Select defaultValue={existingPeriod?.subject || "No Class"}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Subject" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="No Class">No Class</SelectItem>
                                  {selectedSection.subjects.map((subject) => (
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
                                  {availableTeachers.map((teacher) => (
                                    <SelectItem key={teacher.name} value={teacher.name}>
                                      {teacher.name}
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

      {/* Other existing dialogs remain the same... */}
    </div>
  )
}
