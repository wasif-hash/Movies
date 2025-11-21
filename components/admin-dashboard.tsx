"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Users, Ticket, DollarSign } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      label: "Total Revenue",
      value: "₹24,56,320",
      change: "+12.5%",
      icon: DollarSign,
      color: "primary",
    },
    {
      label: "Total Bookings",
      value: "1,234",
      change: "+8.2%",
      icon: Ticket,
      color: "primary",
    },
    {
      label: "Active Users",
      value: "3,456",
      change: "+15.3%",
      icon: Users,
      color: "primary",
    },
    {
      label: "Occupancy Rate",
      value: "78.5%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "primary",
    },
  ]

  const recentBookings = [
    {
      id: "BS001",
      user: "John Doe",
      movie: "The Epic Adventure",
      amount: "₹1,260",
      date: "2024-11-20",
      status: "Completed",
    },
    {
      id: "BS002",
      user: "Jane Smith",
      movie: "Space Odyssey",
      amount: "₹950",
      date: "2024-11-20",
      status: "Completed",
    },
    {
      id: "BS003",
      user: "Mike Wilson",
      movie: "Dark Mystery",
      amount: "₹1,050",
      date: "2024-11-19",
      status: "Completed",
    },
    {
      id: "BS004",
      user: "Sarah Connor",
      movie: "Love in the City",
      amount: "₹1,480",
      date: "2024-11-19",
      status: "Pending",
    },
  ]

  return (
    <section className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="bg-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-primary mt-2">{stat.change} from last month</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Recent Bookings */}
      <Card className="bg-card p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Booking ID</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">User</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Movie</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-3 px-4 text-foreground font-mono">{booking.id}</td>
                  <td className="py-3 px-4 text-foreground">{booking.user}</td>
                  <td className="py-3 px-4 text-foreground">{booking.movie}</td>
                  <td className="py-3 px-4 text-foreground font-semibold">{booking.amount}</td>
                  <td className="py-3 px-4 text-muted-foreground">{booking.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "Completed" ? "bg-green-500/20 text-green-500" : "bg-primary/20 text-primary"
                      }`}
                    >
                      {booking.status}
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
