"use client"

import { useMemo, useState } from "react"
import MovieCarousel from "@/components/movie-carousel"
import CategoryGrid from "@/components/category-grid"
import Header from "@/components/header"

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("Mumbai")
   const navItems = useMemo(
    () => [
      { id: "featured", label: "Featured", href: "/" },
      { id: "movies", label: "Movies", href: "/movies" },
      { id: "events", label: "Events", href: "/events" },
    ],
    [],
  )

  return (
    <main className="min-h-screen bg-background">
      <Header selectedCity={selectedCity} setSelectedCity={setSelectedCity} navItems={navItems} />
      <MovieCarousel title="Trending Now" />
      <MovieCarousel title="Upcoming" variant="upcoming" />
      <CategoryGrid />
    </main>
  )
}
