"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import {
  User,
  Bell,
  Palette,
  Shield,
  Lock,
  Globe,
  Database,
  Accessibility,
  MessageSquare,
  Camera,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Download,
  Trash2,
  HelpCircle,
  FileText,
  Phone,
  LogOut,
  Monitor,
  Sun,
  Moon,
  Languages,
  ShieldCheck,
  Key,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [fontSize, setFontSize] = useState([16])
  const [highContrast, setHighContrast] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    newMessages: true,
    updates: true,
    reminders: true,
    marketing: false,
  })

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@school.edu",
    phone: "+1 (555) 123-4567",
    role: "Administrator",
    department: "Administration",
    bio: "Experienced school administrator with over 10 years in educational management.",
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    allowMessages: "everyone",
    showEmail: true,
    showPhone: false,
    dataSharing: false,
  })

  const [language, setLanguage] = useState("en")
  const [region, setRegion] = useState("US")
  const [timezone, setTimezone] = useState("America/New_York")

  const activeSessions = [
    { id: 1, device: "Chrome on Windows", location: "New York, US", lastActive: "2 minutes ago", current: true },
    { id: 2, device: "Safari on iPhone", location: "New York, US", lastActive: "1 hour ago", current: false },
    { id: 3, device: "Firefox on Mac", location: "Boston, US", lastActive: "2 days ago", current: false },
  ]

  const handleProfileUpdate = () => {
    // Simulate API call
    console.log("Profile updated:", profile)
  }

  const handlePasswordChange = () => {
    // Simulate password change
    console.log("Password change requested")
  }

  const handleNotificationUpdate = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handleExportData = () => {
    // Simulate data export
    console.log("Data export initiated")
  }

  const handleDeleteAccount = () => {
    // Simulate account deletion
    console.log("Account deletion requested")
  }

  const handleLogoutAllSessions = () => {
    // Simulate logout from all sessions
    console.log("Logged out from all sessions")
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-9 lg:grid-cols-9">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="display" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Display</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Language</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Data</span>
          </TabsTrigger>
          <TabsTrigger value="accessibility" className="flex items-center gap-2">
            <Accessibility className="h-4 w-4" />
            <span className="hidden sm:inline">Access</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Support</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Management */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information and profile settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="text-lg">JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={profile.department}
                    onValueChange={(value) => setProfile((prev) => ({ ...prev, department: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administration">Administration</SelectItem>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="IT">Information Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={profile.bio}
                  onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                />
              </div>

              <Button onClick={handleProfileUpdate} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Password Management
              </CardTitle>
              <CardDescription>Change your password or reset it if forgotten</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" placeholder="Enter new password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm new password" />
              </div>
              <div className="flex gap-2">
                <Button onClick={handlePasswordChange}>Change Password</Button>
                <Button variant="outline">Reset Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Preferences */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Methods
              </CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => handleNotificationUpdate("email", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive push notifications in the app</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => handleNotificationUpdate("push", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications via text message</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={(checked) => handleNotificationUpdate("sms", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Types</CardTitle>
              <CardDescription>Control which types of notifications you receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Messages</p>
                  <p className="text-sm text-gray-500">Notifications for new messages and communications</p>
                </div>
                <Switch
                  checked={notifications.newMessages}
                  onCheckedChange={(checked) => handleNotificationUpdate("newMessages", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">System Updates</p>
                  <p className="text-sm text-gray-500">Notifications about system updates and maintenance</p>
                </div>
                <Switch
                  checked={notifications.updates}
                  onCheckedChange={(checked) => handleNotificationUpdate("updates", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Reminders</p>
                  <p className="text-sm text-gray-500">Notifications for important reminders and deadlines</p>
                </div>
                <Switch
                  checked={notifications.reminders}
                  onCheckedChange={(checked) => handleNotificationUpdate("reminders", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing Communications</p>
                  <p className="text-sm text-gray-500">Promotional emails and marketing content</p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => handleNotificationUpdate("marketing", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Display Settings */}
        <TabsContent value="display" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme Settings
              </CardTitle>
              <CardDescription>Customize the appearance of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Theme Mode</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <Sun className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Light</p>
                      <p className="text-sm text-gray-500">Light theme</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 bg-blue-50 border-blue-200">
                    <Moon className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Dark</p>
                      <p className="text-sm text-gray-500">Dark theme</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <Monitor className="h-5 w-5" />
                    <div>
                      <p className="font-medium">System</p>
                      <p className="text-sm text-gray-500">Follow system</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Color Scheme</Label>
                <div className="grid grid-cols-6 gap-2">
                  {["blue", "green", "purple", "red", "orange", "pink"].map((color) => (
                    <div
                      key={color}
                      className={`w-12 h-12 rounded-lg cursor-pointer border-2 ${
                        color === "blue" ? "border-gray-400" : "border-transparent"
                      }`}
                      style={{ backgroundColor: `var(--${color}-500, #3B82F6)` }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Font Size</Label>
                <div className="space-y-2">
                  <Slider value={fontSize} onValueChange={setFontSize} max={24} min={12} step={1} className="w-full" />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Small (12px)</span>
                    <span>Current: {fontSize[0]}px</span>
                    <span>Large (24px)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy Controls
              </CardTitle>
              <CardDescription>Manage your privacy settings and data sharing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Profile Visibility</Label>
                  <Select
                    value={privacy.profileVisibility}
                    onValueChange={(value) => setPrivacy((prev) => ({ ...prev, profileVisibility: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Visible to everyone</SelectItem>
                      <SelectItem value="school">School Only - Visible to school members</SelectItem>
                      <SelectItem value="private">Private - Only visible to you</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Who can send you messages</Label>
                  <Select
                    value={privacy.allowMessages}
                    onValueChange={(value) => setPrivacy((prev) => ({ ...prev, allowMessages: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="everyone">Everyone</SelectItem>
                      <SelectItem value="school">School members only</SelectItem>
                      <SelectItem value="teachers">Teachers and staff only</SelectItem>
                      <SelectItem value="none">No one</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Contact Information Visibility</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Email Address</p>
                      <p className="text-sm text-gray-500">Allow others to see your email address</p>
                    </div>
                    <Switch
                      checked={privacy.showEmail}
                      onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, showEmail: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Phone Number</p>
                      <p className="text-sm text-gray-500">Allow others to see your phone number</p>
                    </div>
                    <Switch
                      checked={privacy.showPhone}
                      onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, showPhone: checked }))}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Data Sharing</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Analytics Data Sharing</p>
                    <p className="text-sm text-gray-500">
                      Help improve the application by sharing anonymous usage data
                    </p>
                  </div>
                  <Switch
                    checked={privacy.dataSharing}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, dataSharing: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Security */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${twoFactorEnabled ? "bg-green-100" : "bg-gray-100"}`}>
                    <ShieldCheck className={`h-5 w-5 ${twoFactorEnabled ? "text-green-600" : "text-gray-400"}`} />
                  </div>
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">
                      {twoFactorEnabled
                        ? "Enabled - Your account is protected"
                        : "Disabled - Enable for better security"}
                    </p>
                  </div>
                </div>
                <Button
                  variant={twoFactorEnabled ? "outline" : "default"}
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                >
                  {twoFactorEnabled ? "Disable" : "Enable"}
                </Button>
              </div>
              {twoFactorEnabled && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="h-4 w-4" />
                    <p className="font-medium">2FA is enabled</p>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    Your account is protected with two-factor authentication using your authenticator app.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Active Sessions
              </CardTitle>
              <CardDescription>Manage your active sessions and devices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${session.current ? "bg-green-100" : "bg-gray-100"}`}>
                      <Monitor className={`h-4 w-4 ${session.current ? "text-green-600" : "text-gray-400"}`} />
                    </div>
                    <div>
                      <p className="font-medium flex items-center gap-2">
                        {session.device}
                        {session.current && <Badge variant="secondary">Current</Badge>}
                      </p>
                      <p className="text-sm text-gray-500">
                        {session.location} • {session.lastActive}
                      </p>
                    </div>
                  </div>
                  {!session.current && (
                    <Button variant="outline" size="sm">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="destructive" onClick={handleLogoutAllSessions} className="w-full">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out of All Sessions
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Language and Region */}
        <TabsContent value="language" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                Language Settings
              </CardTitle>
              <CardDescription>Choose your preferred language and regional settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Region</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      <SelectItem value="DE">Germany</SelectItem>
                      <SelectItem value="FR">France</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Time Zone</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                    <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-blue-800">
                  <Info className="h-4 w-4" />
                  <p className="font-medium">Regional Settings</p>
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  These settings will affect date formats, number formats, and currency display throughout the
                  application.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Management */}
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Your Data
              </CardTitle>
              <CardDescription>Download a copy of your data for backup or transfer purposes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Profile Data</h4>
                  <p className="text-sm text-gray-500 mb-3">Your profile information, settings, and preferences</p>
                  <Button variant="outline" onClick={handleExportData} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Profile
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Activity Data</h4>
                  <p className="text-sm text-gray-500 mb-3">Your activity history and usage statistics</p>
                  <Button variant="outline" onClick={handleExportData} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Activity
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-800">
                  <AlertTriangle className="h-4 w-4" />
                  <p className="font-medium">Data Export Information</p>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  Data exports may take a few minutes to process. You'll receive an email when your export is ready for
                  download.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Trash2 className="h-5 w-5" />
                Delete Account
              </CardTitle>
              <CardDescription>Permanently delete your account and all associated data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="h-4 w-4" />
                  <p className="font-medium">Warning: This action cannot be undone</p>
                </div>
                <ul className="text-sm text-red-700 mt-2 space-y-1">
                  <li>• All your data will be permanently deleted</li>
                  <li>• You will lose access to all school services</li>
                  <li>• This action cannot be reversed</li>
                </ul>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete My Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove all your data
                      from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accessibility Settings */}
        <TabsContent value="accessibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Accessibility className="h-5 w-5" />
                Accessibility Options
              </CardTitle>
              <CardDescription>Customize the application for better accessibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">High Contrast Mode</p>
                    <p className="text-sm text-gray-500">Increase contrast for better visibility</p>
                  </div>
                  <Switch checked={highContrast} onCheckedChange={setHighContrast} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Screen Reader Support</p>
                    <p className="text-sm text-gray-500">Enhanced support for screen readers</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Keyboard Navigation</p>
                    <p className="text-sm text-gray-500">Enhanced keyboard navigation support</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Reduce Motion</p>
                    <p className="text-sm text-gray-500">Minimize animations and transitions</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Text Settings</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Text Size</Label>
                    <div className="space-y-2">
                      <Slider
                        value={fontSize}
                        onValueChange={setFontSize}
                        max={24}
                        min={12}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Small</span>
                        <span>Current: {fontSize[0]}px</span>
                        <span>Large</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Font Family</Label>
                    <Select defaultValue="system">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System Default</SelectItem>
                        <SelectItem value="arial">Arial</SelectItem>
                        <SelectItem value="helvetica">Helvetica</SelectItem>
                        <SelectItem value="times">Times New Roman</SelectItem>
                        <SelectItem value="dyslexic">OpenDyslexic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback and Support */}
        <TabsContent value="support" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Send Feedback
              </CardTitle>
              <CardDescription>Help us improve by sharing your feedback and suggestions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feedback-type">Feedback Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select feedback type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="improvement">Improvement Suggestion</SelectItem>
                    <SelectItem value="general">General Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback-message">Your Feedback</Label>
                <Textarea id="feedback-message" placeholder="Tell us what you think..." rows={4} />
              </div>
              <Button className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Feedback
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Support Resources
              </CardTitle>
              <CardDescription>Get help and find answers to common questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5" />
                    <span className="font-medium">Documentation</span>
                  </div>
                  <p className="text-sm text-gray-500">Browse our comprehensive guides and tutorials</p>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-2">
                    <HelpCircle className="h-5 w-5" />
                    <span className="font-medium">FAQ</span>
                  </div>
                  <p className="text-sm text-gray-500">Find answers to frequently asked questions</p>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-5 w-5" />
                    <span className="font-medium">Contact Support</span>
                  </div>
                  <p className="text-sm text-gray-500">Get in touch with our support team</p>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-5 w-5" />
                    <span className="font-medium">Phone Support</span>
                  </div>
                  <p className="text-sm text-gray-500">Call us at +1 (555) 123-4567</p>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>Technical details about your current session</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-500">Version</p>
                  <p>v2.1.0</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Last Updated</p>
                  <p>December 15, 2024</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Browser</p>
                  <p>Chrome 120.0.0</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Platform</p>
                  <p>Windows 11</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
