"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  DollarSign,
  MessageSquare,
  Library,
  Settings,
  Bell,
  Clock,
  UserCog,
  LogOut,
  School,
  BarChart3,
  Send,
  FileSpreadsheet,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Overview",
    items: [{ title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard }],
  },
  {
    title: "User Management",
    items: [
      { title: "Students", url: "/admin/students", icon: Users },
      { title: "Teachers", url: "/admin/teachers", icon: GraduationCap },
      { title: "Classes & Sections", url: "/admin/classes", icon: BookOpen },
    ],
  },
  {
    title: "Academic",
    items: [
      { title: "Timetable", url: "/admin/timetable", icon: Clock },
      { title: "Calendar & Events", url: "/admin/calendar", icon: Calendar },
      { title: "Attendance", url: "/admin/attendance", icon: ClipboardCheck },
      { title: "Exams & Results", url: "/admin/exams", icon: FileText },
      { title: "Mark Sheets", url: "/admin/exams/marksheets", icon: FileSpreadsheet },
    ],
  },
  {
    title: "Financial",
    items: [{ title: "Fees & Payments", url: "/admin/fees", icon: DollarSign }],
  },
  {
    title: "Communication",
    items: [
      { title: "Notice Board", url: "/admin/notices", icon: Bell },
      { title: "Messaging", url: "/admin/messages", icon: MessageSquare },
      { title: "Section Communication", url: "/admin/classes/communication", icon: Send },
    ],
  },
  {
    title: "Analytics",
    items: [{ title: "Class Analytics", url: "/admin/classes/analytics", icon: BarChart3 }],
  },
  {
    title: "Resources",
    items: [{ title: "Library", url: "/admin/library", icon: Library }],
  },
  {
    title: "System",
    items: [
      { title: "User Roles", url: "/admin/roles", icon: UserCog },
      { title: "Settings", url: "/admin/settings", icon: Settings },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <School className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">EduManage Pro</h2>
            <p className="text-sm text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-4">
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url || pathname.startsWith(item.url + "/")
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link
                          href={item.url}
                          className={cn(
                            "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                            isActive ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-gray-100 text-gray-700",
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t px-4 py-4">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Link>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
