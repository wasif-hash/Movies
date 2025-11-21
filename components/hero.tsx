"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeroProps {
  selectedCity: string
}

export default function Hero({ selectedCity }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-card/50 to-background py-20 md:py-32">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/placeholder.svg?height=600&width=1200&query=movie-theater-cinema-audience)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 text-center">
          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl text-balance">
              Book Your Perfect Experience
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Discover movies, events, and live shows in {selectedCity}
            </p>
          </div>

          {/* Search Bar */}
          <div className="mx-auto max-w-2xl">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search movies, events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90">Search</Button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <Button variant="outline" size="sm">
              Movies
            </Button>
            <Button variant="outline" size="sm">
              Events
            </Button>
            <Button variant="outline" size="sm">
              Plays
            </Button>
            <Button variant="outline" size="sm">
              Sports
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
