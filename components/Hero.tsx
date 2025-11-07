'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search } from 'lucide-react'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/listings?search=${encodeURIComponent(searchQuery)}`)
    } else {
      router.push('/listings')
    }
  }

  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1594235206348-f03d8c4ebda0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1113)'
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Sustainable Paradise
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Experience authentic Tuvalu through eco-friendly attractions, traditional homestays, and sustainable tours
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto bg-white rounded-full shadow-2xl p-2 flex items-center">
            <input
              type="text"
              placeholder="Search for eco-attractions, homestays, or tours..."
              className="flex-1 px-6 py-3 text-gray-800 outline-none rounded-l-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full flex items-center space-x-2 transition"
            >
              <Search size={20} />
              <span className="font-semibold">Search</span>
            </button>
          </form>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/listings?category=eco-attractions" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              🌿 Eco-Attractions
            </Link>
            <Link href="/listings?category=homestays" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              🏠 Homestays
            </Link>
            <Link href="/listings?category=sustainable-tours" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              🚶 Sustainable Tours
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
