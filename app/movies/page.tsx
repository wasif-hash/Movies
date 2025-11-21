"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import Header from "@/components/header"
import { Card } from "@/components/ui/card"
import { MOVIES } from "@/lib/media"

export default function MoviesPage() {
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

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-muted-foreground">Browse</p>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">Movies</h1>
            <p className="mt-2 text-sm text-muted-foreground">Pick a movie to see showtimes and details.</p>
          </div>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
            {MOVIES.length} titles
          </span>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOVIES.map((movie) => (
            <Link key={movie.id} href={`/movies/${movie.id}`} className="group">
              <Card className="overflow-hidden rounded-3xl bg-card shadow-md transition-transform duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
                <div className="relative aspect-3/4 overflow-hidden">
                  <img
                    src={movie.image || "/placeholder.svg"}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#7d6c00]">{movie.timeframe}</p>
                  <h2 className="text-lg font-semibold leading-snug text-foreground line-clamp-2">{movie.title}</h2>
                  <p className="text-sm text-muted-foreground">{movie.subtitle}</p>
                  <p className="text-base font-semibold text-foreground">{movie.pricing}</p>
                  <p className="text-xs font-semibold text-primary">{movie.offer}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
