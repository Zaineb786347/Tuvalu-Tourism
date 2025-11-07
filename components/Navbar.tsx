'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, User, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    checkUser()
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setUser(session?.user ?? null)
    if (session?.user) {
      fetchProfile(session.user.id)
    }
  }

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    setProfile(data)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🏝️</span>
            <span className="text-xl font-bold text-primary-600">Tuvalu Tourism</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/listings" className="text-gray-700 hover:text-primary-600 transition">
              Explore
            </Link>
            <Link href="/listings?category=eco-attractions" className="text-gray-700 hover:text-primary-600 transition">
              Eco-Attractions
            </Link>
            <Link href="/listings?category=homestays" className="text-gray-700 hover:text-primary-600 transition">
              Homestays
            </Link>
            <Link href="/listings?category=sustainable-tours" className="text-gray-700 hover:text-primary-600 transition">
              Tours
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                {profile?.role === 'provider' && (
                  <>
                    <Link href="/provider/dashboard" className="text-gray-700 hover:text-primary-600 transition">
                      Dashboard
                    </Link>
                    <Link href="/provider/listings" className="text-gray-700 hover:text-primary-600 transition">
                      My Listings
                    </Link>
                  </>
                )}
                {profile?.role === 'admin' && (
                  <Link href="/admin/dashboard" className="text-gray-700 hover:text-primary-600 transition">
                    Admin
                  </Link>
                )}
                <Link href="/my-bookings" className="text-gray-700 hover:text-primary-600 transition">
                  My Bookings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login" className="text-gray-700 hover:text-primary-600 transition">
                  Login
                </Link>
                <Link href="/auth/register" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/listings" className="text-gray-700 hover:text-primary-600 transition">
                Explore
              </Link>
              <Link href="/listings?category=eco-attractions" className="text-gray-700 hover:text-primary-600 transition">
                Eco-Attractions
              </Link>
              <Link href="/listings?category=homestays" className="text-gray-700 hover:text-primary-600 transition">
                Homestays
              </Link>
              <Link href="/listings?category=sustainable-tours" className="text-gray-700 hover:text-primary-600 transition">
                Tours
              </Link>
              
              {user ? (
                <>
                  {profile?.role === 'provider' && (
                    <>
                      <Link href="/provider/dashboard" className="text-gray-700 hover:text-primary-600 transition">
                        Dashboard
                      </Link>
                      <Link href="/provider/listings" className="text-gray-700 hover:text-primary-600 transition">
                        My Listings
                      </Link>
                    </>
                  )}
                  {profile?.role === 'admin' && (
                    <Link href="/admin/dashboard" className="text-gray-700 hover:text-primary-600 transition">
                      Admin
                    </Link>
                  )}
                  <Link href="/my-bookings" className="text-gray-700 hover:text-primary-600 transition">
                    My Bookings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-left text-gray-700 hover:text-primary-600 transition"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-gray-700 hover:text-primary-600 transition">
                    Login
                  </Link>
                  <Link href="/auth/register" className="btn-primary">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
