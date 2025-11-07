import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">🏝️ Tuvalu Tourism</h3>
            <p className="text-gray-400 text-sm">
              Discover sustainable eco-tourism in the beautiful Pacific island nation of Tuvalu. 
              Book authentic homestays, eco-attractions, and sustainable tours.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/listings" className="text-gray-400 hover:text-white transition">All Listings</Link></li>
              <li><Link href="/listings?category=eco-attractions" className="text-gray-400 hover:text-white transition">Eco-Attractions</Link></li>
              <li><Link href="/listings?category=homestays" className="text-gray-400 hover:text-white transition">Homestays</Link></li>
              <li><Link href="/listings?category=sustainable-tours" className="text-gray-400 hover:text-white transition">Sustainable Tours</Link></li>
            </ul>
          </div>

          {/* For Providers */}
          <div>
            <h3 className="text-lg font-bold mb-4">For Providers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/provider/dashboard" className="text-gray-400 hover:text-white transition">Provider Dashboard</Link></li>
              <li><Link href="/provider/listings/new" className="text-gray-400 hover:text-white transition">List Your Property</Link></li>
              <li><Link href="/documentation" className="text-gray-400 hover:text-white transition">Documentation</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram size={20} />
              </a>
              <a href="mailto:info@tuvalutourism.tv" className="text-gray-400 hover:text-white transition">
                <Mail size={20} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Email: info@tuvalutourism.tv<br />
              Funafuti, Tuvalu
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Tuvalu Tourism Platform. All rights reserved.</p>
          <p className="mt-2">Built with ❤️ for sustainable tourism in Tuvalu</p>
        </div>
      </div>
    </footer>
  )
}
