"use client"

import { useState, useEffect, useMemo } from "react"
import Header from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { LogOut, User } from "lucide-react"

interface UserProfile {
  email: string
  name: string
}

interface Booking {
  id: string
  movieTitle: string
  theater: string
  date: string
  time: string
  seats: string
  status: "upcoming" | "completed" | "cancelled"
  totalAmount: number
}

export default function ProfilePage() {
  const [selectedCity, setSelectedCity] = useState("Mumbai")
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "" })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsed = JSON.parse(userData)
      setUser(parsed)
      setFormData(parsed)
    }
  }, [])
const navItems = useMemo(
    () => [
      { id: "featured", label: "Featured", href: "/" },
      { id: "movies", label: "Movies", href: "/movies" },
      { id: "events", label: "Events", href: "/events" },
    ],
    [],
  )
  const mockBookings: Booking[] = [
    {
      id: "BS12345678",
      movieTitle: "The Epic Adventure",
      theater: "PVR Cinemas - The Nexus Mall",
      date: "2024-11-20",
      time: "02:45 PM",
      seats: "E6, E7, E8",
      status: "upcoming",
      totalAmount: 1260,
    },
    {
      id: "BS87654321",
      movieTitle: "Space Odyssey",
      theater: "IMAX Cinema - Central Plaza",
      date: "2024-10-15",
      time: "07:00 PM",
      seats: "F5, F6",
      status: "completed",
      totalAmount: 950,
    },
  ]

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/auth/login"
  }

  const handleSaveProfile = () => {
    localStorage.setItem("user", JSON.stringify(formData))
    setUser(formData)
    setIsEditing(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="bg-card p-8 text-center">
          <p className="text-foreground mb-4">Please sign in to view your profile</p>
          <Link href="/auth/login">
            <Button className="bg-primary hover:bg-primary/90">Sign In</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header selectedCity={selectedCity} setSelectedCity={setSelectedCity} navItems={navItems} />

      <section className="py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <Card className="bg-card p-6 space-y-6">
                {/* Profile Header */}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                {/* Navigation */}
                <div className="space-y-2 border-t border-border pt-4">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    My Bookings
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Payment Methods
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Preferences
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Support
                  </Button>
                </div>

                {/* Logout */}
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full justify-start text-destructive hover:text-destructive bg-transparent"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Settings */}
              <Card className="bg-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-foreground">Profile Settings</h3>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (isEditing) {
                        handleSaveProfile()
                      } else {
                        setIsEditing(true)
                      }
                    }}
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Full Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                      className="disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Email Address</label>
                    <Input
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                      className="disabled:opacity-50"
                    />
                  </div>
                </div>
              </Card>

              {/* Booking History */}
              <Card className="bg-card p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">Recent Bookings</h3>

                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{booking.movieTitle}</h4>
                          <p className="text-sm text-muted-foreground">{booking.theater}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded text-xs font-semibold ${
                            booking.status === "upcoming"
                              ? "bg-primary/20 text-primary"
                              : booking.status === "completed"
                                ? "bg-green-500/20 text-green-500"
                                : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {booking.status === "upcoming"
                            ? "Upcoming"
                            : booking.status === "completed"
                              ? "Completed"
                              : "Cancelled"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 text-sm mb-3">
                        <div>
                          <p className="text-muted-foreground text-xs">Date & Time</p>
                          <p className="font-semibold text-foreground">
                            {booking.date} at {booking.time}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Seats</p>
                          <p className="font-semibold text-foreground">{booking.seats}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Amount Paid</p>
                          <p className="font-semibold text-foreground">₹{booking.totalAmount}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Booking ID</p>
                          <p className="font-semibold text-foreground font-mono text-xs">{booking.id}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs bg-transparent">
                          View Tickets
                        </Button>
                        {booking.status === "upcoming" && (
                          <Button size="sm" variant="outline" className="text-xs text-destructive bg-transparent">
                            Cancel Booking
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
