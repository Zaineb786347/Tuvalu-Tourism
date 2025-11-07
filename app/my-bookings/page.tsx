'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Calendar, MapPin, Users, DollarSign, Star } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past' | 'cancelled'>('all')
  const [reviewModal, setReviewModal] = useState<{ open: boolean; booking: any }>({ open: false, booking: null })
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })
  const [submittingReview, setSubmittingReview] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuthAndFetchBookings()
  }, [filter])

  const checkAuthAndFetchBookings = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/auth/login')
      return
    }

    await fetchBookings(session.user.id)
  }

  const fetchBookings = async (userId: string) => {
    setLoading(true)
    try {
      let query = supabase
        .from('bookings')
        .select(`
          *,
          listings (
            title,
            slug,
            images,
            location,
            categories (name)
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (filter === 'upcoming') {
        query = query.gte('start_date', new Date().toISOString().split('T')[0])
                     .neq('status', 'cancelled')
      } else if (filter === 'past') {
        query = query.lt('start_date', new Date().toISOString().split('T')[0])
      } else if (filter === 'cancelled') {
        query = query.eq('status', 'cancelled')
      }

      const { data, error } = await query

      if (error) throw error
      setBookings(data || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const openReviewModal = (booking: any) => {
    setReviewModal({ open: true, booking })
    setReviewForm({ rating: 5, comment: '' })
  }

  const closeReviewModal = () => {
    setReviewModal({ open: false, booking: null })
    setReviewForm({ rating: 5, comment: '' })
  }

  const submitReview = async () => {
    if (!reviewModal.booking) return
    
    setSubmittingReview(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const { error } = await supabase
        .from('reviews')
        .insert({
          listing_id: reviewModal.booking.listing_id,
          user_id: session.user.id,
          booking_id: reviewModal.booking.id,
          rating: reviewForm.rating,
          comment: reviewForm.comment,
        })

      if (error) throw error

      alert('✅ Review submitted successfully!')
      closeReviewModal()
      // Refresh bookings to update review status
      checkAuthAndFetchBookings()
    } catch (error: any) {
      alert('Error submitting review: ' + error.message)
    } finally {
      setSubmittingReview(false)
    }
  }

  const cancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)

      if (error) throw error

      alert('✅ Booking cancelled successfully!')
      // Refresh bookings
      checkAuthAndFetchBookings()
    } catch (error: any) {
      alert('Error cancelling booking: ' + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Bookings</h1>
          <p className="text-gray-600">View and manage your bookings</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-8 p-2 flex space-x-2">
          {[
            { key: 'all', label: 'All Bookings' },
            { key: 'upcoming', label: 'Upcoming' },
            { key: 'past', label: 'Past' },
            { key: 'cancelled', label: 'Cancelled' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                filter === tab.key
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-6">Start exploring and book your first experience!</p>
            <Link href="/listings" className="btn-primary">
              Browse Listings
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                  {/* Image */}
                  <div className="md:w-64 h-48 md:h-auto bg-gray-200">
                    {booking.listings?.images?.[0] ? (
                      <img
                        src={booking.listings.images[0]}
                        alt={booking.listings.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">
                        🏝️
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {booking.listings?.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {booking.listings?.categories?.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">
                          ${booking.total_price}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.payment_method === 'local' ? 'Pay on arrival' : '✓ Paid'}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={16} className="mr-2" />
                        <div>
                          <div className="text-xs text-gray-500">Check-in</div>
                          <div className="font-semibold">
                            {new Date(booking.start_date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={16} className="mr-2" />
                        <div>
                          <div className="text-xs text-gray-500">Check-out</div>
                          <div className="font-semibold">
                            {new Date(booking.end_date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users size={16} className="mr-2" />
                        <div>
                          <div className="text-xs text-gray-500">Guests</div>
                          <div className="font-semibold">{booking.guests}</div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={16} className="mr-2" />
                        <div>
                          <div className="text-xs text-gray-500">Location</div>
                          <div className="font-semibold">{booking.listings?.location}</div>
                        </div>
                      </div>
                    </div>

                    {booking.special_requests && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Special Requests:</p>
                        <p className="text-sm text-gray-700">{booking.special_requests}</p>
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <Link
                        href={`/listings/${booking.listings?.slug}`}
                        className="btn-secondary text-sm"
                      >
                        View Listing
                      </Link>
                      {booking.status === 'completed' && (
                        <button 
                          onClick={() => openReviewModal(booking)}
                          className="btn-primary text-sm flex items-center"
                        >
                          <Star size={16} className="mr-1" />
                          Leave Review
                        </button>
                      )}
                      {booking.status === 'confirmed' && new Date(booking.start_date) > new Date() && (
                        <button 
                          onClick={() => cancelBooking(booking.id)}
                          className="text-red-600 hover:text-red-700 font-semibold text-sm"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {reviewModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Leave a Review</h2>
            
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {reviewModal.booking?.listings?.title}
              </h3>
              <p className="text-sm text-gray-500">
                How was your experience?
              </p>
            </div>

            <div className="mb-6">
              <label className="label mb-2">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      size={32}
                      className={star <= reviewForm.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="label mb-2">Your Review</label>
              <textarea
                className="input-field"
                rows={4}
                placeholder="Share your experience..."
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={submitReview}
                disabled={submittingReview || !reviewForm.comment.trim()}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                onClick={closeReviewModal}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
