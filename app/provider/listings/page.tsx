'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function ProviderListingsPage() {
  const [user, setUser] = useState<any>(null)
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuthAndFetchListings()
  }, [])

  const checkAuthAndFetchListings = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/auth/login')
      return
    }

    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (profileData?.role !== 'provider' && profileData?.role !== 'admin') {
      router.push('/listings')
      return
    }

    setUser(session.user)
    await fetchListings(session.user.id)
  }

  const fetchListings = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          categories (name, slug)
        `)
        .eq('provider_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setListings(data || [])
    } catch (error) {
      console.error('Error fetching listings:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleActive = async (listingId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('listings')
        .update({ is_active: !currentStatus })
        .eq('id', listingId)

      if (error) throw error
      
      // Refresh listings
      if (user) {
        await fetchListings(user.id)
      }
    } catch (error: any) {
      alert('Error updating listing: ' + error.message)
    }
  }

  const deleteListing = async (listingId: string) => {
    if (!confirm('Are you sure you want to delete this listing? This will also delete all related bookings and reviews.')) return

    try {
      // First delete related reviews
      const { error: reviewsError } = await supabase
        .from('reviews')
        .delete()
        .eq('listing_id', listingId)

      if (reviewsError) console.error('Error deleting reviews:', reviewsError)

      // Then delete related bookings
      const { error: bookingsError } = await supabase
        .from('bookings')
        .delete()
        .eq('listing_id', listingId)

      if (bookingsError) console.error('Error deleting bookings:', bookingsError)

      // Finally delete the listing
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', listingId)

      if (error) throw error
      
      // Refresh listings
      if (user) {
        await fetchListings(user.id)
      }
      alert('✅ Listing deleted successfully!')
    } catch (error: any) {
      alert('Error deleting listing: ' + error.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading listings...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Listings</h1>
            <p className="text-gray-600">Manage your tourism offerings</p>
          </div>
          <Link href="/provider/listings/new" className="btn-primary flex items-center">
            <Plus size={20} className="mr-2" />
            Add New Listing
          </Link>
        </div>

        {/* Listings Grid */}
        {listings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🏝️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No listings yet</h3>
            <p className="text-gray-600 mb-6">Create your first listing to start receiving bookings</p>
            <Link href="/provider/listings/new" className="btn-primary inline-flex items-center">
              <Plus size={20} className="mr-2" />
              Create Your First Listing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Image */}
                <div className="relative h-48 bg-gray-200">
                  {listing.images && listing.images[0] ? (
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      🏝️
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      listing.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {listing.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {listing.title}
                      </h3>
                      <p className="text-sm text-gray-500">{listing.categories?.name}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {listing.short_description || listing.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <div className="text-2xl font-bold text-primary-600">
                      ${listing.price}
                    </div>
                    <div className="text-sm text-gray-500">
                      Max {listing.max_capacity} guests
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Link
                      href={`/provider/listings/${listing.id}/edit`}
                      className="flex-1 btn-secondary text-sm flex items-center justify-center"
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Link>
                    <button
                      onClick={() => toggleActive(listing.id, listing.is_active)}
                      className="flex-1 btn-secondary text-sm flex items-center justify-center"
                    >
                      {listing.is_active ? (
                        <>
                          <EyeOff size={16} className="mr-1" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye size={16} className="mr-1" />
                          Show
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => deleteListing(listing.id)}
                      className="px-3 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
