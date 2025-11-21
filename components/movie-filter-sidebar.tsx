"use client"

interface Filters {
  genres: string[]
  language: string[]
  rating: number
  status: "all" | "now-showing" | "upcoming"
}

interface MovieFilterSidebarProps {
  filters: Filters
  setFilters: (filters: Filters) => void
}

const genres = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller"]
const languages = ["English", "Hindi", "Tamil", "Telugu", "Marathi"]
const ratings = [
  { label: "All Ratings", value: 0 },
  { label: "8.0 & above", value: 8.0 },
  { label: "7.5 & above", value: 7.5 },
  { label: "7.0 & above", value: 7.0 },
]

export default function MovieFilterSidebar({ filters, setFilters }: MovieFilterSidebarProps) {
  const handleGenreChange = (genre: string) => {
    setFilters({
      ...filters,
      genres: filters.genres.includes(genre) ? filters.genres.filter((g) => g !== genre) : [...filters.genres, genre],
    })
  }

  const handleLanguageChange = (language: string) => {
    setFilters({
      ...filters,
      language: filters.language.includes(language)
        ? filters.language.filter((l) => l !== language)
        : [...filters.language, language],
    })
  }

  const handleRatingChange = (rating: number) => {
    setFilters({ ...filters, rating })
  }

  const handleStatusChange = (status: "all" | "now-showing" | "upcoming") => {
    setFilters({ ...filters, status })
  }

  const handleClearFilters = () => {
    setFilters({
      genres: [],
      language: [],
      rating: 0,
      status: "all",
    })
  }

  return (
    <aside className="hidden lg:block">
      <div className="space-y-6 bg-card rounded-lg p-6 sticky top-20">
        {/* Clear Filters */}
        <button
          onClick={handleClearFilters}
          className="w-full text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Clear Filters
        </button>

        {/* Status Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Status</h3>
          <div className="space-y-2">
            {[
              { label: "All", value: "all" },
              { label: "Now Showing", value: "now-showing" },
              { label: "Upcoming", value: "upcoming" },
            ].map(({ label, value }) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value={value}
                  checked={filters.status === value}
                  onChange={(e) => handleStatusChange(e.target.value as "all" | "now-showing" | "upcoming")}
                  className="h-4 w-4"
                />
                <span className="text-sm text-muted-foreground">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Genre Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Genre</h3>
          <div className="space-y-2">
            {genres.map((genre) => (
              <label key={genre} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.genres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                  className="h-4 w-4"
                />
                <span className="text-sm text-muted-foreground">{genre}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Language Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Language</h3>
          <div className="space-y-2">
            {languages.map((language) => (
              <label key={language} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.language.includes(language)}
                  onChange={() => handleLanguageChange(language)}
                  className="h-4 w-4"
                />
                <span className="text-sm text-muted-foreground">{language}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Rating</h3>
          <div className="space-y-2">
            {ratings.map(({ label, value }) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === value}
                  onChange={() => handleRatingChange(value)}
                  className="h-4 w-4"
                />
                <span className="text-sm text-muted-foreground">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
