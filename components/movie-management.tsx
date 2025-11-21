"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Search } from "lucide-react"

interface Movie {
  id: number
  title: string
  genre: string
  rating: number
  duration: number
  status: "active" | "inactive"
}

export default function MovieManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [movies, setMovies] = useState<Movie[]>([
    { id: 1, title: "The Epic Adventure", genre: "Action", rating: 8.5, duration: 148, status: "active" },
    { id: 2, title: "Space Odyssey", genre: "Sci-Fi", rating: 8.4, duration: 165, status: "active" },
    { id: 3, title: "Love in the City", genre: "Romance", rating: 7.5, duration: 140, status: "inactive" },
  ])

  const filteredMovies = movies.filter(
    (m) =>
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.genre.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <section className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Movies</h1>
          <p className="text-muted-foreground">Manage your movie catalog</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="h-4 w-4" />
          Add Movie
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search movies by title or genre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Movies Table */}
      <Card className="bg-card p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Title</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Genre</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Rating</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Duration</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.map((movie) => (
                <tr key={movie.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-3 px-4 text-foreground font-semibold">{movie.title}</td>
                  <td className="py-3 px-4 text-foreground">{movie.genre}</td>
                  <td className="py-3 px-4 text-foreground">{movie.rating}</td>
                  <td className="py-3 px-4 text-foreground">{movie.duration} min</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        movie.status === "active" ? "bg-green-500/20 text-green-500" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {movie.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:text-destructive bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  )
}
