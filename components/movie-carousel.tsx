"use client"

import Link from "next/link"
import { RefObject, useMemo, useRef } from "react"
import { ChevronLeft, ChevronRight, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MOVIES, MovieItem, MovieType } from "@/lib/media"

interface MovieCarouselProps {
  title: string
  variant?: MovieType
  sectionId?: string
  sectionRef?: RefObject<HTMLElement>
}

export default function MovieCarousel({ title, variant = "trending", sectionId, sectionRef }: MovieCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const movies = useMemo<MovieItem[]>(() => MOVIES.filter((movie) => movie.type === variant), [variant])

  const scrollCarousel = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return
    const firstCard = container.firstElementChild as HTMLElement | null
    const cardWidth = firstCard?.offsetWidth ?? 320
    const gap = 24
    container.scrollBy({
      left: direction === "left" ? -(cardWidth + gap) : cardWidth + gap,
      behavior: "smooth",
    })
  }

  return (
    <section ref={sectionRef} id={sectionId} className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">{title}</h2>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" onClick={() => scrollCarousel("left")} aria-label="Scroll left">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={() => scrollCarousel("right")} aria-label="Scroll right">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scroll-smooth no-scroll"
        >
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movies/${movie.id}`}
              className="group relative flex h-[520px] w-[88vw] min-w-[260px] shrink-0 snap-start flex-col text-left sm:w-[260px] md:w-[260px] lg:w-[300px]"
              aria-label={`View details for ${movie.title}`}
            >
              <Card className="relative flex h-full w-full flex-col overflow-hidden rounded-4xl bg-white text-left shadow-lg ring-1 ring-border/40 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl dark:bg-card">
                <div className="relative h-[70%] w-full overflow-hidden">
                  <img
                    src={movie.image || "/placeholder.svg"}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-start justify-start bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4">
                    <div className="w-max rounded-full bg-[#8D63FF]/30 p-1">
                      <div className="flex items-center gap-2 rounded-full bg-[#8D63FF] px-3 py-1 text-xs font-semibold text-white shadow">
                        <Tag className="h-4 w-4" />
                        <span className="truncate max-w-40 sm:max-w-[200px]">{movie.offer}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex h-[30%] flex-col justify-between bg-white px-5 dark:bg-card">
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#7d6c00]">{movie.timeframe}</p>
                    <div className="space-y-1">
                      <p className="text-lg font-semibold leading-snug text-foreground line-clamp-2">{movie.title}</p>
                      <p className="text-sm text-muted-foreground">{movie.subtitle}</p>
                      <p className="text-base font-semibold text-foreground">{movie.pricing}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
