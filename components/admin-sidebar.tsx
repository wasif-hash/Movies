"use client"

import { LayoutDashboard, Film, Building2, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "movies", label: "Movies", icon: Film },
    { id: "theaters", label: "Theaters", icon: Building2 },
    { id: "bookings", label: "Bookings", icon: Ticket },
  ]

  return (
    <aside className="hidden md:block w-64 border-r border-border bg-card">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              variant={activeTab === item.id ? "default" : "outline"}
              className="w-full justify-start"
            >
              <Icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          )
        })}
      </nav>
    </aside>
  )
}
