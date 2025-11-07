'use client'

import { Star } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      country: 'Australia',
      rating: 5,
      text: 'The homestay experience was incredible! Living with a local family gave us authentic insights into Tuvaluan culture. Highly recommend!',
      avatar: '👩'
    },
    {
      name: 'David Chen',
      country: 'New Zealand',
      rating: 5,
      text: 'Perfect eco-tourism platform. The marine conservation tour was educational and well-organized. Great way to support sustainable tourism.',
      avatar: '👨'
    },
    {
      name: 'Emma Williams',
      country: 'UK',
      rating: 5,
      text: 'Booking was seamless, and the island tour exceeded expectations. Beautiful beaches, friendly locals, and truly sustainable practices.',
      avatar: '👩‍🦰'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Travelers Say
          </h2>
          <p className="text-lg text-gray-600">
            Real experiences from visitors to Tuvalu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.country}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
