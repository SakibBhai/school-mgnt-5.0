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
  AreaChart,
  Area,
} from "recharts"
import { Download, TrendingUp, TrendingDown, AlertTriangle, Users, Calendar, Clock } from "lucide-react"

const weeklyAttendanceData = [
  { week: "Week 1", grade9: 94.2, grade10: 91.8, grade11: 89.5, grade12: 95.1 },
  { week: "Week 2", grade9: 93.8, grade10: 92.5, grade11: 88.9, grade12: 94.7 },
  { week: "Week 3", grade9: 95.1, grade10: 90.2, grade11: 91.3, grade12: 96.2 },
  { week: "Week 4", grade9: 92.7, grade10: 93.1, grade11: 87.8, grade12: 95.8 },
  { week: "Week 5", grade9: 94.5, grade10: 91.7, grade11: 90.4, grade12: 94.3 },
  { week: "Week 6", grade9: 93.2, grade10: 92.8, grade11: 89.1, grade12: 95.5 },
]

const dailyAttendancePattern = [
  { day: "Monday", attendance: 89.2, students: 445 },
  { day: "Tuesday", attendance: 92.8, students: 463 },
  { day: "Wednesday", attendance: 94.1, students: 470 },
  { day: "Thursday", attendance: 91.5, students: 457 },
  { day: "Friday", attendance: 87.3, students: 436 },
]

const sectionComparison = [
  { section: "9A", attendance: 94.2, trend: "up", change: 2.1 },
  { section: "9B", attendance: 91.8, trend: "down", change: -1.7 },
  { section: "10A", attendance: 89.5, trend: "stable", change: 0.3 },
  { section: "10B", attendance: 95.1, trend: "up", change: 1.3 },
  { section: "11A", attendance: 87.8, trend: "down", change: -2.4 },
  { section: "11B", attendance: 92.4, trend: "up", change: 1.8 },
]

const attendanceDistribution = [
  { range: "95-100%", students: 156, color: "#10B981" },
  { range: "90-94%", students: 98, color: "#3B82F6" },
  { range: "85-89%", students: 67, color: "#F59E0B" },
  { range: "80-84%", students: 34, color: "#EF4444" },
  { range: "Below 80%", students: 12, color: "#DC2626" },
]

const monthlyTrends = [
  { month: "Sep", present: 445, absent: 23, late: 12 },
  { month: "Oct", present: 452, absent: 18, late: 10 },
  { month: "Nov", present: 448, absent: 25, late: 15 },
  { month: "Dec", present: 456, absent: 16, late: 8 },
  { month: "Jan", present: 461, absent: 14, late: 5 },
]

const riskStudents = [
  {
    name: "Mike Johnson",
    rollNumber: "10A003",
    section: "Grade 10 - A",
    attendanceRate: 67.8,
    daysAbsent: 19,
    trend: "declining",
    riskLevel: "high",
  },
  {
    name: "Sarah Davis",
    rollNumber: "9B015",
    section: "Grade 9 - B",
    attendanceRate: 74.2,
    daysAbsent: 15,
    trend: "stable",
    riskLevel: "medium",
  },
  {
    name: "Alex Wilson",
    rollNumber: "11A008",
    section: "Grade 11 - A",
    attendanceRate: 78.9,
    daysAbsent: 12,
    trend: "improving",
    riskLevel: "medium",
  },
]

export default function AttendanceAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into attendance patterns and trends</p>
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
            Export Analytics
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.4%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+1.2%</span> from last month
            </p>
            <Progress value={92.4} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Best Performing Section</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Grade 10-B</div>
            <p className="text-xs text-muted-foreground">95.1% attendance rate</p>
            <Badge variant="default" className="mt-2">
              Excellent
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">12</div>
            <p className="text-xs text-muted-foreground">Below 80% attendance</p>
            <Badge variant="destructive" className="mt-2">
              Needs Attention
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Perfect Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">156</div>
            <p className="text-xs text-muted-foreground">Students with 100% attendance</p>
            <Badge variant="default" className="mt-2">
              Outstanding
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList>
          <TabsTrigger value="trends">Attendance Trends</TabsTrigger>
          <TabsTrigger value="sections">Section Analysis</TabsTrigger>
          <TabsTrigger value="patterns">Daily Patterns</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          {/* Weekly Attendance Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Weekly Attendance Trends by Grade
              </CardTitle>
              <CardDescription>Attendance percentage over the past 6 weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyAttendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="grade9" stroke="#3B82F6" strokeWidth={2} name="Grade 9" />
                  <Line type="monotone" dataKey="grade10" stroke="#10B981" strokeWidth={2} name="Grade 10" />
                  <Line type="monotone" dataKey="grade11" stroke="#F59E0B" strokeWidth={2} name="Grade 11" />
                  <Line type="monotone" dataKey="grade12" stroke="#8B5CF6" strokeWidth={2} name="Grade 12" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Attendance Overview</CardTitle>
              <CardDescription>Present, absent, and late arrivals by month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="present" stackId="1" stroke="#10B981" fill="#10B981" name="Present" />
                  <Area type="monotone" dataKey="absent" stackId="1" stroke="#EF4444" fill="#EF4444" name="Absent" />
                  <Area type="monotone" dataKey="late" stackId="1" stroke="#F59E0B" fill="#F59E0B" name="Late" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Attendance Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Distribution</CardTitle>
                <CardDescription>Student distribution by attendance percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={attendanceDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="students"
                    >
                      {attendanceDistribution.map((entry, index) => (
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
                <CardTitle>Distribution Breakdown</CardTitle>
                <CardDescription>Detailed student count by attendance range</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendanceDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                        <span className="font-medium">{item.range}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{item.students}</div>
                        <div className="text-xs text-gray-500">students</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sections" className="space-y-6">
          {/* Section Performance Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Section Performance Comparison</CardTitle>
              <CardDescription>Attendance rates and trends across all sections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sectionComparison.map((section, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="font-medium text-lg">Section {section.section}</div>
                      <Badge
                        variant={
                          section.attendance >= 95 ? "default" : section.attendance >= 90 ? "secondary" : "destructive"
                        }
                      >
                        {section.attendance}%
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          {section.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                          {section.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                          {section.trend === "stable" && <div className="h-4 w-4" />}
                          <span
                            className={`text-sm font-medium ${
                              section.change > 0
                                ? "text-green-600"
                                : section.change < 0
                                  ? "text-red-600"
                                  : "text-gray-600"
                            }`}
                          >
                            {section.change > 0 ? "+" : ""}
                            {section.change}%
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">vs last month</div>
                      </div>
                      <Progress value={section.attendance} className="w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top and Bottom Performers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Top Performing Sections</CardTitle>
                <CardDescription>Sections with highest attendance rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sectionComparison
                    .sort((a, b) => b.attendance - a.attendance)
                    .slice(0, 3)
                    .map((section, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <div className="font-medium">Section {section.section}</div>
                          <div className="text-sm text-gray-600">{section.attendance}% attendance</div>
                        </div>
                        <Badge variant="default">#{index + 1}</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Sections Needing Attention</CardTitle>
                <CardDescription>Sections with lower attendance rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sectionComparison
                    .sort((a, b) => a.attendance - b.attendance)
                    .slice(0, 3)
                    .map((section, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <div className="font-medium">Section {section.section}</div>
                          <div className="text-sm text-gray-600">{section.attendance}% attendance</div>
                        </div>
                        <Badge variant="destructive">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Alert
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          {/* Daily Attendance Patterns */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Daily Attendance Patterns
              </CardTitle>
              <CardDescription>Attendance rates by day of the week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyAttendancePattern}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="attendance" fill="#3B82F6" name="Attendance %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pattern Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Best Attendance Day</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Wednesday</div>
                <p className="text-xs text-muted-foreground">94.1% average attendance</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Lowest Attendance Day</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">Friday</div>
                <p className="text-xs text-muted-foreground">87.3% average attendance</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Most Consistent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">Tuesday</div>
                <p className="text-xs text-muted-foreground">Lowest variance in attendance</p>
              </CardContent>
            </Card>
          </div>

          {/* Time-based Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Late Arrival Analysis
              </CardTitle>
              <CardDescription>Patterns in student late arrivals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Peak Late Arrival Times</h4>
                  <div className="space-y-2">
                    {[
                      { time: "8:30-8:45 AM", count: 15, percentage: 45 },
                      { time: "8:45-9:00 AM", count: 12, percentage: 36 },
                      { time: "9:00-9:15 AM", count: 6, percentage: 18 },
                    ].map((slot, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">{slot.time}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{slot.count} students</span>
                          <Progress value={slot.percentage} className="w-16" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Frequent Late Students</h4>
                  <div className="space-y-2">
                    {[
                      { name: "Emma Davis", count: 8, section: "10A" },
                      { name: "Ryan Martinez", count: 6, section: "9B" },
                      { name: "Alex Johnson", count: 5, section: "11A" },
                    ].map((student, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <div className="text-sm font-medium">{student.name}</div>
                          <div className="text-xs text-gray-500">Section {student.section}</div>
                        </div>
                        <Badge variant="secondary">{student.count} times</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          {/* At-Risk Students */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                At-Risk Students Analysis
              </CardTitle>
              <CardDescription>Students requiring immediate intervention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskStudents.map((student, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      student.riskLevel === "high" ? "bg-red-50 border-red-200" : "bg-yellow-50 border-yellow-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-600">
                            {student.rollNumber} • {student.section}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">{student.attendanceRate}%</div>
                          <div className="text-xs text-gray-500">Attendance</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{student.daysAbsent}</div>
                          <div className="text-xs text-gray-500">Days Absent</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <Badge variant={student.riskLevel === "high" ? "destructive" : "secondary"} className="mb-1">
                            {student.riskLevel.toUpperCase()} RISK
                          </Badge>
                          <div className="text-xs text-gray-500">
                            {student.trend === "declining" && "📉 Declining"}
                            {student.trend === "stable" && "➡️ Stable"}
                            {student.trend === "improving" && "📈 Improving"}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Intervene
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Factors</CardTitle>
                <CardDescription>Common factors contributing to poor attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { factor: "Chronic Illness", students: 8, percentage: 67 },
                    { factor: "Transportation Issues", students: 6, percentage: 50 },
                    { factor: "Family Circumstances", students: 4, percentage: 33 },
                    { factor: "Academic Struggles", students: 3, percentage: 25 },
                    { factor: "Social Issues", students: 2, percentage: 17 },
                  ].map((factor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{factor.factor}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{factor.students} students</span>
                        <Progress value={factor.percentage} className="w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Intervention Strategies</CardTitle>
                <CardDescription>Recommended actions for at-risk students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      strategy: "Parent Conference",
                      priority: "High",
                      students: 12,
                      color: "bg-red-100 text-red-800",
                    },
                    {
                      strategy: "Counseling Support",
                      priority: "Medium",
                      students: 8,
                      color: "bg-yellow-100 text-yellow-800",
                    },
                    {
                      strategy: "Academic Support",
                      priority: "Medium",
                      students: 6,
                      color: "bg-yellow-100 text-yellow-800",
                    },
                    {
                      strategy: "Health Assessment",
                      priority: "High",
                      students: 5,
                      color: "bg-red-100 text-red-800",
                    },
                  ].map((strategy, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{strategy.strategy}</div>
                        <div className="text-sm text-gray-600">{strategy.students} students affected</div>
                      </div>
                      <Badge className={strategy.color}>{strategy.priority}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Predictive Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Predictive Risk Assessment</CardTitle>
              <CardDescription>Students likely to become at-risk based on current trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">8</div>
                    <div className="text-sm text-gray-600">Students at risk within 2 weeks</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">15</div>
                    <div className="text-sm text-gray-600">Students showing declining trends</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">23</div>
                    <div className="text-sm text-gray-600">Students showing improvement</div>
                  </div>
                </div>
                <div className="text-center py-4">
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    View Detailed Risk Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
