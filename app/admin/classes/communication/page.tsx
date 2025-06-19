"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Send, Users, Calendar, Eye, Download, Plus, Search, Filter, Paperclip } from "lucide-react"

const communicationHistory = [
  {
    id: 1,
    type: "Announcement",
    subject: "Mid-term Exam Schedule",
    content: "The mid-term examinations will be conducted from March 15-22, 2024...",
    sender: "Admin Office",
    recipients: ["Grade 10 - All Sections"],
    sentDate: "2024-01-15",
    status: "Delivered",
    readCount: 87,
    totalRecipients: 95,
  },
  {
    id: 2,
    type: "Assignment",
    subject: "Mathematics Assignment - Chapter 5",
    content: "Please complete the exercises from Chapter 5 and submit by Friday...",
    sender: "Ms. Sarah Johnson",
    recipients: ["Grade 9 - Section A"],
    sentDate: "2024-01-14",
    status: "Delivered",
    readCount: 30,
    totalRecipients: 32,
  },
  {
    id: 3,
    type: "Reminder",
    subject: "Parent-Teacher Meeting",
    content: "Reminder: Parent-teacher meetings are scheduled for this Saturday...",
    sender: "Class Coordinator",
    recipients: ["Grade 11 - Section B", "Parents"],
    sentDate: "2024-01-13",
    status: "Delivered",
    readCount: 58,
    totalRecipients: 62,
  },
]

const messageTemplates = [
  {
    id: 1,
    name: "Exam Announcement",
    type: "Announcement",
    subject: "Upcoming Examination Schedule",
    content: "Dear Students and Parents,\n\nWe would like to inform you about the upcoming examination schedule...",
  },
  {
    id: 2,
    name: "Assignment Reminder",
    type: "Assignment",
    subject: "Assignment Submission Reminder",
    content: "This is a friendly reminder that your assignment is due...",
  },
  {
    id: 3,
    name: "Event Notification",
    type: "General",
    subject: "School Event Notification",
    content: "We are excited to announce an upcoming school event...",
  },
]

const classesAndSections = [
  {
    id: 1,
    name: "Grade 9",
    sections: [
      { id: 1, name: "A", students: 32, teacher: "Ms. Sarah Johnson" },
      { id: 2, name: "B", students: 30, teacher: "Mr. David Brown" },
      { id: 3, name: "C", students: 28, teacher: "Ms. Emily Davis" },
    ],
  },
  {
    id: 2,
    name: "Grade 10",
    sections: [
      { id: 4, name: "A", students: 38, teacher: "Dr. Michael Chen" },
      { id: 5, name: "B", students: 35, teacher: "Ms. Lisa Garcia" },
      { id: 6, name: "C", students: 33, teacher: "Mr. Robert Wilson" },
    ],
  },
]

export default function CommunicationPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [messageType, setMessageType] = useState("announcement")
  const [selectedRecipients, setSelectedRecipients] = useState([])
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleRecipientToggle = (recipientId, checked) => {
    if (checked) {
      setSelectedRecipients([...selectedRecipients, recipientId])
    } else {
      setSelectedRecipients(selectedRecipients.filter((id) => id !== recipientId))
    }
  }

  const handleSelectAllSections = (classId, checked) => {
    const classData = classesAndSections.find((c) => c.id === classId)
    if (classData) {
      const sectionIds = classData.sections.map((s) => `${classId}-${s.id}`)
      if (checked) {
        setSelectedRecipients([...new Set([...selectedRecipients, ...sectionIds])])
      } else {
        setSelectedRecipients(selectedRecipients.filter((id) => !sectionIds.includes(id)))
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Section Communication</h1>
          <p className="text-gray-600">Send messages and announcements to classes and sections</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export History
          </Button>
          <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Compose Message
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Compose New Message</DialogTitle>
                <DialogDescription>Send messages to specific classes, sections, or groups</DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="compose" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="compose">Compose</TabsTrigger>
                  <TabsTrigger value="recipients">Recipients</TabsTrigger>
                </TabsList>

                <TabsContent value="compose" className="space-y-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="messageType">Message Type</Label>
                        <Select value={messageType} onValueChange={setMessageType}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="announcement">Announcement</SelectItem>
                            <SelectItem value="assignment">Assignment</SelectItem>
                            <SelectItem value="reminder">Reminder</SelectItem>
                            <SelectItem value="general">General Message</SelectItem>
                            <SelectItem value="urgent">Urgent Notice</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="template">Use Template</Label>
                        <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select template (optional)" />
                          </SelectTrigger>
                          <SelectContent>
                            {messageTemplates.map((template) => (
                              <SelectItem key={template.id} value={template.id.toString()}>
                                {template.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Enter message subject"
                        defaultValue={
                          selectedTemplate
                            ? messageTemplates.find((t) => t.id.toString() === selectedTemplate)?.subject
                            : ""
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Message Content</Label>
                      <Textarea
                        id="content"
                        placeholder="Type your message here..."
                        rows={8}
                        defaultValue={
                          selectedTemplate
                            ? messageTemplates.find((t) => t.id.toString() === selectedTemplate)?.content
                            : ""
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Message Options</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="requireAcknowledgment" />
                          <Label htmlFor="requireAcknowledgment" className="text-sm">
                            Require Acknowledgment
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="sendToParents" />
                          <Label htmlFor="sendToParents" className="text-sm">
                            Send to Parents
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="scheduleMessage" />
                          <Label htmlFor="scheduleMessage" className="text-sm">
                            Schedule for Later
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="highPriority" />
                          <Label htmlFor="highPriority" className="text-sm">
                            High Priority
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Attachments</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Paperclip className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Click to upload files or drag and drop</p>
                        <p className="text-xs text-gray-400">PDF, DOC, Images up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="recipients" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Select Recipients</h4>
                      <Badge variant="outline">{selectedRecipients.length} selected</Badge>
                    </div>

                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search classes or sections..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <div className="space-y-4 max-h-60 overflow-y-auto">
                      {classesAndSections.map((classData) => (
                        <Card key={classData.id}>
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{classData.name}</CardTitle>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`class-${classData.id}`}
                                  checked={classData.sections.every((s) =>
                                    selectedRecipients.includes(`${classData.id}-${s.id}`),
                                  )}
                                  onCheckedChange={(checked) => handleSelectAllSections(classData.id, checked)}
                                />
                                <Label htmlFor={`class-${classData.id}`} className="text-sm">
                                  Select All
                                </Label>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 gap-3">
                              {classData.sections.map((section) => (
                                <div
                                  key={section.id}
                                  className="flex items-center justify-between p-3 border rounded-lg"
                                >
                                  <div className="flex items-center space-x-3">
                                    <Checkbox
                                      id={`section-${classData.id}-${section.id}`}
                                      checked={selectedRecipients.includes(`${classData.id}-${section.id}`)}
                                      onCheckedChange={(checked) =>
                                        handleRecipientToggle(`${classData.id}-${section.id}`, checked)
                                      }
                                    />
                                    <div>
                                      <div className="font-medium">Section {section.name}</div>
                                      <div className="text-sm text-gray-500">
                                        {section.students} students • {section.teacher}
                                      </div>
                                    </div>
                                  </div>
                                  <Badge variant="outline">{section.students}</Badge>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Label>Additional Recipients</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="allTeachers" />
                          <Label htmlFor="allTeachers" className="text-sm">
                            All Teachers
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="allParents" />
                          <Label htmlFor="allParents" className="text-sm">
                            All Parents
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="adminStaff" />
                          <Label htmlFor="adminStaff" className="text-sm">
                            Admin Staff
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="supportStaff" />
                          <Label htmlFor="supportStaff" className="text-sm">
                            Support Staff
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsComposeOpen(false)}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Communication Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Read Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Recipients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Students, teachers, parents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76.5%</div>
            <p className="text-xs text-muted-foreground">For acknowledgment requests</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="history" className="space-y-6">
        <TabsList>
          <TabsTrigger value="history">Message History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Communication History</CardTitle>
              <CardDescription>Recent messages sent to classes and sections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search messages..." className="pl-10" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="announcement">Announcements</SelectItem>
                    <SelectItem value="assignment">Assignments</SelectItem>
                    <SelectItem value="reminder">Reminders</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="space-y-4">
                {communicationHistory.map((message) => (
                  <Card key={message.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline">{message.type}</Badge>
                            <Badge
                              variant={message.status === "Delivered" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {message.status}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-lg mb-1">{message.subject}</h4>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{message.content}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {message.recipients.join(", ")}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {message.sentDate}
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {message.readCount}/{message.totalRecipients} read
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {Math.round((message.readCount / message.totalRecipients) * 100)}%
                            </div>
                            <div className="text-xs text-gray-500">Read Rate</div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
              <CardDescription>Pre-defined templates for common communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {messageTemplates.map((template) => (
                  <Card key={template.id} className="border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Badge variant="outline">{template.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium">Subject</Label>
                          <p className="text-sm text-gray-600">{template.subject}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Content Preview</Label>
                          <p className="text-sm text-gray-600 line-clamp-3">{template.content}</p>
                        </div>
                        <div className="flex items-center space-x-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                            Preview
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Use Template
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Message Performance</CardTitle>
                <CardDescription>Read rates by message type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "Announcements", sent: 45, readRate: 92 },
                    { type: "Assignments", sent: 67, readRate: 87 },
                    { type: "Reminders", sent: 23, readRate: 95 },
                    { type: "General", sent: 21, readRate: 78 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{item.type}</div>
                        <div className="text-sm text-gray-500">{item.sent} messages sent</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{item.readRate}%</div>
                        <div className="text-xs text-gray-500">Read Rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement by Section</CardTitle>
                <CardDescription>Most responsive sections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { section: "Grade 10 - Section A", engagement: 96 },
                    { section: "Grade 9 - Section B", engagement: 94 },
                    { section: "Grade 11 - Section A", engagement: 91 },
                    { section: "Grade 10 - Section B", engagement: 89 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{item.section}</div>
                        <div className="text-sm text-gray-500">Response rate</div>
                      </div>
                      <Badge variant="default">{item.engagement}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
