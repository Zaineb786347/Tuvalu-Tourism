'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Eye, Edit, TrendingUp, Calendar, DollarSign } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function ProviderDashboard() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [listings, setListings] = useState<any[]>([])
  const [bookings, setBookings] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    totalBookings: 0,
    totalRevenue: 0
  })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const fetchProviderData = useCallback(async (userId: string) => {
    try {
      // Fetch listings
      const { data: listingsData } = await supabase
        .from('listings')
        .select('*, categories(name)')
        .eq('provider_id', userId)
        .order('created_at', { ascending: false })

      setListings(listingsData || [])

      // Fetch bookings for these listings
      const listingIds = (listingsData || []).map((l: any) => l.id)
      
      let bookingsData: any[] = []
      if (listingIds.length > 0) {
        const { data } = await supabase
          .from('bookings')
          .select(`
            *,
            listings(title, provider_id),
            profiles(full_name, email)
          `)
          .in('listing_id', listingIds)
          .order('created_at', { ascending: false })
        
        bookingsData = data || []
      }

      setBookings(bookingsData)

      // Calculate stats - count ALL bookings except cancelled for revenue
      const totalRevenue = bookingsData
        .filter((b: any) => b.status !== 'cancelled')
        .reduce((sum: number, b: any) => sum + Number(b.total_price || 0), 0)

      setStats({
        totalListings: listingsData?.length || 0,
        activeListings: listingsData?.filter((l: any) => l.is_active).length || 0,
        totalBookings: bookingsData.length || 0,
        totalRevenue
      })
    } catch (error) {
      console.error('Error fetching provider data:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const checkAuthAndFetchData = useCallback(async () => {
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
    setProfile(profileData)
    await fetchProviderData(session.user.id)
  }, [router, fetchProviderData])

  useEffect(() => {
    checkAuthAndFetchData()
  }, [checkAuthAndFetchData])


  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Provider Dashboard</h1>
          <p className="text-gray-600">Welcome back, {profile?.full_name}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Total Listings</div>
              <Eye className="text-primary-600" size={20} />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalListings}</div>
            <div className="text-sm text-gray-500 mt-1">{stats.activeListings} active</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Total Bookings</div>
              <Calendar className="text-green-600" size={20} />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalBookings}</div>
            <div className="text-sm text-gray-500 mt-1">All time</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Total Revenue</div>
              <DollarSign className="text-accent-600" size={20} />
            </div>
            <div className="text-3xl font-bold text-gray-900">${stats.totalRevenue}</div>
            <div className="text-sm text-gray-500 mt-1">From paid bookings</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Avg. per Booking</div>
              <TrendingUp className="text-purple-600" size={20} />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              ${stats.totalBookings > 0 ? Math.round(stats.totalRevenue / stats.totalBookings) : 0}
            </div>
            <div className="text-sm text-gray-500 mt-1">Average value</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Listings */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">My Listings</h2>
              <Link href="/provider/listings/new" className="btn-primary flex items-center">
                <Plus size={18} className="mr-1" />
                Add Listing
              </Link>
            </div>

            {listings.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🏠</div>
                <p className="text-gray-500 mb-4">No listings yet</p>
                <Link href="/provider/listings/new" className="btn-primary">
                  Create Your First Listing
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {listings.slice(0, 5).map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      {listing.images?.[0] ? (
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="w-16 h-16 object-cover rounded-lg mr-4"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4 flex items-center justify-center text-2xl">
                          🏝️
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                        <p className="text-sm text-gray-500">{listing.categories?.name}</p>
                        <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs ${
                          listing.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {listing.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/listings/${listing.slug}`} className="text-primary-600 hover:text-primary-700">
                        <Eye size={20} />
                      </Link>
                      <Link href={`/provider/listings/${listing.id}/edit`} className="text-gray-600 hover:text-gray-700">
                        <Edit size={20} />
                      </Link>
                    </div>
                  </div>
                ))}
                {listings.length > 5 && (
                  <Link href="/provider/listings" className="block text-center text-primary-600 hover:text-primary-700 font-semibold">
                    View All Listings →
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
              <Link href="/my-bookings" className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                View All →
              </Link>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">📅</div>
                <p className="text-gray-500">No bookings yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.slice(0, 5).map((booking) => (
                  <div key={booking.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{booking.profiles?.full_name}</h3>
                        <p className="text-sm text-gray-500">{booking.profiles?.email}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>{new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}</span>
                        <span className="font-semibold text-primary-600">${booking.total_price}</span>
                      </div>
                      <div className="mt-1">{booking.guests} guest(s)</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
