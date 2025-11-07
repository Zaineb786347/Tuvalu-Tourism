'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Users, DollarSign, CreditCard } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function BookingPage({ params }: { params: { id: string } }) {
  const [listing, setListing] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'local'>('stripe')
  const [specialRequests, setSpecialRequests] = useState('')
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchListing()
  }, [params.id])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/auth/login')
      return
    }
    setUser(session.user)
  }

  const fetchListing = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          categories (name),
          profiles (full_name)
        `)
        .eq('id', params.id)
        .single()

      if (error) throw error
      setListing(data)
    } catch (error) {
      console.error('Error fetching listing:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateTotal = () => {
    if (!startDate || !endDate) return listing?.price || 0
    const days = Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)))
    return listing?.price * guests * days
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Create booking with confirmed status
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          listing_id: params.id,
          user_id: user.id,
          start_date: startDate,
          end_date: endDate,
          guests,
          total_price: calculateTotal(),
          payment_method: paymentMethod,
          special_requests: specialRequests,
          status: 'confirmed', // Auto-confirm for now
        })
        .select()
        .single()

      if (bookingError) throw bookingError

      // Create payment record
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          booking_id: booking.id,
          amount: calculateTotal(),
          payment_method: paymentMethod,
          status: paymentMethod === 'local' ? 'pending' : 'completed',
        })

      if (paymentError) {
        console.error('Payment record error:', paymentError)
      }

      alert('✅ Booking confirmed! Check My Bookings to view details.')
      router.push('/my-bookings')
    } catch (error: any) {
      alert('Error creating booking: ' + error.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading || !listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Details</h2>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="label">
                    <Calendar className="inline mr-2" size={16} />
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    className="input-field"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="label">
                    <Calendar className="inline mr-2" size={16} />
                    End Date
                  </label>
                  <input
                    type="date"
                    required
                    className="input-field"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="mb-6">
                <label className="label">
                  <Users className="inline mr-2" size={16} />
                  Number of Guests
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max={listing.max_capacity}
                  className="input-field"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                />
                <p className="text-sm text-gray-500 mt-1">Max capacity: {listing.max_capacity} guests</p>
              </div>

              {/* Special Requests */}
              <div className="mb-6">
                <label className="label">Special Requests (Optional)</label>
                <textarea
                  className="input-field"
                  rows={4}
                  placeholder="Any special requirements or requests..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                />
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="label">
                  <CreditCard className="inline mr-2" size={16} />
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('stripe')}
                    className={`py-3 px-4 rounded-lg border-2 transition ${
                      paymentMethod === 'stripe'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-300 text-gray-700'
                    }`}
                  >
                    <CreditCard className="mx-auto mb-2" />
                    <div className="font-semibold">Credit Card</div>
                    <div className="text-xs">via Stripe</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('local')}
                    className={`py-3 px-4 rounded-lg border-2 transition ${
                      paymentMethod === 'local'
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-300 text-gray-700'
                    }`}
                  >
                    <DollarSign className="mx-auto mb-2" />
                    <div className="font-semibold">Local Payment</div>
                    <div className="text-xs">Pay on arrival</div>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full disabled:opacity-50"
              >
                {submitting ? 'Processing...' : `Confirm Booking - $${calculateTotal()}`}
              </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h3>
              
              <div className="mb-4">
                {listing.images && listing.images[0] && (
                  <img 
                    src={listing.images[0]} 
                    alt={listing.title} 
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                )}
                <h4 className="font-bold text-gray-900">{listing.title}</h4>
                <p className="text-sm text-gray-600">{listing.categories?.name}</p>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price per person</span>
                  <span className="font-semibold">${listing.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Number of guests</span>
                  <span className="font-semibold">{guests}</span>
                </div>
                {startDate && endDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">
                      {Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)))} days
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary-600">
                    ${calculateTotal()}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  ✓ Free cancellation up to 24 hours before
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
