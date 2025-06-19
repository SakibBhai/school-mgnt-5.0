"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, CalendarIcon, Bell, Clock, SortAsc, SortDesc, Bookmark, Share2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface Notice {
  id: string
  title: string
  content: string
  summary: string
  publishDate: Date
  priority: "high" | "medium" | "low"
  targetAudience: "all" | "students" | "teachers" | "staff"
  author: string
  viewCount: number
}

const mockNotices: Notice[] = [
  {
    id: "1",
    title: "Important: Mid-term Examination Schedule",
    content:
      "<p><strong>Dear Students and Faculty,</strong></p><p>We are pleased to announce the mid-term examination schedule for the current academic session. Please note the following important details:</p><ul><li>Examinations will commence from <strong>March 15, 2024</strong></li><li>All students must report to their respective examination halls 30 minutes before the scheduled time</li><li>Bring your student ID cards and necessary stationery</li><li>Mobile phones and electronic devices are strictly prohibited</li></ul><p>For any queries, please contact the examination office.</p><p><em>Best regards,<br/>Academic Office</em></p>",
    summary:
      "Mid-term examination schedule announced. Exams start March 15, 2024. Students must report 30 minutes early with ID cards.",
    publishDate: new Date("2024-03-01"),
    priority: "high",
    targetAudience: "all",
    author: "Dr. Sarah Johnson",
    viewCount: 245,
  },
  {
    id: "2",
    title: "Library Hours Extended During Exam Period",
    content:
      "<p>To support students during the upcoming examination period, the library will extend its operating hours:</p><ul><li><strong>Weekdays:</strong> 7:00 AM - 11:00 PM</li><li><strong>Weekends:</strong> 8:00 AM - 10:00 PM</li></ul><p>Additional study spaces have been arranged in the conference rooms. Please maintain silence and follow library rules.</p>",
    summary:
      "Library hours extended during exam period. Weekdays 7 AM-11 PM, Weekends 8 AM-10 PM. Additional study spaces available.",
    publishDate: new Date("2024-03-02"),
    priority: "medium",
    targetAudience: "students",
    author: "Ms. Emily Chen",
    viewCount: 156,
  },
  {
    id: "3",
    title: "Faculty Meeting - Curriculum Review",
    content:
      "<p>All faculty members are requested to attend the monthly faculty meeting scheduled for curriculum review and academic planning.</p><p><strong>Date:</strong> March 10, 2024<br/><strong>Time:</strong> 2:00 PM - 4:00 PM<br/><strong>Venue:</strong> Conference Hall A</p><p>Agenda items include course updates, assessment methods, and student feedback analysis.</p>",
    summary:
      "Monthly faculty meeting on March 10, 2024, 2-4 PM in Conference Hall A for curriculum review and academic planning.",
    publishDate: new Date("2024-03-05"),
    priority: "medium",
    targetAudience: "teachers",
    author: "Prof. Michael Davis",
    viewCount: 89,
  },
]

export default function StudentNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>(mockNotices)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")
  const [expandedNotices, setExpandedNotices] = useState<Set<string>>(new Set())
  const [bookmarkedNotices, setBookmarkedNotices] = useState<Set<string>>(new Set())

  // Simulate user role - in real app, this would come from auth context
  const userRole = "students" // or "teachers", "staff"

  const filteredAndSortedNotices = notices
    .filter((notice) => {
      const matchesSearch =
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPriority = filterPriority === "all" || notice.priority === filterPriority
      const matchesAudience = notice.targetAudience === "all" || notice.targetAudience === userRole
      return matchesSearch && matchesPriority && matchesAudience
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      } else {
        return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
      }
    })

  const toggleNoticeExpansion = (noticeId: string) => {
    const newExpanded = new Set(expandedNotices)
    if (newExpanded.has(noticeId)) {
      newExpanded.delete(noticeId)
    } else {
      newExpanded.add(noticeId)
      // Simulate view count increment
      setNotices((prev) =>
        prev.map((notice) => (notice.id === noticeId ? { ...notice, viewCount: notice.viewCount + 1 } : notice)),
      )
    }
    setExpandedNotices(newExpanded)
  }

  const toggleBookmark = (noticeId: string) => {
    const newBookmarked = new Set(bookmarkedNotices)
    if (newBookmarked.has(noticeId)) {
      newBookmarked.delete(noticeId)
    } else {
      newBookmarked.add(noticeId)
    }
    setBookmarkedNotices(newBookmarked)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getAudienceIcon = (audience: string) => {
    switch (audience) {
      case "students":
        return "👨‍🎓"
      case "teachers":
        return "👨‍🏫"
      case "staff":
        return "👥"
      default:
        return "🌐"
    }
  }

  const shareNotice = (notice: Notice) => {
    if (navigator.share) {
      navigator.share({
        title: notice.title,
        text: notice.summary,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${notice.title}\n\n${notice.summary}\n\n${window.location.href}`)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Notice Board</h1>
        <p className="text-gray-600">Stay updated with the latest announcements and important information</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Notices</p>
                <p className="text-2xl font-bold text-blue-600">
                  {filteredAndSortedNotices.filter((n) => n.priority === "high").length}
                </p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bookmarked</p>
                <p className="text-2xl font-bold text-purple-600">{bookmarkedNotices.size}</p>
              </div>
              <Bookmark className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Available</p>
                <p className="text-2xl font-bold text-green-600">{filteredAndSortedNotices.length}</p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search notices by title or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}>
                {sortOrder === "newest" ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredAndSortedNotices.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notices found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredAndSortedNotices.map((notice) => (
            <Card key={notice.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-gray-900">{notice.title}</h3>
                        <Badge className={cn("text-xs", getPriorityColor(notice.priority))}>
                          {notice.priority.toUpperCase()}
                        </Badge>
                        {notice.targetAudience !== "all" && (
                          <Badge variant="outline" className="text-xs">
                            {getAudienceIcon(notice.targetAudience)}{" "}
                            {notice.targetAudience.charAt(0).toUpperCase() + notice.targetAudience.slice(1)}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          {format(notice.publishDate, "MMM dd, yyyy")}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {notice.viewCount} views
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          By {notice.author}
                        </div>
                      </div>

                      <div className="prose prose-sm max-w-none">
                        {expandedNotices.has(notice.id) ? (
                          <div dangerouslySetInnerHTML={{ __html: notice.content }} />
                        ) : (
                          <p className="text-gray-700">{notice.summary}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="link"
                          className="p-0 h-auto text-blue-600 hover:text-blue-800"
                          onClick={() => toggleNoticeExpansion(notice.id)}
                        >
                          {expandedNotices.has(notice.id) ? "Show Less" : "Read More"}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(notice.id)}
                        className={bookmarkedNotices.has(notice.id) ? "text-purple-600" : "text-gray-400"}
                      >
                        <Bookmark className={cn("h-4 w-4", bookmarkedNotices.has(notice.id) && "fill-current")} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => shareNotice(notice)}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Bookmarked Notices Section */}
      {bookmarkedNotices.size > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-purple-600" />
              Bookmarked Notices
            </CardTitle>
            <CardDescription>Your saved notices for quick access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {notices
                .filter((notice) => bookmarkedNotices.has(notice.id))
                .map((notice) => (
                  <div key={notice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{notice.title}</h4>
                      <p className="text-sm text-gray-600">{format(notice.publishDate, "MMM dd, yyyy")}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => toggleNoticeExpansion(notice.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
