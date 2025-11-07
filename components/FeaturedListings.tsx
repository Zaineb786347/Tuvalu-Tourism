'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin, Users, Star } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function FeaturedListings() {
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedListings()
  }, [])

  const fetchFeaturedListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          categories (name, slug),
          profiles (full_name)
        `)
        .eq('is_active', true)
        .eq('featured', true)
        .limit(6)

      if (error) throw error
      setListings(data || [])
    } catch (error) {
      console.error('Error fetching listings:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500">Loading featured listings...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Featured Experiences
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked sustainable tourism experiences
            </p>
          </div>
          <Link href="/listings" className="btn-primary hidden md:block">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <Link key={listing.id} href={`/listings/${listing.slug}`}>
              <div className="card group cursor-pointer">
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  {listing.images && listing.images[0] ? (
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      🏝️
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-primary-600">
                    {listing.categories?.name}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition">
                    {listing.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {listing.short_description || listing.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <MapPin size={16} className="mr-1" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Users size={16} className="mr-1" />
                    <span>Up to {listing.max_capacity} guests</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-primary-600">
                        ${listing.price}
                      </span>
                      <span className="text-gray-500 text-sm"> / person</span>
                    </div>
                    <button className="btn-primary text-sm">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/listings" className="btn-primary">
            View All Listings
          </Link>
        </div>
      </div>
    </section>
  )
}
