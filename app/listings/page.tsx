'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { MapPin, Users, Filter, Star } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function ListingsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const searchParam = searchParams.get('search')
  
  const [listings, setListings] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [searchQuery, setSearchQuery] = useState(searchParam || '')

  const fetchCategories = useCallback(async () => {
    const { data } = await supabase.from('categories').select('*')
    setCategories(data || [])
  }, [])

  const fetchListings = useCallback(async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('listings')
        .select(`
          *,
          categories (name, slug),
          profiles (full_name)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (selectedCategory && selectedCategory !== 'all') {
        const { data: category } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', selectedCategory)
          .single()
        
        if (category) {
          query = query.eq('category_id', category.id)
        }
      }

      const { data, error } = await query

      if (error) throw error
      setListings(data || [])
    } catch (error) {
      console.error('Error fetching listings:', error)
    } finally {
      setLoading(false)
    }
  }, [selectedCategory])

  useEffect(() => {
    fetchCategories()
    fetchListings()
  }, [fetchCategories, fetchListings])

  useEffect(() => {
    // Update search query when URL param changes
    if (searchParam) {
      setSearchQuery(searchParam)
    }
  }, [searchParam])

  

  const filteredListings = listings.filter(listing => {
    const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1]
    const matchesSearch = searchQuery === '' || 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesPrice && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Explore Tuvalu</h1>
          <p className="text-xl">Discover eco-friendly experiences and authentic homestays</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="flex items-center mb-6">
                <Filter size={20} className="mr-2" />
                <h2 className="text-xl font-bold">Filters</h2>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="label">Search</label>
                <input
                  type="text"
                  placeholder="Search listings..."
                  className="input-field"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="label">Category</label>
                <select
                  className="input-field"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="label">Price Range</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    placeholder="Min"
                    className="input-field"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="input-field"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  />
                </div>
              </div>

              <button
                onClick={fetchListings}
                className="btn-primary w-full"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredListings.length} {filteredListings.length === 1 ? 'listing' : 'listings'} found
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading listings...</p>
              </div>
            ) : filteredListings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500 text-lg">No listings found matching your criteria</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setSearchQuery('')
                    setPriceRange([0, 1000])
                  }}
                  className="btn-primary mt-4"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredListings.map((listing) => (
                  <Link key={listing.id} href={`/listings/${listing.slug}`}>
                    <div className="card group cursor-pointer">
                      <div className="relative h-56 bg-gray-200 overflow-hidden">
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
                        {listing.featured && (
                          <div className="absolute top-4 left-4 bg-accent-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Featured
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
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
