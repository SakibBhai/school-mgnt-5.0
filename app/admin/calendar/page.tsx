"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Bell, Trash2, ChevronLeft, ChevronRight, Clock, Tag } from "lucide-react"
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addWeeks,
  addMonths,
  subMonths,
  subWeeks,
  subDays,
  isSameMonth,
  isToday,
  parseISO,
} from "date-fns"

// Event types and interfaces
interface Event {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  category: string
  color: string
  location?: string
  attendees?: string[]
  recurrence?: "none" | "daily" | "weekly" | "monthly" | "yearly"
  reminders?: number[] // minutes before event
  createdBy: string
  createdAt: string
  updatedAt: string
}

interface EventCategory {
  id: string
  name: string
  color: string
  icon: string
}

// Sample data
const eventCategories: EventCategory[] = [
  { id: "1", name: "Academic", color: "bg-blue-500", icon: "📚" },
  { id: "2", name: "Sports", color: "bg-green-500", icon: "⚽" },
  { id: "3", name: "Cultural", color: "bg-purple-500", icon: "🎭" },
  { id: "4", name: "Meeting", color: "bg-orange-500", icon: "👥" },
  { id: "5", name: "Holiday", color: "bg-red-500", icon: "🎉" },
  { id: "6", name: "Exam", color: "bg-yellow-500", icon: "📝" },
  { id: "7", name: "Workshop", color: "bg-indigo-500", icon: "🔧" },
  { id: "8", name: "Other", color: "bg-gray-500", icon: "📅" },
]

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Mathematics Exam",
    description: "Final examination for Grade 10 Mathematics",
    startDate: "2024-01-15",
    endDate: "2024-01-15",
    startTime: "09:00",
    endTime: "11:00",
    category: "Exam",
    color: "bg-yellow-500",
    location: "Room 101",
    attendees: ["Grade 10 Students"],
    recurrence: "none",
    reminders: [60, 30],
    createdBy: "admin",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
  },
  {
    id: "2",
    title: "Science Fair",
    description: "Annual science exhibition and competition",
    startDate: "2024-01-20",
    endDate: "2024-01-22",
    startTime: "08:00",
    endTime: "17:00",
    category: "Academic",
    color: "bg-blue-500",
    location: "Main Hall",
    attendees: ["All Students", "Teachers", "Parents"],
    recurrence: "yearly",
    reminders: [1440, 60],
    createdBy: "admin",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
  },
  {
    id: "3",
    title: "Football Match",
    description: "Inter-school football championship",
    startDate: "2024-01-25",
    endDate: "2024-01-25",
    startTime: "15:00",
    endTime: "17:00",
    category: "Sports",
    color: "bg-green-500",
    location: "Sports Ground",
    attendees: ["School Team", "Supporters"],
    recurrence: "none",
    reminders: [120, 30],
    createdBy: "admin",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
  },
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")
  const [events, setEvents] = useState<Event[]>(sampleEvents)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showNotifications, setShowNotifications] = useState(false)

  // Event form state
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
    startTime: "09:00",
    endTime: "10:00",
    category: "Academic",
    location: "",
    recurrence: "none" as const,
    reminders: [30],
  })

  // Navigation functions
  const navigateDate = (direction: "prev" | "next") => {
    if (viewMode === "month") {
      setCurrentDate(direction === "next" ? addMonths(currentDate, 1) : subMonths(currentDate, 1))
    } else if (viewMode === "week") {
      setCurrentDate(direction === "next" ? addWeeks(currentDate, 1) : subWeeks(currentDate, 1))
    } else {
      setCurrentDate(direction === "next" ? addDays(currentDate, 1) : subDays(currentDate, 1))
    }
  }

  // Filter events based on search and category
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter((event) => {
      const eventStart = parseISO(event.startDate)
      const eventEnd = parseISO(event.endDate)
      return date >= eventStart && date <= eventEnd
    })
  }

  // Handle event creation/editing
  const handleSaveEvent = () => {
    const categoryData = eventCategories.find((cat) => cat.name === eventForm.category)
    const newEvent: Event = {
      id: isEditMode ? selectedEvent!.id : Date.now().toString(),
      title: eventForm.title,
      description: eventForm.description,
      startDate: eventForm.startDate,
      endDate: eventForm.endDate,
      startTime: eventForm.startTime,
      endTime: eventForm.endTime,
      category: eventForm.category,
      color: categoryData?.color || "bg-gray-500",
      location: eventForm.location,
      recurrence: eventForm.recurrence,
      reminders: eventForm.reminders,
      createdBy: "admin",
      createdAt: isEditMode ? selectedEvent!.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    if (isEditMode) {
      setEvents(events.map((event) => (event.id === selectedEvent!.id ? newEvent : event)))
    } else {
      setEvents([...events, newEvent])
    }

    setIsEventDialogOpen(false)
    resetEventForm()
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId))
    setIsEventDialogOpen(false)
  }

  const resetEventForm = () => {
    setEventForm({
      title: "",
      description: "",
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(new Date(), "yyyy-MM-dd"),
      startTime: "09:00",
      endTime: "10:00",
      category: "Academic",
      location: "",
      recurrence: "none",
      reminders: [30],
    })
    setSelectedEvent(null)
    setIsEditMode(false)
  }

  const openEventDialog = (event?: Event) => {
    if (event) {
      setSelectedEvent(event)
      setEventForm({
        title: event.title,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        startTime: event.startTime,
        endTime: event.endTime,
        category: event.category,
        location: event.location || "",
        recurrence: (event.recurrence || "none") as "none" | "daily" | "weekly" | "monthly" | "yearly",
        reminders: event.reminders || [30],
      })
      setIsEditMode(true)
    } else {
      resetEventForm()
    }
    setIsEventDialogOpen(true)
  }

  // Render calendar views
  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const days = []
    let day = startDate

    while (day <= endDate) {
      days.push(day)
      day = addDays(day, 1)
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
          <div key={dayName} className="p-2 text-center font-semibold text-gray-600 bg-gray-50">
            {dayName}
          </div>
        ))}
        {days.map((day) => {
          const dayEvents = getEventsForDate(day)
          return (
            <div
              key={day.toString()}
              className={`min-h-[120px] p-2 border border-gray-200 ${
                !isSameMonth(day, currentDate) ? "bg-gray-50 text-gray-400" : "bg-white"
              } ${isToday(day) ? "bg-blue-50 border-blue-300" : ""}`}
            >
              <div className={`text-sm font-medium ${isToday(day) ? "text-blue-600" : ""}`}>{format(day, "d")}</div>
              <div className="mt-1 space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className={`text-xs p-1 rounded cursor-pointer text-white ${event.color}`}
                    onClick={() => openEventDialog(event)}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && <div className="text-xs text-gray-500">+{dayEvents.length - 3} more</div>}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate)
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

    return (
      <div className="grid grid-cols-8 gap-1">
        <div className="p-2"></div>
        {days.map((day) => (
          <div key={day.toString()} className="p-2 text-center font-semibold border-b">
            <div className={`${isToday(day) ? "text-blue-600" : ""}`}>{format(day, "EEE")}</div>
            <div className={`text-lg ${isToday(day) ? "text-blue-600 font-bold" : ""}`}>{format(day, "d")}</div>
          </div>
        ))}

        {Array.from({ length: 24 }, (_, hour) => (
          <div key={hour} className="contents">
            <div className="p-2 text-sm text-gray-500 border-r">{format(new Date().setHours(hour, 0), "HH:mm")}</div>
            {days.map((day) => {
              const dayEvents = getEventsForDate(day).filter((event) => {
                const eventHour = Number.parseInt(event.startTime.split(":")[0])
                return eventHour === hour
              })
              return (
                <div key={`${day}-${hour}`} className="min-h-[60px] p-1 border border-gray-100">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded cursor-pointer text-white mb-1 ${event.color}`}
                      onClick={() => openEventDialog(event)}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )
  }

  const renderDayView = () => {
    const dayEvents = getEventsForDate(currentDate).sort((a, b) => a.startTime.localeCompare(b.startTime))

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">{format(currentDate, "EEEE, MMMM d, yyyy")}</h3>
        </div>

        <div className="grid grid-cols-1 gap-1">
          {Array.from({ length: 24 }, (_, hour) => {
            const hourEvents = dayEvents.filter((event) => {
              const eventHour = Number.parseInt(event.startTime.split(":")[0])
              return eventHour === hour
            })

            return (
              <div key={hour} className="flex border-b border-gray-100">
                <div className="w-20 p-2 text-sm text-gray-500">{format(new Date().setHours(hour, 0), "HH:mm")}</div>
                <div className="flex-1 p-2 min-h-[60px]">
                  {hourEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-2 rounded cursor-pointer text-white mb-2 ${event.color}`}
                      onClick={() => openEventDialog(event)}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm opacity-90">
                        {event.startTime} - {event.endTime}
                        {event.location && ` • ${event.location}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar & Events</h1>
          <p className="text-gray-600">Manage school events and activities</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={() => openEventDialog()} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
          <Button variant="outline" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {eventCategories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    <div className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      {category.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Navigation */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigateDate("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">
                {viewMode === "month" && format(currentDate, "MMMM yyyy")}
                {viewMode === "week" && `Week of ${format(startOfWeek(currentDate), "MMM d, yyyy")}`}
                {viewMode === "day" && format(currentDate, "EEEE, MMMM d, yyyy")}
              </h2>
              <Button variant="outline" size="sm" onClick={() => navigateDate("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
              <TabsList>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="day">Day</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent>
          {viewMode === "month" && renderMonthView()}
          {viewMode === "week" && renderWeekView()}
          {viewMode === "day" && renderDayView()}
        </CardContent>
      </Card>

      {/* Event Categories Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Event Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {eventCategories.map((category) => (
              <Badge key={category.id} className={`${category.color} text-white`}>
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Dialog */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Event" : "Create New Event"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="Enter event title"
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  placeholder="Enter event description"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={eventForm.startDate}
                  onChange={(e) => setEventForm({ ...eventForm, startDate: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={eventForm.endDate}
                  onChange={(e) => setEventForm({ ...eventForm, endDate: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={eventForm.startTime}
                  onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="endTime">End Time *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={eventForm.endTime}
                  onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={eventForm.category}
                  onValueChange={(value) => setEventForm({ ...eventForm, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {eventCategories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        <div className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="recurrence">Recurrence</Label>
                <Select
                  value={eventForm.recurrence}
                  onValueChange={(value) => setEventForm({ ...eventForm, recurrence: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Recurrence</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  placeholder="Enter event location"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <div>
                {isEditMode && (
                  <Button variant="destructive" onClick={() => handleDeleteEvent(selectedEvent!.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Event
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEventDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEvent} disabled={!eventForm.title}>
                  {isEditMode ? "Update Event" : "Create Event"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notifications Panel */}
      {showNotifications && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Upcoming Events & Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {events
                .filter((event) => new Date(event.startDate) >= new Date())
                .slice(0, 5)
                .map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                    <div className="flex-1">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-gray-600">
                        {format(parseISO(event.startDate), "MMM d, yyyy")} at {event.startTime}
                        {event.location && ` • ${event.location}`}
                      </div>
                    </div>
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
