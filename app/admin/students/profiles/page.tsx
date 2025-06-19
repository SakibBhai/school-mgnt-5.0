"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Award, Calendar, DollarSign, GraduationCap, BookOpen } from "lucide-react"

const studentProfile = {
  id: 1,
  name: "John Doe",
  rollNumber: "2024001",
  class: "10A",
  avatar: "/placeholder.svg?height=120&width=120",
  gpa: 3.85,
  attendanceRate: 92,

  // Academic Performance Data
  subjectGrades: [
    { subject: "Mathematics", grade: "A+", score: 95, credits: 4 },
    { subject: "Physics", grade: "A", score: 88, credits: 4 },
    { subject: "Chemistry", grade: "A-", score: 85, credits: 4 },
    { subject: "English", grade: "A", score: 90, credits: 3 },
    { subject: "History", grade: "B+", score: 82, credits: 3 },
    { subject: "Biology", grade: "A", score: 87, credits: 4 },
  ],

  // Attendance Data
  attendanceHistory: [
    { month: "Sep", present: 22, absent: 1, late: 0 },
    { month: "Oct", present: 21, absent: 2, late: 1 },
    { month: "Nov", present: 20, absent: 1, late: 0 },
    { month: "Dec", present: 18, absent: 0, late: 2 },
    { month: "Jan", present: 19, absent: 1, late: 0 },
  ],

  // Fee Information
  feeStructure: [
    { type: "Tuition Fee", amount: 8000, paid: 8000, due: 0, dueDate: "2024-01-15" },
    { type: "Lab Fee", amount: 1500, paid: 1500, due: 0, dueDate: "2024-01-15" },
    { type: "Library Fee", amount: 500, paid: 500, due: 0, dueDate: "2024-01-15" },
    { type: "Sports Fee", amount: 1000, paid: 500, due: 500, dueDate: "2024-02-15" },
    { type: "Transport Fee", amount: 1000, paid: 0, due: 1000, dueDate: "2024-02-01" },
  ],

  // Performance Trends
  performanceTrend: [
    { exam: "Unit Test 1", score: 82 },
    { exam: "Mid Term", score: 85 },
    { exam: "Unit Test 2", score: 88 },
    { exam: "Pre Final", score: 90 },
    { exam: "Final", score: 87 },
  ],
}

export default function StudentProfilesPage() {
  const [selectedStudent, setSelectedStudent] = useState("john-doe")
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("2024-25")

  const totalFees = studentProfile.feeStructure.reduce((sum, fee) => sum + fee.amount, 0)
  const paidFees = studentProfile.feeStructure.reduce((sum, fee) => sum + fee.paid, 0)
  const dueFees = studentProfile.feeStructure.reduce((sum, fee) => sum + fee.due, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Profiles</h1>
          <p className="text-gray-600">Detailed student information and analytics</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedStudent} onValueChange={setSelectedStudent}>
            <SelectTrigger className="w-60">
              <SelectValue placeholder="Select Student" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john-doe">John Doe - 2024001</SelectItem>
              <SelectItem value="sarah-smith">Sarah Smith - 2024002</SelectItem>
              <SelectItem value="mike-johnson">Mike Johnson - 2024003</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedAcademicYear} onValueChange={setSelectedAcademicYear}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Academic Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-25">2024-25</SelectItem>
              <SelectItem value="2023-24">2023-24</SelectItem>
              <SelectItem value="2022-23">2022-23</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Student Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <img
              src={studentProfile.avatar || "/placeholder.svg"}
              alt={studentProfile.name}
              className="w-24 h-24 rounded-full border-4 border-blue-100"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{studentProfile.name}</h2>
              <p className="text-gray-600">
                Roll Number: {studentProfile.rollNumber} • Class: {studentProfile.class}
              </p>
              <div className="flex items-center space-x-6 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{studentProfile.gpa}</div>
                  <div className="text-sm text-gray-600">GPA</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{studentProfile.attendanceRate}%</div>
                  <div className="text-sm text-gray-600">Attendance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">${paidFees}</div>
                  <div className="text-sm text-gray-600">Fees Paid</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">${dueFees}</div>
                  <div className="text-sm text-gray-600">Outstanding</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Badge variant="default">Active</Badge>
              <Badge variant="outline">Honor Roll</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Tabs defaultValue="academic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="academic">Academic Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance Records</TabsTrigger>
          <TabsTrigger value="fees">Fee Management</TabsTrigger>
          <TabsTrigger value="career">Career & Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="academic" className="space-y-6">
          {/* Subject Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Performance</CardTitle>
                <CardDescription>Current semester grades and scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentProfile.subjectGrades.map((subject) => (
                    <div key={subject.subject} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{subject.subject}</div>
                          <div className="text-sm text-gray-500">{subject.credits} Credits</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="font-bold">{subject.score}%</div>
                          <div className="text-sm text-gray-500">Score</div>
                        </div>
                        <Badge
                          variant={
                            subject.grade.startsWith("A")
                              ? "default"
                              : subject.grade.startsWith("B")
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {subject.grade}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Trend</CardTitle>
                <CardDescription>Academic performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={studentProfile.performanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="exam" />
                    <YAxis domain={[70, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* GPA Calculation */}
          <Card>
            <CardHeader>
              <CardTitle>GPA Calculation</CardTitle>
              <CardDescription>Detailed breakdown of grade point average</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{studentProfile.gpa}</div>
                    <div className="text-sm text-gray-600">Current GPA</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">22</div>
                    <div className="text-sm text-gray-600">Total Credits</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">87.5%</div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Grade Distribution</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {["A+", "A", "A-", "B+", "B"].map((grade) => {
                      const count = studentProfile.subjectGrades.filter((s) => s.grade === grade).length
                      return (
                        <div key={grade} className="text-center p-2 bg-gray-50 rounded">
                          <div className="font-bold">{count}</div>
                          <div className="text-xs text-gray-600">{grade}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          {/* Attendance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Present</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">100</div>
                <p className="text-xs text-muted-foreground">Days this year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Absent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">5</div>
                <p className="text-xs text-muted-foreground">Days this year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">3</div>
                <p className="text-xs text-muted-foreground">This year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">95.2%</div>
                <Progress value={95.2} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Monthly Attendance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Attendance Breakdown</CardTitle>
              <CardDescription>Attendance pattern throughout the academic year</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={studentProfile.attendanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="present" fill="#10B981" name="Present" />
                  <Bar dataKey="absent" fill="#EF4444" name="Absent" />
                  <Bar dataKey="late" fill="#F59E0B" name="Late" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Attendance Records */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance Records</CardTitle>
              <CardDescription>Detailed attendance history with timestamps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { date: "2024-01-15", status: "Present", time: "08:30 AM", subject: "Mathematics" },
                  { date: "2024-01-14", status: "Present", time: "08:25 AM", subject: "Physics" },
                  { date: "2024-01-13", status: "Absent", reason: "Sick", subject: "Chemistry" },
                  { date: "2024-01-12", status: "Present", time: "08:35 AM", subject: "English" },
                  { date: "2024-01-11", status: "Late", time: "09:15 AM", subject: "History" },
                  { date: "2024-01-10", status: "Present", time: "08:28 AM", subject: "Biology" },
                ].map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="font-medium">{record.date}</div>
                        <div className="text-sm text-gray-500">{record.subject}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant={
                          record.status === "Present"
                            ? "default"
                            : record.status === "Absent"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {record.status}
                      </Badge>
                      {record.time && <span className="text-sm text-gray-500">{record.time}</span>}
                      {record.reason && <span className="text-sm text-red-500">({record.reason})</span>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees" className="space-y-6">
          {/* Fee Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">${totalFees}</div>
                <p className="text-xs text-muted-foreground">Academic year 2024-25</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Amount Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">${paidFees}</div>
                <Progress value={(paidFees / totalFees) * 100} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">${dueFees}</div>
                <p className="text-xs text-muted-foreground">{dueFees === 0 ? "All fees paid" : "Payment pending"}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{Math.round((paidFees / totalFees) * 100)}%</div>
                <p className="text-xs text-muted-foreground">Completion rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Fee Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Fee Structure & Payment Status</CardTitle>
              <CardDescription>Detailed breakdown of all fees and payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentProfile.feeStructure.map((fee, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{fee.type}</h4>
                        <p className="text-sm text-gray-500">Due Date: {fee.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">${fee.amount}</div>
                        <Badge variant={fee.due === 0 ? "default" : "destructive"}>
                          {fee.due === 0 ? "Paid" : `$${fee.due} Due`}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Paid: ${fee.paid}</span>
                        <span>Outstanding: ${fee.due}</span>
                      </div>
                      <Progress value={(fee.paid / fee.amount) * 100} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Complete record of all fee payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { date: "2024-01-15", amount: 8000, type: "Tuition Fee", method: "Bank Transfer", receipt: "RCP001" },
                  { date: "2024-01-15", amount: 1500, type: "Lab Fee", method: "Online Payment", receipt: "RCP002" },
                  { date: "2024-01-15", amount: 500, type: "Library Fee", method: "Cash", receipt: "RCP003" },
                  { date: "2024-01-10", amount: 500, type: "Sports Fee", method: "Online Payment", receipt: "RCP004" },
                ].map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <div>
                        <div className="font-medium">{payment.type}</div>
                        <div className="text-sm text-gray-500">
                          {payment.date} • {payment.method} • {payment.receipt}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">${payment.amount}</div>
                      <Badge variant="default">Paid</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="career" className="space-y-6">
          {/* Career Goals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Academic Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Primary Interests</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["Computer Science", "Mathematics", "Physics"].map((interest) => (
                        <Badge key={interest} variant="default">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Secondary Interests</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["Robotics", "AI/ML", "Data Science"].map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Extracurricular Activities</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["Coding Club", "Math Olympiad", "Science Fair"].map((activity) => (
                        <Badge key={activity} variant="outline">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Career Aspirations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Short-term Goals (1-2 years)</Label>
                  <p className="text-sm mt-1">
                    Excel in mathematics and computer science, participate in coding competitions, and maintain high
                    academic performance.
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Medium-term Goals (3-5 years)</Label>
                  <p className="text-sm mt-1">
                    Pursue computer science engineering from a top university, gain internship experience at tech
                    companies.
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Long-term Vision (5+ years)</Label>
                  <p className="text-sm mt-1">
                    Become a software engineer at a leading technology company, specialize in artificial intelligence
                    and machine learning.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills Assessment */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Competencies</CardTitle>
              <CardDescription>Assessment of various skills and abilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Technical Skills</h4>
                  {[
                    { skill: "Programming", level: 85 },
                    { skill: "Mathematics", level: 95 },
                    { skill: "Problem Solving", level: 90 },
                    { skill: "Data Analysis", level: 75 },
                  ].map((item) => (
                    <div key={item.skill} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.skill}</span>
                        <span>{item.level}%</span>
                      </div>
                      <Progress value={item.level} />
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Soft Skills</h4>
                  {[
                    { skill: "Communication", level: 80 },
                    { skill: "Leadership", level: 75 },
                    { skill: "Teamwork", level: 85 },
                    { skill: "Time Management", level: 90 },
                  ].map((item) => (
                    <div key={item.skill} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.skill}</span>
                        <span>{item.level}%</span>
                      </div>
                      <Progress value={item.level} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Career Guidance & Recommendations</CardTitle>
              <CardDescription>Personalized recommendations based on interests and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900">Recommended Courses</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Advanced Mathematics, Computer Programming, Data Structures, Physics with focus on computational
                    methods
                  </p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-900">Suggested Activities</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Join programming competitions, participate in science fairs, consider online courses in AI/ML,
                    volunteer for tech workshops
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-purple-900">University Preparation</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Focus on entrance exam preparation for engineering colleges, build a portfolio of programming
                    projects, maintain strong academic record
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
