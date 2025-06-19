"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, TrendingUp, GraduationCap, BookOpen, AlertTriangle } from "lucide-react"

const enrollmentData = [
  { class: "Grade 9", sectionA: 32, sectionB: 30, sectionC: 28 },
  { class: "Grade 10", sectionA: 38, sectionB: 35, sectionC: 33 },
  { class: "Grade 11", sectionA: 29, sectionB: 31, sectionC: 27 },
  { class: "Grade 12", sectionA: 25, sectionB: 28, sectionC: 26 },
]

const capacityUtilization = [
  { section: "9A", utilized: 91, capacity: 35 },
  { section: "9B", utilized: 86, capacity: 35 },
  { section: "10A", utilized: 95, capacity: 40 },
  { section: "10B", utilized: 88, capacity: 40 },
  { section: "11A", utilized: 83, capacity: 35 },
  { section: "11B", utilized: 89, capacity: 35 },
]

const teacherWorkload = [
  { name: "Ms. Sarah Johnson", sections: 2, students: 62, subjects: 3, workload: 85 },
  { name: "Mr. David Brown", sections: 1, students: 30, subjects: 2, workload: 65 },
  { name: "Dr. Michael Chen", sections: 3, students: 95, subjects: 4, workload: 95 },
  { name: "Ms. Lisa Garcia", sections: 2, students: 63, subjects: 3, workload: 80 },
]

const subjectDistribution = [
  { subject: "Mathematics", sections: 8, color: "#3B82F6" },
  { subject: "Physics", sections: 6, color: "#10B981" },
  { subject: "Chemistry", sections: 6, color: "#F59E0B" },
  { subject: "English", sections: 8, color: "#8B5CF6" },
  { subject: "History", sections: 4, color: "#EF4444" },
  { subject: "Biology", sections: 4, color: "#06B6D4" },
]

const enrollmentTrends = [
  { month: "Jan", enrolled: 450, capacity: 520 },
  { month: "Feb", enrolled: 465, capacity: 520 },
  { month: "Mar", enrolled: 478, capacity: 520 },
  { month: "Apr", enrolled: 485, capacity: 520 },
  { month: "May", enrolled: 492, capacity: 520 },
  { month: "Jun", enrolled: 498, capacity: 520 },
]

export default function ClassAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Classes & Sections Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into class management and utilization</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="current">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Term</SelectItem>
              <SelectItem value="previous">Previous Term</SelectItem>
              <SelectItem value="yearly">Yearly View</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">498</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Capacity Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95.8%</div>
            <Progress value={95.8} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Across all sections</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Class Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">31.2</div>
            <p className="text-xs text-muted-foreground">Students per section</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="enrollment" className="space-y-6">
        <TabsList>
          <TabsTrigger value="enrollment">Enrollment Analysis</TabsTrigger>
          <TabsTrigger value="capacity">Capacity Management</TabsTrigger>
          <TabsTrigger value="teachers">Teacher Workload</TabsTrigger>
          <TabsTrigger value="subjects">Subject Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="enrollment" className="space-y-6">
          {/* Enrollment by Class */}
          <Card>
            <CardHeader>
              <CardTitle>Enrollment by Class and Section</CardTitle>
              <CardDescription>Student distribution across different classes and sections</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="class" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sectionA" fill="#3B82F6" name="Section A" />
                  <Bar dataKey="sectionB" fill="#10B981" name="Section B" />
                  <Bar dataKey="sectionC" fill="#F59E0B" name="Section C" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Enrollment Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Enrollment Trends
              </CardTitle>
              <CardDescription>Monthly enrollment vs capacity over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={enrollmentTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="enrolled" stroke="#3B82F6" strokeWidth={3} name="Enrolled" />
                  <Line type="monotone" dataKey="capacity" stroke="#EF4444" strokeWidth={2} name="Capacity" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Class Performance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>High Enrollment Classes</CardTitle>
                <CardDescription>Classes with highest student enrollment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { class: "Grade 10 - Section A", students: 38, capacity: 40, percentage: 95 },
                  { class: "Grade 9 - Section A", students: 32, capacity: 35, percentage: 91 },
                  { class: "Grade 10 - Section B", students: 35, capacity: 40, percentage: 88 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{item.class}</div>
                      <div className="text-sm text-gray-500">
                        {item.students}/{item.capacity} students
                      </div>
                    </div>
                    <Badge variant={item.percentage >= 90 ? "destructive" : "default"}>{item.percentage}%</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Capacity</CardTitle>
                <CardDescription>Sections with available seats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { class: "Grade 11 - Section C", available: 8, capacity: 35, percentage: 77 },
                  { class: "Grade 12 - Section A", available: 10, capacity: 35, percentage: 71 },
                  { class: "Grade 9 - Section C", available: 7, capacity: 35, percentage: 80 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{item.class}</div>
                      <div className="text-sm text-gray-500">{item.available} seats available</div>
                    </div>
                    <Badge variant="secondary">{item.percentage}%</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="capacity" className="space-y-6">
          {/* Capacity Utilization Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Section Capacity Utilization</CardTitle>
              <CardDescription>Current enrollment vs maximum capacity by section</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={capacityUtilization}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="section" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="utilized" fill="#3B82F6" name="Current Enrollment" />
                  <Bar dataKey="capacity" fill="#E5E7EB" name="Total Capacity" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Capacity Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                Capacity Alerts
              </CardTitle>
              <CardDescription>Sections requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-red-900">Grade 10 - Section A</h4>
                      <p className="text-sm text-red-700">At 95% capacity (38/40 students)</p>
                    </div>
                    <Badge variant="destructive">Critical</Badge>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-yellow-900">Grade 9 - Section A</h4>
                      <p className="text-sm text-yellow-700">At 91% capacity (32/35 students)</p>
                    </div>
                    <Badge variant="secondary">Warning</Badge>
                  </div>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-green-900">Grade 11 - Section C</h4>
                      <p className="text-sm text-green-700">Good capacity utilization (27/35 students)</p>
                    </div>
                    <Badge variant="default">Optimal</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teachers" className="space-y-6">
          {/* Teacher Workload Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Teacher Workload Analysis
              </CardTitle>
              <CardDescription>Distribution of teaching responsibilities across faculty</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacherWorkload.map((teacher, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{teacher.name}</h4>
                        <p className="text-sm text-gray-500">
                          {teacher.sections} sections • {teacher.students} students • {teacher.subjects} subjects
                        </p>
                      </div>
                      <Badge
                        variant={
                          teacher.workload >= 90 ? "destructive" : teacher.workload >= 80 ? "secondary" : "default"
                        }
                      >
                        {teacher.workload}% Load
                      </Badge>
                    </div>
                    <Progress value={teacher.workload} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Teacher Assignment Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Overloaded Teachers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">2</div>
                <p className="text-xs text-muted-foreground">Above 90% workload</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Optimal Load</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">18</div>
                <p className="text-xs text-muted-foreground">70-90% workload</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Underutilized</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">4</div>
                <p className="text-xs text-muted-foreground">Below 70% workload</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          {/* Subject Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Subject Distribution
                </CardTitle>
                <CardDescription>Number of sections per subject</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={subjectDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="sections"
                    >
                      {subjectDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subject Coverage</CardTitle>
                <CardDescription>Detailed breakdown by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectDistribution.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: subject.color }}></div>
                        <span className="font-medium">{subject.subject}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{subject.sections}</div>
                        <div className="text-xs text-gray-500">sections</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subject-wise Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Statistics</CardTitle>
              <CardDescription>Detailed metrics for each subject</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Subject</th>
                      <th className="text-left p-3">Sections</th>
                      <th className="text-left p-3">Total Students</th>
                      <th className="text-left p-3">Avg. Class Size</th>
                      <th className="text-left p-3">Teachers Assigned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { subject: "Mathematics", sections: 8, students: 248, avgSize: 31, teachers: 3 },
                      { subject: "Physics", sections: 6, students: 186, avgSize: 31, teachers: 2 },
                      { subject: "Chemistry", sections: 6, students: 186, avgSize: 31, teachers: 2 },
                      { subject: "English", sections: 8, students: 248, avgSize: 31, teachers: 3 },
                      { subject: "History", sections: 4, students: 124, avgSize: 31, teachers: 2 },
                      { subject: "Biology", sections: 4, students: 124, avgSize: 31, teachers: 2 },
                    ].map((row, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-3 font-medium">{row.subject}</td>
                        <td className="p-3">{row.sections}</td>
                        <td className="p-3">{row.students}</td>
                        <td className="p-3">{row.avgSize}</td>
                        <td className="p-3">{row.teachers}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
