"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CreditCard, Download, Upload, Eye, Printer, School, QrCode, Palette, Users, FileImage } from "lucide-react"

const idCardTemplates = [
  {
    id: "default",
    name: "Default Blue",
    primaryColor: "#2563EB",
    secondaryColor: "#1E40AF",
    preview: "bg-gradient-to-r from-blue-600 to-blue-800",
  },
  {
    id: "green",
    name: "Green Theme",
    primaryColor: "#059669",
    secondaryColor: "#047857",
    preview: "bg-gradient-to-r from-green-600 to-green-800",
  },
  {
    id: "purple",
    name: "Purple Theme",
    primaryColor: "#7C3AED",
    secondaryColor: "#6D28D9",
    preview: "bg-gradient-to-r from-purple-600 to-purple-800",
  },
  {
    id: "red",
    name: "Red Theme",
    primaryColor: "#DC2626",
    secondaryColor: "#B91C1C",
    preview: "bg-gradient-to-r from-red-600 to-red-800",
  },
]

const sampleStudents = [
  { id: 1, name: "John Doe", rollNumber: "2024001", class: "10A", selected: false },
  { id: 2, name: "Sarah Smith", rollNumber: "2024002", class: "9B", selected: false },
  { id: 3, name: "Mike Johnson", rollNumber: "2024003", class: "11A", selected: false },
  { id: 4, name: "Emily Davis", rollNumber: "2024004", class: "10B", selected: false },
]

export default function IdCardsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("default")
  const [schoolName, setSchoolName] = useState("EduManage Pro")
  const [academicYear, setAcademicYear] = useState("2024-2025")
  const [selectedStudents, setSelectedStudents] = useState(sampleStudents)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [includePhoto, setIncludePhoto] = useState(true)
  const [includeQR, setIncludeQR] = useState(true)
  const [includeBloodGroup, setIncludeBloodGroup] = useState(false)
  const [includeEmergency, setIncludeEmergency] = useState(false)

  const currentTemplate = idCardTemplates.find((t) => t.id === selectedTemplate)

  const handleStudentSelection = (studentId, checked) => {
    setSelectedStudents((prev) =>
      prev.map((student) => (student.id === studentId ? { ...student, selected: checked } : student)),
    )
  }

  const handleSelectAll = (checked) => {
    setSelectedStudents((prev) => prev.map((student) => ({ ...student, selected: checked })))
  }

  const selectedCount = selectedStudents.filter((s) => s.selected).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ID Card Generation</h1>
          <p className="text-gray-600">Create and customize student ID cards with school branding</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Template
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Template
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Eligible for ID cards</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cards Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,198</div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">49</div>
            <p className="text-xs text-muted-foreground">Need to be generated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Available designs</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="design" className="space-y-6">
        <TabsList>
          <TabsTrigger value="design">Design & Template</TabsTrigger>
          <TabsTrigger value="students">Select Students</TabsTrigger>
          <TabsTrigger value="generate">Generate Cards</TabsTrigger>
        </TabsList>

        <TabsContent value="design" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="h-5 w-5 mr-2" />
                  Template Selection
                </CardTitle>
                <CardDescription>Choose a design template for the ID cards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {idCardTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className={`w-full h-16 ${template.preview} rounded mb-2`}></div>
                      <div className="text-sm font-medium">{template.name}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="schoolName">School Name</Label>
                    <Input id="schoolName" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="academicYear">Academic Year</Label>
                    <Input id="academicYear" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motto">School Motto (Optional)</Label>
                    <Input id="motto" placeholder="Excellence in Education" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ID Card Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Live Preview
                </CardTitle>
                <CardDescription>Preview of the ID card design</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <div
                    className={`w-80 h-48 ${currentTemplate?.preview} rounded-lg p-4 text-white relative overflow-hidden`}
                  >
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>

                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{schoolName}</h3>
                        <p className="text-xs opacity-90">Excellence in Education</p>
                      </div>
                      <School className="h-8 w-8 opacity-80" />
                    </div>

                    {/* Student Info */}
                    <div className="flex items-center space-x-4">
                      {includePhoto && (
                        <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                          <img
                            src="/placeholder.svg?height=56&width=56"
                            alt="Student"
                            className="w-14 h-14 rounded object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">John Doe</h4>
                        <p className="text-sm opacity-90">Roll: 2024001</p>
                        <p className="text-sm opacity-90">Class: 10A</p>
                        {includeBloodGroup && <p className="text-xs opacity-75">Blood: O+</p>}
                        <p className="text-xs opacity-75 mt-1">Valid: {academicYear}</p>
                      </div>
                    </div>

                    {/* QR Code */}
                    {includeQR && (
                      <div className="absolute bottom-2 right-2">
                        <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
                          <QrCode className="h-6 w-6" />
                        </div>
                      </div>
                    )}

                    {/* Emergency contact (if enabled) */}
                    {includeEmergency && (
                      <div className="absolute bottom-2 left-2 text-xs opacity-75">Emergency: +1 234 567 8900</div>
                    )}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Label>Include Information</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="includePhoto" checked={includePhoto} onCheckedChange={setIncludePhoto} />
                      <Label htmlFor="includePhoto" className="text-sm">
                        Student Photo
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="includeQR" checked={includeQR} onCheckedChange={setIncludeQR} />
                      <Label htmlFor="includeQR" className="text-sm">
                        QR Code
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeBloodGroup"
                        checked={includeBloodGroup}
                        onCheckedChange={setIncludeBloodGroup}
                      />
                      <Label htmlFor="includeBloodGroup" className="text-sm">
                        Blood Group
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeEmergency"
                        checked={includeEmergency}
                        onCheckedChange={setIncludeEmergency}
                      />
                      <Label htmlFor="includeEmergency" className="text-sm">
                        Emergency Contact
                      </Label>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4" variant="outline" onClick={() => setIsPreviewOpen(true)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Full Size Preview
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Select Students
              </CardTitle>
              <CardDescription>Choose students for ID card generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="selectAll"
                      checked={selectedCount === selectedStudents.length}
                      onCheckedChange={handleSelectAll}
                    />
                    <Label htmlFor="selectAll">Select All Students</Label>
                  </div>
                  <Badge variant="outline">
                    {selectedCount} of {selectedStudents.length} selected
                  </Badge>
                </div>

                <div className="space-y-2">
                  {selectedStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={student.selected}
                          onCheckedChange={(checked) => handleStudentSelection(student.id, checked)}
                        />
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-500">
                            Roll: {student.rollNumber} • Class: {student.class}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">{student.class}</Badge>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="filterClass">Filter by Class</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="All Classes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Classes</SelectItem>
                          <SelectItem value="9A">9A</SelectItem>
                          <SelectItem value="9B">9B</SelectItem>
                          <SelectItem value="10A">10A</SelectItem>
                          <SelectItem value="10B">10B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="filterStatus">Filter by Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="All Students" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Students</SelectItem>
                          <SelectItem value="new">New Students</SelectItem>
                          <SelectItem value="existing">Existing Students</SelectItem>
                          <SelectItem value="no-card">No ID Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="searchStudent">Search Students</Label>
                      <Input id="searchStudent" placeholder="Search by name or roll number" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Generate ID Cards
              </CardTitle>
              <CardDescription>Review settings and generate ID cards for selected students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Generation Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedCount}</div>
                    <div className="text-sm text-gray-600">Students Selected</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{currentTemplate?.name}</div>
                    <div className="text-sm text-gray-600">Template</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">PDF</div>
                    <div className="text-sm text-gray-600">Output Format</div>
                  </div>
                </div>

                {/* Generation Options */}
                <div className="space-y-4">
                  <h4 className="font-medium">Generation Options</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="outputFormat">Output Format</Label>
                      <Select defaultValue="pdf">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF (Recommended)</SelectItem>
                          <SelectItem value="png">PNG Images</SelectItem>
                          <SelectItem value="jpg">JPG Images</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardsPerPage">Cards per Page</Label>
                      <Select defaultValue="8">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4">4 Cards per Page</SelectItem>
                          <SelectItem value="8">8 Cards per Page</SelectItem>
                          <SelectItem value="12">12 Cards per Page</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Additional Options</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="includeBackside" />
                        <Label htmlFor="includeBackside" className="text-sm">
                          Include Backside
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="highResolution" defaultChecked />
                        <Label htmlFor="highResolution" className="text-sm">
                          High Resolution
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="printMarks" />
                        <Label htmlFor="printMarks" className="text-sm">
                          Print Cut Marks
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="watermark" />
                        <Label htmlFor="watermark" className="text-sm">
                          School Watermark
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4 pt-4 border-t">
                  <Button className="flex-1" disabled={selectedCount === 0}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Generate {selectedCount} ID Cards
                  </Button>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Batch
                  </Button>
                  <Button variant="outline">
                    <Printer className="h-4 w-4 mr-2" />
                    Print Settings
                  </Button>
                </div>

                {/* Recent Generations */}
                <div className="space-y-2">
                  <h4 className="font-medium">Recent Generations</h4>
                  <div className="space-y-2">
                    {[
                      { date: "2024-01-15", count: 25, class: "10A", status: "Completed" },
                      { date: "2024-01-14", count: 30, class: "9B", status: "Completed" },
                      { date: "2024-01-13", count: 28, class: "11A", status: "Completed" },
                    ].map((generation, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileImage className="h-4 w-4 text-gray-400" />
                          <div>
                            <div className="font-medium">
                              {generation.count} ID Cards - Class {generation.class}
                            </div>
                            <div className="text-sm text-gray-500">{generation.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="default">{generation.status}</Badge>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Full Size Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>ID Card Preview</DialogTitle>
            <DialogDescription>Full size preview of the ID card design</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <div className={`w-96 h-60 ${currentTemplate?.preview} rounded-lg p-6 text-white relative overflow-hidden`}>
              {/* Background decorations */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full -ml-10 -mb-10"></div>

              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-bold text-xl">{schoolName}</h3>
                  <p className="text-sm opacity-90">Excellence in Education</p>
                </div>
                <School className="h-10 w-10 opacity-80" />
              </div>

              {/* Student Info */}
              <div className="flex items-center space-x-6">
                {includePhoto && (
                  <div className="w-20 h-20 bg-white/20 rounded-lg flex items-center justify-center">
                    <img
                      src="/placeholder.svg?height=72&width=72"
                      alt="Student"
                      className="w-18 h-18 rounded object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-xl">John Doe</h4>
                  <p className="text-base opacity-90">Roll: 2024001</p>
                  <p className="text-base opacity-90">Class: 10A</p>
                  {includeBloodGroup && <p className="text-sm opacity-75">Blood Group: O+</p>}
                  <p className="text-sm opacity-75 mt-2">Valid: {academicYear}</p>
                </div>
              </div>

              {/* QR Code */}
              {includeQR && (
                <div className="absolute bottom-3 right-3">
                  <div className="w-12 h-12 bg-white/20 rounded flex items-center justify-center">
                    <QrCode className="h-8 w-8" />
                  </div>
                </div>
              )}

              {/* Emergency contact */}
              {includeEmergency && (
                <div className="absolute bottom-3 left-3 text-sm opacity-75">Emergency: +1 234 567 8900</div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              Close
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download Preview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
