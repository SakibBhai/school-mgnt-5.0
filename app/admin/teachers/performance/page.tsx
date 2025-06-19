"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Award, TrendingUp, Star, Target, Download } from "lucide-react"

const performanceData = [
  { name: "Dr. Sarah Johnson", teaching: 95, punctuality: 98, studentFeedback: 92, innovation: 88, overall: 93 },
  { name: "Mr. David Wilson", teaching: 87, punctuality: 95, studentFeedback: 85, innovation: 82, overall: 87 },
  { name: "Ms. Emily Davis", teaching: 91, punctuality: 89, studentFeedback: 94, innovation: 90, overall: 91 },
  { name: "Dr. Michael Brown", teaching: 89, punctuality: 92, studentFeedback: 88, innovation: 85, overall: 89 },
]

const monthlyTrends = [
  { month: "Jan", performance: 88 },
  { month: "Feb", performance: 89 },
  { month: "Mar", performance: 91 },
  { month: "Apr", performance: 90 },
  { month: "May", performance: 92 },
  { month: "Jun", performance: 94 },
]

const teacherDetails = [
  {
    name: "Dr. Sarah Johnson",
    department: "Mathematics",
    overallScore: 93,
    rank: 1,
    strengths: ["Excellent teaching methodology", "High student engagement", "Innovative approaches"],
    improvements: ["Could improve digital tool usage"],
    studentFeedback: 4.6,
    classesCompleted: 156,
    attendanceRate: 98,
    achievements: ["Teacher of the Month - May 2024", "Best Innovation Award 2023"],
  },
  {
    name: "Mr. David Wilson",
    department: "Physics",
    overallScore: 87,
    rank: 4,
    strengths: ["Strong subject knowledge", "Good punctuality", "Clear explanations"],
    improvements: ["Student interaction", "Modern teaching methods"],
    studentFeedback: 4.2,
    classesCompleted: 142,
    attendanceRate: 95,
    achievements: ["Perfect Attendance Award 2023"],
  },
]

export default function TeacherPerformancePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Performance</h1>
          <p className="text-gray-600">Monitor and evaluate teacher performance metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90.2%</div>
            <Progress value={90.2} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Above 90% score</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Student Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.3/5</div>
            <div className="flex items-center mt-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="h-3 w-3 text-gray-300" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Improvement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Teachers showing growth</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="individual">Individual Reports</TabsTrigger>
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Performance Comparison Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Teacher Performance Comparison</CardTitle>
              <CardDescription>Overall performance scores across different metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="teaching" fill="#3B82F6" name="Teaching Quality" />
                  <Bar dataKey="punctuality" fill="#10B981" name="Punctuality" />
                  <Bar dataKey="studentFeedback" fill="#F59E0B" name="Student Feedback" />
                  <Bar dataKey="innovation" fill="#8B5CF6" name="Innovation" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Top Performers
                </CardTitle>
                <CardDescription>Teachers with highest overall scores</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {performanceData
                  .sort((a, b) => b.overall - a.overall)
                  .slice(0, 3)
                  .map((teacher, index) => (
                    <div key={teacher.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-500"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{teacher.name}</div>
                          <div className="text-sm text-gray-600">Overall Score</div>
                        </div>
                      </div>
                      <Badge variant="default" className="text-lg px-3 py-1">
                        {teacher.overall}%
                      </Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Areas for Improvement
                </CardTitle>
                <CardDescription>Common improvement areas across teachers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Digital Tool Usage</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Student Interaction</span>
                      <span>72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Innovation in Teaching</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Assessment Methods</span>
                      <span>81%</span>
                    </div>
                    <Progress value={81} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="individual" className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <Select defaultValue="Dr. Sarah Johnson">
              <SelectTrigger className="w-60">
                <SelectValue placeholder="Select Teacher" />
              </SelectTrigger>
              <SelectContent>
                {teacherDetails.map((teacher) => (
                  <SelectItem key={teacher.name} value={teacher.name}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Individual Teacher Report */}
          {teacherDetails.slice(0, 1).map((teacher) => (
            <div key={teacher.name} className="space-y-6">
              {/* Teacher Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{teacher.name}</span>
                    <Badge variant="default" className="text-lg px-4 py-2">
                      Rank #{teacher.rank}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{teacher.department} Department</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{teacher.overallScore}%</div>
                      <div className="text-sm text-gray-600">Overall Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{teacher.studentFeedback}</div>
                      <div className="text-sm text-gray-600">Student Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{teacher.classesCompleted}</div>
                      <div className="text-sm text-gray-600">Classes Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600">{teacher.attendanceRate}%</div>
                      <div className="text-sm text-gray-600">Attendance Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Radar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Breakdown</CardTitle>
                  <CardDescription>Detailed performance across different metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={[performanceData.find((p) => p.name === teacher.name)]}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Teaching Quality"
                        dataKey="teaching"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.1}
                      />
                      <Radar
                        name="Punctuality"
                        dataKey="punctuality"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.1}
                      />
                      <Radar
                        name="Student Feedback"
                        dataKey="studentFeedback"
                        stroke="#F59E0B"
                        fill="#F59E0B"
                        fillOpacity={0.1}
                      />
                      <Radar name="Innovation" dataKey="innovation" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.1} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Strengths and Improvements */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700">Strengths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {teacher.strengths.map((strength, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-700">Areas for Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {teacher.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Achievements & Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {teacher.achievements.map((achievement, index) => (
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
            </div>
          ))}
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Performance Trends
              </CardTitle>
              <CardDescription>Monthly performance trends across the school</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="performance"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Department-wise Performance</CardTitle>
              <CardDescription>Average performance by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { dept: "Mathematics", score: 93, teachers: 12 },
                  { dept: "Science", score: 89, teachers: 15 },
                  { dept: "English", score: 91, teachers: 10 },
                  { dept: "Social Studies", score: 87, teachers: 8 },
                  { dept: "Arts", score: 85, teachers: 6 },
                ].map((dept) => (
                  <div key={dept.dept} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{dept.dept}</div>
                      <div className="text-sm text-gray-600">{dept.teachers} teachers</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Progress value={dept.score} className="w-32" />
                      <Badge variant="outline" className="min-w-16">
                        {dept.score}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
