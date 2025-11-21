"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"

interface Theater {
  id: number
  name: string
  city: string
  screens: number
  totalSeats: number
  status: "active" | "inactive"
}

export default function TheaterManagement() {
  const [theaters] = useState<Theater[]>([
    { id: 1, name: "PVR Cinemas - The Nexus Mall", city: "Mumbai", screens: 8, totalSeats: 1200, status: "active" },
    { id: 2, name: "IMAX Cinema - Central Plaza", city: "Mumbai", screens: 5, totalSeats: 800, status: "active" },
    { id: 3, name: "Cinepolis - Phoenix Mall", city: "Mumbai", screens: 6, totalSeats: 1000, status: "active" },
  ])

  return (
    <section className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Theaters</h1>
          <p className="text-muted-foreground">Manage theater properties</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="h-4 w-4" />
          Add Theater
        </Button>
      </div>

      {/* Theaters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {theaters.map((theater) => (
          <Card key={theater.id} className="bg-card p-6 space-y-4">
            <div>
              <h3 className="font-bold text-foreground">{theater.name}</h3>
              <p className="text-sm text-muted-foreground">{theater.city}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Screens</p>
                <p className="font-semibold text-foreground">{theater.screens}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Seats</p>
                <p className="font-semibold text-foreground">{theater.totalSeats}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  theater.status === "active" ? "bg-green-500/20 text-green-500" : "bg-muted text-muted-foreground"
                }`}
              >
                {theater.status}
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="text-destructive hover:text-destructive bg-transparent">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
