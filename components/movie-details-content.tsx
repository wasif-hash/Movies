"use client"

import { useState } from "react"
import { Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface MovieDetailsContentProps {
  movieId: string
  selectedCity: string
}

interface Showtime {
  id: string
  time: string
  format: string
  language: string
  pricePerTicket: number
  availableSeats: number
  totalSeats: number
}

interface Theater {
  id: string
  name: string
  address: string
  distance: number
  showtimes: Showtime[]
}

export default function MovieDetailsContent({ movieId, selectedCity }: MovieDetailsContentProps) {
  const [selectedShowtime, setSelectedShowtime] = useState<{
    theaterId: string
    showtimeId: string
  } | null>(null)
  const [selectedFormat, setSelectedFormat] = useState("all")

  // Mock movie data
  const movie = {
    id: movieId,
    title: "The Epic Adventure",
    rating: 8.5,
    votes: 15420,
    genre: ["Action", "Adventure", "Sci-Fi"],
    duration: 148,
    releaseDate: "2024-11-15",
    language: "English",
    certification: "PG-13",
    director: "Christopher Nolan",
    cast: ["Tom Cruise", "Scarlett Johansson", "Robert Downey Jr."],
    synopsis:
      "An epic tale of adventure and discovery as a group of heroes embark on a journey to save the world from an ancient evil. With breathtaking cinematography and stunning visual effects, this film will keep you on the edge of your seat.",
    image: "/public/action-movie-poster.jpg",
  }

  // Mock theaters and showtimes
  const theaters: Theater[] = [
    {
      id: "theater-1",
      name: "PVR Cinemas - The Nexus Mall",
      address: "Nexus Mall, Sector 12, Mumbai",
      distance: 2.5,
      showtimes: [
        {
          id: "show-1",
          time: "10:30 AM",
          format: "2D",
          language: "English",
          pricePerTicket: 200,
          availableSeats: 45,
          totalSeats: 100,
        },
        {
          id: "show-2",
          time: "02:45 PM",
          format: "3D",
          language: "English",
          pricePerTicket: 300,
          availableSeats: 12,
          totalSeats: 100,
        },
        {
          id: "show-3",
          time: "06:30 PM",
          format: "2D",
          language: "English",
          pricePerTicket: 250,
          availableSeats: 8,
          totalSeats: 100,
        },
        {
          id: "show-4",
          time: "09:45 PM",
          format: "3D",
          language: "English",
          pricePerTicket: 300,
          availableSeats: 52,
          totalSeats: 100,
        },
      ],
    },
    {
      id: "theater-2",
      name: "IMAX Cinema - Central Plaza",
      address: "Central Plaza, Fort, Mumbai",
      distance: 3.2,
      showtimes: [
        {
          id: "show-5",
          time: "11:00 AM",
          format: "IMAX",
          language: "English",
          pricePerTicket: 400,
          availableSeats: 28,
          totalSeats: 80,
        },
        {
          id: "show-6",
          time: "03:15 PM",
          format: "IMAX",
          language: "English",
          pricePerTicket: 400,
          availableSeats: 5,
          totalSeats: 80,
        },
        {
          id: "show-7",
          time: "07:00 PM",
          format: "IMAX",
          language: "English",
          pricePerTicket: 450,
          availableSeats: 15,
          totalSeats: 80,
        },
      ],
    },
    {
      id: "theater-3",
      name: "Cinepolis - Phoenix Mall",
      address: "Phoenix Market City, Mumbai",
      distance: 4.1,
      showtimes: [
        {
          id: "show-8",
          time: "10:15 AM",
          format: "2D",
          language: "English",
          pricePerTicket: 180,
          availableSeats: 67,
          totalSeats: 120,
        },
        {
          id: "show-9",
          time: "01:30 PM",
          format: "3D",
          language: "English",
          pricePerTicket: 280,
          availableSeats: 34,
          totalSeats: 120,
        },
        {
          id: "show-10",
          time: "04:45 PM",
          format: "2D",
          language: "English",
          pricePerTicket: 220,
          availableSeats: 89,
          totalSeats: 120,
        },
        {
          id: "show-11",
          time: "08:00 PM",
          format: "3D",
          language: "English",
          pricePerTicket: 320,
          availableSeats: 2,
          totalSeats: 120,
        },
      ],
    },
  ]

  // Filter showtimes by format
  const getFilteredTheaters = () => {
    if (selectedFormat === "all") return theaters

    return theaters
      .map((theater) => ({
        ...theater,
        showtimes: theater.showtimes.filter((st) => st.format === selectedFormat),
      }))
      .filter((theater) => theater.showtimes.length > 0)
  }

  const filteredTheaters = getFilteredTheaters()

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <Link href="/movies" className="text-primary hover:text-primary/80 mb-6 inline-flex items-center gap-1">
          ← Back to Movies
        </Link>

        {/* Movie Header */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Poster */}
          <div className="md:col-span-1">
            <Card className="overflow-hidden bg-card">
              <div className="relative aspect-3/4">
                <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="h-full w-full object-cover" />
              </div>
            </Card>
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-2">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="text-lg font-bold text-foreground">{movie.rating}</span>
                  <span className="text-sm text-muted-foreground">({movie.votes.toLocaleString()} votes)</span>
                </div>
                <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded">{movie.certification}</span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">GENRE</p>
                <p className="text-sm font-semibold text-foreground">{movie.genre.join(", ")}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">DURATION</p>
                <p className="text-sm font-semibold text-foreground flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {movie.duration} min
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">LANGUAGE</p>
                <p className="text-sm font-semibold text-foreground">{movie.language}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">RELEASE DATE</p>
                <p className="text-sm font-semibold text-foreground">
                  {new Date(movie.releaseDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Director & Cast */}
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">DIRECTOR</p>
                <p className="text-sm text-foreground">{movie.director}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">CAST</p>
                <p className="text-sm text-foreground">{movie.cast.join(", ")}</p>
              </div>
            </div>

            {/* Synopsis */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">SYNOPSIS</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{movie.synopsis}</p>
            </div>
          </div>
        </div>

        {/* Showtimes Section */}
        <div className="mt-12 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Select Format & Showtime</h2>

            {/* Format Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["all", "2D", "3D", "IMAX"].map((format) => (
                <Button
                  key={format}
                  variant={selectedFormat === format ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFormat(format)}
                >
                  {format === "all" ? "All Formats" : format}
                </Button>
              ))}
            </div>
          </div>

          {/* Theaters */}
          <div className="space-y-6">
            {filteredTheaters.map((theater) => (
              <Card key={theater.id} className="bg-card p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-foreground">{theater.name}</h3>
                  <p className="text-sm text-muted-foreground">{theater.address}</p>
                  <p className="text-xs text-muted-foreground">{theater.distance} km away</p>
                </div>

                {/* Showtimes Grid */}
                <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
                  {theater.showtimes.map((showtime) => {
                    const isSelected =
                      selectedShowtime?.theaterId === theater.id && selectedShowtime?.showtimeId === showtime.id
                    const isSoldOut = showtime.availableSeats === 0
                    const isLowSeats = showtime.availableSeats < 10

                    return (
                      <Link key={showtime.id} href={`/seat-selection/${theater.id}/${showtime.id}`}>
                        <button
                          disabled={isSoldOut}
                          onClick={() =>
                            setSelectedShowtime({
                              theaterId: theater.id,
                              showtimeId: showtime.id,
                            })
                          }
                          className={`w-full p-3 rounded border transition-all text-center ${
                            isSelected
                              ? "border-primary bg-primary/10"
                              : "border-border bg-secondary hover:border-primary"
                          } ${isSoldOut ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          <p className="font-bold text-foreground text-sm">{showtime.time}</p>
                          <p className="text-xs text-muted-foreground mt-1">{showtime.format}</p>
                          <p className="text-xs text-muted-foreground">{showtime.language}</p>
                          <p
                            className={`text-xs mt-2 font-semibold ${
                              isSoldOut ? "text-destructive" : isLowSeats ? "text-primary" : "text-muted-foreground"
                            }`}
                          >
                            {isSoldOut
                              ? "Sold Out"
                              : isLowSeats
                                ? `${showtime.availableSeats} seats left`
                                : `₹${showtime.pricePerTicket}`}
                          </p>
                        </button>
                      </Link>
                    )
                  })}
                </div>
              </Card>
            ))}
          </div>

          {filteredTheaters.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No showtimes available for selected format</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
