"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"

type BookingSummaryContentProps = {}

export default function BookingSummaryContent({}: BookingSummaryContentProps) {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [bookingId, setBookingId] = useState("")
  const searchParams = useSearchParams()
  const theaterId = searchParams.get("theater") || "theater-1"
  const showtimeId = searchParams.get("showtime") || "show-1"

  // Mock booking data
  const bookingData = {
    movieTitle: "The Epic Adventure",
    theater: "PVR Cinemas - The Nexus Mall",
    showtime: "02:45 PM",
    showDate: "2024-11-20",
    seats: ["E6", "E7", "E8"],
    seatTypes: ["Premium", "Premium", "Premium"],
    movieFormat: "3D",
    language: "English",
  }

  const ticketAmount = 1050 // 3 × 350
  const convenienceFee = 50
  const gst = Math.round((ticketAmount + convenienceFee) * 0.18)
  const totalAmount = ticketAmount + convenienceFee + gst

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setBookingId(`BS${Date.now().toString().slice(-8)}`)
    setBookingConfirmed(true)
  }

  if (bookingConfirmed) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-card p-8 text-center space-y-6">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* Confirmation Message */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Booking Confirmed!</h1>
              <p className="text-muted-foreground">Your tickets have been successfully booked</p>
            </div>

            {/* Booking ID */}
            <div className="bg-secondary rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Booking ID</p>
              <p className="text-2xl font-bold text-foreground font-mono">{bookingId}</p>
            </div>

            {/* Booking Details */}
            <div className="text-left space-y-4 bg-secondary/50 rounded-lg p-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Movie</p>
                <p className="font-semibold text-foreground">{bookingData.movieTitle}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Date</p>
                  <p className="font-semibold text-foreground">{bookingData.showDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Showtime</p>
                  <p className="font-semibold text-foreground">{bookingData.showtime}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Theater</p>
                <p className="font-semibold text-foreground">{bookingData.theater}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Seats</p>
                <p className="font-semibold text-foreground">{bookingData.seats.join(", ")}</p>
              </div>
            </div>

            {/* Price Summary */}
            <div className="space-y-2 text-sm border-t border-border pt-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Ticket Amount ({bookingData.seats.length} tickets)</span>
                <span>₹{ticketAmount}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Convenience Fee</span>
                <span>₹{convenienceFee}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>GST (18%)</span>
                <span>₹{gst}</span>
              </div>
              <div className="flex justify-between font-bold text-foreground pt-2 border-t border-border">
                <span>Total Paid</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            {/* Confirmation Note */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-left">
              <p className="text-sm text-foreground">
                A confirmation email has been sent to <span className="font-semibold">your-email@example.com</span>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Please download your tickets from the email and keep the Booking ID handy for the theater.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              <Button className="bg-primary hover:bg-primary/90 w-full">Download Tickets</Button>
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full bg-transparent">
                  Back to Home
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <Link
          href={`/seat-selection/${theaterId}/${showtimeId}`}
          className="text-primary hover:text-primary/80 mb-6 inline-flex items-center gap-1"
        >
          ← Back to Seat Selection
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Movie & Showtime */}
            <Card className="bg-card p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Booking Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Movie</p>
                  <p className="font-semibold text-foreground text-lg">{bookingData.movieTitle}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date</p>
                    <p className="font-semibold text-foreground">{bookingData.showDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Time</p>
                    <p className="font-semibold text-foreground">{bookingData.showtime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Format</p>
                    <p className="font-semibold text-foreground">{bookingData.movieFormat}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Language</p>
                    <p className="font-semibold text-foreground">{bookingData.language}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Theater</p>
                  <p className="font-semibold text-foreground">{bookingData.theater}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Selected Seats</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {bookingData.seats.map((seat, idx) => (
                      <span key={seat} className="bg-primary/20 text-primary px-3 py-1 rounded font-semibold text-sm">
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="bg-card p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Select Payment Method</h2>

              <div className="space-y-3">
                {/* Credit/Debit Card */}
                <label className="flex items-start gap-4 p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="credit-card"
                    checked={paymentMethod === "credit-card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 h-4 w-4"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Credit/Debit Card</p>
                    <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                  </div>
                </label>

                {/* Wallet */}
                <label className="flex items-start gap-4 p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="wallet"
                    checked={paymentMethod === "wallet"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 h-4 w-4"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Digital Wallet</p>
                    <p className="text-sm text-muted-foreground">Google Pay, Apple Pay, PhonePe</p>
                  </div>
                </label>

                {/* UPI */}
                <label className="flex items-start gap-4 p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 h-4 w-4"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">UPI</p>
                    <p className="text-sm text-muted-foreground">Enter your UPI ID for instant payment</p>
                  </div>
                </label>

                {/* Net Banking */}
                <label className="flex items-start gap-4 p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={paymentMethod === "netbanking"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 h-4 w-4"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Net Banking</p>
                    <p className="text-sm text-muted-foreground">All major banks supported</p>
                  </div>
                </label>
              </div>
            </Card>

            {/* Payment Details Form */}
            {paymentMethod === "credit-card" && (
              <Card className="bg-card p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Card Details</h3>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Cardholder Name</label>
                  <Input placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Card Number</label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Expiry Date</label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">CVV</label>
                    <Input placeholder="123" type="password" />
                  </div>
                </div>
              </Card>
            )}

            {paymentMethod === "upi" && (
              <Card className="bg-card p-6 space-y-4">
                <h3 className="font-semibold text-foreground">UPI Payment</h3>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">UPI ID</label>
                  <Input placeholder="yourname@upi" />
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="bg-card p-6 sticky top-20 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-2">Order Summary</h2>
                <div className="flex items-center gap-2 text-xs text-primary">
                  <Lock className="h-3 w-3" />
                  <span>Secure Payment</span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>{bookingData.seats.length} Tickets</span>
                  <span>₹{ticketAmount}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Convenience Fee</span>
                  <span>₹{convenienceFee}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>GST (18%)</span>
                  <span>₹{gst}</span>
                </div>
              </div>

              <div className="border-t border-border" />

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">Total Amount</span>
                <span className="text-2xl font-bold text-primary">₹{totalAmount}</span>
              </div>

              {/* Warning */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex gap-2 text-xs">
                <AlertCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">
                  Booking expires in <span className="font-semibold">10 minutes</span>
                </p>
              </div>

              {/* Pay Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : `Pay ₹${totalAmount}`}
              </Button>

              {/* Terms */}
              <p className="text-xs text-muted-foreground text-center">
                By completing this payment, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">
                  terms and conditions
                </a>
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
