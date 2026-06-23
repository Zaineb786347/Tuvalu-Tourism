'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function EditListingPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<any>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
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

    // Fetch categories
    const { data: categoriesData } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    setCategories(categoriesData || [])

    // Fetch listing
    const { data: listingData, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error || !listingData) {
      alert('Listing not found')
      router.push('/provider/listings')
      return
    }

    // Check if user owns this listing
    if (listingData.provider_id !== session.user.id && profileData?.role !== 'admin') {
      alert('You do not have permission to edit this listing')
      router.push('/provider/listings')
      return
    }

    setFormData({
      title: listingData.title,
      slug: listingData.slug,
      category_id: listingData.category_id,
      description: listingData.description,
      short_description: listingData.short_description || '',
      price: listingData.price.toString(),
      location: listingData.location,
      max_capacity: listingData.max_capacity.toString(),
      images: (listingData.images || []).join('\n'),
      amenities: (listingData.amenities || []).join(', '),
      featured: listingData.featured,
    })

    setLoading(false)
  }, [router, params.id])

  useEffect(() => {
    checkAuthAndFetchData()
  }, [checkAuthAndFetchData])

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const { error } = await supabase
        .from('listings')
        .update({
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
          featured: formData.featured,
        })
        .eq('id', params.id)

      if (error) throw error

      alert('✅ Listing updated successfully!')
      router.push('/provider/listings')
    } catch (error: any) {
      alert('Error updating listing: ' + error.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Listing</h1>
          <p className="text-gray-600">Update your listing details</p>
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
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                />
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
              />
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
              disabled={submitting}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save Changes'}
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
