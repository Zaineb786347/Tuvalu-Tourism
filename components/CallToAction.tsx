import Link from 'next/link'

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to Explore Tuvalu?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Join us in supporting sustainable tourism and experience the authentic beauty of the Pacific Islands
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/listings" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
            Browse Listings
          </Link>
          <Link href="/auth/register?type=provider" className="bg-accent-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent-700 transition border-2 border-white">
            Become a Provider
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl font-bold mb-2">🌱</div>
            <h3 className="text-xl font-bold mb-2">100% Eco-Friendly</h3>
            <p className="text-white/90">All listings follow sustainable practices</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">🤝</div>
            <h3 className="text-xl font-bold mb-2">Support Local</h3>
            <p className="text-white/90">Directly benefit Tuvaluan communities</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">✨</div>
            <h3 className="text-xl font-bold mb-2">Authentic Experiences</h3>
            <p className="text-white/90">Real cultural immersion, not just tourism</p>
          </div>
        </div>
      </div>
    </section>
  )
}
