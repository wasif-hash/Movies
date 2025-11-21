"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import SeatSelectionContent from "@/components/seat-selection-content"

export default function SeatSelectionPage() {
  const params = useParams()
  const theaterId = params.theaterId as string
  const showtimeId = params.showtimeId as string
  const [selectedCity, setSelectedCity] = useState("Mumbai")
  const navItems = [
    { id: "featured", label: "Featured", href: "/" },
    { id: "movies", label: "Movies", href: "/movies" },
    { id: "events", label: "Events", href: "/events" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header selectedCity={selectedCity} setSelectedCity={setSelectedCity} navItems={navItems} />
      <SeatSelectionContent theaterId={theaterId} showtimeId={showtimeId} />
    </main>
  )
}
