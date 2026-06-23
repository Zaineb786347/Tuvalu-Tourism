'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function NewListingPage() {
  const [user, setUser] = useState<any>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category_id: '',
    description: '',
    short_description: '',
    price: '',
    location: '',
    max_capacity: '1',
    images: '',
    amenities: '',
    featured: false,
  })

  const checkAuthAndFetchCategories = useCallback(async () => {
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

    // Fetch categories
    const { data: categoriesData } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    setCategories(categoriesData || [])
  }, [router])

  useEffect(() => {
    checkAuthAndFetchCategories()
  }, [checkAuthAndFetchCategories])

  

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('listings')
        .insert({
          provider_id: user.id,
          category_id: formData.category_id,
          title: formData.title,
          slug: formData.slug,
          description: formData.description,
          short_description: formData.short_description,
          price: parseFloat(formData.price),
          location: formData.location,
          max_capacity: parseInt(formData.max_capacity),
          images: formData.images.split('\n').filter(url => url.trim()),
          amenities: formData.amenities.split(',').map(a => a.trim()).filter(a => a),
          is_active: true,
          featured: formData.featured,
        })

      if (error) throw error

      alert('✅ Listing created successfully!')
      router.push('/provider/listings')
    } catch (error: any) {
      alert('Error creating listing: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/provider/listings" className="flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to My Listings
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Listing</h1>
          <p className="text-gray-600">Add a new tourism offering</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          {/* Basic Info */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="label">Title *</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g., Beachfront Family Homestay"
                />
              </div>

              <div>
                <label className="label">URL Slug *</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="beachfront-family-homestay"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Will be used in the URL: /listings/{formData.slug || 'your-slug'}
                </p>
              </div>

              <div>
                <label className="label">Category *</label>
                <select
                  required
                  className="input-field"
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Short Description *</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="A brief one-line description"
                  maxLength={100}
                />
              </div>

              <div>
                <label className="label">Full Description *</label>
                <textarea
                  required
                  className="input-field"
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of your offering..."
                />
              </div>
            </div>
          </div>

          {/* Pricing & Capacity */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Pricing & Capacity</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Price (USD per person) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  className="input-field"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="50.00"
                />
              </div>

              <div>
                <label className="label">Max Capacity *</label>
                <input
                  type="number"
                  required
                  min="1"
                  className="input-field"
                  value={formData.max_capacity}
                  onChange={(e) => setFormData({ ...formData, max_capacity: e.target.value })}
                  placeholder="4"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
            
            <div>
              <label className="label">Location *</label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Funafuti, Nanumea, etc."
              />
            </div>
          </div>

          {/* Images */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Images</h2>
            
            <div>
              <label className="label">Image URLs (one per line)</label>
              <textarea
                className="input-field"
                rows={4}
                value={formData.images}
                onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                placeholder="https://images.unsplash.com/photo-...&#10;https://images.unsplash.com/photo-..."
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter image URLs from Unsplash or other sources (one per line)
              </p>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
            
            <div>
              <label className="label">Amenities (comma separated)</label>
              <input
                type="text"
                className="input-field"
                value={formData.amenities}
                onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                placeholder="WiFi, Air Conditioning, Beach Access, Meals"
              />
            </div>
          </div>

          {/* Featured */}
          <div className="mb-8">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="mr-2"
              />
              <span className="font-semibold text-gray-900">
                Mark as Featured (appears on homepage)
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Listing'}
            </button>
            <Link href="/provider/listings" className="btn-secondary flex-1 text-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
