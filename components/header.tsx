"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NavItem {
  id: string
  label: string
  href: string
}

interface HeaderProps {
  selectedCity?: string
  setSelectedCity?: (city: string) => void
  defaultCity?: string
  navItems: NavItem[]
}

export default function Header({ selectedCity, setSelectedCity, defaultCity = "Mumbai", navItems }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [internalCity, setInternalCity] = useState(defaultCity)
  const cities = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad"]
  const pathname = usePathname()

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const cityValue = selectedCity ?? internalCity
  const updateCity = setSelectedCity ?? setInternalCity

  const getIsActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-4">
          {/* Left: Logo + City */}
          <div className="flex flex-1 items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground text-lg font-bold">
                B
              </div>
              <span className="text-xl font-bold text-foreground">BookShow</span>
            </div>

            {/* City selector (desktop) */}
            <div className="hidden items-center gap-2 md:flex">
              <span className="text-sm text-muted-foreground">City:</span>
              <select
                value={cityValue}
                onChange={(e) => updateCity(e.target.value)}
                className="rounded-full bg-secondary px-3 py-1 text-sm text-foreground outline-none"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Center: Nav (desktop) */}
          <nav className="hidden items-center gap-4 md:flex">
            {navItems.map((item) => {
              const isActive = getIsActive(item.href)
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "rounded-full bg-primary/10 px-4 py-1 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right: Search + Sign in (desktop) */}
          <div className="flex flex-1 items-center justify-end gap-3">
            <form onSubmit={handleSearch} className="hidden w-full max-w-sm items-center gap-2 md:flex">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search movies, events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 text-sm"
                />
              </div>
              <Button type="submit" size="sm">
                Search
              </Button>
            </form>

            <Link href={'/profile'}>
            <Button variant="outline" size="sm" className="hidden md:inline-flex">
              Sign In
            </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {/* Nav items */}
              <div className="flex items-center justify-between gap-2">
                {navItems.map((item) => {
                  const isActive = getIsActive(item.href)
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex-1 text-center text-sm font-medium transition-colors ${
                        isActive
                          ? "rounded-full bg-primary/10 px-3 py-2 text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>

              {/* City */}
              <select
                value={cityValue}
                onChange={(e) => updateCity(e.target.value)}
                className="rounded bg-secondary px-3 py-2 text-foreground outline-none"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              {/* Search */}
              <form onSubmit={handleSearch} className="flex flex-col gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search movies, events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Search
                </Button>
              </form>

              {/* Sign in */}
              <Link href={'/profile'}>
              <Button variant="outline" className="w-full bg-transparent">
                Sign In
              </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
