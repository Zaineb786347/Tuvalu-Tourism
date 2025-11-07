'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Home, Calendar, DollarSign, TrendingUp, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProviders: 0,
    totalListings: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingListings: 0
  })
  const [recentUsers, setRecentUsers] = useState<any[]>([])
  const [recentBookings, setRecentBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuthAndFetchData()
  }, [])

  const checkAuthAndFetchData = async () => {
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

    if (profileData?.role !== 'admin') {
      router.push('/listings')
      return
    }

    setUser(session.user)
    setProfile(profileData)
    await fetchAdminData()
  }

  const fetchAdminData = async () => {
    try {
      // Fetch all users
      const { data: usersData, count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(5)

      // Count providers
      const { count: providersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'provider')

      // Fetch listings
      const { count: listingsCount } = await supabase
        .from('listings')
        .select('*', { count: 'exact', head: true })

      const { count: pendingListingsCount } = await supabase
        .from('listings')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', false)

      // Fetch bookings
      const { data: bookingsData, count: bookingsCount } = await supabase
        .from('bookings')
        .select(`
          *,
          listings(title),
          profiles(full_name)
        `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(5)

      // Calculate total revenue from all bookings (except cancelled)
      const { data: paidBookings } = await supabase
        .from('bookings')
        .select('total_price')
        .neq('status', 'cancelled')

      const totalRevenue = (paidBookings || []).reduce((sum: number, b: any) => 
        sum + Number(b.total_price), 0)

      setStats({
        totalUsers: usersCount || 0,
        totalProviders: providersCount || 0,
        totalListings: listingsCount || 0,
        totalBookings: bookingsCount || 0,
        totalRevenue,
        pendingListings: pendingListingsCount || 0
      })

      setRecentUsers(usersData || [])
      setRecentBookings(bookingsData || [])
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Platform overview and management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Total Users</div>
              <Users className="text-primary-600" size={20} />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalUsers}</div>
            <div className="text-sm text-gray-500 mt-1">{stats.totalProviders} providers</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Total Listings</div>
              <Home className="text-green-600" size={20} />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalListings}</div>
            {stats.pendingListings > 0 && (
              <div className="text-sm text-yellow-600 mt-1 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {stats.pendingListings} pending review
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Total Bookings</div>
              <Calendar className="text-purple-600" size={20} />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalBookings}</div>
            <div className="text-sm text-gray-500 mt-1">All time</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Total Revenue</div>
              <DollarSign className="text-accent-600" size={20} />
            </div>
            <div className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</div>
            <div className="text-sm text-gray-500 mt-1">From all bookings</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Avg. Booking Value</div>
              <TrendingUp className="text-blue-600" size={20} />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              ${stats.totalBookings > 0 ? (stats.totalRevenue / stats.totalBookings).toFixed(2) : '0.00'}
            </div>
            <div className="text-sm text-gray-500 mt-1">Average value</div>
          </div>

          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg shadow-lg p-6 text-white">
            <div className="mb-2">
              <div className="text-sm opacity-90">Platform Health</div>
            </div>
            <div className="text-3xl font-bold mb-1">Excellent</div>
            <div className="text-sm opacity-90">All systems operational</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Users</h2>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                      {user.full_name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{user.full_name || 'Unknown'}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.role === 'admin' ? 'bg-red-100 text-red-800' :
                    user.role === 'provider' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Bookings</h2>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{booking.profiles?.full_name}</h3>
                      <p className="text-sm text-gray-500">{booking.listings?.title}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{new Date(booking.start_date).toLocaleDateString()}</span>
                    <span className="font-semibold text-primary-600">${booking.total_price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition">
              <Users className="mx-auto mb-2" size={24} />
              <div className="font-semibold text-sm">Manage Users</div>
            </button>
            <button className="p-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition">
              <Home className="mx-auto mb-2" size={24} />
              <div className="font-semibold text-sm">Review Listings</div>
            </button>
            <button className="p-4 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition">
              <Calendar className="mx-auto mb-2" size={24} />
              <div className="font-semibold text-sm">View Bookings</div>
            </button>
            <button className="p-4 border-2 border-accent-600 text-accent-600 rounded-lg hover:bg-accent-50 transition">
              <DollarSign className="mx-auto mb-2" size={24} />
              <div className="font-semibold text-sm">Payment Reports</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
