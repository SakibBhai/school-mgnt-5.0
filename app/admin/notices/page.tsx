"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RichTextEditor } from "@/components/rich-text-editor"
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  CalendarIcon,
  Bell,
  Users,
  Clock,
  AlertCircle,
  CheckCircle,
  MoreHorizontal,
  SortAsc,
  SortDesc,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Notice {
  id: string
  title: string
  content: string
  summary: string
  publishDate: Date
  createdAt: Date
  updatedAt: Date
  priority: "high" | "medium" | "low"
  targetAudience: "all" | "students" | "teachers" | "staff"
  author: string
  status: "published" | "draft" | "archived"
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
    createdAt: new Date("2024-02-28"),
    updatedAt: new Date("2024-02-28"),
    priority: "high",
    targetAudience: "all",
    author: "Dr. Sarah Johnson",
    status: "published",
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
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
    priority: "medium",
    targetAudience: "students",
    author: "Ms. Emily Chen",
    status: "published",
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
    createdAt: new Date("2024-03-04"),
    updatedAt: new Date("2024-03-04"),
    priority: "medium",
    targetAudience: "teachers",
    author: "Prof. Michael Davis",
    status: "published",
    viewCount: 89,
  },
]

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>(mockNotices)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [filterAudience, setFilterAudience] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [expandedNotices, setExpandedNotices] = useState<Set<string>>(new Set())

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    publishDate: new Date(),
    priority: "medium" as const,
    targetAudience: "all" as const,
    status: "published" as const,
  })

  const filteredAndSortedNotices = notices
    .filter((notice) => {
      const matchesSearch =
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPriority = filterPriority === "all" || notice.priority === filterPriority
      const matchesAudience = filterAudience === "all" || notice.targetAudience === filterAudience
      return matchesSearch && matchesPriority && matchesAudience
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      } else {
        return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
      }
    })

  const handleCreateNotice = () => {
    const newNotice: Notice = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      summary: formData.content.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
      publishDate: formData.publishDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      priority: formData.priority,
      targetAudience: formData.targetAudience,
      author: "Current Admin",
      status: formData.status,
      viewCount: 0,
    }
    setNotices([newNotice, ...notices])
    setIsCreateDialogOpen(false)
    resetForm()
  }

  const handleEditNotice = () => {
    if (!selectedNotice) return

    const updatedNotices = notices.map((notice) =>
      notice.id === selectedNotice.id
        ? {
            ...notice,
            title: formData.title,
            content: formData.content,
            summary: formData.content.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
            publishDate: formData.publishDate,
            priority: formData.priority,
            targetAudience: formData.targetAudience,
            status: formData.status,
            updatedAt: new Date(),
          }
        : notice,
    )
    setNotices(updatedNotices)
    setIsEditDialogOpen(false)
    setSelectedNotice(null)
    resetForm()
  }

  const handleDeleteNotice = (noticeId: string) => {
    setNotices(notices.filter((notice) => notice.id !== noticeId))
  }

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      publishDate: new Date(),
      priority: "medium",
      targetAudience: "all",
      status: "published",
    })
  }

  const openEditDialog = (notice: Notice) => {
    setSelectedNotice(notice)
    setFormData({
      title: notice.title,
      content: notice.content,
      publishDate: notice.publishDate,
      priority: notice.priority,
      targetAudience: notice.targetAudience,
      status: notice.status,
    })
    setIsEditDialogOpen(true)
  }

  const toggleNoticeExpansion = (noticeId: string) => {
    const newExpanded = new Set(expandedNotices)
    if (newExpanded.has(noticeId)) {
      newExpanded.delete(noticeId)
    } else {
      newExpanded.add(noticeId)
    }
    setExpandedNotices(newExpanded)
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

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notice Board</h1>
          <p className="text-gray-600 mt-1">Manage and publish notices for your institution</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Notice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Notice</DialogTitle>
              <DialogDescription>Create a new notice to share with your institution members.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter notice title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publishDate">Publication Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(formData.publishDate, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.publishDate}
                        onSelect={(date) => date && setFormData({ ...formData, publishDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select
                    value={formData.targetAudience}
                    onValueChange={(value: any) => setFormData({ ...formData, targetAudience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="students">Students Only</SelectItem>
                      <SelectItem value="teachers">Teachers Only</SelectItem>
                      <SelectItem value="staff">Staff Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => setFormData({ ...formData, content: value })}
                  placeholder="Write your notice content here..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateNotice} disabled={!formData.title || !formData.content}>
                Create Notice
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Notices</p>
                <p className="text-2xl font-bold text-gray-900">{notices.length}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-green-600">
                  {notices.filter((n) => n.status === "published").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-red-600">{notices.filter((n) => n.priority === "high").length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-purple-600">{notices.reduce((sum, n) => sum + n.viewCount, 0)}</p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
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
              <Select value={filterAudience} onValueChange={setFilterAudience}>
                <SelectTrigger className="w-[140px]">
                  <Users className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="students">Students</SelectItem>
                  <SelectItem value="teachers">Teachers</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
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
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-semibold text-gray-900">{notice.title}</h3>
                      <Badge className={cn("text-xs", getPriorityColor(notice.priority))}>
                        {notice.priority.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {getAudienceIcon(notice.targetAudience)}{" "}
                        {notice.targetAudience.charAt(0).toUpperCase() + notice.targetAudience.slice(1)}
                      </Badge>
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

                    <Button
                      variant="link"
                      className="p-0 h-auto text-blue-600 hover:text-blue-800"
                      onClick={() => toggleNoticeExpansion(notice.id)}
                    >
                      {expandedNotices.has(notice.id) ? "Show Less" : "Read More"}
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(notice)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedNotice(notice)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Notice</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{notice.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteNotice(notice.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Notice</DialogTitle>
            <DialogDescription>Make changes to your notice. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title *</Label>
                <Input
                  id="edit-title"
                  placeholder="Enter notice title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-publishDate">Publication Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(formData.publishDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.publishDate}
                      onSelect={(date) => date && setFormData({ ...formData, publishDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-audience">Target Audience</Label>
                <Select
                  value={formData.targetAudience}
                  onValueChange={(value: any) => setFormData({ ...formData, targetAudience: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="students">Students Only</SelectItem>
                    <SelectItem value="teachers">Teachers Only</SelectItem>
                    <SelectItem value="staff">Staff Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-content">Content *</Label>
              <RichTextEditor
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                placeholder="Write your notice content here..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditNotice} disabled={!formData.title || !formData.content}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedNotice?.title}</DialogTitle>
            <DialogDescription>
              Published on {selectedNotice && format(selectedNotice.publishDate, "MMMM dd, yyyy")} by{" "}
              {selectedNotice?.author}
            </DialogDescription>
          </DialogHeader>
          {selectedNotice && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className={cn("text-xs", getPriorityColor(selectedNotice.priority))}>
                  {selectedNotice.priority.toUpperCase()} PRIORITY
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {getAudienceIcon(selectedNotice.targetAudience)}{" "}
                  {selectedNotice.targetAudience.charAt(0).toUpperCase() + selectedNotice.targetAudience.slice(1)}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {selectedNotice.viewCount} views
                </Badge>
              </div>
              <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: selectedNotice.content }} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
