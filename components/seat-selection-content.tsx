"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface SeatSelectionContentProps {
  theaterId: string
  showtimeId: string
}

interface Seat {
  id: string
  row: string
  number: number
  status: "available" | "occupied" | "selected"
  type: "standard" | "premium" | "recliners"
  price: number
}

export default function SeatSelectionContent({ theaterId, showtimeId }: SeatSelectionContentProps) {
  const [seats, setSeats] = useState<Seat[]>(generateSeats())
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  function generateSeats(): Seat[] {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    const seatsPerRow = 14
    const allSeats: Seat[] = []

    rows.forEach((row, rowIndex) => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}${i}`
        let type: "standard" | "premium" | "recliners" = "standard"
        let price = 250

        // Premium seats in middle columns
        if (i >= 6 && i <= 9) {
          type = "premium"
          price = 350
        }

        // Recliners at the back
        if (rowIndex >= 7) {
          type = "recliners"
          price = 450
        }

        // Random occupied seats
        const isOccupied = Math.random() < 0.25

        allSeats.push({
          id: seatId,
          row,
          number: i,
          status: isOccupied ? "occupied" : "available",
          type,
          price,
        })
      }
    })

    return allSeats
  }

  const toggleSeat = (seatId: string) => {
    const seat = seats.find((s) => s.id === seatId)
    if (!seat || seat.status === "occupied") return

    setSelectedSeats((prev) => (prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]))
  }

  const selectedSeatObjects = useMemo(() => seats.filter((s) => selectedSeats.includes(s.id)), [seats, selectedSeats])

  const totalPrice = selectedSeatObjects.reduce((sum, seat) => sum + seat.price, 0)

  const groupedSeats = useMemo(() => {
    const groups: { [key: string]: Seat[] } = {}
    seats.forEach((seat) => {
      if (!groups[seat.row]) groups[seat.row] = []
      groups[seat.row].push(seat)
    })
    return groups
  }, [seats])

  return (
    <section className="py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <Link href="/movies" className="text-primary hover:text-primary/80 mb-6 inline-flex items-center gap-1">
          ← Back to Movies
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Seat Layout */}
          <div className="lg:col-span-2">
            <Card className="bg-card p-8">
              <div className="space-y-8">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">Select Your Seats</h1>
                  <p className="text-sm text-muted-foreground">
                    Theatre: PVR Cinemas - The Nexus Mall | Showtime: 02:45 PM (3D)
                  </p>
                </div>

                {/* Screen */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full h-12 bg-gradient-to-b from-primary/30 to-primary/10 rounded-b-2xl flex items-center justify-center">
                    <span className="text-sm font-semibold text-foreground">SCREEN</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border-2 border-muted bg-transparent"></div>
                    <span className="text-muted-foreground">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-primary"></div>
                    <span className="text-muted-foreground">Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-muted"></div>
                    <span className="text-muted-foreground">Occupied</span>
                  </div>
                </div>

                {/* Seat Grid */}
                <div className="space-y-4 overflow-x-auto">
                  {Object.entries(groupedSeats).map(([row, rowSeats]) => (
                    <div key={row} className="flex items-center justify-center gap-2">
                      <span className="w-6 text-center font-semibold text-muted-foreground text-sm">{row}</span>
                      <div className="flex gap-2">
                        {rowSeats.map((seat) => {
                          const isSelected = selectedSeats.includes(seat.id)
                          const isOccupied = seat.status === "occupied"

                          return (
                            <button
                              key={seat.id}
                              onClick={() => toggleSeat(seat.id)}
                              disabled={isOccupied}
                              className={`w-6 h-6 rounded transition-all ${
                                isOccupied
                                  ? "bg-muted cursor-not-allowed"
                                  : isSelected
                                    ? "bg-primary border-2 border-primary"
                                    : "border-2 border-muted hover:border-primary"
                              }`}
                              title={`${seat.id} - ${seat.type} - ₹${seat.price}`}
                            />
                          )
                        })}
                      </div>
                      <span className="w-6 text-center font-semibold text-muted-foreground text-sm">{row}</span>
                    </div>
                  ))}
                </div>

                {/* Price Legend */}
                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground font-semibold mb-3">SEAT CATEGORIES</p>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="text-muted-foreground">Standard</p>
                      <p className="font-semibold text-foreground">₹250</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Premium</p>
                      <p className="font-semibold text-foreground">₹350</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Recliners</p>
                      <p className="font-semibold text-foreground">₹450</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="bg-card p-6 sticky top-20 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Booking Summary</h2>
              </div>

              {/* Selected Seats List */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedSeatObjects.length > 0 ? (
                  selectedSeatObjects.map((seat) => (
                    <div key={seat.id} className="flex items-center justify-between p-2 bg-secondary rounded text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{seat.id}</span>
                        <span className="text-muted-foreground">({seat.type})</span>
                      </div>
                      <span className="font-semibold text-foreground">₹{seat.price}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No seats selected</p>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Pricing Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Ticket Amount</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Convenience Fee</span>
                  <span>₹{selectedSeatObjects.length > 0 ? 50 : 0}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>GST</span>
                  <span>₹{Math.round((totalPrice + (selectedSeatObjects.length > 0 ? 50 : 0)) * 0.18)}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">
                  ₹
                  {totalPrice +
                    (selectedSeatObjects.length > 0 ? 50 : 0) +
                    Math.round((totalPrice + (selectedSeatObjects.length > 0 ? 50 : 0)) * 0.18)}
                </span>
              </div>

              {/* Proceed Button */}
              <Link
                href={
                  selectedSeatObjects.length > 0
                    ? `/booking-summary?theater=${theaterId}&showtime=${showtimeId}`
                    : "#"
                }
                className="w-full"
              >
                <Button
                  disabled={selectedSeatObjects.length === 0}
                  className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50"
                >
                  {selectedSeatObjects.length > 0
                    ? `Continue - ${selectedSeatObjects.length} Seat${selectedSeatObjects.length !== 1 ? "s" : ""}`
                    : "Select Seats"}
                </Button>
              </Link>

              {/* Additional Info */}
              <p className="text-xs text-muted-foreground text-center">
                Booking confirmation will be sent to your email
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
