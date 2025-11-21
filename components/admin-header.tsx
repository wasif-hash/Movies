"use client"

import { LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminHeader() {
  const handleLogout = () => {
    localStorage.removeItem("adminUser")
    window.location.href = "/admin/login"
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground font-bold">
            B
          </div>
          <h1 className="text-xl font-bold text-foreground">BookShow Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button size="icon" variant="outline">
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={handleLogout}
            className="text-destructive hover:text-destructive bg-transparent"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
