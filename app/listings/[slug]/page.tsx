'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Users, Calendar, DollarSign, Star, ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function ListingDetailPage({ params }: { params: { slug: string } }) {
  const [listing, setListing] = useState<any>(null)
  const [provider, setProvider] = useState<any>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const router = useRouter()

  useEffect(() => {
    fetchListing()
  }, [params.slug])

  const fetchListing = async () => {
    try {
      const { data: listingData, error: listingError } = await supabase
        .from('listings')
        .select(`
          *,
          categories (name, slug, icon),
          profiles (full_name, phone, email)
        `)
        .eq('slug', params.slug)
        .single()

      if (listingError) throw listingError
      setListing(listingData)
      setProvider(listingData.profiles)

      // Fetch reviews
      const { data: reviewsData } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles (full_name)
        `)
        .eq('listing_id', listingData.id)
        .order('created_at', { ascending: false })

      setReviews(reviewsData || [])
    } catch (error) {
      console.error('Error fetching listing:', error)
    } finally {
      setLoading(false)
    }
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Listing not found</h1>
          <Link href="/listings" className="btn-primary">
            Back to Listings
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/listings" className="flex items-center text-primary-600 hover:text-primary-700">
            <ArrowLeft size={20} className="mr-2" />
            Back to Listings
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="relative h-96 bg-gray-200">
                {listing.images && listing.images.length > 0 ? (
                  <img
                    src={listing.images[selectedImage]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-8xl">
                    🏝️
                  </div>
                )}
              </div>
              {listing.images && listing.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 p-4">
                  {listing.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-24 rounded-lg overflow-hidden ${
                        selectedImage === index ? 'ring-4 ring-primary-600' : ''
                      }`}
                    >
                      <img src={image} alt={`${listing.title} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{listing.categories?.icon || '🏝️'}</span>
                <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                  {listing.categories?.name}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{listing.title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
                <div className="flex items-center">
                  <MapPin size={20} className="mr-2" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center">
                  <Users size={20} className="mr-2" />
                  <span>Up to {listing.max_capacity} guests</span>
                </div>
                {reviews.length > 0 && (
                  <div className="flex items-center">
                    <Star size={20} className="mr-2 text-yellow-400 fill-current" />
                    <span>{averageRating.toFixed(1)} ({reviews.length} reviews)</span>
                  </div>
                )}
              </div>

              <div className="prose max-w-none mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">About This Experience</h2>
                <p className="text-gray-600 whitespace-pre-line">{listing.description}</p>
              </div>

              {listing.amenities && listing.amenities.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {listing.amenities.map((amenity: string, index: number) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <span className="mr-2">✓</span>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Reviews {reviews.length > 0 && `(${reviews.length})`}
              </h2>
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-center mb-3">
                        <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                          {review.profiles?.full_name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{review.profiles?.full_name || 'Anonymous'}</h4>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-primary-600">${listing.price}</span>
                  <span className="text-gray-500 ml-2">/ person</span>
                </div>
              </div>

              <Link href={`/booking/${listing.id}`} className="btn-primary w-full block text-center mb-4">
                Book Now
              </Link>

              <div className="border-t pt-4">
                <h3 className="font-bold text-gray-900 mb-3">Hosted by</h3>
                <div className="flex items-center mb-4">
                  <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-3">
                    {provider?.full_name?.charAt(0) || 'P'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{provider?.full_name}</p>
                    <p className="text-sm text-gray-500">Local Provider</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h3 className="font-bold text-gray-900 mb-3">💡 Why book with us?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>100% eco-friendly and sustainable</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Direct support to local communities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Secure payment options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Authentic cultural experiences</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
