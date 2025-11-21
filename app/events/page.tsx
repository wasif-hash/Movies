"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EVENTS } from "@/lib/media"

export default function EventsPage() {
  const [selectedCity, setSelectedCity] = useState("Mumbai")
  const [activeIndex, setActiveIndex] = useState(0)
  const navItems = useMemo(
    () => [
      { id: "featured", label: "Featured", href: "/" },
      { id: "movies", label: "Movies", href: "/movies" },
      { id: "events", label: "Events", href: "/events" },
    ],
    [],
  )
  const latestEvents = useMemo(() => EVENTS.slice(0, 5), [])

  useEffect(() => {
    if (latestEvents.length === 0) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % latestEvents.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [latestEvents.length])

  const goToSlide = (direction: "prev" | "next") => {
    setActiveIndex((prev) => {
      if (direction === "next") return (prev + 1) % latestEvents.length
      return (prev - 1 + latestEvents.length) % latestEvents.length
    })
  }

  return (
    <main className="min-h-screen bg-background">
      <Header selectedCity={selectedCity} setSelectedCity={setSelectedCity} navItems={navItems} />

      <section className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <header className="mb-6">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">Discover</p>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">Events</h1>
          <p className="mt-2 text-sm text-muted-foreground">Find experiences happening near you.</p>
        </header>

        {/* Hero carousel */}
        <div className="mb-12 rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/40 to-background p-1 shadow-md">
          <div className="relative overflow-hidden rounded-[28px] bg-card">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {latestEvents.map((event) => (
                <div key={event.id} className="min-w-full">
                  <div className="relative h-[420px] w-full overflow-hidden rounded-[28px]">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-center gap-4 px-6 py-8 sm:px-10 md:px-14">
                      <div className="space-y-2 max-w-xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary-foreground/80">
                          Latest Event
                        </p>
                        <h2 className="text-3xl font-semibold text-white md:text-4xl">{event.title}</h2>
                        <p className="text-base text-white/80">{event.location}</p>
                        <p className="text-sm font-semibold text-primary-foreground/90">{event.dateRange}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Link href={`/booking-summary?event=${event.id}`}>
                          <Button size="lg" className="bg-white text-black hover:bg-white/90">
                            Book Now
                          </Button>
                        </Link>
                        <Link href="/events" className="text-sm font-semibold text-white/80 hover:text-white">
                          View all events
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4">
              <Button
                size="icon"
                variant="secondary"
                className="pointer-events-auto rounded-full bg-white/80 text-foreground shadow"
                onClick={() => goToSlide("prev")}
                aria-label="Previous event"
              >
                {"<"}
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="pointer-events-auto rounded-full bg-white/80 text-foreground shadow"
                onClick={() => goToSlide("next")}
                aria-label="Next event"
              >
                {">"}
              </Button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {latestEvents.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all ${idx === activeIndex ? "w-8 bg-white" : "w-2 bg-white/50"}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden rounded-3xl bg-card shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="space-y-2 p-4">
                <h2 className="text-lg font-semibold leading-snug text-foreground line-clamp-2">{event.title}</h2>
                <p className="text-sm text-muted-foreground">{event.location}</p>
                <p className="text-sm font-semibold text-foreground">{event.dateRange}</p>
                <p className="text-xs font-semibold text-primary">{event.price}</p>
              </div>
              <div className="flex items-center justify-between px-4 pb-4">
                <span className="text-xs text-muted-foreground">More details coming soon</span>
                <Link href="/movies" className="text-xs font-semibold text-primary hover:underline">
                  Check movies
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
