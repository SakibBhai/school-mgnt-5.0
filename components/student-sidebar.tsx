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
  Calendar,
  FileText,
  BookOpen,
  MessageSquare,
  DollarSign,
  User,
  Bell,
  Clock,
  Award,
  LogOut,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    title: "Dashboard",
    items: [{ title: "Overview", url: "/portal/dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Academic",
    items: [
      { title: "Timetable", url: "/portal/timetable", icon: Clock },
      { title: "Assignments", url: "/portal/assignments", icon: FileText },
      { title: "Grades & Results", url: "/portal/grades", icon: Award },
      { title: "Attendance", url: "/portal/attendance", icon: User },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Library", url: "/portal/library", icon: BookOpen },
      { title: "Calendar", url: "/portal/calendar", icon: Calendar },
    ],
  },
  {
    title: "Communication",
    items: [
      { title: "Messages", url: "/portal/messages", icon: MessageSquare },
      { title: "Announcements", url: "/portal/announcements", icon: Bell },
    ],
  },
  {
    title: "Financial",
    items: [{ title: "Fees & Payments", url: "/portal/fees", icon: DollarSign }],
  },
]

export function StudentSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Student Portal</h2>
            <p className="text-sm text-muted-foreground">John Doe - 10A</p>
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
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
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
