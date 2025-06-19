"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  Search,
  Download,
  PrinterIcon as Print,
  Mail,
  Share2,
  User,
  BookOpen,
  Award,
  FileSpreadsheet,
  Eye,
  Users,
  School,
} from "lucide-react"

// Mock data for demonstration
const students = [
  {
    id: 1,
    name: "Alice Johnson",
    rollNumber: "2024001",
    class: "10",
    section: "A",
    admissionNumber: "ADM2024001",
    fatherName: "Robert Johnson",
    motherName: "Mary Johnson",
    dateOfBirth: "2008-05-15",
    address: "123 Main Street, City",
  },
  {
    id: 2,
    name: "Bob Smith",
    rollNumber: "2024002",
    class: "10",
    section: "A",
    admissionNumber: "ADM2024002",
    fatherName: "John Smith",
    motherName: "Sarah Smith",
    dateOfBirth: "2008-08-22",
    address: "456 Oak Avenue, City",
  },
  {
    id: 3,
    name: "Carol Davis",
    rollNumber: "2024003",
    class: "10",
    section: "B",
    admissionNumber: "ADM2024003",
    fatherName: "Michael Davis",
    motherName: "Lisa Davis",
    dateOfBirth: "2008-03-10",
    address: "789 Pine Road, City",
  },
]

const exams = [
  {
    id: 1,
    name: "Mid-term Mathematics",
    subject: "Mathematics",
    date: "2024-03-15",
    totalMarks: 100,
    type: "Mid-term",
  },
  {
    id: 2,
    name: "Mid-term Science",
    subject: "Science",
    date: "2024-03-18",
    totalMarks: 100,
    type: "Mid-term",
  },
  {
    id: 3,
    name: "Final English",
    subject: "English",
    date: "2024-05-20",
    totalMarks: 100,
    type: "Final",
  },
]

const results = [
  { studentId: 1, examId: 1, marksObtained: 85, grade: "A", remarks: "Excellent performance" },
  { studentId: 1, examId: 2, marksObtained: 78, grade: "B+", remarks: "Good work" },
  { studentId: 1, examId: 3, marksObtained: 92, grade: "A+", remarks: "Outstanding" },
  { studentId: 2, examId: 1, marksObtained: 72, grade: "B", remarks: "Satisfactory" },
  { studentId: 2, examId: 2, marksObtained: 68, grade: "B", remarks: "Can improve" },
  { studentId: 2, examId: 3, marksObtained: 75, grade: "B+", remarks: "Good progress" },
  { studentId: 3, examId: 1, marksObtained: 88, grade: "A", remarks: "Very good" },
  { studentId: 3, examId: 2, marksObtained: 82, grade: "A", remarks: "Excellent" },
  { studentId: 3, examId: 3, marksObtained: 90, grade: "A+", remarks: "Outstanding work" },
]

const gradeScale = [
  { grade: "A+", range: "90-100", points: "4.0", description: "Outstanding" },
  { grade: "A", range: "80-89", points: "3.7", description: "Excellent" },
  { grade: "B+", range: "70-79", points: "3.3", description: "Very Good" },
  { grade: "B", range: "60-69", points: "3.0", description: "Good" },
  { grade: "C+", range: "50-59", points: "2.7", description: "Satisfactory" },
  { grade: "C", range: "40-49", points: "2.0", description: "Acceptable" },
  { grade: "F", range: "0-39", points: "0.0", description: "Fail" },
]

function getGradeColor(grade: string) {
  switch (grade) {
    case "A+":
      return "bg-green-100 text-green-800"
    case "A":
      return "bg-blue-100 text-blue-800"
    case "B+":
      return "bg-purple-100 text-purple-800"
    case "B":
      return "bg-yellow-100 text-yellow-800"
    case "C+":
      return "bg-orange-100 text-orange-800"
    case "C":
      return "bg-red-100 text-red-800"
    case "F":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function MarkSheetPreview({ student, selectedExams }: { student: any; selectedExams: string[] }) {
  const studentResults = results.filter((r) => r.studentId === student.id)
  const filteredResults =
    selectedExams.length > 0
      ? studentResults.filter((r) => selectedExams.includes(r.examId.toString()))
      : studentResults

  const totalMarksObtained = filteredResults.reduce((sum, result) => sum + result.marksObtained, 0)
  const totalMaxMarks = filteredResults.reduce((sum, result) => {
    const exam = exams.find((e) => e.id === result.examId)
    return sum + (exam?.totalMarks || 0)
  }, 0)
  const overallPercentage = totalMaxMarks > 0 ? (totalMarksObtained / totalMaxMarks) * 100 : 0
  const overallGrade =
    overallPercentage >= 90
      ? "A+"
      : overallPercentage >= 80
        ? "A"
        : overallPercentage >= 70
          ? "B+"
          : overallPercentage >= 60
            ? "B"
            : overallPercentage >= 50
              ? "C+"
              : overallPercentage >= 40
                ? "C"
                : "F"

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 print:p-6 print:shadow-none shadow-lg">
      {/* Header */}
      <div className="text-center border-b-2 border-blue-600 pb-6 mb-6">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="bg-blue-600 p-3 rounded-full">
            <School className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-blue-900">EduManage Pro School</h1>
            <p className="text-sm text-gray-600">123 Education Street, Academic City - 12345</p>
            <p className="text-sm text-gray-600">Phone: (555) 123-4567 | Email: info@edumanagepro.edu</p>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">STUDENT MARK SHEET</h2>
        <p className="text-sm text-gray-600">Academic Year 2024-25</p>
      </div>

      {/* Student Information */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <div className="flex">
            <span className="font-semibold w-32">Student Name:</span>
            <span>{student.name}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Roll Number:</span>
            <span>{student.rollNumber}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Class:</span>
            <span>
              {student.class} - {student.section}
            </span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Admission No:</span>
            <span>{student.admissionNumber}</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex">
            <span className="font-semibold w-32">Father's Name:</span>
            <span>{student.fatherName}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Mother's Name:</span>
            <span>{student.motherName}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Date of Birth:</span>
            <span>{new Date(student.dateOfBirth).toLocaleDateString()}</span>
          </div>
          <div className="w-24 h-24 border-2 border-gray-300 rounded bg-gray-50 flex items-center justify-center">
            <User className="h-12 w-12 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Examination Results</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">S.No</TableHead>
              <TableHead>Exam Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-center">Marks Obtained</TableHead>
              <TableHead className="text-center">Total Marks</TableHead>
              <TableHead className="text-center">Percentage</TableHead>
              <TableHead className="text-center">Grade</TableHead>
              <TableHead>Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.map((result, index) => {
              const exam = exams.find((e) => e.id === result.examId)
              const percentage = exam ? (result.marksObtained / exam.totalMarks) * 100 : 0
              return (
                <TableRow key={result.examId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{exam?.name}</TableCell>
                  <TableCell>{exam?.subject}</TableCell>
                  <TableCell>{exam ? new Date(exam.date).toLocaleDateString() : ""}</TableCell>
                  <TableCell className="text-center font-semibold">{result.marksObtained}</TableCell>
                  <TableCell className="text-center">{exam?.totalMarks}</TableCell>
                  <TableCell className="text-center">{percentage.toFixed(1)}%</TableCell>
                  <TableCell className="text-center">
                    <Badge className={getGradeColor(result.grade)}>{result.grade}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{result.remarks}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Overall Performance */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-3">Overall Performance Summary</h3>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Total Marks Obtained</p>
            <p className="text-2xl font-bold text-blue-600">{totalMarksObtained}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Maximum Marks</p>
            <p className="text-2xl font-bold text-gray-800">{totalMaxMarks}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Overall Percentage</p>
            <p className="text-2xl font-bold text-green-600">{overallPercentage.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Final Grade</p>
            <Badge className={`text-lg px-3 py-1 ${getGradeColor(overallGrade)}`}>{overallGrade}</Badge>
          </div>
        </div>
      </div>

      {/* Grading Scale */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Grading Scale</h3>
        <div className="grid grid-cols-7 gap-2 text-sm">
          {gradeScale.map((scale) => (
            <div key={scale.grade} className="text-center p-2 border rounded">
              <div className="font-semibold">{scale.grade}</div>
              <div className="text-xs text-gray-600">{scale.range}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-3 gap-8 pt-8 border-t">
        <div className="text-center">
          <div className="h-16 border-b border-gray-300 mb-2"></div>
          <p className="text-sm font-semibold">Class Teacher</p>
        </div>
        <div className="text-center">
          <div className="h-16 border-b border-gray-300 mb-2"></div>
          <p className="text-sm font-semibold">Principal</p>
        </div>
        <div className="text-center">
          <div className="h-16 border-b border-gray-300 mb-2"></div>
          <p className="text-sm font-semibold">Parent/Guardian</p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-6 pt-4 border-t text-xs text-gray-500">
        <p>
          This is a computer-generated document. Generated on {new Date().toLocaleDateString()} at{" "}
          {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}

export default function MarkSheetsPage() {
  const [selectedStudent, setSelectedStudent] = useState<string>("")
  const [selectedClass, setSelectedClass] = useState<string>("10")
  const [selectedSection, setSelectedSection] = useState<string>("A")
  const [selectedExams, setSelectedExams] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [previewStudent, setPreviewStudent] = useState<any>(null)

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = !selectedClass || student.class === selectedClass
    const matchesSection = !selectedSection || student.section === selectedSection
    return matchesSearch && matchesClass && matchesSection
  })

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // In a real application, this would generate and download a PDF
    alert("PDF download functionality would be implemented here")
  }

  const handleEmail = () => {
    // In a real application, this would open email dialog
    alert("Email functionality would be implemented here")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Mark Sheets</h1>
          <p className="text-gray-600">Generate and manage individual student mark sheets</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Templates
          </Button>
        </div>
      </div>

      <Tabs defaultValue="individual" className="space-y-6">
        <TabsList>
          <TabsTrigger value="individual">Individual Mark Sheets</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Generation</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filter Options</CardTitle>
              <CardDescription>Select criteria to filter students and exams</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search Student</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Name or Roll Number"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Class</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">Class 10</SelectItem>
                      <SelectItem value="11">Class 11</SelectItem>
                      <SelectItem value="12">Class 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Section</Label>
                  <Select value={selectedSection} onValueChange={setSelectedSection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Section A</SelectItem>
                      <SelectItem value="B">Section B</SelectItem>
                      <SelectItem value="C">Section C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Exam Filter</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Exams" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Exams</SelectItem>
                      <SelectItem value="midterm">Mid-term Only</SelectItem>
                      <SelectItem value="final">Final Only</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Students List */}
          <Card>
            <CardHeader>
              <CardTitle>Students ({filteredStudents.length})</CardTitle>
              <CardDescription>Select a student to generate mark sheet</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.rollNumber}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.section}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setPreviewStudent(student)}>
                                <Eye className="h-4 w-4 mr-1" />
                                Preview
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Mark Sheet Preview - {student.name}</DialogTitle>
                                <DialogDescription>
                                  Preview and print the mark sheet for {student.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="flex items-center space-x-2 print:hidden">
                                  <Button onClick={handlePrint} size="sm">
                                    <Print className="h-4 w-4 mr-2" />
                                    Print
                                  </Button>
                                  <Button onClick={handleDownload} variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download PDF
                                  </Button>
                                  <Button onClick={handleEmail} variant="outline" size="sm">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Email
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Share
                                  </Button>
                                </div>
                                <MarkSheetPreview student={student} selectedExams={selectedExams} />
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm" onClick={handleDownload}>
                            <Download className="h-4 w-4 mr-1" />
                            PDF
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleEmail}>
                            <Mail className="h-4 w-4 mr-1" />
                            Email
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

        <TabsContent value="bulk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Mark Sheet Generation</CardTitle>
              <CardDescription>Generate mark sheets for multiple students at once</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Select Class</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">Class 10</SelectItem>
                      <SelectItem value="11">Class 11</SelectItem>
                      <SelectItem value="12">Class 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Select Section</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Section A</SelectItem>
                      <SelectItem value="B">Section B</SelectItem>
                      <SelectItem value="C">Section C</SelectItem>
                      <SelectItem value="all">All Sections</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Exam Period</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Exams</SelectItem>
                      <SelectItem value="midterm">Mid-term Exams</SelectItem>
                      <SelectItem value="final">Final Exams</SelectItem>
                      <SelectItem value="custom">Custom Date Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Generate All Mark Sheets
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download as ZIP
                </Button>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Email to Parents
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mark Sheet Templates</CardTitle>
              <CardDescription>Manage and customize mark sheet templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <FileText className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="font-semibold mb-2">Standard Template</h3>
                    <p className="text-sm text-gray-600 mb-4">Default mark sheet format with all standard fields</p>
                    <Button variant="outline" size="sm">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <Award className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="font-semibold mb-2">Achievement Template</h3>
                    <p className="text-sm text-gray-600 mb-4">Enhanced format with achievements and awards</p>
                    <Button variant="outline" size="sm">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="font-semibold mb-2">Detailed Template</h3>
                    <p className="text-sm text-gray-600 mb-4">Comprehensive format with detailed analytics</p>
                    <Button variant="outline" size="sm">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
