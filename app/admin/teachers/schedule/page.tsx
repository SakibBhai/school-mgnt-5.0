"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, Users, BookOpen, Filter, Download } from "lucide-react"

const scheduleData = [
  {
    teacher: "Dr. Sarah Johnson",
    monday: [
      { time: "09:00-10:00", subject: "Algebra", class: "10A", room: "101" },
      { time: "11:00-12:00", subject: "Calculus", class: "12A", room: "101" },
      { time: "14:00-15:00", subject: "Statistics", class: "11B", room: "101" },
    ],
    tuesday: [
      { time: "10:00-11:00", subject: "Algebra", class: "10A", room: "101" },
      { time: "13:00-14:00", subject: "Calculus", class: "12A", room: "101" },
    ],
    wednesday: [
      { time: "09:00-10:00", subject: "Statistics", class: "11B", room: "101" },
      { time: "15:00-16:00", subject: "Algebra", class: "10A", room: "101" },
    ],
    thursday: [
      { time: "11:00-12:00", subject: "Calculus", class: "12A", room: "101" },
      { time: "14:00-15:00", subject: "Statistics", class: "11B", room: "101" },
    ],
    friday: [
      { time: "10:00-11:00", subject: "Algebra", class: "10A", room: "101" },
      { time: "13:00-14:00", subject: "Calculus", class: "12A", room: "101" },
    ],
  },
  {
    teacher: "Mr. David Wilson",
    monday: [
      { time: "10:00-11:00", subject: "Physics", class: "9A", room: "Lab2" },
      { time: "13:00-14:00", subject: "Applied Physics", class: "11A", room: "Lab2" },
    ],
    tuesday: [
      { time: "09:00-10:00", subject: "Physics", class: "10B", room: "Lab2" },
      { time: "14:00-15:00", subject: "Applied Physics", class: "11A", room: "Lab2" },
    ],
    wednesday: [
      { time: "11:00-12:00", subject: "Physics", class: "9A", room: "Lab2" },
      { time: "15:00-16:00", subject: "Physics", class: "10B", room: "Lab2" },
    ],
    thursday: [
      { time: "10:00-11:00", subject: "Applied Physics", class: "11A", room: "Lab2" },
      { time: "13:00-14:00", subject: "Physics", class: "9A", room: "Lab2" },
    ],
    friday: [{ time: "09:00-10:00", subject: "Physics", class: "10B", room: "Lab2" }],
  },
]

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const timeSlots = [
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-13:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
]

export default function TeacherSchedulePage() {
  const [selectedTeacher, setSelectedTeacher] = useState("all")
  const [selectedDay, setSelectedDay] = useState("all")

  const teachers = ["Dr. Sarah Johnson", "Mr. David Wilson", "Ms. Emily Davis", "Dr. Michael Brown"]

  const getScheduleForTeacher = (teacherName) => {
    return scheduleData.find((s) => s.teacher === teacherName)
  }

  const filteredSchedule =
    selectedTeacher === "all" ? scheduleData : scheduleData.filter((s) => s.teacher === selectedTeacher)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Schedules</h1>
          <p className="text-gray-600">View and manage teacher timetables and class assignments</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Schedule
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Per week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Classes/Teacher</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Per week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10-12</div>
            <p className="text-xs text-muted-foreground">AM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Free Periods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule Overview</CardTitle>
          <CardDescription>Filter and view teacher schedules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
              <SelectTrigger className="w-60">
                <SelectValue placeholder="Select Teacher" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teachers</SelectItem>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher} value={teacher}>
                    {teacher}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Days</SelectItem>
                {days.map((day) => (
                  <SelectItem key={day} value={day.toLowerCase()}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Schedule Grid */}
          {selectedTeacher === "all" ? (
            <div className="space-y-6">
              {filteredSchedule.map((teacherSchedule) => (
                <Card key={teacherSchedule.teacher}>
                  <CardHeader>
                    <CardTitle className="text-lg">{teacherSchedule.teacher}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-24">Time</TableHead>
                            {days.map((day) => (
                              <TableHead key={day} className="text-center min-w-32">
                                {day}
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {timeSlots.map((timeSlot) => (
                            <TableRow key={timeSlot}>
                              <TableCell className="font-medium text-sm">{timeSlot}</TableCell>
                              {days.map((day) => {
                                const dayKey = day.toLowerCase()
                                const daySchedule = teacherSchedule[dayKey] || []
                                const classAtTime = daySchedule.find((c) => c.time === timeSlot)

                                return (
                                  <TableCell key={day} className="text-center p-2">
                                    {classAtTime ? (
                                      <div className="bg-blue-50 border border-blue-200 rounded p-2 text-xs">
                                        <div className="font-medium text-blue-900">{classAtTime.subject}</div>
                                        <div className="text-blue-700">{classAtTime.class}</div>
                                        <div className="text-blue-600">{classAtTime.room}</div>
                                      </div>
                                    ) : (
                                      <div className="text-gray-400 text-xs">Free</div>
                                    )}
                                  </TableCell>
                                )
                              })}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // Individual teacher detailed view
            <div className="space-y-6">
              {filteredSchedule.map((teacherSchedule) => (
                <div key={teacherSchedule.teacher} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{teacherSchedule.teacher}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        18 classes/week
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />3 classes
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />3 subjects
                      </div>
                    </div>
                  </div>

                  {/* Weekly Schedule */}
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-24">Time</TableHead>
                          {days.map((day) => (
                            <TableHead key={day} className="text-center min-w-40">
                              {day}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeSlots.map((timeSlot) => (
                          <TableRow key={timeSlot}>
                            <TableCell className="font-medium">{timeSlot}</TableCell>
                            {days.map((day) => {
                              const dayKey = day.toLowerCase()
                              const daySchedule = teacherSchedule[dayKey] || []
                              const classAtTime = daySchedule.find((c) => c.time === timeSlot)

                              return (
                                <TableCell key={day} className="text-center p-3">
                                  {classAtTime ? (
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3">
                                      <div className="font-semibold text-blue-900 mb-1">{classAtTime.subject}</div>
                                      <Badge variant="outline" className="mb-1">
                                        {classAtTime.class}
                                      </Badge>
                                      <div className="text-xs text-blue-600">Room {classAtTime.room}</div>
                                    </div>
                                  ) : (
                                    <div className="text-gray-400 py-4">
                                      <div className="text-sm">Free Period</div>
                                    </div>
                                  )}
                                </TableCell>
                              )
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Daily Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {days.map((day) => {
                      const dayKey = day.toLowerCase()
                      const daySchedule = teacherSchedule[dayKey] || []

                      return (
                        <Card key={day}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">{day}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-lg font-bold">{daySchedule.length}</div>
                            <p className="text-xs text-muted-foreground">Classes</p>
                            <div className="mt-2 space-y-1">
                              {daySchedule.slice(0, 2).map((cls, idx) => (
                                <div key={idx} className="text-xs text-gray-600">
                                  {cls.time} - {cls.class}
                                </div>
                              ))}
                              {daySchedule.length > 2 && (
                                <div className="text-xs text-gray-500">+{daySchedule.length - 2} more</div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
