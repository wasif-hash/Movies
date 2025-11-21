export type MovieType = "trending" | "upcoming"

export interface MovieItem {
  id: number
  title: string
  subtitle: string
  pricing: string
  timeframe: string
  offer: string
  image: string
  type: MovieType
}

export const MOVIES: MovieItem[] = [
  {
    id: 1,
    title: "The Game Palacio | Delhi Ansal Plaza",
    subtitle: "The Game Palacio, Delhi/NCR",
    pricing: "₹650 onwards",
    timeframe: "Thu, 20 Nov – Sun, 30 Nov, Multiple slots",
    offer: "50% off up to ₹300",
    image: "/placeholder.svg?height=600&width=400&text=The+Game+Palacio",
    type: "trending",
  },
  {
    id: 2,
    title: "Immersive Arcade Night | Phoenix Mall",
    subtitle: "Phoenix Marketcity, Mumbai",
    pricing: "₹499 onwards",
    timeframe: "Fri, 22 Nov – Sat, 23 Nov, Evening slots",
    offer: "Buy 1 Get 1",
    image: "/placeholder.svg?height=600&width=400&text=Arcade+Night",
    type: "trending",
  },
  {
    id: 3,
    title: "Retro Gaming Carnival",
    subtitle: "VR Park, Bangalore",
    pricing: "₹799 onwards",
    timeframe: "Sat, 30 Nov – Sun, 1 Dec, All day",
    offer: "Early bird offer",
    image: "/placeholder.svg?height=600&width=400&text=Retro+Carnival",
    type: "trending",
  },
  {
    id: 4,
    title: "Neon Bowling Nights",
    subtitle: "FunCity, Hyderabad",
    pricing: "₹399 onwards",
    timeframe: "Daily, 7 PM onwards",
    offer: "20% off on group booking",
    image: "/placeholder.svg?height=600&width=400&text=Neon+Bowling",
    type: "upcoming",
  },
  {
    id: 5,
    title: "VR Racing League",
    subtitle: "SpeedZone, Pune",
    pricing: "₹699 onwards",
    timeframe: "Weekends, 3 PM – 9 PM",
    offer: "Free first lap",
    image: "/placeholder.svg?height=600&width=400&text=VR+Racing",
    type: "upcoming",
  },
  {
    id: 6,
    title: "Family Game Fest",
    subtitle: "Fun Galaxy, Delhi/NCR",
    pricing: "₹299 onwards",
    timeframe: "All weekends in December",
    offer: "Kids enter free",
    image: "/placeholder.svg?height=600&width=400&text=Family+Fest",
    type: "upcoming",
  },
]

export interface EventItem {
  id: number
  title: string
  location: string
  dateRange: string
  price: string
  image: string
}

export const EVENTS: EventItem[] = [
  {
    id: 101,
    title: "Indie Music Night",
    location: "Antisocial, Mumbai",
    dateRange: "Fri, 22 Nov",
    price: "₹999 onwards",
    image: "/placeholder.svg?height=600&width=400&text=Indie+Music+Night",
  },
  {
    id: 102,
    title: "Stand-Up Comedy Gala",
    location: "Habitat, Delhi",
    dateRange: "Sat, 23 Nov",
    price: "₹750 onwards",
    image: "/placeholder.svg?height=600&width=400&text=Comedy+Gala",
  },
  {
    id: 103,
    title: "Zen Yoga Retreat",
    location: "Cubbon Park, Bangalore",
    dateRange: "Sun, 24 Nov",
    price: "₹550 onwards",
    image: "/placeholder.svg?height=600&width=400&text=Yoga+Retreat",
  },
  {
    id: 104,
    title: "Art & Craft Fair",
    location: "Khan Market, Delhi",
    dateRange: "Sat, 30 Nov – Sun, 1 Dec",
    price: "Free entry",
    image: "/placeholder.svg?height=600&width=400&text=Art+Fair",
  },
]
