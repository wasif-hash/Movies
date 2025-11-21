"use client"

import { RefObject } from "react"
import { Card } from "@/components/ui/card"

interface CategoryGridProps {
  sectionId?: string
  sectionRef?: RefObject<HTMLElement>
}

export default function CategoryGrid({ sectionId, sectionRef }: CategoryGridProps) {
  const categories = [
    { id: 1, name: "Action", count: 240, image: "/action-genre-movies.jpg" },
    { id: 2, name: "Comedy", count: 180, image: "/comedy-genre-movies.jpg" },
    { id: 3, name: "Drama", count: 320, image: "/drama-genre-movies.jpg" },
    { id: 4, name: "Horror", count: 150, image: "/horror-genre-movies.jpg" },
    { id: 5, name: "Romance", count: 200, image: "/romance-genre-movies.jpg" },
    { id: 6, name: "Sci-Fi", count: 280, image: "/sci-fi-genre-movies.jpg" },
  ]

  return (
    <section ref={sectionRef} id={sectionId} className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">Browse by Category</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group cursor-pointer overflow-hidden bg-card transition-all duration-300 hover:bg-card/80"
            >
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 transition-all duration-300 group-hover:bg-black/60">
                  <p className="text-lg font-bold text-foreground text-center">{category.name}</p>
                  <p className="text-sm text-muted-foreground">{category.count} movies</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
