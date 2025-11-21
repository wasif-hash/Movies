"use client"

import { Suspense, useState } from "react"
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
      <Suspense fallback={<div className="px-6 py-12 text-center text-muted-foreground">Loading summary…</div>}>
        <BookingSummaryContent />
      </Suspense>
    </main>
  )
}
