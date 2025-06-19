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
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Plus,
  Download,
  Upload,
  CalendarIcon,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  FileText,
  Send,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

const attendanceData = [
  {
    id: 1,
    date: "2024-01-15",
    class: "Grade 10",
    section: "A",
    totalStudents: 38,
    present: 35,
    absent: 2,
    late: 1,
    attendanceRate: 92.1,
    takenBy: "Dr. Michael Chen",
    takenAt: "08:30 AM",
    students: [
      { id: 1, name: "John Doe", rollNumber: "10A001", status: "present", time: "08:25 AM" },
      { id: 2, name: "Sarah Wilson", rollNumber: "10A002", status: "present", time: "08:28 AM" },
      { id: 3, name: "Mike Johnson", rollNumber: "10A003", status: "absent", reason: "Sick" },
      { id: 4, name: "Emma Davis", rollNumber: "10A004", status: "late", time: "08:45 AM" },
      { id: 5, name: "Tom Anderson", rollNumber: "10A005", status: "present", time: "08:20 AM" },
    ],
  },
  {
    id: 2,
    date: "2024-01-15",
    class: "Grade 9",
    section: "B",
    totalStudents: 30,
    present: 28,
    absent: 2,
    late: 0,
    attendanceRate: 93.3,
    takenBy: "Mr. David Brown",
    takenAt: "08:35 AM",
    students: [
      { id: 6, name: "Alex Wilson", rollNumber: "9B001", status: "present", time: "08:30 AM" },
      { id: 7, name: "Lisa Garcia", rollNumber: "9B002", status: "absent", reason: "Family emergency" },
      { id: 8, name: "Ryan Martinez", rollNumber: "9B003", status: "present", time: "08:25 AM" },
    ],
  },
]

const sectionStats = [
  {
    class: "Grade 9",
    section: "A",
    totalStudents: 32,
    avgAttendance: 94.2,
    trend: "up",
    lastWeekRate: 92.1,
    chronicAbsentees: 1,
    perfectAttendance: 18,
  },
  {
    class: "Grade 9",
    section: "B",
    totalStudents: 30,
    avgAttendance: 91.8,
    trend: "down",
    lastWeekRate: 93.5,
    chronicAbsentees: 2,
    perfectAttendance: 15,
  },
  {
    class: "Grade 10",
    section: "A",
    totalStudents: 38,
    avgAttendance: 89.5,
    trend: "stable",
    lastWeekRate: 89.2,
    chronicAbsentees: 3,
    perfectAttendance: 20,
  },
  {
    class: "Grade 10",
    section: "B",
    totalStudents: 35,
    avgAttendance: 95.1,
    trend: "up",
    lastWeekRate: 93.8,
    chronicAbsentees: 0,
    perfectAttendance: 22,
  },
]

const attendanceAlerts = [
  {
    id: 1,
    type: "chronic_absence",
    student: "Mike Johnson",
    class: "Grade 10 - Section A",
    rollNumber: "10A003",
    daysAbsent: 8,
    totalDays: 15,
    rate: 46.7,
    severity: "high",
  },
  {
    id: 2,
    type: "section_low",
    section: "Grade 10 - Section A",
    rate: 89.5,
    threshold: 90,
    severity: "medium",
  },
  {
    id: 3,
    type: "frequent_late",
    student: "Emma Davis",
    class: "Grade 10 - Section A",
    rollNumber: "10A004",
    lateCount: 5,
    severity: "low",
  },
]

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedSection, setSelectedSection] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isMarkAttendanceOpen, setIsMarkAttendanceOpen] = useState(false)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [selectedAttendanceRecord, setSelectedAttendanceRecord] = useState(null)

  const handleMarkAttendance = () => {
    setIsMarkAttendanceOpen(true)
  }

  const handleViewDetails = (record) => {
    setSelectedAttendanceRecord(record)
  }

  const totalStudents = sectionStats.reduce((sum, section) => sum + section.totalStudents, 0)
  const avgAttendanceRate = sectionStats.reduce((sum, section) => sum + section.avgAttendance, 0) / sectionStats.length
  const chronicAbsentees = sectionStats.reduce((sum, section) => sum + section.chronicAbsentees, 0)
  const perfectAttendance = sectionStats.reduce((sum, section) => sum + section.perfectAttendance, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600">Section-wise attendance monitoring and comprehensive reporting</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsReportDialogOpen(true)}>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button size="sm" onClick={handleMarkAttendance}>
            <Plus className="h-4 w-4 mr-2" />
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Across all sections</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgAttendanceRate.toFixed(1)}%</div>
            <Progress value={avgAttendanceRate} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Perfect Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{perfectAttendance}</div>
            <p className="text-xs text-muted-foreground">Students with 100% attendance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Chronic Absentees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{chronicAbsentees}</div>
            <p className="text-xs text-muted-foreground">Below 80% attendance</p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Alerts */}
      {attendanceAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
              Attendance Alerts
            </CardTitle>
            <CardDescription>Students and sections requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {attendanceAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${
                    alert.severity === "high"
                      ? "bg-red-50 border-red-200"
                      : alert.severity === "medium"
                        ? "bg-yellow-50 border-yellow-200"
                        : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      {alert.type === "chronic_absence" && (
                        <>
                          <h4 className="font-medium text-red-900">Chronic Absence Alert</h4>
                          <p className="text-sm text-red-700">
                            {alert.student} ({alert.rollNumber}) - {alert.rate}% attendance ({alert.daysAbsent}/
                            {alert.totalDays} days)
                          </p>
                        </>
                      )}
                      {alert.type === "section_low" && (
                        <>
                          <h4 className="font-medium text-yellow-900">Low Section Attendance</h4>
                          <p className="text-sm text-yellow-700">
                            {alert.section} - {alert.rate}% (below {alert.threshold}% threshold)
                          </p>
                        </>
                      )}
                      {alert.type === "frequent_late" && (
                        <>
                          <h4 className="font-medium text-blue-900">Frequent Late Arrivals</h4>
                          <p className="text-sm text-blue-700">
                            {alert.student} ({alert.rollNumber}) - {alert.lateCount} late arrivals this week
                          </p>
                        </>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          alert.severity === "high"
                            ? "destructive"
                            : alert.severity === "medium"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Send className="h-4 w-4 mr-1" />
                        Notify
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="daily" className="space-y-6">
        <TabsList>
          <TabsTrigger value="daily">Daily Attendance</TabsTrigger>
          <TabsTrigger value="sections">Section Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          {/* Daily Attendance Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Attendance Records</CardTitle>
              <CardDescription>View and manage daily attendance by section</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-60 justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                  </PopoverContent>
                </Popover>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="9">Grade 9</SelectItem>
                    <SelectItem value="10">Grade 10</SelectItem>
                    <SelectItem value="11">Grade 11</SelectItem>
                    <SelectItem value="12">Grade 12</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="All Sections" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sections</SelectItem>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by teacher or section..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Attendance Records Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Section</TableHead>
                      <TableHead>Total Students</TableHead>
                      <TableHead>Present</TableHead>
                      <TableHead>Absent</TableHead>
                      <TableHead>Late</TableHead>
                      <TableHead>Attendance Rate</TableHead>
                      <TableHead>Taken By</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceData.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {record.class} - {record.section}
                            </div>
                            <div className="text-sm text-gray-500">{record.date}</div>
                          </div>
                        </TableCell>
                        <TableCell>{record.totalStudents}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                            {record.present}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <XCircle className="h-4 w-4 text-red-500 mr-1" />
                            {record.absent}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                            {record.late}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              record.attendanceRate >= 95
                                ? "default"
                                : record.attendanceRate >= 90
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {record.attendanceRate}%
                          </Badge>
                        </TableCell>
                        <TableCell>{record.takenBy}</TableCell>
                        <TableCell>{record.takenAt}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewDetails(record)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Attendance
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Send className="mr-2 h-4 w-4" />
                                Send Notifications
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Export Record
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
        </TabsContent>

        <TabsContent value="sections" className="space-y-6">
          {/* Section-wise Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectionStats.map((section, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {section.class} - {section.section}
                    </CardTitle>
                    <Badge
                      variant={
                        section.avgAttendance >= 95
                          ? "default"
                          : section.avgAttendance >= 90
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {section.avgAttendance}%
                    </Badge>
                  </div>
                  <CardDescription>{section.totalStudents} students</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Attendance Rate</span>
                      <span className="font-medium">{section.avgAttendance}%</span>
                    </div>
                    <Progress value={section.avgAttendance} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-bold text-green-600">{section.perfectAttendance}</div>
                      <div className="text-xs text-gray-600">Perfect</div>
                    </div>
                    <div className="text-center p-2 bg-red-50 rounded">
                      <div className="font-bold text-red-600">{section.chronicAbsentees}</div>
                      <div className="text-xs text-gray-600">At Risk</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span>Trend</span>
                    <div className="flex items-center">
                      {section.trend === "up" && <span className="text-green-600">↗ Improving</span>}
                      {section.trend === "down" && <span className="text-red-600">↘ Declining</span>}
                      {section.trend === "stable" && <span className="text-gray-600">→ Stable</span>}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <FileText className="h-3 w-3 mr-1" />
                      Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics will be implemented in a separate component */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Attendance Analytics
              </CardTitle>
              <CardDescription>Comprehensive attendance insights and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics Coming Soon</h3>
                <p className="text-gray-600">
                  Detailed charts, trends, and predictive analytics for attendance patterns
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          {/* Reports Section */}
          <Card>
            <CardHeader>
              <CardTitle>Attendance Reports</CardTitle>
              <CardDescription>Generate comprehensive attendance reports for various stakeholders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "Daily Attendance Report",
                    description: "Complete attendance record for a specific date",
                    icon: CalendarIcon,
                  },
                  {
                    title: "Section Summary Report",
                    description: "Attendance overview by section for a date range",
                    icon: Users,
                  },
                  {
                    title: "Student Attendance Report",
                    description: "Individual student attendance history",
                    icon: FileText,
                  },
                  {
                    title: "Chronic Absentee Report",
                    description: "Students with attendance below threshold",
                    icon: AlertTriangle,
                  },
                  {
                    title: "Perfect Attendance Report",
                    description: "Students with 100% attendance record",
                    icon: CheckCircle,
                  },
                  {
                    title: "Late Arrival Report",
                    description: "Students with frequent late arrivals",
                    icon: Clock,
                  },
                ].map((report, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <report.icon className="h-8 w-8 text-blue-600 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{report.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                          <Button size="sm" variant="outline" className="w-full">
                            Generate
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Mark Attendance Dialog */}
      <Dialog open={isMarkAttendanceOpen} onOpenChange={setIsMarkAttendanceOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mark Attendance</DialogTitle>
            <DialogDescription>Record attendance for a specific section and date</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Section Selection */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="attendanceDate">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(new Date(), "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={new Date()} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="attendanceClass">Class</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9">Grade 9</SelectItem>
                    <SelectItem value="10">Grade 10</SelectItem>
                    <SelectItem value="11">Grade 11</SelectItem>
                    <SelectItem value="12">Grade 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="attendanceSection">Section</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Student List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Student Attendance</h4>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Mark All Present
                  </Button>
                  <Button variant="outline" size="sm">
                    Mark All Absent
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Present</TableHead>
                      <TableHead>Absent</TableHead>
                      <TableHead>Late</TableHead>
                      <TableHead>Remarks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { rollNumber: "10A001", name: "John Doe" },
                      { rollNumber: "10A002", name: "Sarah Wilson" },
                      { rollNumber: "10A003", name: "Mike Johnson" },
                      { rollNumber: "10A004", name: "Emma Davis" },
                      { rollNumber: "10A005", name: "Tom Anderson" },
                    ].map((student, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono">{student.rollNumber}</TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>
                          <Checkbox defaultChecked />
                        </TableCell>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <Input placeholder="Optional remarks" className="w-32" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMarkAttendanceOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsMarkAttendanceOpen(false)}>Save Attendance</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Attendance Details Dialog */}
      <Dialog open={!!selectedAttendanceRecord} onOpenChange={() => setSelectedAttendanceRecord(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Attendance Details - {selectedAttendanceRecord?.class} Section {selectedAttendanceRecord?.section}
            </DialogTitle>
            <DialogDescription>
              {selectedAttendanceRecord?.date} • Taken by {selectedAttendanceRecord?.takenBy} at{" "}
              {selectedAttendanceRecord?.takenAt}
            </DialogDescription>
          </DialogHeader>
          {selectedAttendanceRecord && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedAttendanceRecord.totalStudents}</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedAttendanceRecord.present}</div>
                  <div className="text-sm text-gray-600">Present</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{selectedAttendanceRecord.absent}</div>
                  <div className="text-sm text-gray-600">Absent</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{selectedAttendanceRecord.late}</div>
                  <div className="text-sm text-gray-600">Late</div>
                </div>
              </div>

              {/* Student Details */}
              <div>
                <h4 className="font-medium mb-3">Student Details</h4>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Roll Number</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Time/Reason</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedAttendanceRecord.students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-mono">{student.rollNumber}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                student.status === "present"
                                  ? "default"
                                  : student.status === "late"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {student.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {student.time && <span className="text-sm">{student.time}</span>}
                            {student.reason && <span className="text-sm text-gray-600">({student.reason})</span>}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedAttendanceRecord(null)}>
              Close
            </Button>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Send Notifications
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generate Report Dialog */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Generate Attendance Report</DialogTitle>
            <DialogDescription>Configure and generate comprehensive attendance reports</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily Attendance Report</SelectItem>
                  <SelectItem value="section">Section Summary Report</SelectItem>
                  <SelectItem value="student">Student Attendance Report</SelectItem>
                  <SelectItem value="chronic">Chronic Absentee Report</SelectItem>
                  <SelectItem value="perfect">Perfect Attendance Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>From Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Select date
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>To Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Select date
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Sections</Label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded p-2">
                {["Grade 9 - A", "Grade 9 - B", "Grade 10 - A", "Grade 10 - B"].map((section) => (
                  <div key={section} className="flex items-center space-x-2">
                    <Checkbox id={section} defaultChecked />
                    <Label htmlFor={section} className="text-sm">
                      {section}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reportFormat">Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsReportDialogOpen(false)}>
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
