"use client"

import type React from "react"

import { SidebarProvider } from "@/components/ui/sidebar"
import { StudentSidebar } from "@/components/student-sidebar"
import { StudentHeader } from "@/components/student-header"

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <StudentSidebar />
        <div className="flex-1 flex flex-col">
          <StudentHeader />
          <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
