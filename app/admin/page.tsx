"use client"

import { useState } from "react"
import AdminHeader from "@/components/admin-header"
import AdminSidebar from "@/components/admin-sidebar"
import AdminDashboard from "@/components/admin-dashboard"
import MovieManagement from "@/components/movie-management"
import TheaterManagement from "@/components/theater-management"
import BookingsManagement from "@/components/bookings-management"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <main className="min-h-screen bg-background">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1">
          {activeTab === "dashboard" && <AdminDashboard />}
          {activeTab === "movies" && <MovieManagement />}
          {activeTab === "theaters" && <TheaterManagement />}
          {activeTab === "bookings" && <BookingsManagement />}
        </div>
      </div>
    </main>
  )
}
