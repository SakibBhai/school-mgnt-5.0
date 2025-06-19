"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import {
  Search,
  MoreHorizontal,
  Edit,
  Eye,
  Download,
  Upload,
  Calculator,
  FileText,
  TrendingUp,
  Users,
  Award,
  Save,
  Check,
  Printer,
  Mail,
  RefreshCw,
} from "lucide-react"

// Enhanced mock data with more comprehensive structure
const mockExams = [
  {
    id: "EX001",
    name: "Mathematics Midterm",
    subject: "Mathematics",
    class: "Grade 10",
    section: "A",
    date: "2024-01-15",
    totalMarks: 100,
    duration: "3 hours",
    type: "Midterm",
    status: "Scheduled",
    studentsEnrolled: 35,
    resultsEntered: 0,
  },
  {
    id: "EX002",
    name: "Physics Unit Test",
    subject: "Physics",
    class: "Grade 10",
    section: "A",
    date: "2024-01-20",
    totalMarks: 50,
    duration: "2 hours",
    type: "Unit Test",
    status: "Completed",
    studentsEnrolled: 35,
    resultsEntered: 35,
  },
  {
    id: "EX003",
    name: "Chemistry Quiz",
    subject: "Chemistry",
    class: "Grade 10",
    section: "B",
    date: "2024-01-25",
    totalMarks: 25,
    duration: "1 hour",
    type: "Quiz",
    status: "In Progress",
    studentsEnrolled: 32,
    resultsEntered: 15,
  },
]

const mockStudents = [
  {
    id: "STU001",
    name: "John Smith",
    rollNumber: "10A001",
    class: "Grade 10",
    section: "A",
    admissionNumber: "ADM2024001",
    fatherName: "Robert Smith",
    motherName: "Mary Smith",
    dateOfBirth: "2008-05-15",
    email: "john.smith@student.edu",
    parentEmail: "robert.smith@parent.com",
  },
  {
    id: "STU002",
    name: "Emma Johnson",
    rollNumber: "10A002",
    class: "Grade 10",
    section: "A",
    admissionNumber: "ADM2024002",
    fatherName: "David Johnson",
    motherName: "Sarah Johnson",
    dateOfBirth: "2008-03-22",
    email: "emma.johnson@student.edu",
    parentEmail: "david.johnson@parent.com",
  },
  {
    id: "STU003",
    name: "Michael Brown",
    rollNumber: "10A003",
    class: "Grade 10",
    section: "A",
    admissionNumber: "ADM2024003",
    fatherName: "James Brown",
    motherName: "Lisa Brown",
    dateOfBirth: "2008-07-10",
    email: "michael.brown@student.edu",
    parentEmail: "james.brown@parent.com",
  },
  {
    id: "STU004",
    name: "Sophia Davis",
    rollNumber: "10B001",
    class: "Grade 10",
    section: "B",
    admissionNumber: "ADM2024004",
    fatherName: "William Davis",
    motherName: "Jennifer Davis",
    dateOfBirth: "2008-09-18",
    email: "sophia.davis@student.edu",
    parentEmail: "william.davis@parent.com",
  },
]

export default function ResultsPage() {
  const [examResults, setExamResults] = useState<any[]>([
    {
      id: "RES001",
      examId: "EX002",
      studentId: "STU001",
      marksObtained: 42,
      totalMarks: 50,
      percentage: 84,
      grade: "A",
      remarks: "Excellent performance",
      enteredBy: "teacher001",
      enteredAt: "2024-01-21T10:30:00",
      status: "Published",
    },
    {
      id: "RES002",
      examId: "EX002",
      studentId: "STU002",
      marksObtained: 46,
      totalMarks: 50,
      percentage: 92,
      grade: "A+",
      remarks: "Outstanding work",
      enteredBy: "teacher001",
      enteredAt: "2024-01-21T10:35:00",
      status: "Published",
    },
  ])
  const [results, setResults] = useState(examResults)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterExam, setFilterExam] = useState("all")
  const [filterClass, setFilterClass] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isEntryDialogOpen, setIsEntryDialogOpen] = useState(false)
  const [selectedExam, setSelectedExam] = useState<any>(null)
  const [studentMarks, setStudentMarks] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("results")
  const [previewStudent, setPreviewStudent] = useState<any>(null)
  const [isMarkSheetOpen, setIsMarkSheetOpen] = useState(false)
  const [autoGenerateMarkSheets, setAutoGenerateMarkSheets] = useState(true)

  // Get students for selected exam
  const getStudentsForExam = (exam: any) => {
    return mockStudents.filter((student) => student.class === exam.class && student.section === exam.section)
  }

  // Handle exam selection for result entry
  const handleExamSelect = (examId: string) => {
    const exam = mockExams.find((e) => e.id === examId)
    if (exam) {
      setSelectedExam(exam)
      const students = getStudentsForExam(exam)
      const initialMarks: any = {}

      students.forEach((student) => {
        const existingResult = results.find((r) => r.examId === examId && r.studentId === student.id)
        initialMarks[student.id] = {
          marksObtained: existingResult?.marksObtained || "",
          remarks: existingResult?.remarks || "",
          absent: false,
        }
      })

      setStudentMarks(initialMarks)
    }
  }

  // Handle mark input change
  const handleMarkChange = (studentId: string, field: string, value: any) => {
    setStudentMarks((prev: any) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }))
  }

  // Calculate percentage and grade
  const calculateStudentGrade = (marks: number, totalMarks: number) => {
    const percentage = (marks / totalMarks) * 100
    return {
      percentage: Math.round(percentage),
      grade: calculateGrade(percentage),
    }
  }

  // Submit results
  const handleSubmitResults = async () => {
    if (!selectedExam) return

    setIsSubmitting(true)

    try {
      const students = getStudentsForExam(selectedExam)
      const newResults: any[] = []

      students.forEach((student) => {
        const studentMark = studentMarks[student.id]
        if (studentMark && studentMark.marksObtained !== "" && !studentMark.absent) {
          const marks = Number.parseInt(studentMark.marksObtained)
          const { percentage, grade } = calculateStudentGrade(marks, selectedExam.totalMarks)

          const resultId = `RES_${selectedExam.id}_${student.id}_${Date.now()}`

          newResults.push({
            id: resultId,
            examId: selectedExam.id,
            studentId: student.id,
            marksObtained: marks,
            totalMarks: selectedExam.totalMarks,
            percentage,
            grade,
            remarks: studentMark.remarks || "",
            enteredBy: "current_teacher", // In real app, get from auth
            enteredAt: new Date().toISOString(),
            status: "Published",
          })
        }
      })

      // Update results state
      setResults((prev) => {
        // Remove existing results for this exam
        const filtered = prev.filter((r) => r.examId !== selectedExam.id)
        return [...filtered, ...newResults]
      })

      // Update exam status
      const examIndex = mockExams.findIndex((e) => e.id === selectedExam.id)
      if (examIndex !== -1) {
        mockExams[examIndex].resultsEntered = newResults.length
        mockExams[examIndex].status = "Completed"
      }

      toast({
        title: "Results Saved Successfully",
        description: `Results for ${newResults.length} students have been saved and mark sheets generated.`,
      })

      // Auto-generate mark sheets if enabled
      if (autoGenerateMarkSheets) {
        toast({
          title: "Mark Sheets Generated",
          description: "Individual mark sheets have been automatically generated for all students.",
        })
      }

      setIsEntryDialogOpen(false)
      setSelectedExam(null)
      setStudentMarks({})
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save results. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle print mark sheet
  const handlePrintMarkSheet = () => {
    const printContent = document.getElementById("marksheet-content")
    if (printContent) {
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Mark Sheet - ${previewStudent?.name}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                .bg-gray-50 { background-color: #f9f9f9; }
                .bg-gray-100 { background-color: #f3f4f6; }
                .bg-blue-50 { background-color: #eff6ff; }
                .text-center { text-align: center; }
                .font-bold { font-weight: bold; }
                .font-semibold { font-weight: 600; }
                .text-blue-600 { color: #2563eb; }
                .rounded { border-radius: 4px; }
                .px-2 { padding-left: 8px; padding-right: 8px; }
                .py-1 { padding-top: 4px; padding-bottom: 4px; }
                .px-3 { padding-left: 12px; padding-right: 12px; }
                .px-4 { padding-left: 16px; padding-right: 16px; }
                .py-3 { padding-top: 12px; padding-bottom: 12px; }
                .px-6 { padding-left: 24px; padding-right: 24px; }
                .py-6 { padding-top: 24px; padding-bottom: 24px; }
                .mb-4 { margin-bottom: 16px; }
                .mb-6 { margin-bottom: 24px; }
                .mb-8 { margin-bottom: 32px; }
                .mt-6 { margin-top: 24px; }
                .mt-8 { margin-top: 32px; }
                .pt-2 { padding-top: 8px; }
                .pt-6 { padding-top: 24px; }
                .border-t { border-top: 1px solid #d1d5db; }
                .border-t-2 { border-top: 2px solid #d1d5db; }
                .bg-green-100 { background-color: #dcfce7; color: #166534; }
                .bg-blue-100 { background-color: #dbeafe; color: #1e40af; }
                .bg-purple-100 { background-color: #e9d5ff; color: #7c3aed; }
                .bg-orange-100 { background-color: #fed7aa; color: #ea580c; }
                .bg-yellow-100 { background-color: #fef3c7; color: #d97706; }
                .bg-gray-100 { background-color: #f3f4f6; color: #374151; }
                .bg-red-100 { background-color: #fee2e2; color: #dc2626; }
                @media print {
                  body { margin: 0; }
                  .no-print { display: none; }
                }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  const filteredResults = results.filter((result) => {
    const student = mockStudents.find((s) => s.id === result.studentId)
    const exam = mockExams.find((e) => e.id === result.examId)

    const matchesSearch = student
      ? student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
      : false
    const matchesExam = filterExam === "all" || result.examId === filterExam
    const matchesClass = filterClass === "all" || (exam && exam.class === filterClass)
    const matchesStatus = filterStatus === "all" || result.status === filterStatus

    return matchesSearch && matchesExam && matchesClass && matchesStatus
  })

  // Mark Sheet Preview Component
  const MarkSheetPreview = ({ student, examResults, exams }: any) => {
    const studentResults = examResults.filter((result: any) => result.studentId === student.id)

    const totalMarksObtained = studentResults.reduce((sum: number, result: any) => sum + result.marksObtained, 0)
    const totalMaxMarks = studentResults.reduce((sum: number, result: any) => sum + result.totalMarks, 0)
    const overallPercentage = totalMaxMarks > 0 ? Math.round((totalMarksObtained / totalMaxMarks) * 100) : 0
    const overallGrade = calculateGrade(overallPercentage)

    return (
      <div className="bg-white p-8 max-w-4xl mx-auto print:p-6" id="marksheet-content">
        {/* Header */}
        <div className="text-center border-b-2 border-blue-600 pb-6 mb-6">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Award className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-900">EduManage Pro School</h1>
              <p className="text-sm text-gray-600">123 Education Street, Academic City - 12345</p>
              <p className="text-sm text-gray-600">Phone: (555) 123-4567 | Email: info@edumanagepro.edu</p>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 bg-gray-100 py-2 px-4 rounded">STUDENT MARK SHEET</h2>
          <p className="text-sm text-gray-600 mt-2">Academic Year 2024-25</p>
        </div>

        {/* Student Information */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <div className="flex">
              <span className="font-semibold w-32 text-gray-700">Student Name:</span>
              <span className="text-gray-900">{student.name}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32 text-gray-700">Roll Number:</span>
              <span className="text-gray-900">{student.rollNumber}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32 text-gray-700">Class:</span>
              <span className="text-gray-900">
                {student.class} - {student.section}
              </span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32 text-gray-700">Admission No:</span>
              <span className="text-gray-900">{student.admissionNumber}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex">
              <span className="font-semibold w-32 text-gray-700">Father's Name:</span>
              <span className="text-gray-900">{student.fatherName}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32 text-gray-700">Mother's Name:</span>
              <span className="text-gray-900">{student.motherName}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32 text-gray-700">Date of Birth:</span>
              <span className="text-gray-900">{new Date(student.dateOfBirth).toLocaleDateString()}</span>
            </div>
            <div className="w-24 h-24 border-2 border-gray-300 rounded bg-gray-50 flex items-center justify-center">
              <Users className="h-12 w-12 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 bg-gray-50 py-2 px-4 rounded text-gray-800">EXAMINATION RESULTS</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">S.No</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Exam Name</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Subject</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Date</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Marks Obtained</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Total Marks</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Percentage</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Grade</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {studentResults.map((result: any, index: number) => {
                const exam = exams.find((e: any) => e.id === result.examId)
                return (
                  <tr key={result.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-3 font-medium">{exam?.name}</td>
                    <td className="border border-gray-300 px-4 py-3">{exam?.subject}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      {exam ? new Date(exam.date).toLocaleDateString() : ""}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center font-semibold">
                      {result.marksObtained}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">{result.totalMarks}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center font-semibold">{result.percentage}%</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded text-sm font-semibold ${getGradeColor(result.grade)}`}>
                        {result.grade}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">{result.remarks}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Overall Summary */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">OVERALL PERFORMANCE</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Total Marks Obtained:</span>
                <span className="font-bold text-lg">{totalMarksObtained}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Total Maximum Marks:</span>
                <span className="font-bold text-lg">{totalMaxMarks}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold text-gray-700">Overall Percentage:</span>
                <span className="font-bold text-xl text-blue-600">{overallPercentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Overall Grade:</span>
                <span className={`px-3 py-1 rounded font-bold text-lg ${getGradeColor(overallGrade)}`}>
                  {overallGrade}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">GRADING SCALE</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>A+ (90-100%)</span>
                <span className="font-semibold">Outstanding</span>
              </div>
              <div className="flex justify-between">
                <span>A (80-89%)</span>
                <span className="font-semibold">Excellent</span>
              </div>
              <div className="flex justify-between">
                <span>B+ (70-79%)</span>
                <span className="font-semibold">Very Good</span>
              </div>
              <div className="flex justify-between">
                <span>B (60-69%)</span>
                <span className="font-semibold">Good</span>
              </div>
              <div className="flex justify-between">
                <span>C+ (50-59%)</span>
                <span className="font-semibold">Satisfactory</span>
              </div>
              <div className="flex justify-between">
                <span>C (40-49%)</span>
                <span className="font-semibold">Pass</span>
              </div>
              <div className="flex justify-between">
                <span>F (Below 40%)</span>
                <span className="font-semibold">Fail</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-gray-300 pt-6 mt-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="border-t border-gray-400 pt-2 mt-8">
                <p className="font-semibold">Class Teacher</p>
                <p className="text-sm text-gray-600">Signature & Date</p>
              </div>
            </div>
            <div>
              <div className="border-t border-gray-400 pt-2 mt-8">
                <p className="font-semibold">Principal</p>
                <p className="text-sm text-gray-600">Signature & Date</p>
              </div>
            </div>
            <div>
              <div className="border-t border-gray-400 pt-2 mt-8">
                <p className="font-semibold">Parent/Guardian</p>
                <p className="text-sm text-gray-600">Signature & Date</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-6 text-sm text-gray-500">
            <p>Generated on: {new Date().toLocaleDateString()} | This is a computer-generated document</p>
          </div>
        </div>
      </div>
    )
  }

  // Helper functions
  const calculateGrade = (percentage: number): string => {
    if (percentage >= 90) return "A+"
    if (percentage >= 80) return "A"
    if (percentage >= 70) return "B+"
    if (percentage >= 60) return "B"
    if (percentage >= 50) return "C+"
    if (percentage >= 40) return "C"
    return "F"
  }

  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case "A+":
        return "bg-green-100 text-green-800"
      case "A":
        return "bg-blue-100 text-blue-800"
      case "B+":
        return "bg-purple-100 text-purple-800"
      case "B":
        return "bg-orange-100 text-orange-800"
      case "C+":
        return "bg-yellow-100 text-yellow-800"
      case "C":
        return "bg-gray-100 text-gray-800"
      case "F":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Results Management</h1>
          <p className="text-muted-foreground">Enter, manage, and analyze student exam results</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Results
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
          <Dialog open={isEntryDialogOpen} onOpenChange={setIsEntryDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Calculator className="h-4 w-4 mr-2" />
                Enter Results
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Enter Exam Results</DialogTitle>
                <DialogDescription>
                  Select an exam and enter marks for all students. Mark sheets will be automatically generated.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Exam Selection */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="examSelect">Select Exam</Label>
                      <Select onValueChange={handleExamSelect}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an exam" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockExams.map((exam) => (
                            <SelectItem key={exam.id} value={exam.id}>
                              {exam.name} - {exam.class} {exam.section} ({exam.totalMarks} marks)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Auto-generate Mark Sheets</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="autoGenerate"
                          checked={autoGenerateMarkSheets}
                          onCheckedChange={setAutoGenerateMarkSheets}
                        />
                        <Label htmlFor="autoGenerate" className="text-sm">
                          Automatically generate mark sheets after saving results
                        </Label>
                      </div>
                    </div>
                  </div>

                  {selectedExam && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Exam Details</h4>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Subject:</span> {selectedExam.subject}
                        </div>
                        <div>
                          <span className="font-medium">Date:</span> {new Date(selectedExam.date).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span> {selectedExam.duration}
                        </div>
                        <div>
                          <span className="font-medium">Total Marks:</span> {selectedExam.totalMarks}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Student Results Entry */}
                {selectedExam && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Enter Student Marks</h4>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Roll No.</TableHead>
                            <TableHead>Student Name</TableHead>
                            <TableHead>Marks Obtained</TableHead>
                            <TableHead>Percentage</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead>Remarks</TableHead>
                            <TableHead>Absent</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getStudentsForExam(selectedExam).map((student) => {
                            const marks = Number.parseInt(studentMarks[student.id]?.marksObtained) || 0
                            const { percentage, grade } =
                              marks > 0
                                ? calculateStudentGrade(marks, selectedExam.totalMarks)
                                : { percentage: 0, grade: "-" }

                            return (
                              <TableRow key={student.id}>
                                <TableCell className="font-medium">{student.rollNumber}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    max={selectedExam.totalMarks}
                                    value={studentMarks[student.id]?.marksObtained || ""}
                                    onChange={(e) => handleMarkChange(student.id, "marksObtained", e.target.value)}
                                    disabled={studentMarks[student.id]?.absent}
                                    className="w-20"
                                    placeholder="0"
                                  />
                                  <span className="text-sm text-muted-foreground ml-2">
                                    / {selectedExam.totalMarks}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <span className="font-medium">{percentage}%</span>
                                </TableCell>
                                <TableCell>
                                  {grade !== "-" && <Badge className={getGradeColor(grade)}>{grade}</Badge>}
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={studentMarks[student.id]?.remarks || ""}
                                    onChange={(e) => handleMarkChange(student.id, "remarks", e.target.value)}
                                    disabled={studentMarks[student.id]?.absent}
                                    className="w-32"
                                    placeholder="Optional"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Checkbox
                                    checked={studentMarks[student.id]?.absent || false}
                                    onCheckedChange={(checked) => handleMarkChange(student.id, "absent", checked)}
                                  />
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setIsEntryDialogOpen(false)}>
                  Cancel
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" disabled={!selectedExam || isSubmitting}>
                    <Save className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button onClick={handleSubmitResults} disabled={!selectedExam || isSubmitting}>
                    {isSubmitting ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4 mr-2" />
                    )}
                    {isSubmitting ? "Saving..." : "Save & Publish Results"}
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Results</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{results.length}</div>
            <p className="text-xs text-muted-foreground">Across all exams</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {results.length > 0
                ? Math.round((results.filter((r) => r.percentage >= 40).length / results.length) * 100)
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">Students passing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mark Sheets Generated</CardTitle>
            <Printer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{results.length}</div>
            <p className="text-xs text-muted-foreground">Ready for download</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="results">Individual Results</TabsTrigger>
          <TabsTrigger value="marksheets">Mark Sheets</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-4">
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filterExam} onValueChange={setFilterExam}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Exams</SelectItem>
                {mockExams.map((exam) => (
                  <SelectItem key={exam.id} value={exam.id}>
                    {exam.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterClass} onValueChange={setFilterClass}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="Grade 10">Grade 10</SelectItem>
                <SelectItem value="Grade 9">Grade 9</SelectItem>
                <SelectItem value="Grade 8">Grade 8</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Table */}
          <Card>
            <CardHeader>
              <CardTitle>Student Results</CardTitle>
              <CardDescription>Individual student performance across exams</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Exam Details</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.map((result) => {
                    const student = mockStudents.find((s) => s.id === result.studentId)
                    const exam = mockExams.find((e) => e.id === result.examId)

                    return (
                      <TableRow key={result.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{student?.name}</div>
                            <div className="text-sm text-muted-foreground">{student?.rollNumber}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-sm">{exam?.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {exam?.subject} • {exam?.class} {exam?.section}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {result.marksObtained}/{result.totalMarks}
                            </div>
                            <div className="text-sm text-muted-foreground">{result.percentage}%</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getGradeColor(result.grade)} variant="secondary">
                            {result.grade}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="w-full">
                            <Progress value={result.percentage} className="h-2" />
                            <div className="text-xs text-muted-foreground mt-1">
                              {result.percentage >= 80
                                ? "Excellent"
                                : result.percentage >= 60
                                  ? "Good"
                                  : result.percentage >= 40
                                    ? "Average"
                                    : "Needs Improvement"}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              result.status === "Published"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                            variant="secondary"
                          >
                            {result.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setPreviewStudent(student)
                                  setIsMarkSheetOpen(true)
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Mark Sheet
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Result
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Printer className="mr-2 h-4 w-4" />
                                Print Mark Sheet
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Email to Parent
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marksheets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated Mark Sheets</CardTitle>
              <CardDescription>View and manage automatically generated mark sheets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockStudents.map((student) => {
                  const studentResults = results.filter((r) => r.studentId === student.id)
                  const totalMarks = studentResults.reduce((sum, r) => sum + r.marksObtained, 0)
                  const maxMarks = studentResults.reduce((sum, r) => sum + r.totalMarks, 0)
                  const overallPercentage = maxMarks > 0 ? Math.round((totalMarks / maxMarks) * 100) : 0
                  const overallGrade = calculateGrade(overallPercentage)

                  return (
                    <Card key={student.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{student.name}</h4>
                            <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Exams Taken:</span>
                            <span className="font-medium">{studentResults.length}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Overall Score:</span>
                            <span className="font-medium">{overallPercentage}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Grade:</span>
                            <Badge className={getGradeColor(overallGrade)} variant="secondary">
                              {overallGrade}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => {
                              setPreviewStudent(student)
                              setIsMarkSheetOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="h-4 w-4 mr-1" />
                            PDF
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Mail className="h-4 w-4 mr-1" />
                            Email
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Comprehensive analysis of exam results and student performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics</h3>
                <p className="text-gray-600 mb-4">Detailed performance insights and predictive analysis</p>
                <Button>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Full Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Mark Sheet Preview Dialog */}
      <Dialog open={isMarkSheetOpen} onOpenChange={setIsMarkSheetOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mark Sheet - {previewStudent?.name}</DialogTitle>
            <DialogDescription>Individual mark sheet with all exam results and overall performance</DialogDescription>
          </DialogHeader>

          {previewStudent && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 print:hidden">
                <Button onClick={handlePrintMarkSheet} size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Email to Parent
                </Button>
              </div>
              <MarkSheetPreview student={previewStudent} examResults={results} exams={mockExams} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
