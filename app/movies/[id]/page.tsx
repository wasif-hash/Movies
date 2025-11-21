import { notFound } from "next/navigation"
import Header from "@/components/header"
import MovieDetailsContent from "@/components/movie-details-content"
import { MOVIES } from "@/lib/media"

const navItems = [
  { id: "featured", label: "Featured", href: "/" },
  { id: "movies", label: "Movies", href: "/movies" },
  { id: "events", label: "Events", href: "/events" },
]

interface MovieDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const resolvedParams = await params
  const exists = MOVIES.some((item) => item.id === Number(resolvedParams.id))
  if (!exists) return notFound()

  return (
    <main className="min-h-screen bg-background">
      <Header navItems={navItems} />
      <MovieDetailsContent movieId={resolvedParams.id} selectedCity="Mumbai" />
    </main>
  )
}
