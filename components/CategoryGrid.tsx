import Link from 'next/link'

export default function CategoryGrid() {
  const categories = [
    {
      name: 'Eco-Attractions',
      slug: 'eco-attractions',
      icon: '🌿',
      description: 'Explore sustainable natural wonders',
      color: 'from-green-400 to-green-600'
    },
    {
      name: 'Homestays',
      slug: 'homestays',
      icon: '🏠',
      description: 'Experience authentic local living',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Sustainable Tours',
      slug: 'sustainable-tours',
      icon: '🚶',
      description: 'Eco-friendly guided experiences',
      color: 'from-purple-400 to-purple-600'
    },
    {
      name: 'Water Activities',
      slug: 'water-activities',
      icon: '🏊',
      description: 'Marine adventures and snorkeling',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      name: 'Cultural Experiences',
      slug: 'cultural-experiences',
      icon: '🎭',
      description: 'Immerse in local traditions',
      color: 'from-orange-400 to-orange-600'
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore By Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the best eco-friendly experiences Tuvalu has to offer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/listings?category=${category.slug}`}
              className="group"
            >
              <div className={`bg-gradient-to-br ${category.color} rounded-xl p-8 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-white/90">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
