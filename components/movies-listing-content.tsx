"use client"

import { useState, useMemo } from "react"
import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import MovieFilterSidebar from "@/components/movie-filter-sidebar"

interface MoviesListingContentProps {
  selectedCity: string
}

interface Movie {
  id: number
  title: string
  genre: string[]
  rating: number
  language: string
  duration: number
  releaseDate: string
  image: string
  status: "now-showing" | "upcoming"
}

export default function MoviesListingContent({ selectedCity }: MoviesListingContentProps) {
  const [sortBy, setSortBy] = useState("trending")
  const [filters, setFilters] = useState({
    genres: [] as string[],
    language: [] as string[],
    rating: 0,
    status: "all" as "all" | "now-showing" | "upcoming",
  })

  // Mock movie data
  const allMovies: Movie[] = [
    {
      id: 1,
      title: "The Epic Adventure",
      genre: ["Action", "Adventure"],
      rating: 8.5,
      language: "English",
      duration: 148,
      releaseDate: "2024-11-15",
      image: "/public/action-movie-poster.jpg",
      status: "now-showing",
    },
    {
      id: 2,
      title: "Heartfelt Moments",
      genre: ["Drama", "Romance"],
      rating: 8.2,
      language: "Hindi",
      duration: 132,
      releaseDate: "2024-11-10",
      image: "/public/drama-movie-poster.jpg",
      status: "now-showing",
    },
    {
      id: 3,
      title: "Laugh Out Loud",
      genre: ["Comedy"],
      rating: 7.9,
      language: "English",
      duration: 120,
      releaseDate: "2024-11-12",
      image: "/public/comedy-movie-poster.jpg",
      status: "now-showing",
    },
    {
      id: 4,
      title: "Dark Mystery",
      genre: ["Thriller", "Mystery"],
      rating: 8.7,
      language: "Hindi",
      duration: 155,
      releaseDate: "2024-11-08",
      image: "/public/thriller-movie-poster.jpg",
      status: "now-showing",
    },
    {
      id: 5,
      title: "Space Odyssey",
      genre: ["Sci-Fi", "Action"],
      rating: 8.4,
      language: "English",
      duration: 165,
      releaseDate: "2024-12-01",
      image: "/public/sci-fi-movie-poster.jpg",
      status: "upcoming",
    },
    {
      id: 6,
      title: "Love in the City",
      genre: ["Romance", "Drama"],
      rating: 7.5,
      language: "Tamil",
      duration: 140,
      releaseDate: "2024-11-20",
      image: "/public/romance-movie-poster.jpg",
      status: "now-showing",
    },
    {
      id: 7,
      title: "Action Packed",
      genre: ["Action"],
      rating: 8.0,
      language: "Hindi",
      duration: 150,
      releaseDate: "2024-11-18",
      image: "/public/action-movie-poster.jpg",
      status: "now-showing",
    },
    {
      id: 8,
      title: "Future Awaits",
      genre: ["Sci-Fi"],
      rating: 8.3,
      language: "English",
      duration: 170,
      releaseDate: "2024-12-05",
      image: "/public/sci-fi-movie-poster.jpg",
      status: "upcoming",
    },
    {
      id: 9,
      title: "Midnight Horror",
      genre: ["Horror", "Thriller"],
      rating: 7.8,
      language: "Hindi",
      duration: 125,
      releaseDate: "2024-11-22",
      image: "/public/thriller-movie-poster.jpg",
      status: "upcoming",
    },
    {
      id: 10,
      title: "Comedy Nights",
      genre: ["Comedy"],
      rating: 7.6,
      language: "Tamil",
      duration: 118,
      releaseDate: "2024-11-14",
      image: "/public/comedy-movie-poster.jpg",
      status: "now-showing",
    },
    {
      id: 11,
      title: "Classic Drama",
      genre: ["Drama"],
      rating: 8.1,
      language: "English",
      duration: 135,
      releaseDate: "2024-11-25",
      image: "/public/drama-movie-poster.jpg",
      status: "upcoming",
    },
    {
      id: 12,
      title: "Action Heroes",
      genre: ["Action", "Adventure"],
      rating: 8.6,
      language: "Hindi",
      duration: 160,
      releaseDate: "2024-11-19",
      image: "/public/action-movie-poster.jpg",
      status: "now-showing",
    },
  ]

  // Filter movies
  const filteredMovies = useMemo(() => {
    let result = allMovies

    // Status filter
    if (filters.status !== "all") {
      result = result.filter((m) => m.status === filters.status)
    }

    // Genre filter
    if (filters.genres.length > 0) {
      result = result.filter((m) => m.genre.some((g) => filters.genres.includes(g)))
    }

    // Language filter
    if (filters.language.length > 0) {
      result = result.filter((m) => filters.language.includes(m.language))
    }

    // Rating filter
    if (filters.rating > 0) {
      result = result.filter((m) => m.rating >= filters.rating)
    }

    // Sort
    if (sortBy === "trending") {
      result.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "release-date") {
      result.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    } else if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title))
    }

    return result
  }, [filters, sortBy])

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl text-balance">Movies in {selectedCity}</h1>
          <p className="mt-2 text-muted-foreground">{filteredMovies.length} movies found</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar Filters */}
          <MovieFilterSidebar filters={filters} setFilters={setFilters} />

          {/* Movies Grid */}
          <div className="lg:col-span-3">
            {/* Sort Controls */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded bg-card border border-border px-3 py-2 text-sm text-foreground outline-none"
                >
                  <option value="trending">Trending</option>
                  <option value="release-date">Release Date</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>

            {/* Movies Grid */}
            {filteredMovies.length > 0 ? (
              <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                {filteredMovies.map((movie) => (
                  <Card
                    key={movie.id}
                    className="group cursor-pointer overflow-hidden bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <a href={`/movies/${movie.id}`} className="block">
                      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                        <img
                          src={movie.image || "/placeholder.svg"}
                          alt={movie.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4">
                          <div className="space-y-2 w-full">
                            <p className="text-sm font-semibold text-foreground line-clamp-2">{movie.title}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-primary text-primary" />
                                <span className="text-xs font-bold text-primary">{movie.rating}</span>
                              </div>
                              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                                {movie.status === "now-showing" ? "Now Showing" : "Coming Soon"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-lg text-muted-foreground">No movies found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
