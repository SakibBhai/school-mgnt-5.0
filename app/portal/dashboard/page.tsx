"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  MessageSquare,
  Bell,
  Award,
  TrendingUp,
  User,
} from "lucide-react"

const upcomingClasses = [
  { subject: "Mathematics", time: "09:00 AM", teacher: "Mr. Johnson", room: "Room 101" },
  { subject: "Physics", time: "10:30 AM", teacher: "Ms. Davis", room: "Lab 2" },
  { subject: "English", time: "02:00 PM", teacher: "Mrs. Wilson", room: "Room 205" },
]

const recentGrades = [
  { subject: "Mathematics", grade: "A+", score: "95/100", date: "2024-01-15" },
  { subject: "Physics", grade: "A", score: "88/100", date: "2024-01-12" },
  { subject: "Chemistry", grade: "B+", score: "82/100", date: "2024-01-10" },
]

const assignments = [
  { subject: "English", title: "Essay on Climate Change", dueDate: "2024-01-20", status: "pending" },
  { subject: "History", title: "World War II Research", dueDate: "2024-01-22", status: "submitted" },
  { subject: "Biology", title: "Cell Structure Diagram", dueDate: "2024-01-25", status: "pending" },
]

export default function StudentPortal() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600">Here's what's happening in your academic journey today.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.85</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.12</span> from last semester
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <Progress value={92} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 due this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fee Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0</div>
            <p className="text-xs text-green-600">All fees paid</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingClasses.map((class_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{class_.subject}</h4>
                  <p className="text-sm text-gray-600">
                    {class_.teacher} • {class_.room}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-blue-600">{class_.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Grades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Recent Grades
            </CardTitle>
            <CardDescription>Your latest test and assignment results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentGrades.map((grade, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{grade.subject}</h4>
                  <p className="text-sm text-gray-600">{grade.date}</p>
                </div>
                <div className="text-right">
                  <Badge variant={grade.grade.startsWith("A") ? "default" : "secondary"}>{grade.grade}</Badge>
                  <p className="text-sm text-gray-600 mt-1">{grade.score}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Assignments and Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Assignments
            </CardTitle>
            <CardDescription>Upcoming and submitted assignments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {assignments.map((assignment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{assignment.title}</h4>
                  <p className="text-sm text-gray-600">{assignment.subject}</p>
                  <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
                </div>
                <Badge variant={assignment.status === "submitted" ? "default" : "destructive"}>
                  {assignment.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Announcements
            </CardTitle>
            <CardDescription>Latest school announcements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
              <h4 className="font-medium text-blue-900">Mid-term Exam Schedule Released</h4>
              <p className="text-sm text-blue-700 mt-1">
                The mid-term examination schedule has been published. Please check your student portal for details.
              </p>
              <p className="text-xs text-blue-600 mt-2">2 hours ago</p>
            </div>
            <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded-lg">
              <h4 className="font-medium text-green-900">Library Extended Hours</h4>
              <p className="text-sm text-green-700 mt-1">
                The library will remain open until 8 PM during exam week to support student studies.
              </p>
              <p className="text-xs text-green-600 mt-2">1 day ago</p>
            </div>
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
              <h4 className="font-medium text-yellow-900">Sports Day Registration</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Registration for annual sports day is now open. Sign up for your favorite events.
              </p>
              <p className="text-xs text-yellow-600 mt-2">3 days ago</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              <span className="text-xs">View Timetable</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-xs">Submit Assignment</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <MessageSquare className="h-6 w-6 mb-2" />
              <span className="text-xs">Message Teacher</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BookOpen className="h-6 w-6 mb-2" />
              <span className="text-xs">Library Books</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
