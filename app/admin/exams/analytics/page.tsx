"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, Award, AlertTriangle, Target, Download, Filter } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts"

// Mock data for analytics
const performanceTrend = [
  { month: "Aug", average: 75, passRate: 82 },
  { month: "Sep", average: 78, passRate: 85 },
  { month: "Oct", average: 82, passRate: 88 },
  { month: "Nov", average: 85, passRate: 91 },
  { month: "Dec", average: 83, passRate: 89 },
  { month: "Jan", average: 87, passRate: 93 },
]

const subjectPerformance = [
  { subject: "Mathematics", average: 78, students: 245, passRate: 85 },
  { subject: "Physics", average: 82, students: 198, passRate: 89 },
  { subject: "Chemistry", average: 75, students: 210, passRate: 82 },
  { subject: "Biology", average: 88, students: 187, passRate: 94 },
  { subject: "English", average: 85, students: 298, passRate: 91 },
  { subject: "History", average: 79, students: 156, passRate: 86 },
]

const gradeDistribution = [
  { name: "A+", value: 120, percentage: 12, color: "#10B981" },
  { name: "A", value: 200, percentage: 20, color: "#3B82F6" },
  { name: "B+", value: 180, percentage: 18, color: "#8B5CF6" },
  { name: "B", value: 150, percentage: 15, color: "#F59E0B" },
  { name: "C+", value: 120, percentage: 12, color: "#EF4444" },
  { name: "C", value: 80, percentage: 8, color: "#6B7280" },
  { name: "F", value: 50, percentage: 5, color: "#374151" },
]

const classComparison = [
  { class: "Grade 9A", average: 85, passRate: 92 },
  { class: "Grade 9B", average: 78, passRate: 86 },
  { class: "Grade 10A", average: 82, passRate: 89 },
  { class: "Grade 10B", average: 79, passRate: 85 },
  { class: "Grade 11A", average: 88, passRate: 94 },
  { class: "Grade 11B", average: 84, passRate: 91 },
]

const difficultyAnalysis = [
  { difficulty: "Easy", averageScore: 92, questionCount: 45 },
  { difficulty: "Medium", averageScore: 78, questionCount: 89 },
  { difficulty: "Hard", averageScore: 65, questionCount: 34 },
]

const topPerformers = [
  { name: "Sarah Johnson", class: "Grade 11A", average: 96.5, rank: 1 },
  { name: "Michael Chen", class: "Grade 10B", average: 95.2, rank: 2 },
  { name: "Emma Davis", class: "Grade 11A", average: 94.8, rank: 3 },
  { name: "James Wilson", class: "Grade 10A", average: 94.1, rank: 4 },
  { name: "Lisa Anderson", class: "Grade 9A", average: 93.7, rank: 5 },
]

const atRiskStudents = [
  { name: "Alex Brown", class: "Grade 10B", average: 45.2, subjects: ["Math", "Physics"] },
  { name: "Jordan Lee", class: "Grade 9B", average: 48.7, subjects: ["Chemistry", "Math"] },
  { name: "Taylor Smith", class: "Grade 11B", average: 52.1, subjects: ["Physics"] },
]

export default function ExamAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Exam Analytics</h1>
          <p className="text-gray-600">Comprehensive performance analysis and insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="semester">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semester">This Semester</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
          <TabsTrigger value="classes">Class Comparison</TabsTrigger>
          <TabsTrigger value="students">Student Insights</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Average</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82.4%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+3.2%</span> from last semester
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89.3%</div>
                <Progress value={89.3} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">Students with A+ grades</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">At Risk</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">Students need support</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trend</CardTitle>
                <CardDescription>Average scores and pass rates over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="average" stroke="#3B82F6" strokeWidth={2} name="Average Score" />
                    <Line type="monotone" dataKey="passRate" stroke="#10B981" strokeWidth={2} name="Pass Rate" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Current semester grade breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={gradeDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {gradeDistribution.map((grade) => (
                    <div key={grade.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: grade.color }} />
                        <span className="text-sm font-medium">{grade.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{grade.percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top and At-Risk Students */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Students with highest average scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((student, index) => (
                    <div key={student.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-yellow-800">#{student.rank}</span>
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.class}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">{student.average}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Students at Risk</CardTitle>
                <CardDescription>Students requiring additional support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {atRiskStudents.map((student) => (
                    <div key={student.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.class}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {student.subjects.map((subject) => (
                              <Badge key={subject} variant="outline" className="text-xs">
                                {subject}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-red-100 text-red-800">{student.average}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance Analysis</CardTitle>
              <CardDescription>Comparative analysis across all subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={subjectPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="average" fill="#3B82F6" name="Average Score" />
                  <Bar dataKey="passRate" fill="#10B981" name="Pass Rate" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Question Difficulty Analysis</CardTitle>
              <CardDescription>Performance by question difficulty level</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={difficultyAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="difficulty" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="averageScore" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Class Performance Comparison</CardTitle>
              <CardDescription>Average scores and pass rates by class</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={classComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="class" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="average" fill="#3B82F6" name="Average Score" />
                  <Bar dataKey="passRate" fill="#10B981" name="Pass Rate" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Performance Insights</CardTitle>
              <CardDescription>Individual student analysis and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Student Insights</h3>
                <p className="text-gray-600 mb-4">Detailed individual student performance analysis</p>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  View Student Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Long-term performance analysis and predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Trend Analysis</h3>
                <p className="text-gray-600 mb-4">Historical trends and future performance predictions</p>
                <Button>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Detailed Trends
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
