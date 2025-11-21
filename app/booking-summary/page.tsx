"use client"

import { useState } from "react"
import Header from "@/components/header"
import BookingSummaryContent from "@/components/booking-summary-content"

export default function BookingSummaryPage() {
  const [selectedCity, setSelectedCity] = useState("Mumbai")
  const navItems = [
    { id: "featured", label: "Featured", href: "/" },
    { id: "movies", label: "Movies", href: "/movies" },
    { id: "events", label: "Events", href: "/events" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header selectedCity={selectedCity} setSelectedCity={setSelectedCity} navItems={navItems} />
      <BookingSummaryContent />
    </main>
  )
}
