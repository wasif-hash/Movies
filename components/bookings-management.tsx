"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"

interface Booking {
  id: string
  user: string
  movie: string
  theater: string
  seats: string
  amount: number
  date: string
  status: "completed" | "pending" | "cancelled"
}

export default function BookingsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [bookings] = useState<Booking[]>([
    {
      id: "BS001",
      user: "John Doe",
      movie: "The Epic Adventure",
      theater: "PVR Cinemas",
      seats: "E6, E7, E8",
      amount: 1260,
      date: "2024-11-20",
      status: "completed",
    },
    {
      id: "BS002",
      user: "Jane Smith",
      movie: "Space Odyssey",
      theater: "IMAX Cinema",
      seats: "F5, F6",
      amount: 950,
      date: "2024-11-20",
      status: "completed",
    },
    {
      id: "BS003",
      user: "Mike Wilson",
      movie: "Dark Mystery",
      theater: "Cinepolis",
      seats: "D3",
      amount: 350,
      date: "2024-11-19",
      status: "pending",
    },
    {
      id: "BS004",
      user: "Sarah Connor",
      movie: "Love in the City",
      theater: "PVR Cinemas",
      seats: "G2, G3",
      amount: 1050,
      date: "2024-11-18",
      status: "cancelled",
    },
  ])

  const filteredBookings = bookings.filter(
    (b) =>
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.movie.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <section className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Bookings</h1>
        <p className="text-muted-foreground">View and manage all bookings</p>
      </div>

      {/* Search & Filter */}
      <Card className="bg-card p-4 flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by booking ID, user, or movie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" gap-2>
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </Card>

      {/* Bookings Table */}
      <Card className="bg-card p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Booking ID</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">User</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Movie</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Theater</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-3 px-4 text-foreground font-mono font-semibold">{booking.id}</td>
                  <td className="py-3 px-4 text-foreground">{booking.user}</td>
                  <td className="py-3 px-4 text-foreground">{booking.movie}</td>
                  <td className="py-3 px-4 text-foreground">{booking.theater}</td>
                  <td className="py-3 px-4 text-foreground font-semibold">₹{booking.amount}</td>
                  <td className="py-3 px-4 text-muted-foreground">{booking.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "completed"
                          ? "bg-green-500/20 text-green-500"
                          : booking.status === "pending"
                            ? "bg-primary/20 text-primary"
                            : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  )
}
